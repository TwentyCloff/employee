import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X } from 'lucide-react';
import Link from 'next/link';

export function ProjectAssignmentCard({ assignments, employees, projects }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Assignments</CardTitle>
        <CardDescription>AI-recommended team allocations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {projects.map(project => {
            // Find employees assigned to this project
            const assignedEmployeeIds = Object.entries(assignments)
              .filter(([_, projectId]) => projectId === project.id)
              .map(([employeeId]) => parseInt(employeeId));
            
            const assignedEmployees = employees.filter(emp => assignedEmployeeIds.includes(emp.id));
            
            return (
              <div key={project.id} className="border rounded-md p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium">{project.name}</h3>
                  <div className="flex space-x-2">
                    {project.requiredSkills.map(skill => (
                      <Badge key={skill} variant="outline">{skill}</Badge>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  {assignedEmployees.map(emp => (
                    <div key={emp.id} className="flex items-center justify-between text-sm p-2 bg-muted rounded-md">
                      <div>
                        <span className="font-medium">{emp.name}</span>
                        <span className="text-muted-foreground ml-2">({emp.role})</span>
                      </div>
                      <div className="flex items-center">
                        {project.requiredSkills.map(skill => {
                          const hasSkill = emp.skills.some(s => s.name === skill && s.level >= 80);
                          return hasSkill ? (
                            <Check key={skill} className="h-4 w-4 text-green-500 ml-1" />
                          ) : (
                            <X key={skill} className="h-4 w-4 text-red-500 ml-1" />
                          );
                        })}
                      </div>
                    </div>
                  ))}
                  
                  {assignedEmployees.length === 0 && (
                    <p className="text-sm text-muted-foreground py-2">No employees assigned to this project</p>
                  )}
                </div>
              </div>
            );
          })}
          
          <div className="flex justify-end">
            <Link href="/projects">
              <Button size="sm">
                View All Projects
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}