"use client";

import { Header } from "@/components/dashboard/Header";
import { SideNav } from "@/components/dashboard/SideNav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Calendar,
    CheckCircle,
    Clock,
    Users,
    ClipboardList
} from "lucide-react";
import { useEffect, useState } from "react";

// Student data for duty roster
const studentData = [
  { id: 1, name: 'Alicia Shofi Destiani' },
  { id: 2, name: 'Dahlia Puspita Ghaniaty' },
  { id: 3, name: 'Dara Veronika Tariggas' },
  { id: 4, name: 'Fairuz Sahla Fallugah' },
  { id: 5, name: 'Farid Ulya Firjatullah' },
  { id: 6, name: 'Fathul Faigan Alfi' },
  { id: 7, name: 'Fredy Gabriell Tanjaya' },
  { id: 8, name: 'Juliandika' },
  { id: 9, name: 'Kalinda Pradipa' },
  { id: 10, name: 'Kania Permata Widra' },
  { id: 11, name: 'Keisya Ramadhani Huuriyah' },
  { id: 12, name: 'Kenzo Alvaro Bautista' },
  { id: 13, name: 'Keysha Aulia' },
  { id: 14, name: 'Kiran Adhya Narisha' },
  { id: 15, name: 'Muhammad Fakhar' },
  { id: 16, name: 'Nadine Rannu Gracia' },
  { id: 17, name: 'Rahadatul Aisy Hadraini' },
  { id: 18, name: 'Raden Mecca Puti A' },
  { id: 19, name: 'Raisya Permata Intania W' },
  { id: 20, name: 'Salsabiela Azzahra B' },
  { id: 21, name: 'Sandi Gunawan' },
  { id: 22, name: 'Shabrina Aqela' },
  { id: 23, name: 'Syaira Parifasha' },
  { id: 24, name: 'Syifa Azzahra Rifai' },
  { id: 25, name: 'Utin Muzfira Amira Fenisa' },
];

// Initial duty roster assignment
const initialDutyRoster = {
  Monday: [
    { id: 1, name: 'Alicia Shofi Destiani', present: true },
    { id: 2, name: 'Dahlia Puspita Ghaniaty', present: true },
    { id: 3, name: 'Dara Veronika Tariggas', present: true },
  ],
  Tuesday: [
    { id: 4, name: 'Fairuz Sahla Fallugah', present: true },
    { id: 5, name: 'Farid Ulya Firjatullah', present: true },
    { id: 6, name: 'Fathul Faigan Alfi', present: true },
  ],
  Wednesday: [
    { id: 7, name: 'Fredy Gabriell Tanjaya', present: true },
    { id: 8, name: 'Juliandika', present: true },
    { id: 9, name: 'Kalinda Pradipa', present: true },
  ],
  Thursday: [
    { id: 10, name: 'Kania Permata Widra', present: true },
    { id: 11, name: 'Keisya Ramadhani Huuriyah', present: true },
    { id: 12, name: 'Kenzo Alvaro Bautista', present: true },
  ],
  Friday: [
    { id: 13, name: 'Keysha Aulia', present: true },
    { id: 14, name: 'Kiran Adhya Narisha', present: true },
    { id: 15, name: 'Muhammad Fakhar', present: true },
  ],
};

