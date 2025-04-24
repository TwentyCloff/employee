'use client';

import { useState, useEffect } from 'react';
import { SideNav } from '@/components/dashboard/SideNav';
import { Header } from '@/components/dashboard/Header';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { employeeData } from '@/lib/data';
import { FOLEvaluator } from '@/lib/algorithms/fol-evaluator';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

export default function PerformancePage() {
  const [performanceScores, setPerformanceScores] = useState({});
  const [departmentAverages, setDepartmentAverages] = useState({});
  const [metricAverages, setMetricAverages] = useState({});
  
  useEffect(() => {
    // Calculate performance scores
    const folEvaluator = new FOLEvaluator(employeeData);
    const scores = folEvaluator.calculatePerformanceScores();
    setPerformanceScores(scores);
    
    // Calculate department averages
    const deptAvgs = {};
    const deptCounts = {};
    
    employeeData.forEach(employee => {
      const dept = employee.department;
      const score = scores[employee.id];
      
      if (!deptAvgs[dept]) {
        deptAvgs[dept] = 0;
        deptCounts[dept] = 0;
      }
      
      deptAvgs[dept] += score;
      deptCounts[dept]++;
    });
    
    // Calculate averages
    Object.keys(deptAvgs).forEach(dept => {
      deptAvgs[dept] = deptAvgs[dept] / deptCounts[dept];
    });
    
    setDepartmentAverages(deptAvgs);
    
    // Calculate metric averages
    const metricSums = {};
    const metricCounts = {};
    
    employeeData.forEach(employee => {
      Object.entries(employee.metrics).forEach(([metric, value]) => {
        if (!metricSums[metric]) {
          metricSums[metric] = 0;
          metricCounts[metric] = 0;
        }
        
        metricSums[metric] += value;
        metricCounts[metric]++;
      });
    });
    
    // Calculate averages
    const metricAvgs = {};
    Object.keys(metricSums).forEach(metric => {
      metricAvgs[metric] = metricSums[metric] / metricCounts[metric];
    });
    
    setMetricAverages(metricAvgs);
  }, []);
  
  return (
    <div className="min-h-screen bg-background">
      <SideNav />
      <Header />
      
      <main className="ml-64 pt-20 p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Performance Analysis</h1>
          <p className="text-muted-foreground">Comprehensive evaluation of employee performance metrics.</p>
        </div>
        
        <Tabs defaultValue="individual">
          <TabsList className="mb-6">
            <TabsTrigger value="individual">Individual Performance</TabsTrigger>
            <TabsTrigger value="department">Department Analysis</TabsTrigger>
            <TabsTrigger value="metrics">Metrics Breakdown</TabsTrigger>
          </TabsList>
          
          <TabsContent value="individual">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {employeeData.map(employee => (
                <Card key={employee.id}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{employee.name}</CardTitle>
                    <CardDescription>{employee.role}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">Overall Performance</span>
                          <Badge variant={
                            performanceScores[employee.id] >= 90 ? "success" : 
                            performanceScores[employee.id] >= 80 ? "info" :
                            performanceScores[employee.id] >= 70 ? "warning" :
                            "destructive"
                          }>
                            {performanceScores[employee.id]?.toFixed(1)}%
                          </Badge>
                        </div>
                        <Progress 
                          value={performanceScores[employee.id]} 
                          className="h-2" 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        {Object.entries(employee.metrics).map(([key, value]) => (
                          <div key={key} className="grid grid-cols-5 gap-2 items-center">
                            <span className="col-span-2 text-xs capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                            <Progress value={value} className="col-span-2 h-1" />
                            <span className="text-xs text-right">{value}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="department">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Department Averages</CardTitle>
                  <CardDescription>Average performance scores by department</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(departmentAverages).map(([dept, avg]) => (
                      <div key={dept}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{dept}</span>
                          <span>{avg.toFixed(1)}%</span>
                        </div>
                        <Progress value={avg} className="h-3" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Department Breakdown</CardTitle>
                  <CardDescription>Detailed performance analysis by department</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {Object.keys(departmentAverages).map(dept => {
                      const deptEmployees = employeeData.filter(e => e.department === dept);
                      const topPerformer = [...deptEmployees].sort((a, b) => 
                        performanceScores[b.id] - performanceScores[a.id]
                      )[0];
                      
                      const avgMetrics = {};
                      deptEmployees.forEach(emp => {
                        Object.entries(emp.metrics).forEach(([metric, value]) => {
                          if (!avgMetrics[metric]) {
                            avgMetrics[metric] = { total: 0, count: 0 };
                          }
                          avgMetrics[metric].total += value;
                          avgMetrics[metric].count++;
                        });
                      });
                      
                      // Calculate averages
                      Object.keys(avgMetrics).forEach(metric => {
                        avgMetrics[metric].avg = avgMetrics[metric].total / avgMetrics[metric].count;
                      });
                      
                      // Find strongest and weakest metrics
                      const metricEntries = Object.entries(avgMetrics);
                      const strongestMetric = metricEntries.sort((a, b) => b[1].avg - a[1].avg)[0];
                      const weakestMetric = metricEntries.sort((a, b) => a[1].avg - b[1].avg)[0];
                      
                      return (
                        <div key={dept} className="pb-4 border-b last:border-0">
                          <h3 className="font-medium mb-2">{dept}</h3>
                          <div className="space-y-1 text-sm">
                            <p>Employees: {deptEmployees.length}</p>
                            <p>Top performer: {topPerformer?.name} ({performanceScores[topPerformer?.id]?.toFixed(1)}%)</p>
                            <p>Strongest area: {strongestMetric?.[0]?.replace(/([A-Z])/g, ' $1').trim()} ({strongestMetric?.[1]?.avg.toFixed(1)}%)</p>
                            <p>Area for improvement: {weakestMetric?.[0]?.replace(/([A-Z])/g, ' $1').trim()} ({weakestMetric?.[1]?.avg.toFixed(1)}%)</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="metrics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Overall Metric Performance</CardTitle>
                  <CardDescription>Average scores across all employees</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(metricAverages).map(([metric, avg]) => (
                      <div key={metric}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium capitalize">{metric.replace(/([A-Z])/g, ' $1').trim()}</span>
                          <span>{avg.toFixed(1)}%</span>
                        </div>
                        <Progress 
                          value={avg} 
                          className="h-3"
                          style={{
                            backgroundColor: avg < 80 ? 'rgba(239, 68, 68, 0.2)' : 'rgba(59, 130, 246, 0.2)'
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Metric Distribution</CardTitle>
                  <CardDescription>Employee performance distribution by metric</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {Object.keys(metricAverages).map(metric => {
                      // Calculate distribution of scores for this metric
                      const scores = employeeData.map(emp => emp.metrics[metric]);
                      const ranges = {
                        excellent: scores.filter(s => s >= 90).length,
                        good: scores.filter(s => s >= 80 && s < 90).length,
                        average: scores.filter(s => s >= 70 && s < 80).length,
                        needsImprovement: scores.filter(s => s < 70).length
                      };
                      
                      // Calculate percentages
                      const total = employeeData.length;
                      const percentages = {
                        excellent: (ranges.excellent / total) * 100,
                        good: (ranges.good / total) * 100,
                        average: (ranges.average / total) * 100,
                        needsImprovement: (ranges.needsImprovement / total) * 100
                      };
                      
                      return (
                        <div key={metric} className="pb-4 border-b last:border-0">
                          <h3 className="font-medium capitalize mb-2">{metric.replace(/([A-Z])/g, ' $1').trim()}</h3>
                          <div className="flex h-4 mb-2">
                            <div 
                              className="bg-green-500 h-full" 
                              style={{ width: `${percentages.excellent}%` }}
                            />
                            <div 
                              className="bg-blue-500 h-full" 
                              style={{ width: `${percentages.good}%` }}
                            />
                            <div 
                              className="bg-yellow-500 h-full" 
                              style={{ width: `${percentages.average}%` }}
                            />
                            <div 
                              className="bg-red-500 h-full" 
                              style={{ width: `${percentages.needsImprovement}%` }}
                            />
                          </div>
                          <div className="grid grid-cols-4 gap-1 text-xs">
                            <div className="text-center">
                              <div className="flex justify-center items-center space-x-1">
                                <span className="h-2 w-2 bg-green-500 rounded-full" />
                                <span>Excellent</span>
                              </div>
                              <span>{ranges.excellent}</span>
                            </div>
                            <div className="text-center">
                              <div className="flex justify-center items-center space-x-1">
                                <span className="h-2 w-2 bg-blue-500 rounded-full" />
                                <span>Good</span>
                              </div>
                              <span>{ranges.good}</span>
                            </div>
                            <div className="text-center">
                              <div className="flex justify-center items-center space-x-1">
                                <span className="h-2 w-2 bg-yellow-500 rounded-full" />
                                <span>Average</span>
                              </div>
                              <span>{ranges.average}</span>
                            </div>
                            <div className="text-center">
                              <div className="flex justify-center items-center space-x-1">
                                <span className="h-2 w-2 bg-red-500 rounded-full" />
                                <span>Needs Improvement</span>
                              </div>
                              <span>{ranges.needsImprovement}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}