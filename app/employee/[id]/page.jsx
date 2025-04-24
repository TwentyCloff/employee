'use client';

import { useState, useEffect } from 'react';
import { SideNav } from '@/components/dashboard/SideNav';
import { Header } from '@/components/dashboard/Header';
import { PerformanceSummary } from '@/components/dashboard/PerformanceSummary';
import { SkillsRadar } from '@/components/dashboard/SkillsRadar';
import { ProjectsTable } from '@/components/dashboard/ProjectsTable';
import { GoalsOverview } from '@/components/dashboard/GoalsOverview';
import { AIInsightCard } from '@/components/dashboard/AIInsightCard';
import { Button } from '@/components/ui/button';
import { employeeData } from '@/lib/data';
import { FOLEvaluator } from '@/lib/algorithms/fol-evaluator';
import { GoalRecommender } from '@/lib/algorithms/goal-recommender';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function EmployeeDetail() {
  const params = useParams();
  const employeeId = parseInt(params.id);
  const [employee, setEmployee] = useState(null);
  const [isPromotionCandidate, setIsPromotionCandidate] = useState(false);
  const [trainingNeeds, setTrainingNeeds] = useState({ needsTraining: false, areas: [] });
  const [recommendedGoals, setRecommendedGoals] = useState([]);
  
  useEffect(() => {
    // Find employee by ID
    const foundEmployee = employeeData.find(e => e.id === employeeId);
    setEmployee(foundEmployee);
    
    if (foundEmployee) {
      // Initialize FOL evaluator
      const folEvaluator = new FOLEvaluator([foundEmployee]);
      setIsPromotionCandidate(folEvaluator.isPromotionCandidate(foundEmployee));
      setTrainingNeeds(folEvaluator.needsTraining(foundEmployee));
      
      // Initialize goal recommender
      const goalRecommender = new GoalRecommender(employeeData);
      setRecommendedGoals(goalRecommender.recommendGoals(employeeId, 3));
    }
  }, [employeeId]);
  
  if (!employee) {
    return (
      <div className="min-h-screen bg-background">
        <SideNav />
        <Header />
        <main className="ml-64 pt-16 p-6">
          <div className="flex items-center mb-8">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
          <div className="flex items-center justify-center h-64">
            <p className="text-lg text-muted-foreground">Employee not found</p>
          </div>
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      <SideNav />
      <Header />
      
      <main className="ml-64 pt-16 p-6">
        <div className="flex items-center mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">{employee.name}</h1>
            <p className="text-muted-foreground">{employee.role} • {employee.department}</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Button>Edit Profile</Button>
            <Button variant="outline">Schedule Review</Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <AIInsightCard 
            type="promotion"
            title="Promotion Readiness"
            description="Based on performance metrics and improvement"
            data={
              <div className="mt-4">
                {isPromotionCandidate ? (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-md text-green-800 text-sm">
                    This employee meets all criteria for promotion consideration. High performance, improved over time, and reliable project completion.
                  </div>
                ) : (
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md text-yellow-800 text-sm">
                    This employee does not yet meet all criteria for promotion. Continue to monitor progress and provide growth opportunities.
                  </div>
                )}
              </div>
            }
          />
          
          <AIInsightCard 
            type="training"
            title="Training Recommendations"
            description="Areas for improvement and development"
            data={
              <div className="mt-4">
                {trainingNeeds.needsTraining ? (
                  <div>
                    <p className="text-sm mb-2">Needs improvement in:</p>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      {trainingNeeds.areas.map(area => (
                        <li key={area}>{area.replace(/([A-Z])/g, ' $1').trim()}</li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="text-sm">No specific training needs identified. Employee is performing well across all metrics.</p>
                )}
              </div>
            }
          />
          
          <AIInsightCard 
            type="insight"
            title="Employee Insights"
            description="AI-generated observations"
            data={
              <div className="mt-4">
                <ul className="text-sm space-y-2">
                  <li className="flex items-start">
                    <span className="h-2 w-2 rounded-full bg-blue-500 mt-1.5 mr-2 flex-shrink-0" />
                    <span>Joined {new Date(employee.startDate).toLocaleDateString()} ({Math.floor((new Date() - new Date(employee.startDate)) / (365.25 * 24 * 60 * 60 * 1000))} years)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="h-2 w-2 rounded-full bg-blue-500 mt-1.5 mr-2 flex-shrink-0" />
                    <span>Completed {employee.projects.length} projects</span>
                  </li>
                  <li className="flex items-start">
                    <span className="h-2 w-2 rounded-full bg-blue-500 mt-1.5 mr-2 flex-shrink-0" />
                    <span>Most proficient in {employee.skills.sort((a, b) => b.level - a.level)[0].name}</span>
                  </li>
                </ul>
              </div>
            }
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <PerformanceSummary employee={employee} />
          <SkillsRadar employee={employee} />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProjectsTable employee={employee} />
          <GoalsOverview employee={employee} recommendedGoals={recommendedGoals} />
        </div>
      </main>
    </div>
  );
}