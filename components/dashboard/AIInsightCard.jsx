import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { BrainCircuit, Award, School, Lightbulb } from 'lucide-react';

export function AIInsightCard({ type, title, description, data }) {
  const icons = {
    "promotion": Award,
    "training": School,
    "insight": Lightbulb,
    "default": BrainCircuit
  };
  
  const Icon = icons[type] || icons.default;
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-md font-medium">{title}</CardTitle>
        <Icon className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
        {data}
      </CardContent>
    </Card>
  );
}
