"use client";

import { Header } from "@/components/dashboard/Header";
import { SideNav } from "@/components/dashboard/SideNav";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CSPSolver } from "@/lib/algorithms/csp-solver";
import { FOLEvaluator } from "@/lib/algorithms/fol-evaluator";
import { GoalRecommender } from "@/lib/algorithms/goal-recommender";
import { employeeData, projectData } from "@/lib/data";
import {
  AlertTriangle,
  BrainCircuit,
  Layers,
  Network,
  Target,
  Workflow,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function InsightsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [insightsData, setInsightsData] = useState(null);

  useEffect(() => {
    // Simulate computation delay
    setTimeout(() => {
      // Apply all three algorithms
      const folEvaluator = new FOLEvaluator(employeeData);
      const promotionCandidates = folEvaluator.evaluateRule(
        "isPromotionCandidate"
      );
      const performanceScores = folEvaluator.calculatePerformanceScores();

      // Get training needs
      const trainingNeeds = {};
      employeeData.forEach((employee) => {
        trainingNeeds[employee.id] = folEvaluator.needsTraining(employee);
      });

      // Apply CSP to assign employees to projects
      const cspSolver = new CSPSolver(employeeData, projectData);
      const projectAssignments = cspSolver.solve();

      // Calculate skill coverage
      const skillCoverage = {};
      projectData.forEach((project) => {
        const assignedEmployeeIds = Object.entries(projectAssignments)
          .filter(([_, projId]) => projId === project.id)
          .map(([empId]) => parseInt(empId));

        const assignedEmployees = employeeData.filter((emp) =>
          assignedEmployeeIds.includes(emp.id)
        );

        const coverage = {};
        project.requiredSkills.forEach((skill) => {
          coverage[skill] = assignedEmployees.some((emp) =>
            emp.skills.some((s) => s.name === skill && s.level >= 80)
          );
        });

        skillCoverage[project.id] = {
          covered: Object.values(coverage).filter(Boolean).length,
          total: Object.values(coverage).length,
          percentage:
            (Object.values(coverage).filter(Boolean).length /
              Object.values(coverage).length) *
            100,
        };
      });

      // Get goal recommendations
      const goalRecommender = new GoalRecommender(employeeData);
      const recommendedGoals = {};
      employeeData.forEach((employee) => {
        recommendedGoals[employee.id] = goalRecommender.recommendGoals(
          employee.id,
          3
        );
      });

      // Generate insights
      setInsightsData({
        promotionCandidates,
        trainingNeeds,
        performanceScores,
        projectAssignments,
        skillCoverage,
        recommendedGoals,

        // Department analysis
        departmentPerformance:
          calculateDepartmentPerformance(performanceScores),
        skillGaps: identifySkillGaps(),

        // Custom insights
        topPerformers: findTopPerformers(performanceScores, 3),
        riskFactors: identifyRiskFactors(trainingNeeds, performanceScores),
        teamBalance: analyzeTeamBalance(),
      });

      setIsLoading(false);
    }, 1000);
  }, []);

  // Calculate department average performance
  const calculateDepartmentPerformance = (performanceScores) => {
    const deptScores = {};
    const deptCounts = {};

    employeeData.forEach((employee) => {
      const dept = employee.department;
      const score = performanceScores[employee.id];

      if (!deptScores[dept]) {
        deptScores[dept] = 0;
        deptCounts[dept] = 0;
      }

      deptScores[dept] += score;
      deptCounts[dept]++;
    });

    const result = {};
    Object.keys(deptScores).forEach((dept) => {
      result[dept] = {
        average: deptScores[dept] / deptCounts[dept],
        count: deptCounts[dept],
      };
    });

    return result;
  };

  // Identify skill gaps in the organization
  const identifySkillGaps = () => {
    // Collect all required skills from projects
    const requiredSkills = new Set();
    projectData.forEach((project) => {
      project.requiredSkills.forEach((skill) => requiredSkills.add(skill));
    });

    // Check coverage of each skill
    const skillGaps = {};
    requiredSkills.forEach((skill) => {
      const employeesWithSkill = employeeData.filter((emp) =>
        emp.skills.some((s) => s.name === skill && s.level >= 80)
      );

      skillGaps[skill] = {
        count: employeesWithSkill.length,
        coverage:
          employeesWithSkill.length > 0
            ? (employeesWithSkill.length / employeeData.length) * 100
            : 0,
        risk:
          employeesWithSkill.length <= 1
            ? "high"
            : employeesWithSkill.length <= 3
            ? "medium"
            : "low",
      };
    });

    return skillGaps;
  };

  // Find top performers
  const findTopPerformers = (performanceScores, count) => {
    return Object.entries(performanceScores)
      .map(([id, score]) => ({
        id: parseInt(id),
        score,
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, count)
      .map((entry) => ({
        ...entry,
        employee: employeeData.find((e) => e.id === entry.id),
      }));
  };

  // Identify risk factors
  const identifyRiskFactors = (trainingNeeds, performanceScores) => {
    const risks = [];

    // Check for employees with multiple training needs
    employeeData.forEach((employee) => {
      const training = trainingNeeds[employee.id];
      const performanceScore = performanceScores[employee.id];

      if (training.needsTraining && training.areas.length >= 3) {
        risks.push({
          type: "training",
          employee,
          details: `Needs training in ${
            training.areas.length
          } areas: ${training.areas.join(", ")}`,
        });
      }

      if (performanceScore < 75) {
        risks.push({
          type: "performance",
          employee,
          details: `Low performance score: ${performanceScore.toFixed(1)}%`,
        });
      }
    });

    // Check for skill gaps in the organization
    const skillGaps = identifySkillGaps();
    Object.entries(skillGaps)
      .filter(([_, data]) => data.risk === "high")
      .forEach(([skill, data]) => {
        risks.push({
          type: "skill",
          details: `Critical skill gap: ${skill} (only ${data.count} qualified employees)`,
        });
      });

    return risks;
  };

  // Analyze team balance
  const analyzeTeamBalance = () => {
    const departments = {};
    employeeData.forEach((employee) => {
      const dept = employee.department;
      if (!departments[dept]) {
        departments[dept] = {
          count: 0,
          roles: {},
          skills: {},
        };
      }

      departments[dept].count++;

      // Count roles
      const role = employee.role;
      departments[dept].roles[role] = (departments[dept].roles[role] || 0) + 1;

      // Count skills
      employee.skills.forEach((skill) => {
        if (skill.level >= 80) {
          departments[dept].skills[skill.name] =
            (departments[dept].skills[skill.name] || 0) + 1;
        }
      });
    });

    return departments;
  };

  return (
    <div className="min-h-screen bg-background">
      <SideNav />
      <Header />

      <main className="ml-64 pt-20 p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">AI Insights</h1>
          <p className="text-muted-foreground">
            Advanced analytics and insights powered by First Order Logic, CSP,
            and Heuristic Backtracking.
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <BrainCircuit className="h-16 w-16 text-primary/20 mx-auto mb-4 animate-pulse" />
              <p className="text-lg text-muted-foreground">
                Generating AI insights...
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Network className="h-5 w-5 mr-2 text-blue-500" />
                    Algorithm Overview
                  </CardTitle>
                  <CardDescription>
                    How AI is evaluating employee performance
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">
                      First Order Logic (FOL)
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Used for evaluating employees against defined rules and
                      criteria, such as promotion readiness and training needs.
                    </p>
                    <div className="bg-muted rounded-md p-3 text-xs overflow-x-auto">
                      <pre>{`// Promotion candidate rule
isPromotionCandidate(employee) :-
  isHighPerformer(employee) AND
  hasImprovedOverTime(employee) AND
  isReliable(employee).`}</pre>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">
                      Constraint Satisfaction Problem (CSP)
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Applied to optimally assign employees to projects based on
                      skills, while satisfying multiple constraints.
                    </p>
                    <div className="bg-muted rounded-md p-3 text-xs overflow-x-auto">
                      <pre>{`// Example constraints
1. Employee must have at least one required skill
2. No more than 2 employees from same department on a project
3. Maximize overall skill coverage and team efficiency`}</pre>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Heuristic Backtracking</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Used to recommend optimal development goals for each
                      employee based on their current skills and metrics.
                    </p>
                    <div className="bg-muted rounded-md p-3 text-xs overflow-x-auto">
                      <pre>{`// Goal value calculation
goalValue = improvementValue * (100 - currentMetric) / 100
// Adjust for priority
if (priority === "High") goalValue *= 1.5
else if (priority === "Low") goalValue *= 0.7`}</pre>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Layers className="h-5 w-5 mr-2 text-indigo-500" />
                    Organization Overview
                  </CardTitle>
                  <CardDescription>Key metrics and insights</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-muted/30 p-4 rounded-md">
                      <p className="text-sm text-muted-foreground">
                        Departments
                      </p>
                      <p className="text-2xl font-bold">
                        {Object.keys(insightsData.departmentPerformance).length}
                      </p>
                    </div>
                    <div className="bg-muted/30 p-4 rounded-md">
                      <p className="text-sm text-muted-foreground">Employees</p>
                      <p className="text-2xl font-bold">
                        {employeeData.length}
                      </p>
                    </div>
                    <div className="bg-muted/30 p-4 rounded-md">
                      <p className="text-sm text-muted-foreground">Projects</p>
                      <p className="text-2xl font-bold">{projectData.length}</p>
                    </div>
                    <div className="bg-muted/30 p-4 rounded-md">
                      <p className="text-sm text-muted-foreground">
                        Avg. Performance
                      </p>
                      <p className="text-2xl font-bold">
                        {(
                          Object.values(insightsData.performanceScores).reduce(
                            (sum, val) => sum + val,
                            0
                          ) /
                          Object.values(insightsData.performanceScores).length
                        ).toFixed(1)}
                        %
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">
                        Department Performance
                      </h3>
                      <div className="space-y-2">
                        {Object.entries(insightsData.departmentPerformance).map(
                          ([dept, data]) => (
                            <div
                              key={dept}
                              className="flex items-center justify-between text-sm"
                            >
                              <span>
                                {dept} ({data.count})
                              </span>
                              <div className="flex items-center">
                                <span className="font-medium mr-2">
                                  {data.average.toFixed(1)}%
                                </span>
                                <div className="h-2 w-16 bg-secondary rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-primary"
                                    style={{ width: `${data.average}%` }}
                                  />
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Critical Skill Gaps</h3>
                      <div className="space-y-2">
                        {Object.entries(insightsData.skillGaps)
                          .filter(([_, data]) => data.risk === "high")
                          .map(([skill, data]) => (
                            <div
                              key={skill}
                              className="flex items-center justify-between text-sm p-2 bg-red-50 border border-red-100 rounded-md"
                            >
                              <span className="text-black">{skill}</span>
                              <Badge variant="destructive">
                                Only {data.count} qualified
                              </Badge>
                            </div>
                          ))}

                        {Object.entries(insightsData.skillGaps).filter(
                          ([_, data]) => data.risk === "high"
                        ).length === 0 && (
                          <p className="text-sm text-muted-foreground">
                            No critical skill gaps detected.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="h-5 w-5 mr-2 text-green-500" />
                    Top Performers
                  </CardTitle>
                  <CardDescription>
                    Highest performing employees
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {insightsData.topPerformers.map((entry, index) => (
                      <div
                        key={entry.id}
                        className="flex items-start p-3 border rounded-md"
                      >
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary text-sm font-bold mr-3">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{entry.employee.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {entry.employee.role}
                          </p>
                          <div className="flex items-center mt-1">
                            <div className="h-1.5 w-16 bg-secondary rounded-full overflow-hidden mr-2">
                              <div
                                className="h-full bg-green-500"
                                style={{ width: `${entry.score}%` }}
                              />
                            </div>
                            <span className="text-xs font-medium">
                              {entry.score.toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Workflow className="h-5 w-5 mr-2 text-indigo-500" />
                    Project Allocation
                  </CardTitle>
                  <CardDescription>CSP-optimized assignments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {projectData.map((project) => {
                      const coverage = insightsData.skillCoverage[project.id];

                      return (
                        <div key={project.id} className="p-3 border rounded-md">
                          <p className="font-medium mb-1">{project.name}</p>
                          <div className="flex items-center text-xs mb-2">
                            <div className="h-1.5 w-12 bg-secondary rounded-full overflow-hidden mr-2">
                              <div
                                className={`h-full ${
                                  coverage.percentage === 100
                                    ? "bg-green-500"
                                    : "bg-amber-500"
                                }`}
                                style={{ width: `${coverage.percentage}%` }}
                              />
                            </div>
                            <span>
                              {coverage.covered}/{coverage.total} skills covered
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {project.requiredSkills.map((skill) => (
                              <Badge
                                key={skill}
                                variant="outline"
                                className="text-xs"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
                    Risk Factors
                  </CardTitle>
                  <CardDescription>Areas requiring attention</CardDescription>
                </CardHeader>
                <CardContent>
                  {insightsData.riskFactors.length > 0 ? (
                    <div className="space-y-3">
                      {insightsData.riskFactors.map((risk, index) => (
                        <div
                          key={index}
                          className="p-3 border border-amber-200 bg-amber-50 rounded-md"
                        >
                          {risk.employee ? (
                            <div>
                              <p className="font-medium text-amber-800">
                                {risk.employee.name}
                              </p>
                              <p className="text-sm text-amber-700">
                                {risk.details}
                              </p>
                            </div>
                          ) : (
                            <p className="text-sm text-amber-800">
                              {risk.details}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-6 text-center">
                      <AlertTriangle className="h-10 w-10 text-muted-foreground mb-3 opacity-20" />
                      <p className="text-muted-foreground">
                        No significant risk factors detected.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Team Balance Analysis</CardTitle>
                <CardDescription>
                  Department skill distribution and coverage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(insightsData.teamBalance).map(
                    ([dept, data]) => (
                      <div key={dept} className="border rounded-md p-4">
                        <h3 className="font-medium mb-3">
                          {dept} ({data.count} employees)
                        </h3>

                        <div className="mb-4">
                          <h4 className="text-sm font-medium mb-2">Roles</h4>
                          <div className="space-y-1">
                            {Object.entries(data.roles).map(([role, count]) => (
                              <div
                                key={role}
                                className="flex justify-between text-sm"
                              >
                                <span>{role}</span>
                                <span className="font-medium">{count}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium mb-2">
                            Top Skills
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {Object.entries(data.skills)
                              .sort((a, b) => b[1] - a[1])
                              .slice(0, 5)
                              .map(([skill, count]) => (
                                <Badge
                                  key={skill}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {skill} ({count})
                                </Badge>
                              ))}
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </main>
    </div>
  );
}
