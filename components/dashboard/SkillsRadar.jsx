import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import React from "react";

export function SkillsRadar({ employee }) {
  const skills = employee?.skills || [];

  const sortedSkills = [...skills].sort((a, b) => b.level - a.level);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills Assessment</CardTitle>
        <CardDescription>Technical and soft skills evaluation</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedSkills.map((skill) => (
            <div key={skill.name} className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-sm font-medium">{skill.name}</span>
                  <Badge variant="outline" className="ml-2 text-xs">
                    {skill.years} {skill.years === 1 ? "year" : "years"}
                  </Badge>
                </div>
                <span className="text-sm font-medium">{skill.level}%</span>
              </div>
              <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
