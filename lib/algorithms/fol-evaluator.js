export class FOLEvaluator {
  constructor(employees) {
    this.employees = employees;
  }

  // Predicate: isHighPerformer
  isHighPerformer(employee) {
    const metrics = employee.metrics;
    const avgMetric =
      Object.values(metrics).reduce((sum, val) => sum + val, 0) /
      Object.values(metrics).length;
    return avgMetric >= 85;
  }

  // Predicate: hasImprovedOverTime
  hasImprovedOverTime(employee) {
    const reviews = [...employee.reviews].sort((a, b) => {
      if (a.year !== b.year) return a.year - b.year;
      return a.quarter.slice(1) - b.quarter.slice(1);
    });

    if (reviews.length < 2) return false;

    return reviews[reviews.length - 1].score > reviews[0].score;
  }

  // Predicate: isReliable
  isReliable(employee) {
    const projects = employee.projects;
    if (projects.length === 0) return false;

    const onTimeCount = projects.filter((project) => project.onTime).length;
    return onTimeCount / projects.length >= 0.75; // At least 75% on time
  }

  // Rule: isPromotionCandidate
  isPromotionCandidate(employee) {
    return (
      this.isHighPerformer(employee) &&
      this.hasImprovedOverTime(employee) &&
      this.isReliable(employee)
    );
  }

  // Rule: needsTraining
  needsTraining(employee) {
    const metrics = employee.metrics;
    const weakAreas = Object.entries(metrics)
      .filter(([key, value]) => value < 80)
      .map(([key]) => key);

    return {
      needsTraining: weakAreas.length > 0,
      areas: weakAreas,
    };
  }

  // Evaluate all employees against a specific rule
  evaluateRule(ruleName) {
    const results = {};
    this.employees.forEach((employee) => {
      results[employee.id] = this[ruleName](employee);
    });
    return results;
  }

  // Get overall performance score
  getPerformanceScore(employee) {
    const metrics = employee.metrics;
    const avgMetric =
      Object.values(metrics).reduce((sum, val) => sum + val, 0) /
      Object.values(metrics).length;

    // Adjust for reliability and improvement over time
    let score = avgMetric;

    if (this.hasImprovedOverTime(employee)) {
      score += 5;
    }

    if (this.isReliable(employee)) {
      score += 5;
    }

    return Math.min(100, score);
  }

  // Calculate performance scores for all employees
  calculatePerformanceScores() {
    const scores = {};
    this.employees.forEach((employee) => {
      scores[employee.id] = this.getPerformanceScore(employee);
    });
    return scores;
  }
}
