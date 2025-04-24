export class GoalRecommender {
  constructor(employees) {
    this.employees = employees;
  }

  // Generate potential goals based on employee skills and metrics
  generatePotentialGoals(employee) {
    const potentialGoals = [
      {
        id: "RG001",
        description: "Improve communication skills",
        category: "Soft Skills",
        priority: "Medium",
      },
      {
        id: "RG002",
        description: "Master advanced JavaScript patterns",
        category: "Technical",
        priority: "High",
      },
      {
        id: "RG003",
        description: "Learn cloud architecture",
        category: "Technical",
        priority: "High",
      },
      {
        id: "RG004",
        description: "Develop leadership skills",
        category: "Soft Skills",
        priority: "Medium",
      },
      {
        id: "RG005",
        description: "Improve documentation practices",
        category: "Process",
        priority: "Low",
      },
      {
        id: "RG006",
        description: "Learn mobile development",
        category: "Technical",
        priority: "Medium",
      },
      {
        id: "RG007",
        description: "Master data visualization",
        category: "Technical",
        priority: "Medium",
      },
      {
        id: "RG008",
        description: "Enhance problem-solving skills",
        category: "Soft Skills",
        priority: "High",
      },
      {
        id: "RG009",
        description: "Learn project management",
        category: "Process",
        priority: "Medium",
      },
      {
        id: "RG010",
        description: "Develop public speaking skills",
        category: "Soft Skills",
        priority: "Low",
      },
    ];

    // Filter out goals that are already in progress or completed
    const existingGoalDescriptions = employee.goals.map((g) =>
      g.description.toLowerCase()
    );
    return potentialGoals.filter(
      (g) => !existingGoalDescriptions.includes(g.description.toLowerCase())
    );
  }

  // Calculate goal value (heuristic) based on employee metrics and skills
  calculateGoalValue(goal, employee) {
    const metrics = employee.metrics;

    // Different goals target different metrics for improvement
    const goalImprovementMap = {
      "Improve communication skills": { target: "communication", value: 30 },
      "Master advanced JavaScript patterns": {
        target: "qualityOfWork",
        value: 25,
      },
      "Learn cloud architecture": { target: "innovation", value: 30 },
      "Develop leadership skills": { target: "leadership", value: 35 },
      "Improve documentation practices": { target: "qualityOfWork", value: 20 },
      "Learn mobile development": { target: "innovation", value: 25 },
      "Master data visualization": { target: "innovation", value: 20 },
      "Enhance problem-solving skills": { target: "problemSolving", value: 30 },
      "Learn project management": { target: "leadership", value: 25 },
      "Develop public speaking skills": { target: "communication", value: 20 },
    };

    const improvement = goalImprovementMap[goal.description] || {
      target: "overall",
      value: 15,
    };

    // Calculate value based on how much improvement is needed in the target area
    let value = 0;

    if (improvement.target === "overall") {
      // For general improvements, look at overall average
      const avgMetric =
        Object.values(metrics).reduce((sum, val) => sum + val, 0) /
        Object.values(metrics).length;
      value = (improvement.value * (100 - avgMetric)) / 100;
    } else {
      // For specific improvements, look at the specific metric
      const metricValue = metrics[improvement.target] || 75; // Default if not found
      value = (improvement.value * (100 - metricValue)) / 100;
    }

    // Adjust priority
    if (goal.priority === "High") value *= 1.5;
    else if (goal.priority === "Low") value *= 0.7;

    return value;
  }

  // Backtracking algorithm to find optimal goal recommendations
  recommendGoals(employeeId, maxGoals = 3) {
    const employee = this.employees.find((e) => e.id === employeeId);
    if (!employee) return [];

    const potentialGoals = this.generatePotentialGoals(employee);
    if (potentialGoals.length === 0) return [];

    // Calculate value for each potential goal
    const goalsWithValues = potentialGoals.map((goal) => ({
      ...goal,
      value: this.calculateGoalValue(goal, employee),
    }));

    // Sort goals by value (descending)
    goalsWithValues.sort((a, b) => b.value - a.value);

    // Take top maxGoals goals
    return goalsWithValues.slice(0, maxGoals);
  }
}
