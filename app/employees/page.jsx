// app/students/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { SideNav } from '@/components/dashboard/SideNav';
import { Header } from '@/components/dashboard/Header';
import { 
  Card, 
  CardContent, 
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
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  ChevronLeft, 
  ChevronRight,
  X,
} from 'lucide-react';

// Student data with roles
const initialStudentData = [
  { id: 1, name: 'Alicia Shofi Destiani', class: 'XA', status: 'Siswa', role: '' },
  { id: 2, name: 'Dahlia Puspita Ghaniaty', class: 'XA', status: 'Siswa', role: '' },
  { id: 3, name: 'Dara Veronika Tariggas', class: 'XA', status: 'Siswa', role: '' },
  { id: 4, name: 'Fairuz Sahla Fallugah', class: 'XA', status: 'Siswa', role: '' },
  { id: 5, name: 'Farid Ulya Firjatullah', class: 'XA', status: 'Siswa', role: '' },
  { id: 6, name: 'Fathul Faigan Alfi', class: 'XA', status: 'Siswa', role: '' },
  { id: 7, name: 'Fredy Gabriell Tanjaya', class: 'XA', status: 'Siswa', role: '' },
  { id: 8, name: 'Juliandika', class: 'XA', status: 'Siswa', role: '' },
  { id: 9, name: 'Kalinda Pradipa', class: 'XA', status: 'Siswa', role: '' },
  { id: 10, name: 'Kania Permata Widra', class: 'XA', status: 'Siswa', role: '' },
  { id: 11, name: 'Keisya Ramadhani Huuriyah', class: 'XA', status: 'Siswa', role: '' },
  { id: 12, name: 'Kenzo Alvaro Bautista', class: 'XA', status: 'Siswa', role: '' },
  { id: 13, name: 'Keysha Aulia', class: 'XA', status: 'Siswa', role: '' },
  { id: 14, name: 'Kiran Adhya Narisha', class: 'XA', status: 'Siswa', role: '' },
  { id: 15, name: 'Muhammad Fakhar', class: 'XA', status: 'Siswa', role: '' },
  { id: 16, name: 'Nadine Rannu Gracia', class: 'XA', status: 'Siswa', role: '' },
  { id: 17, name: 'Rahadatul Aisy Hadraini', class: 'XA', status: 'Siswa', role: '' },
  { id: 18, name: 'Raden Mecca Puti A', class: 'XA', status: 'Siswa', role: '' },
  { id: 19, name: 'Raisya Permata Intania W', class: 'XA', status: 'Siswa', role: '' },
  { id: 20, name: 'Salsabiela Azzahra B', class: 'XA', status: 'Siswa', role: '' },
  { id: 21, name: 'Sandi Gunawan', class: 'XA', status: 'Siswa', role: '' },
  { id: 22, name: 'Shabrina Aqela', class: 'XA', status: 'Siswa', role: '' },
  { id: 23, name: 'Syaira Parifasha', class: 'XA', status: 'Siswa', role: '' },
  { id: 24, name: 'Syifa Azzahra Rifai', class: 'XA', status: 'Siswa', role: '' },
  { id: 25, name: 'Utin Muzfira Amira Fenisa', class: 'XA', status: 'Siswa', role: '' },
];

const roleOptions = [
  { value: '', label: 'Tidak Ada' },
  { value: 'Ketua Kelas', label: 'Ketua Kelas' },
  { value: 'Sekretaris', label: 'Sekretaris' },
  { value: 'Bendahara 1', label: 'Bendahara 1' },
  { value: 'Bendahara 2', label: 'Bendahara 2' },
];

function StudentFilters({ 
  searchQuery,
  setSearchQuery,
  selectedRole,
  setSelectedRole,
  resetFilters 
}) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 bg-muted/30 rounded-md mb-6">
      <div className="w-full md:w-auto">
        <label className="text-sm font-medium mb-1 block">Nama</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            type="text" 
            placeholder="Cari siswa..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 w-full md:w-64 rounded-md border border-input bg-background px-10 text-sm"
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
      
      <div className="w-full md:w-auto">
        <label className="text-sm font-medium mb-1 block">Role</label>
        <select 
          value={selectedRole} 
          onChange={(e) => setSelectedRole(e.target.value)}
          className="h-9 w-full md:w-48 rounded-md border border-input bg-background px-3 text-sm"
        >
          <option value="">Semua Role</option>
          {roleOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
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
        Menampilkan <span className="font-medium">{Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)}</span> sampai{' '}
        <span className="font-medium">{Math.min(currentPage * itemsPerPage, totalItems)}</span> dari{' '}
        <span className="font-medium">{totalItems}</span> siswa
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm">Baris per halaman:</span>
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
            Halaman {currentPage} dari {totalPages}
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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(30);
  const [filteredData, setFilteredData] = useState([]);
  const [paginatedData, setPaginatedData] = useState([]);
  const [students, setStudents] = useState(initialStudentData);

  const handleRoleChange = (studentId, newRole) => {
    setStudents(students.map(student => 
      student.id === studentId ? { ...student, role: newRole } : student
    ));
  };

  useEffect(() => {
    const filtered = students.filter(student => {
      const matchesSearch = searchQuery === '' || 
        student.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesRole = selectedRole === '' || student.role === selectedRole;
      
      return matchesSearch && matchesRole;
    });
    
    setFilteredData(filtered);
    setCurrentPage(1);
  }, [searchQuery, selectedRole, students]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedData(filteredData.slice(startIndex, endIndex));
  }, [filteredData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedRole('');
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-background">
      <SideNav />
      <Header />
      
      <main className="ml-64 pt-20 p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Daftar Siswa</h1>
            <p className="text-muted-foreground">
              Kelola data siswa kelas XA
            </p>
          </div>
        </div>
        
        <StudentFilters 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
          resetFilters={resetFilters}
        />
        
        <Card>
          <CardHeader className="pb-0">
            <div className="flex items-center justify-between">
              <CardTitle>Student Directory</CardTitle>
              <Badge variant="outline">
                {filteredData.length} siswa
              </Badge>
            </div>
            {(searchQuery || selectedRole) && (
              <div className="flex items-center flex-wrap gap-2 mt-2">
                <Badge variant="secondary" className="text-xs">Filter aktif</Badge>
                {searchQuery && (
                  <Badge variant="outline" className="text-xs">
                    Nama: {searchQuery}
                    <button onClick={() => setSearchQuery('')} className="ml-1">
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
              </div>
            )}
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama</TableHead>
                  <TableHead>Kelas</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Role</TableHead>
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
                    <TableCell>
                      <select
                        value={student.role}
                        onChange={(e) => handleRoleChange(student.id, e.target.value)}
                        className="h-8 rounded-md border border-input bg-background px-2 text-sm"
                      >
                        {roleOptions.map(option => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    </TableCell>
                  </TableRow>
                ))}
                
                {paginatedData.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                      Tidak ada siswa yang ditemukan.
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
