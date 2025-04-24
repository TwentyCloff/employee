import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

export function GoalsOverview({ employee, recommendedGoals = [] }) {
  const goals = employee?.goals || [];
  
  const statusIcons = {
    "Completed": { icon: CheckCircle, color: "text-green-500" },
    "In Progress": { icon: Clock, color: "text-yellow-500" },
    "Not Started": { icon: AlertCircle, color: "text-red-500" }
  };
  
  const priorityColors = {
    "High": "destructive",
    "Medium": "warning",
    "Low": "info"
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Development Goals</CardTitle>
        <CardDescription>Current progress and recommended goals</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Current Goals</h4>
            {goals.map((goal) => {
              const StatusIcon = statusIcons[goal.status].icon;
              
              return (
                <div key={goal.id} className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center">
                    <StatusIcon className={`h-5 w-5 mr-3 ${statusIcons[goal.status].color}`} />
                    <span className="text-sm">{goal.description}</span>
                  </div>
                  <Badge variant={priorityColors[goal.priority]}>
                    {goal.priority}
                  </Badge>
                </div>
              );
            })}
          </div>
          
          {recommendedGoals.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Recommended Goals</h4>
              {recommendedGoals.map((goal) => (
                <div key={goal.id} className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 mr-3 text-blue-500" />
                    <span className="text-sm">{goal.description}</span>
                  </div>
                  <Badge variant={priorityColors[goal.priority]}>
                    {goal.priority}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}