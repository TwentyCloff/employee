"use client";

import { Header } from "@/components/dashboard/Header";
import { SideNav } from "@/components/dashboard/SideNav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FOLEvaluator } from "@/lib/algorithms/fol-evaluator";
import { GoalRecommender } from "@/lib/algorithms/goal-recommender";
import { employeeData } from "@/lib/data";
import {
    AlertCircle,
    CheckCircle,
    Clock,
    Lightbulb,
    School
} from "lucide-react";
import { useEffect, useState } from "react";

export default function RecommendationsPage() {
  const [promotionCandidates, setPromotionCandidates] = useState({});
  const [trainingNeeds, setTrainingNeeds] = useState({});
  const [recommendedGoals, setRecommendedGoals] = useState({});

  useEffect(() => {
    const folEvaluator = new FOLEvaluator(employeeData);
    setPromotionCandidates(folEvaluator.evaluateRule("isPromotionCandidate"));

    const trainingResults = {};
    employeeData.forEach((employee) => {
      trainingResults[employee.id] = folEvaluator.needsTraining(employee);
    });
    setTrainingNeeds(trainingResults);

    const goalRecommender = new GoalRecommender(employeeData);
    const goals = {};
    employeeData.forEach((employee) => {
      goals[employee.id] = goalRecommender.recommendGoals(employee.id, 3);
    });
    setRecommendedGoals(goals);
  }, []);

  const statusIcons = {
    Completed: { icon: CheckCircle, color: "text-green-500" },
    "In Progress": { icon: Clock, color: "text-yellow-500" },
    "Not Started": { icon: AlertCircle, color: "text-red-500" },
  };

  const priorityColors = {
    High: "destructive",
    Medium: "warning",
    Low: "info",
  };

  return (
    <div className="min-h-screen bg-background">
      <SideNav />
      <Header />

      <main className="ml-64 pt-16 p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">AI Recommendations</h1>
          <p className="text-muted-foreground">
            Data-driven insights and recommendations for team optimization.
          </p>
        </div>

        <Tabs defaultValue="goals">
          <TabsList className="mb-6">
            <TabsTrigger value="goals">Development Goals</TabsTrigger>
            <TabsTrigger value="promotions">Promotion Candidates</TabsTrigger>
            <TabsTrigger value="training">Training Needs</TabsTrigger>
          </TabsList>

          <TabsContent value="goals">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {employeeData.map((employee) => {
                const goals = recommendedGoals[employee.id] || [];

                return (
                  <Card key={employee.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center">
                        <Lightbulb className="h-5 w-5 mr-2 text-blue-500" />
                        {employee.name}
                      </CardTitle>
                      <CardDescription>{employee.role}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="text-sm">
                          <p className="mb-2 font-medium">Current Goals:</p>
                          <ul className="space-y-2">
                            {employee.goals.map((goal) => {
                              const StatusIcon = statusIcons[goal.status].icon;

                              return (
                                <li
                                  key={goal.id}
                                  className="flex items-center justify-between p-2 border rounded-md"
                                >
                                  <div className="flex items-center">
                                    <StatusIcon
                                      className={`h-4 w-4 mr-2 ${
                                        statusIcons[goal.status].color
                                      }`}
                                    />
                                    <span>{goal.description}</span>
                                  </div>
                                  <Badge
                                    variant={priorityColors[goal.priority]}
                                  >
                                    {goal.priority}
                                  </Badge>
                                </li>
                              );
                            })}
                          </ul>
                        </div>

                        <div className="text-sm">
                          <p className="mb-2 font-medium">Recommended Goals:</p>
                          {goals.length > 0 ? (
                            <ul className="space-y-2">
                              {goals.map((goal) => (
                                <li
                                  key={goal.id}
                                  className="flex items-center justify-between p-2 border rounded-md"
                                >
                                  <div className="flex items-center">
                                    <AlertCircle className="h-4 w-4 mr-2 text-blue-500" />
                                    <span>{goal.description}</span>
                                  </div>
                                  <Badge
                                    variant={priorityColors[goal.priority]}
                                  >
                                    {goal.priority}
                                  </Badge>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <>
                              <p className="text-muted-foreground">
                                No promotion candidates identified at this time.
                              </p>
                              <p className="text-sm max-w-md mt-2">
                                Employees need to meet all criteria: high
                                performance, improvement over time, and project
                                reliability.
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Promotion Criteria Card */}
            <Card>
              <CardHeader>
                <CardTitle>Promotion Criteria</CardTitle>
                <CardDescription>
                  How promotion candidates are identified
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">High Performance</h3>
                    <p className="text-sm text-muted-foreground">
                      Employee must maintain an average performance score of 85%
                      or higher across all metrics.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Improvement Over Time</h3>
                    <p className="text-sm text-muted-foreground">
                      Employee must show improvement in review scores between
                      their first and most recent performance review.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Project Reliability</h3>
                    <p className="text-sm text-muted-foreground">
                      Employee must complete at least 75% of their projects on
                      time.
                    </p>
                  </div>

                  <div className="pt-4 border-t">
                    <h3 className="font-medium mb-2">
                      First Order Logic Implementation
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      This dashboard uses First Order Logic to evaluate if an
                      employee is a promotion candidate:
                    </p>
                    <pre className="text-xs bg-muted p-3 rounded-md mt-2 overflow-x-auto">
                      {`isPromotionCandidate(employee) :-
  isHighPerformer(employee) AND
  hasImprovedOverTime(employee) AND
  isReliable(employee).`}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="training">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {employeeData.map((employee) => {
                const training = trainingNeeds[employee.id] || {
                  needsTraining: false,
                  areas: [],
                };

                return (
                  <Card
                    key={employee.id}
                    className={
                      training.needsTraining
                        ? "border-amber-200 shadow-amber-100/20"
                        : ""
                    }
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center">
                        <School
                          className={`h-5 w-5 mr-2 ${
                            training.needsTraining
                              ? "text-amber-500"
                              : "text-green-500"
                          }`}
                        />
                        {employee.name}
                      </CardTitle>
                      <CardDescription>{employee.role}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {training.needsTraining ? (
                        <div>
                          <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
                            <p className="text-sm font-medium text-amber-800">
                              Training recommended in the following areas:
                            </p>
                          </div>
                          <ul className="space-y-2">
                            {training.areas.map((area) => (
                              <li
                                key={area}
                                className="flex items-center p-2 border rounded-md"
                              >
                                <AlertCircle className="h-4 w-4 mr-2 text-amber-500" />
                                <span className="text-sm capitalize">
                                  {area.replace(/([A-Z])/g, " $1").trim()}
                                </span>
                              </li>
                            ))}
                          </ul>
                          <div className="mt-4">
                            <Button
                              size="sm"
                              className="w-full"
                              variant="outline"
                            >
                              Schedule Training
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
                            <p className="text-sm font-medium text-green-800">
                              No training needs identified at this time.
                            </p>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            All performance metrics are above the 80% threshold.
                            Continue to monitor performance.
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
