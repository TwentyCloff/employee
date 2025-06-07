"use client";

import { Header } from "@/components/dashboard/Header";
import { SideNav } from "@/components/dashboard/SideNav";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Users } from "lucide-react";

// Student data for duty roster - EDIT THIS TO CHANGE STUDENTS
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

// Initial duty roster assignment - EDIT THIS TO CHANGE SCHEDULE
const initialDutyRoster = {
  Monday: [
    { id: 1, name: 'Alicia Shofi Destiani' },
    { id: 2, name: 'Dahlia Puspita Ghaniaty' },
    { id: 3, name: 'Dara Veronika Tariggas' },
    { id: 4, name: 'Fairuz Sahla Fallugah' },
    { id: 5, name: 'Farid Ulya Firjatullah' },
  ],
  Tuesday: [
    { id: 6, name: 'Fathul Faigan Alfi' },
    { id: 7, name: 'Fredy Gabriell Tanjaya' },
    { id: 8, name: 'Juliandika' },
    { id: 9, name: 'Kalinda Pradipa' },
    { id: 10, name: 'Kania Permata Widra' },
  ],
  Wednesday: [
    { id: 11, name: 'Keisya Ramadhani Huuriyah' },
    { id: 12, name: 'Kenzo Alvaro Bautista' },
    { id: 13, name: 'Keysha Aulia' },
    { id: 14, name: 'Kiran Adhya Narisha' },
    { id: 15, name: 'Muhammad Fakhar' },
  ],
  Thursday: [
    { id: 16, name: 'Nadine Rannu Gracia' },
    { id: 17, name: 'Rahadatul Aisy Hadraini' },
    { id: 18, name: 'Raden Mecca Puti A' },
    { id: 19, name: 'Raisya Permata Intania W' },
    { id: 20, name: 'Salsabiela Azzahra B' },
  ],
  Friday: [
    { id: 21, name: 'Sandi Gunawan' },
    { id: 22, name: 'Shabrina Aqela' },
    { id: 23, name: 'Syaira Parifasha' },
    { id: 24, name: 'Syifa Azzahra Rifai' },
    { id: 25, name: 'Utin Muzfira Amira Fenisa' },
  ],
};

export default function DutyRosterPage() {
  const [dutyRoster] = useState(initialDutyRoster);

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
                <div className="space-y-3">
                  {dutyRoster.Monday.map(student => (
                    <div key={student.id} className="p-3 border rounded-md">
                      {student.name}
                    </div>
                  ))}
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
                <div className="space-y-3">
                  {dutyRoster.Tuesday.map(student => (
                    <div key={student.id} className="p-3 border rounded-md">
                      {student.name}
                    </div>
                  ))}
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
                <div className="space-y-3">
                  {dutyRoster.Wednesday.map(student => (
                    <div key={student.id} className="p-3 border rounded-md">
                      {student.name}
                    </div>
                  ))}
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
                <div className="space-y-3">
                  {dutyRoster.Thursday.map(student => (
                    <div key={student.id} className="p-3 border rounded-md">
                      {student.name}
                    </div>
                  ))}
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
                <div className="space-y-3">
                  {dutyRoster.Friday.map(student => (
                    <div key={student.id} className="p-3 border rounded-md">
                      {student.name}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