export default function DutyRosterPage() {
  const [dutyRoster, setDutyRoster] = useState(initialDutyRoster);
  const [availableStudents, setAvailableStudents] = useState(studentData);

  const toggleAttendance = (day, studentId) => {
    setDutyRoster(prev => ({
      ...prev,
      [day]: prev[day].map(student => 
        student.id === studentId 
          ? { ...student, present: !student.present } 
          : student
      )
    }));
  };

  const addStudentToDay = (day, studentId) => {
    const studentToAdd = availableStudents.find(s => s.id === studentId);
    if (studentToAdd) {
      setDutyRoster(prev => ({
        ...prev,
        [day]: [...prev[day], { ...studentToAdd, present: true }]
      }));
    }
  };

  const removeStudentFromDay = (day, studentId) => {
    setDutyRoster(prev => ({
      ...prev,
      [day]: prev[day].filter(student => student.id !== studentId)
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <SideNav />
      <Header />

      <main className="ml-64 pt-16 p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Daftar Piket Kelas</h1>
          <p className="text-muted-foreground">
            Pengaturan jadwal piket harian untuk kelas XA
          </p>
        </div>

        <Tabs defaultValue="senin">
          <TabsList className="mb-6">
            <TabsTrigger value="senin">
              <Calendar className="h-4 w-4 mr-2" />
              Senin
            </TabsTrigger>
            <TabsTrigger value="selasa">
              <Calendar className="h-4 w-4 mr-2" />
              Selasa
            </TabsTrigger>
            <TabsTrigger value="rabu">
              <Calendar className="h-4 w-4 mr-2" />
              Rabu
            </TabsTrigger>
            <TabsTrigger value="kamis">
              <Calendar className="h-4 w-4 mr-2" />
              Kamis
            </TabsTrigger>
            <TabsTrigger value="jumat">
              <Calendar className="h-4 w-4 mr-2" />
              Jumat
            </TabsTrigger>
          </TabsList>

          <TabsContent value="senin">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-blue-500" />
                  Piket Hari Senin
                </CardTitle>
                <CardDescription>
                  Daftar siswa yang bertugas pada hari Senin
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dutyRoster.Monday.map(student => (
                    <div key={student.id} className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center">
                        {student.present ? (
                          <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                        ) : (
                          <Clock className="h-4 w-4 mr-2 text-yellow-500" />
                        )}
                        <span>{student.name}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => toggleAttendance('Monday', student.id)}
                        >
                          {student.present ? 'Absen' : 'Hadir'}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => removeStudentFromDay('Monday', student.id)}
                        >
                          Hapus
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <h3 className="font-medium mb-3">Tambah Siswa</h3>
                  <select 
                    className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                    onChange={(e) => addStudentToDay('Monday', parseInt(e.target.value))}
                  >
                    <option value="">Pilih siswa...</option>
                    {availableStudents
                      .filter(s => !dutyRoster.Monday.some(ds => ds.id === s.id))
                      .map(student => (
                        <option key={student.id} value={student.id}>
                          {student.name}
                        </option>
                      ))}
                  </select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="selasa">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-blue-500" />
                  Piket Hari Selasa
                </CardTitle>
                <CardDescription>
                  Daftar siswa yang bertugas pada hari Selasa
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dutyRoster.Tuesday.map(student => (
                    <div key={student.id} className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center">
                        {student.present ? (
                          <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                        ) : (
                          <Clock className="h-4 w-4 mr-2 text-yellow-500" />
                        )}
                        <span>{student.name}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => toggleAttendance('Tuesday', student.id)}
                        >
                          {student.present ? 'Absen' : 'Hadir'}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => removeStudentFromDay('Tuesday', student.id)}
                        >
                          Hapus
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <h3 className="font-medium mb-3">Tambah Siswa</h3>
                  <select 
                    className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                    onChange={(e) => addStudentToDay('Tuesday', parseInt(e.target.value))}
                  >
                    <option value="">Pilih siswa...</option>
                    {availableStudents
                      .filter(s => !dutyRoster.Tuesday.some(ds => ds.id === s.id))
                      .map(student => (
                        <option key={student.id} value={student.id}>
                          {student.name}
                        </option>
                      ))}
                  </select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rabu">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-blue-500" />
                  Piket Hari Rabu
                </CardTitle>
                <CardDescription>
                  Daftar siswa yang bertugas pada hari Rabu
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dutyRoster.Wednesday.map(student => (
                    <div key={student.id} className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center">
                        {student.present ? (
                          <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                        ) : (
                          <Clock className="h-4 w-4 mr-2 text-yellow-500" />
                        )}
                        <span>{student.name}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => toggleAttendance('Wednesday', student.id)}
                        >
                          {student.present ? 'Absen' : 'Hadir'}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => removeStudentFromDay('Wednesday', student.id)}
                        >
                          Hapus
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <h3 className="font-medium mb-3">Tambah Siswa</h3>
                  <select 
                    className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                    onChange={(e) => addStudentToDay('Wednesday', parseInt(e.target.value))}
                  >
                    <option value="">Pilih siswa...</option>
                    {availableStudents
                      .filter(s => !dutyRoster.Wednesday.some(ds => ds.id === s.id))
                      .map(student => (
                        <option key={student.id} value={student.id}>
                          {student.name}
                        </option>
                      ))}
                  </select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="kamis">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-blue-500" />
                  Piket Hari Kamis
                </CardTitle>
                <CardDescription>
                  Daftar siswa yang bertugas pada hari Kamis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dutyRoster.Thursday.map(student => (
                    <div key={student.id} className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center">
                        {student.present ? (
                          <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                        ) : (
                          <Clock className="h-4 w-4 mr-2 text-yellow-500" />
                        )}
                        <span>{student.name}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => toggleAttendance('Thursday', student.id)}
                        >
                          {student.present ? 'Absen' : 'Hadir'}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => removeStudentFromDay('Thursday', student.id)}
                        >
                          Hapus
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <h3 className="font-medium mb-3">Tambah Siswa</h3>
                  <select 
                    className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                    onChange={(e) => addStudentToDay('Thursday', parseInt(e.target.value))}
                  >
                    <option value="">Pilih siswa...</option>
                    {availableStudents
                      .filter(s => !dutyRoster.Thursday.some(ds => ds.id === s.id))
                      .map(student => (
                        <option key={student.id} value={student.id}>
                          {student.name}
                        </option>
                      ))}
                  </select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="jumat">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-blue-500" />
                  Piket Hari Jumat
                </CardTitle>
                <CardDescription>
                  Daftar siswa yang bertugas pada hari Jumat
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dutyRoster.Friday.map(student => (
                    <div key={student.id} className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center">
                        {student.present ? (
                          <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                        ) : (
                          <Clock className="h-4 w-4 mr-2 text-yellow-500" />
                        )}
                        <span>{student.name}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => toggleAttendance('Friday', student.id)}
                        >
                          {student.present ? 'Absen' : 'Hadir'}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => removeStudentFromDay('Friday', student.id)}
                        >
                          Hapus
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <h3 className="font-medium mb-3">Tambah Siswa</h3>
                  <select 
                    className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                    onChange={(e) => addStudentToDay('Friday', parseInt(e.target.value))}
                  >
                    <option value="">Pilih siswa...</option>
                    {availableStudents
                      .filter(s => !dutyRoster.Friday.some(ds => ds.id === s.id))
                      .map(student => (
                        <option key={student.id} value={student.id}>
                          {student.name}
                        </option>
                      ))}
                  </select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
