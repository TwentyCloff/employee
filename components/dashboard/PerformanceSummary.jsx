import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export function PerformanceSummary({ employee }) {
  const metrics = employee?.metrics || {};
  const averagePerformance = Object.values(metrics).reduce((sum, value) => sum + value, 0) / Object.values(metrics).length;
  
  const sortedReviews = [...(employee?.reviews || [])].sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year;
    return a.quarter.slice(1) - b.quarter.slice(1);
  });
  
  const latestReview = sortedReviews[sortedReviews.length - 1]?.score || 0;
  const previousReview = sortedReviews[sortedReviews.length - 2]?.score || 0;
  
  const trend = latestReview > previousReview 
    ? { icon: TrendingUp, color: "text-green-500", text: "Improving" }
    : latestReview < previousReview 
      ? { icon: TrendingDown, color: "text-red-500", text: "Declining" }
      : { icon: Minus, color: "text-yellow-500", text: "Steady" };
  
  const TrendIcon = trend.icon;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Summary</CardTitle>
        <CardDescription>Average metrics across all categories</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Overall Performance</span>
              <span className="text-sm font-medium">{averagePerformance.toFixed(1)}%</span>
            </div>
            <Progress value={averagePerformance} className="h-2" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(metrics).map(([key, value]) => (
              <div key={key}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <span className="text-sm">{value}%</span>
                </div>
                <Progress value={value} className="h-1" />
              </div>
            ))}
          </div>
          
          <div className="flex items-center pt-2 border-t">
            <TrendIcon className={`h-4 w-4 mr-2 ${trend.color}`} />
            <span className="text-sm">
              {trend.text} ({latestReview.toFixed(1)} vs {previousReview.toFixed(1)})
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}