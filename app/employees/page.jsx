// app/students/page.jsx
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
import { Input } from "@/components/ui/input";
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
import { 
  Eye, 
  Search, 
  ChevronLeft, 
  ChevronRight,
  X,
} from 'lucide-react';
import Link from 'next/link';

// Student data sorted alphabetically
const studentData = [
  { id: 1, name: 'Alicia Shofi Destiani', class: 'XA', status: 'Siswa' },
  { id: 2, name: 'Dahlia Puspita Ghaniaty', class: 'XA', status: 'Siswa' },
  { id: 3, name: 'Dara Veronika Tariggas', class: 'XA', status: 'Siswa' },
  { id: 4, name: 'Fairuz Sahla Fallugah', class: 'XA', status: 'Siswa' },
  { id: 5, name: 'Farid Ulya Firjatullah', class: 'XA', status: 'Siswa' },
  { id: 6, name: 'Fathul Faigan Alfi', class: 'XA', status: 'Siswa' },
  { id: 7, name: 'Fredy Gabriell Tanjaya', class: 'XA', status: 'Siswa' },
  { id: 8, name: 'Juliandika', class: 'XA', status: 'Siswa' },
  { id: 9, name: 'Kalinda Pradipa', class: 'XA', status: 'Siswa' },
  { id: 10, name: 'Kania Permata Widra', class: 'XA', status: 'Siswa' },
  { id: 11, name: 'Keisya Ramadhani Huuriyah', class: 'XA', status: 'Siswa' },
  { id: 12, name: 'Kenzo Alvaro Bautista', class: 'XA', status: 'Siswa' },
  { id: 13, name: 'Keysha Aulia', class: 'XA', status: 'Siswa' },
  { id: 14, name: 'Kiran Adhya Narisha', class: 'XA', status: 'Siswa' },
  { id: 15, name: 'Muhammad Fakhar', class: 'XA', status: 'Siswa' },
  { id: 16, name: 'Nadine Rannu Gracia', class: 'XA', status: 'Siswa' },
  { id: 17, name: 'Rahadatul Aisy Hadraini', class: 'XA', status: 'Siswa' },
  { id: 18, name: 'Raden Mecca Puti A', class: 'XA', status: 'Siswa' },
  { id: 19, name: 'Raisya Permata Intania W', class: 'XA', status: 'Siswa' },
  { id: 20, name: 'Salsabiela Azzahra B', class: 'XA', status: 'Siswa' },
  { id: 21, name: 'Sandi Gunawan', class: 'XA', status: 'Siswa' },
  { id: 22, name: 'Shabrina Aqela', class: 'XA', status: 'Siswa' },
  { id: 23, name: 'Syaira Parifasha', class: 'XA', status: 'Siswa' },
  { id: 24, name: 'Syifa Azzahra Rifai', class: 'XA', status: 'Siswa' },
  { id: 25, name: 'Utin Muzfira Amira Fenisa', class: 'XA', status: 'Siswa' },
];

// components/students/StudentFilters.jsx
function StudentFilters({ 
  classes, 
  statuses, 
  selectedClass, 
  selectedStatus, 
  setSelectedClass, 
  setSelectedStatus, 
  resetFilters 
}) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 bg-muted/30 rounded-md mb-6">
      <div className="w-full md:w-auto">
        <label className="text-sm font-medium mb-1 block">Class</label>
        <select 
          value={selectedClass} 
          onChange={(e) => setSelectedClass(e.target.value)}
          className="h-9 w-full md:w-40 rounded-md border border-input bg-background px-3 text-sm"
        >
          <option value="">All Classes</option>
          {classes.map(cls => (
            <option key={cls} value={cls}>{cls}</option>
          ))}
        </select>
      </div>
      
      <div className="w-full md:w-auto">
        <label className="text-sm font-medium mb-1 block">Status</label>
        <select 
          value={selectedStatus} 
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="h-9 w-full md:w-48 rounded-md border border-input bg-background px-3 text-sm"
        >
          <option value="">All Statuses</option>
          {statuses.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
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

// components/students/StudentPagination.jsx
function StudentPagination({ 
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
        <span className="font-medium">{totalItems}</span> students
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

export default function StudentsPage() {
  // State for search and filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(30);
  
  // State for filtered and paginated data
  const [filteredData, setFilteredData] = useState([]);
  const [paginatedData, setPaginatedData] = useState([]);
  
  // Extract unique classes and statuses for filters
  const classes = [...new Set(studentData.map(student => student.class))];
  const statuses = [...new Set(studentData.map(student => student.status))];
  
  useEffect(() => {
    // Apply filters and search
    const filtered = studentData.filter(student => {
      // Search filter
      const matchesSearch = searchQuery === '' || 
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.class.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.status.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Class filter
      const matchesClass = selectedClass === '' || student.class === selectedClass;
      
      // Status filter
      const matchesStatus = selectedStatus === '' || student.status === selectedStatus;
      
      return matchesSearch && matchesClass && matchesStatus;
    });
    
    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, selectedClass, selectedStatus]);
  
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
    setSelectedClass('');
    setSelectedStatus('');
    setCurrentPage(1);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <SideNav />
      <Header />
      
      <main className="ml-64 pt-20 p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Students</h1>
            <p className="text-muted-foreground">
              View and manage all students in your class.
            </p>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              type="text" 
              placeholder="Search students by name, class, or status..." 
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
        
        <StudentFilters 
          classes={classes} 
          statuses={statuses} 
          selectedClass={selectedClass} 
          selectedStatus={selectedStatus} 
          setSelectedClass={setSelectedClass} 
          setSelectedStatus={setSelectedStatus} 
          resetFilters={resetFilters} 
        />
        
        <Card>
          <CardHeader className="pb-0">
            <div className="flex items-center justify-between">
              <CardTitle>Student Directory</CardTitle>
              <Badge variant="outline">
                {filteredData.length} students
              </Badge>
            </div>
            {(selectedClass || selectedStatus) && (
              <div className="flex items-center flex-wrap gap-2 mt-2">
                <Badge variant="secondary" className="text-xs">Filters active</Badge>
                {selectedClass && (
                  <Badge variant="outline" className="text-xs">
                    Class: {selectedClass}
                    <button onClick={() => setSelectedClass('')} className="ml-1">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {selectedStatus && (
                  <Badge variant="outline" className="text-xs">
                    Status: {selectedStatus}
                    <button onClick={() => setSelectedStatus('')} className="ml-1">
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
                  <TableHead>Class</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map(student => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>{student.class}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{student.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Link href={`/student/${student.id}`}>
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
                
                {paginatedData.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                      No students found matching your filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            
            <StudentPagination 
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
