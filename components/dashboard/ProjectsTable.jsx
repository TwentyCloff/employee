import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle } from 'lucide-react';

export function ProjectsTable({ employee }) {
  const projects = employee?.projects || [];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Contributions</CardTitle>
        <CardDescription>Recent project history and performance</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project</TableHead>
              <TableHead>Contribution</TableHead>
              <TableHead>On Time</TableHead>
              <TableHead>Complexity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">{project.name}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <span>{project.contribution}%</span>
                    <div className="h-2 w-24 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary" 
                        style={{ width: `${project.contribution}%` }}
                      />
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {project.onTime ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={
                      project.complexity >= 9 ? "destructive" : 
                      project.complexity >= 7 ? "warning" :
                      "info"
                    }
                  >
                    {project.complexity}/10
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}