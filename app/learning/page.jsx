"use client";

import { useState } from "react";
import { SideNav } from "@/components/dashboard/SideNav";
import { Header } from "@/components/dashboard/Header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  BookOpen,
  Code,
  FileText,
  Puzzle,
  Network,
  ArrowRight,
} from "lucide-react";

export default function LearningPage() {
  return (
    <div className="min-h-screen bg-background">
      <SideNav />
      <Header />

      <main className="ml-64 pt-16 p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Learning Center</h1>
          <p className="text-muted-foreground">
            Understanding AI algorithms used in this dashboard.
          </p>
        </div>

        <Tabs defaultValue="fol">
          <TabsList className="mb-6">
            <TabsTrigger value="fol">First Order Logic</TabsTrigger>
            <TabsTrigger value="csp">Constraint Satisfaction</TabsTrigger>
            <TabsTrigger value="heuristic">Heuristic Backtracking</TabsTrigger>
          </TabsList>

          <TabsContent value="fol">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-blue-500" />
                    What is First Order Logic?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    First Order Logic (FOL) is a formal system for reasoning
                    that extends propositional logic with variables, predicates,
                    and quantifiers. It allows us to express complex rules and
                    relationships between entities.
                  </p>
                  <p className="text-sm text-muted-foreground mt-4">
                    In this dashboard, FOL is used to define and evaluate rules
                    for employee performance assessment, such as determining
                    promotion eligibility, training needs, and overall
                    performance scores.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Puzzle className="h-5 w-5 mr-2 text-indigo-500" />
                    Key Components
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-start">
                      <span className="font-bold mr-2">•</span>
                      <div>
                        <span className="font-medium text-foreground">
                          Predicates:
                        </span>{" "}
                        Functions that evaluate to true or false (e.g.,
                        isHighPerformer, hasImprovedOverTime)
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold mr-2">•</span>
                      <div>
                        <span className="font-medium text-foreground">
                          Rules:
                        </span>{" "}
                        Logical combinations of predicates (e.g.,
                        isPromotionCandidate = isHighPerformer AND
                        hasImprovedOverTime AND isReliable)
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold mr-2">•</span>
                      <div>
                        <span className="font-medium text-foreground">
                          Evaluation:
                        </span>{" "}
                        Process of determining the truth value of rules based on
                        data
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Code className="h-5 w-5 mr-2 text-green-500" />
                    Implementation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Our implementation uses a class-based approach with methods
                    representing predicates and rules:
                  </p>
                  <div className="bg-muted rounded-md p-3 text-xs overflow-x-auto">
                    <pre>{`class FOLEvaluator {
  // Predicates
  isHighPerformer(employee) {
    const avgMetric = getAverageMetrics(employee);
    return avgMetric >= 85;
  }
  
  // Rules
  isPromotionCandidate(employee) {
    return this.isHighPerformer(employee) && 
           this.hasImprovedOverTime(employee) && 
           this.isReliable(employee);
  }
}`}</pre>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>
                  Practical Application in Employee Evaluation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Problem Definition</h3>
                    <p className="text-sm text-muted-foreground">
                      In employee performance evaluation, we need to assess
                      employees based on multiple criteria and make decisions
                      like promotion eligibility or training needs. FOL provides
                      a structured way to define these criteria as logical
                      rules.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Rule-Based Evaluation</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Example: Determining if an employee is a promotion
                      candidate
                    </p>
                    <div className="bg-muted rounded-md p-4">
                      <p className="font-medium mb-2">Premise:</p>
                      <ul className="list-disc list-inside text-sm space-y-1 mb-4">
                        <li>
                          An employee is a high performer if their average
                          metrics are ≥ 85%
                        </li>
                        <li>
                          An employee has improved over time if their latest
                          review score "-" first review score
                        </li>
                        <li>
                          An employee is reliable if ≥ 75% of their projects
                          were completed on time
                        </li>
                      </ul>

                      <p className="font-medium mb-2">Rule:</p>
                      <div className="bg-background rounded-md p-3">
                        <p className="text-sm">
                          isPromotionCandidate(employee) ⟺
                          isHighPerformer(employee) ∧
                          hasImprovedOverTime(employee) ∧ isReliable(employee)
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">
                      Benefits in the Dashboard
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 border rounded-md">
                        <h4 className="font-medium text-sm mb-2">Clarity</h4>
                        <p className="text-sm text-muted-foreground">
                          Rules are explicitly defined and easy to understand,
                          making the evaluation process transparent.
                        </p>
                      </div>
                      <div className="p-4 border rounded-md">
                        <h4 className="font-medium text-sm mb-2">
                          Consistency
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          All employees are evaluated against the same
                          standardized criteria.
                        </p>
                      </div>
                      <div className="p-4 border rounded-md">
                        <h4 className="font-medium text-sm mb-2">
                          Extensibility
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          New rules can be added without changing the existing
                          evaluation framework.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="csp">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-blue-500" />
                    What is a Constraint Satisfaction Problem?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    A Constraint Satisfaction Problem (CSP) is a mathematical
                    problem where we need to find states or objects that satisfy
                    a set of constraints or limitations. It involves variables
                    that need to be assigned values from their domains while
                    satisfying all constraints.
                  </p>
                  <p className="text-sm text-muted-foreground mt-4">
                    In this dashboard, CSP is used for optimal project
                    assignment, matching employees to projects based on their
                    skills while satisfying multiple constraints like skill
                    requirements and team balance.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Puzzle className="h-5 w-5 mr-2 text-indigo-500" />
                    Key Components
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-start">
                      <span className="font-bold mr-2">•</span>
                      <div>
                        <span className="font-medium text-foreground">
                          Variables:
                        </span>{" "}
                        Entities that need to be assigned values (employees in
                        our case)
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold mr-2">•</span>
                      <div>
                        <span className="font-medium text-foreground">
                          Domains:
                        </span>{" "}
                        Possible values for each variable (projects in our case)
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold mr-2">•</span>
                      <div>
                        <span className="font-medium text-foreground">
                          Constraints:
                        </span>{" "}
                        Rules that limit valid assignments (e.g., skill
                        requirements, department balance)
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold mr-2">•</span>
                      <div>
                        <span className="font-medium text-foreground">
                          Solution:
                        </span>{" "}
                        Assignment of values to variables that satisfies all
                        constraints
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Code className="h-5 w-5 mr-2 text-green-500" />
                    Implementation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Our implementation uses a solver with constraint validation:
                  </p>
                  <div className="bg-muted rounded-md p-3 text-xs overflow-x-auto">
                    <pre>{`class CSPSolver {
  // Check if an assignment satisfies constraints
  isValid(employee, project, assignments) {
    for (const constraint of this.constraints) {
      if (!constraint(employee, project, assignments)) {
        return false;
      }
    }
    return true;
  }
  
  // Find optimal assignment
  solve() {
    // Algorithm to find valid assignments
    // that maximize skill matching
  }
}`}</pre>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>
                  Practical Application in Project Assignment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Problem Definition</h3>
                    <p className="text-sm text-muted-foreground">
                      In a team environment, we need to assign employees to
                      projects in an optimal way. Each project has specific
                      skill requirements, and each employee has a set of skills
                      at different proficiency levels. The challenge is to find
                      assignments that satisfy all constraints while maximizing
                      overall team effectiveness.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Constraint Definition</h3>
                    <div className="bg-muted rounded-md p-4">
                      <p className="font-medium mb-2">Variables and Domains:</p>
                      <ul className="list-disc list-inside text-sm space-y-1 mb-4">
                        <li>
                          Variables: Employees (e.g., Jane, Michael, Emily,
                          etc.)
                        </li>
                        <li>
                          Domains: Projects (e.g., Customer Portal, Internal
                          Tools, Mobile App, etc.)
                        </li>
                      </ul>

                      <p className="font-medium mb-2">Constraints:</p>
                      <ul className="list-disc list-inside text-sm space-y-1">
                        <li>
                          An employee must have at least one of the required
                          skills for a project at proficiency ≥ 80%
                        </li>
                        <li>
                          No more than 2 employees from the same department on a
                          project
                        </li>
                        <li>
                          Each employee can be assigned to at most one project
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Solution Approach</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      The dashboard uses a greedy approach with heuristics:
                    </p>
                    <ol className="list-decimal list-inside text-sm space-y-2 mb-4">
                      <li>
                        Calculate a skill match score between each employee and
                        project
                      </li>
                      <li>
                        Sort potential assignments by score (highest first)
                      </li>
                      <li>
                        Assign employees to projects, checking constraints at
                        each step
                      </li>
                      <li>Backtrack if necessary to find valid assignments</li>
                    </ol>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border rounded-md">
                        <h4 className="font-medium text-sm mb-2">Benefits</h4>
                        <ul className="list-disc list-inside text-sm space-y-1">
                          <li>Optimal skill utilization</li>
                          <li>Balanced teams across departments</li>
                          <li>Maximized project success probability</li>
                        </ul>
                      </div>
                      <div className="p-4 border rounded-md">
                        <h4 className="font-medium text-sm mb-2">Challenges</h4>
                        <ul className="list-disc list-inside text-sm space-y-1">
                          <li>Potentially large search space</li>
                          <li>Multiple valid solutions</li>
                          <li>
                            Need for heuristics to find good solutions quickly
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="heuristic">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-blue-500" />
                    What is Heuristic Backtracking?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Heuristic Backtracking is a problem-solving approach that
                    combines backtracking (a systematic way to explore all
                    possible solutions) with heuristics (informed strategies
                    that help guide the search toward promising solutions more
                    quickly).
                  </p>
                  <p className="text-sm text-muted-foreground mt-4">
                    In this dashboard, heuristic backtracking is used to
                    recommend optimal development goals for employees based on
                    their current skills, performance metrics, and potential for
                    improvement.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Puzzle className="h-5 w-5 mr-2 text-indigo-500" />
                    Key Components
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-start">
                      <span className="font-bold mr-2">•</span>
                      <div>
                        <span className="font-medium text-foreground">
                          Backtracking:
                        </span>{" "}
                        Exploring solutions space systematically, abandoning
                        paths that don't lead to valid solutions
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold mr-2">•</span>
                      <div>
                        <span className="font-medium text-foreground">
                          Heuristics:
                        </span>{" "}
                        Rules of thumb that guide the search toward better
                        solutions (e.g., goal value calculations)
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold mr-2">•</span>
                      <div>
                        <span className="font-medium text-foreground">
                          State evaluation:
                        </span>{" "}
                        Assessing the quality of potential solutions (e.g., how
                        valuable a goal is for an employee)
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Code className="h-5 w-5 mr-2 text-green-500" />
                    Implementation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Our implementation focuses on evaluating potential goals and
                    selecting the best ones:
                  </p>
                  <div className="bg-muted rounded-md p-3 text-xs overflow-x-auto">
                    <pre>{`class GoalRecommender {
  // Generate potential goals
  generatePotentialGoals(employee) {
    // Return list of potential goals
    // excluding those already assigned
  }
  
  // Calculate goal value (heuristic)
  calculateGoalValue(goal, employee) {
    // Evaluate how valuable a goal is
    // based on employee metrics and needs
  }
  
  // Recommend best goals
  recommendGoals(employeeId, maxGoals) {
    // Find top N most valuable goals
  }
}`}</pre>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>
                  Practical Application in Goal Recommendation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Problem Definition</h3>
                    <p className="text-sm text-muted-foreground">
                      Employees need targeted development goals to improve their
                      skills and performance. With many possible development
                      areas and limited time, we need to recommend the most
                      valuable goals for each employee based on their current
                      metrics, skills, and potential for improvement.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Heuristic Approach</h3>
                    <div className="bg-muted rounded-md p-4">
                      <p className="font-medium mb-2">
                        Goal Value Calculation:
                      </p>
                      <p className="text-sm mb-4">
                        For each potential goal, we calculate a value based on:
                      </p>
                      <ol className="list-decimal list-inside text-sm space-y-1 mb-4">
                        <li>
                          The improvement potential (gap between current metrics
                          and 100%)
                        </li>
                        <li>
                          The importance of the targeted area (weighted by
                          improvement value)
                        </li>
                        <li>
                          The goal priority (high, medium, low - with
                          multipliers)
                        </li>
                      </ol>

                      <p className="font-medium mb-2">Formula:</p>
                      <div className="bg-background rounded-md p-3">
                        <p className="text-sm">
                          value = improvementValue × (100 - currentMetric) / 100
                        </p>
                        <p className="text-sm mt-2">
                          Adjusted for priority: high (×1.5), medium (×1.0), low
                          (×0.7)
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Example Scenario</h3>
                    <div className="p-4 border rounded-md">
                      <p className="font-medium mb-2">Employee: Jane Smith</p>
                      <p className="text-sm mb-3">Current metrics:</p>
                      <ul className="list-disc list-inside text-sm space-y-1 mb-4">
                        <li>Communication: 78%</li>
                        <li>Leadership: 83%</li>
                        <li>Problem Solving: 88%</li>
                      </ul>

                      <p className="text-sm mb-3">
                        Potential goals and calculated values:
                      </p>
                      <ol className="list-decimal list-inside text-sm space-y-1">
                        <li>
                          <strong>Improve communication skills</strong> (Medium
                          priority)
                          <br />
                          Value = 30 × (100 - 78) / 100 = 6.6
                        </li>
                        <li>
                          <strong>Develop leadership skills</strong> (Medium
                          priority)
                          <br />
                          Value = 35 × (100 - 83) / 100 = 5.95
                        </li>
                        <li>
                          <strong>Enhance problem-solving skills</strong> (High
                          priority)
                          <br />
                          Value = 30 × (100 - 88) / 100 × 1.5 = 5.4
                        </li>
                      </ol>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">
                      Benefits in the Dashboard
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 border rounded-md">
                        <h4 className="font-medium text-sm mb-2">
                          Personalization
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Goals are tailored to each employee's specific needs
                          and improvement areas.
                        </p>
                      </div>
                      <div className="p-4 border rounded-md">
                        <h4 className="font-medium text-sm mb-2">Efficiency</h4>
                        <p className="text-sm text-muted-foreground">
                          Focuses on high-impact goals with the greatest
                          potential for improvement.
                        </p>
                      </div>
                      <div className="p-4 border rounded-md">
                        <h4 className="font-medium text-sm mb-2">
                          Adaptability
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Recommendations evolve as employees complete goals and
                          metrics change.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 text-center">
          <Button variant="outline" size="lg" className="mx-auto">
            <Network className="h-4 w-4 mr-2" />
            <span>Explore Advanced Topics</span>
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </main>
    </div>
  );
}
