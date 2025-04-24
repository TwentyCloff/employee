"use client";
import { AIInsightCard } from "@/components/dashboard/AIInsightCard";
import { EmployeeList } from "@/components/dashboard/EmployeeList";
import { Header } from "@/components/dashboard/Header";
import { ProjectAssignmentCard } from "@/components/dashboard/ProjectAssignmentCard";
import { SideNav } from "@/components/dashboard/SideNav";
import { Badge } from "@/components/ui/badge";
import { CSPSolver } from '@/lib/algorithms/csp-solver';
import { FOLEvaluator } from '@/lib/algorithms/fol-evaluator';
import { employeeData, projectData } from '@/lib/data';
import { useEffect, useState } from "react";

export default function Page() {
  const [promotionCandidates, setPromotionCandidates] = useState({});
  const [trainingNeeds, setTrainingNeeds] = useState<Record<string, { needsTraining: boolean; areas: string[] }>>({});
  const [performanceScores, setPerformanceScores] = useState({});
  const [projectAssignments, setProjectAssignments] = useState({});

  useEffect(() => {
    // Apply First Order Logic to evaluate employees
    const folEvaluator = new FOLEvaluator(employeeData);
    setPromotionCandidates(folEvaluator.evaluateRule('isPromotionCandidate'));

    // Get training needs
    const trainingResults: any = {};
    employeeData.forEach(employee => {
      trainingResults[employee.id] = folEvaluator.needsTraining(employee);
    });
    setTrainingNeeds(trainingResults);

    // Calculate performance scores
    setPerformanceScores(folEvaluator.calculatePerformanceScores());

    // Apply CSP to assign employees to projects
    const cspSolver = new CSPSolver(employeeData, projectData);
    setProjectAssignments(cspSolver.solve());
  }, []);

  // Count employees by department
  const departmentCounts = employeeData.reduce((counts: Record<string, number>, employee) => {
    counts[employee.department] = (counts[employee.department] || 0) + 1;
    return counts;
  }, {} as Record<string, number>);
  return (
    <div className="flex flex-col h-full">
      <SideNav />
      <Header />
      {/* <div className="border-b border-border border-dashed sticky top-0 bg-site-background/80 backdrop-blur-md z-50">
        <div className="px-4 py-2 max-w-screen-xl w-full mx-auto border-border border-dashed xl:border-x">
          <div className="flex items-center gap-4 justify-between h-8">
            <Link
              href="/"
              className="inline-flex items-center gap-1 font-medium font-mono tracking-tight text-sm"
            >
              <span>Employee Performance Evaluation</span>
              <span className="text-xl text-border">/</span>
              <span>ai mini project</span>
            </Link>
            <div className="flex items-center">
              <Button variant="ghost" size="icon" asChild>
                <Link
                  target="_blank"
                  href="https://github.com/Lokendrakushwah12/employee-performance-evaluation"
                >
                  <GithubIcon className="size-5" />
                </Link>
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div> */}
      <div className="ml-64 pt-20 p-6">
        <div className="flex flex-col gap-8 w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <AIInsightCard
              type="promotion"
              title="Promotion Candidates"
              description="Employees who are ready for advancement"
              data={
                <div className="mt-4">
                  {Object.entries(promotionCandidates).filter(([_, value]) => value).length > 0 ? (
                    <ul className="space-y-2">
                      {Object.entries(promotionCandidates)
                        .filter(([_, value]) => value)
                        .map(([employeeId]) => {
                          const employee = employeeData.find(e => e.id === parseInt(employeeId));
                          return employee ? (
                            <li key={employeeId} className="flex items-center space-x-2 text-sm">
                              <span className="h-2 w-2 rounded-full bg-green-500" />
                              <span>{employee.name} ({employee.role})</span>
                            </li>
                          ) : null;
                        })}
                    </ul>
                  ) : (
                    <p className="text-sm">No promotion candidates identified at this time.</p>
                  )}
                </div>
              }
            />
            <AIInsightCard
              type="training"
              title="Training Needs"
              description="Areas where employees need development"
              data={
                <div className="mt-4">
                  {Object.entries(trainingNeeds).filter(([_, value]) => (value as { needsTraining: boolean }).needsTraining).length > 0 ? (
                    <ul className="space-y-2">
                      {Object.entries(trainingNeeds)
                        .filter(([_, value]) => value.needsTraining)
                        .map(([employeeId, data]) => {
                          const employee = employeeData.find(e => e.id === parseInt(employeeId));
                          return employee ? (
                            <li key={employeeId} className="text-sm">
                              <span className="font-medium">{employee.name}:</span> {data.areas.map(area => area.replace(/([A-Z])/g, ' $1').trim()).join(', ')}
                            </li>
                          ) : null;
                        })}
                    </ul>
                  ) : (
                    <p className="text-sm">No urgent training needs identified.</p>
                  )}
                </div>
              }
            />

            <AIInsightCard
              type="insight"
              title="Department Overview"
              description="Employee distribution by department"
              data={
                <div className="mt-4">
                  <ul className="space-y-2">
                    {Object.entries(departmentCounts).map(([dept, count]) => (
                      <li key={dept} className="flex items-center justify-between text-sm">
                        <span>{dept}</span>
                        <Badge variant="outline">{count} {count === 1 ? 'employee' : 'employees'}</Badge>
                      </li>
                    ))}
                  </ul>
                </div>
              }
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <EmployeeList employees={employeeData} performanceScores={performanceScores} />
            <ProjectAssignmentCard
              assignments={projectAssignments}
              employees={employeeData}
              projects={projectData}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
