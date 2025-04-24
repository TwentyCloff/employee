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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { employeeData, projectData } from '@/lib/data';
import { CSPSolver } from '@/lib/algorithms/csp-solver';
import { Check, X, Plus } from 'lucide-react';

export default function ProjectsPage() {
  const [projectAssignments, setProjectAssignments] = useState({});
  
  useEffect(() => {
    // Apply CSP to assign employees to projects
    const cspSolver = new CSPSolver(employeeData, projectData);
    setProjectAssignments(cspSolver.solve());
  }, []);
  
  return (
    <div className="min-h-screen bg-background">
      <SideNav />
      <Header />
      
      <main className="ml-64 pt-16 p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Project Management</h1>
            <p className="text-muted-foreground">AI-optimized project assignments and team allocation.</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add New Project
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projectData.map(project => {
            // Find employees assigned to this project
            const assignedEmployeeIds = Object.entries(projectAssignments)
              .filter(([_, projectId]) => projectId === project.id)
              .map(([employeeId]) => parseInt(employeeId));
            
            const assignedEmployees = employeeData.filter(emp => assignedEmployeeIds.includes(emp.id));
            
            // Calculate skill coverage
            const skillCoverage = {};
            project.requiredSkills.forEach(skill => {
              skillCoverage[skill] = assignedEmployees.some(emp => 
                emp.skills.some(s => s.name === skill && s.level >= 80)
              );
            });
            
            const coveragePercentage = Object.values(skillCoverage).filter(Boolean).length / 
              Object.values(skillCoverage).length * 100;
            
            return (
              <Card key={project.id} className="overflow-hidden">
                <CardHeader className="border-b bg-muted/50">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>{project.name}</CardTitle>
                      <CardDescription>Project ID: {project.id}</CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      {project.requiredSkills.map(skill => (
                        <Badge key={skill} variant={skillCoverage[skill] ? "success" : "destructive"}>
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="p-4 border-b bg-muted/20">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium text-sm">Skill Coverage</h3>
                      <span className="text-sm">{coveragePercentage.toFixed(0)}% Complete</span>
                    </div>
                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${coveragePercentage === 100 ? 'bg-green-500' : 'bg-amber-500'}`}
                        style={{ width: `${coveragePercentage}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="divide-y">
                    {assignedEmployees.map(emp => (
                      <div key={emp.id} className="p-4 flex items-center justify-between hover:bg-muted/30">
                        <div>
                          <p className="font-medium">{emp.name}</p>
                          <p className="text-sm text-muted-foreground">{emp.role} • {emp.department}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {project.requiredSkills.map(skill => {
                            const hasSkill = emp.skills.some(s => s.name === skill && s.level >= 80);
                            return hasSkill ? (
                              <div key={skill} className="flex items-center text-green-500 text-sm">
                                <Check className="h-4 w-4 mr-1" />
                                {skill}
                              </div>
                            ) : (
                              <div key={skill} className="flex items-center text-red-500 text-sm">
                                <X className="h-4 w-4 mr-1" />
                                {skill}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                    
                    {assignedEmployees.length === 0 && (
                      <div className="p-6 text-center text-muted-foreground">
                        No employees assigned to this project
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4 bg-muted/20 flex justify-end">
                    <Button size="sm" variant="outline" className="mr-2">Re-assign Team</Button>
                    <Button size="sm">View Details</Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
}
