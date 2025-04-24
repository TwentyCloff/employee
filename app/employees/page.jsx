// app/employees/page.jsx
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FOLEvaluator } from '@/lib/algorithms/fol-evaluator';
import { employeeData } from '@/lib/data';
import { 
  Eye, 
  Search, 
  ChevronLeft, 
  ChevronRight,
  Filter,
  X,
  Plus,
  Download,
  Upload
} from 'lucide-react';
import Link from 'next/link';

// components/employees/EmployeeFilters.jsx
function EmployeeFilters({ 
  departments, 
  roles, 
  selectedDepartment, 
  selectedRole, 
  performanceRange, 
  setSelectedDepartment, 
  setSelectedRole, 
  setPerformanceRange, 
  resetFilters 
}) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 bg-muted/30 rounded-md mb-6">
      <div className="w-full md:w-auto">
        <label className="text-sm font-medium mb-1 block">Department</label>
        <select 
          value={selectedDepartment} 
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className="h-9 w-full md:w-40 rounded-md border border-input bg-background px-3 text-sm"
        >
          <option value="">All Departments</option>
          {departments.map(dept => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
      </div>
      
      <div className="w-full md:w-auto">
        <label className="text-sm font-medium mb-1 block">Role</label>
        <select 
          value={selectedRole} 
          onChange={(e) => setSelectedRole(e.target.value)}
          className="h-9 w-full md:w-48 rounded-md border border-input bg-background px-3 text-sm"
        >
          <option value="">All Roles</option>
          {roles.map(role => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
      </div>
      
      <div className="w-full md:w-auto">
        <label className="text-sm font-medium mb-1 block">Performance Range</label>
        <div className="flex items-center space-x-2">
          <input 
            type="number" 
            min="0" 
            max="100" 
            value={performanceRange[0]} 
            onChange={(e) => setPerformanceRange([parseInt(e.target.value), performanceRange[1]])}
            className="h-9 w-16 rounded-md border border-input bg-background px-3 text-sm"
          />
          <span>-</span>
          <input 
            type="number" 
            min="0" 
            max="100" 
            value={performanceRange[1]} 
            onChange={(e) => setPerformanceRange([performanceRange[0], parseInt(e.target.value)])}
            className="h-9 w-16 rounded-md border border-input bg-background px-3 text-sm"
          />
          <span className="text-sm">%</span>
        </div>
      </div>
      
      <div className="ml-auto mt-4 md:mt-auto flex items-center space-x-2">
        <Button variant="outline" size="sm" onClick={resetFilters} className="h-9">
          <X className="h-4 w-4 mr-1" />
          Reset
        </Button>
      </div>
    </div>
  );
}

// components/employees/EmployeePagination.jsx
function EmployeePagination({ 
  currentPage, 
  totalPages, 
  setCurrentPage, 
  itemsPerPage, 
  setItemsPerPage,
  totalItems 
}) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between mt-6 py-4 border-t">
      <div className="text-sm text-muted-foreground mb-4 md:mb-0">
        Showing <span className="font-medium">{Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)}</span> to{' '}
        <span className="font-medium">{Math.min(currentPage * itemsPerPage, totalItems)}</span> of{' '}
        <span className="font-medium">{totalItems}</span> employees
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm">Rows per page:</span>
          <select 
            value={itemsPerPage} 
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="h-8 w-16 rounded-md border border-input bg-background px-2 text-sm"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={50}>50</option>
          </select>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="text-sm font-medium">
            Page {currentPage} of {totalPages}
          </div>
          
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function EmployeesPage() {
  // State for search and filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [performanceRange, setPerformanceRange] = useState([0, 100]);
  
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(30);
  
  // State for filtered and paginated data
  const [filteredData, setFilteredData] = useState([]);
  const [paginatedData, setPaginatedData] = useState([]);
  const [performanceScores, setPerformanceScores] = useState({});
  
  // Extract unique departments and roles for filters
  const departments = [...new Set(employeeData.map(emp => emp.department))];
  const roles = [...new Set(employeeData.map(emp => emp.role))];
  
  useEffect(() => {
    // Calculate performance scores
    const folEvaluator = new FOLEvaluator(employeeData);
    setPerformanceScores(folEvaluator.calculatePerformanceScores());
    
    // Apply filters and search
    const filtered = employeeData.filter(employee => {
      // Search filter
      const matchesSearch = searchQuery === '' || 
        employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.department.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Department filter
      const matchesDepartment = selectedDepartment === '' || employee.department === selectedDepartment;
      
      // Role filter
      const matchesRole = selectedRole === '' || employee.role === selectedRole;
      
      // Performance range filter
      const employeeScore = performanceScores[employee.id] || 0;
      const matchesPerformance = employeeScore >= performanceRange[0] && employeeScore <= performanceRange[1];
      
      return matchesSearch && matchesDepartment && matchesRole && matchesPerformance;
    });
    
    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, selectedDepartment, selectedRole, performanceRange]);
  
  useEffect(() => {
    // Paginate data
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedData(filteredData.slice(startIndex, endIndex));
  }, [filteredData, currentPage, itemsPerPage]);
  
  // Calculate total pages
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  
  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedDepartment('');
    setSelectedRole('');
    setPerformanceRange([0, 100]);
    setCurrentPage(1);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <SideNav />
      <Header />
      
      <main className="ml-64 pt-16 p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Employees</h1>
            <p className="text-muted-foreground">
              View and manage all employees in your organization.
            </p>
          </div>
          
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Employee
            </Button>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search employees by name, role, or department..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full rounded-md border border-input bg-background px-10 text-sm"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>
        </div>
        
        <EmployeeFilters 
          departments={departments} 
          roles={roles} 
          selectedDepartment={selectedDepartment} 
          selectedRole={selectedRole} 
          performanceRange={performanceRange} 
          setSelectedDepartment={setSelectedDepartment} 
          setSelectedRole={setSelectedRole} 
          setPerformanceRange={setPerformanceRange} 
          resetFilters={resetFilters} 
        />
        
        <Card>
          <CardHeader className="pb-0">
            <div className="flex items-center justify-between">
              <CardTitle>Employee Directory</CardTitle>
              <Badge variant="outline">
                {filteredData.length} employees
              </Badge>
            </div>
            {(selectedDepartment || selectedRole || performanceRange[0] > 0 || performanceRange[1] < 100) && (
              <div className="flex items-center flex-wrap gap-2 mt-2">
                <Badge variant="secondary" className="text-xs">Filters active</Badge>
                {selectedDepartment && (
                  <Badge variant="outline" className="text-xs">
                    Department: {selectedDepartment}
                    <button onClick={() => setSelectedDepartment('')} className="ml-1">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {selectedRole && (
                  <Badge variant="outline" className="text-xs">
                    Role: {selectedRole}
                    <button onClick={() => setSelectedRole('')} className="ml-1">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {(performanceRange[0] > 0 || performanceRange[1] < 100) && (
                  <Badge variant="outline" className="text-xs">
                    Performance: {performanceRange[0]}% - {performanceRange[1]}%
                    <button onClick={() => setPerformanceRange([0, 100])} className="ml-1">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
              </div>
            )}
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead>Projects</TableHead>
                  <TableHead>Training Needs</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map(employee => {
                  // Calculate training needs
                  const folEvaluator = new FOLEvaluator([employee]);
                  const trainingNeeds = folEvaluator.needsTraining(employee);
                  
                  return (
                    <TableRow key={employee.id}>
                      <TableCell className="font-medium">{employee.name}</TableCell>
                      <TableCell>{employee.role}</TableCell>
                      <TableCell>{employee.department}</TableCell>
                      <TableCell>{new Date(employee.startDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            performanceScores[employee.id] >= 90 ? "success" : 
                            performanceScores[employee.id] >= 80 ? "info" :
                            performanceScores[employee.id] >= 70 ? "warning" :
                            "destructive"
                          }
                        >
                          {performanceScores[employee.id]?.toFixed(1)}%
                        </Badge>
                      </TableCell>
                      <TableCell>{employee.projects.length}</TableCell>
                      <TableCell>
                        {trainingNeeds.needsTraining ? (
                          <Badge variant="warning">{trainingNeeds.areas.length} areas</Badge>
                        ) : (
                          <Badge variant="success">None</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Link href={`/employee/${employee.id}`}>
                          <Button size="sm" variant="ghost">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })}
                
                {paginatedData.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      No employees found matching your filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            
            <EmployeePagination 
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
              totalItems={filteredData.length}
            />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}