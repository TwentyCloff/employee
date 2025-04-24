export class CSPSolver {
  constructor(employees, projects, constraints) {
    this.employees = employees;
    this.projects = projects;
    this.constraints = constraints || this.defaultConstraints();
    this.assignments = {};
  }

  // Default constraints if none provided
  defaultConstraints() {
    return [
      // Employee must have at least one required skill
      (employee, project) => {
        return employee.skills.some(
          (skill) =>
            project.requiredSkills.includes(skill.name) && skill.level >= 80
        );
      },

      // No more than 2 employees from the same department on a project
      (employee, project, assignments) => {
        const assignedToProject = Object.entries(assignments)
          .filter(([empId, projId]) => projId === project.id)
          .map(([empId]) => parseInt(empId));

        if (assignedToProject.length === 0) return true; // First assignment to this project

        const employeesOnProject = this.employees.filter((e) =>
          assignedToProject.includes(e.id)
        );
        const deptCount = employeesOnProject.filter(
          (e) => e.department === employee.department
        ).length;

        return deptCount < 2;
      },
    ];
  }

  // Check if an assignment satisfies all constraints
  isValid(employee, project, assignments) {
    // Check each constraint
    for (const constraint of this.constraints) {
      if (!constraint(employee, project, assignments)) {
        return false;
      }
    }

    return true;
  }

  // Calculate skill match score between employee and project
  calculateSkillMatchScore(employee, project) {
    let skillScore = 0;

    for (const requiredSkill of project.requiredSkills) {
      const skill = employee.skills.find((s) => s.name === requiredSkill);
      if (skill) {
        skillScore += skill.level * (skill.years / 10); // Weight by skill level and experience
      }
    }

    return skillScore;
  }

  // Find a valid assignment for all employees to projects
  solve() {
    const employees = [...this.employees];
    const assignments = {};

    // Simple greedy assignment algorithm
    for (const project of this.projects) {
      // Find best employee for this project based on skills
      let bestEmployee = null;
      let bestScore = -1;

      for (const employee of employees) {
        // Skip if already assigned
        if (assignments[employee.id]) continue;

        // Calculate skill match score
        const skillScore = this.calculateSkillMatchScore(employee, project);

        // Check if this employee is better than current best
        if (
          skillScore > bestScore &&
          this.isValid(employee, project, assignments)
        ) {
          bestScore = skillScore;
          bestEmployee = employee;
        }
      }

      // Assign best employee to this project if found
      if (bestEmployee) {
        assignments[bestEmployee.id] = project.id;
      }
    }

    return assignments;
  }
}
