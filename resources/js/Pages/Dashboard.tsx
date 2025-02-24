import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Bell, FileText, Inbox, Send} from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from '@/components/ui/breadcrumb';
// import {LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer} from "recharts";

const data = [
{month: "Jan", masuk: 40, keluar: 30 },
{month: "Feb", masuk: 50, keluar: 40 },
{month: "Mar", masuk: 45, keluar: 35 },
{month: "Apr", masuk: 60, keluar: 50 },
{month: "Mei", masuk: 55, keluar: 45 },
];

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbPage>Dashboard</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            }
        >
            <Head title="Dashboard" />

            <div className="grid grid-cols-1 col-span-3 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* Ringkasan Surat */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle>Total Surat Masuk</CardTitle>
                        <Inbox className="w-6 h-6 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">120</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle>Total Surat Keluar</CardTitle>
                        <Send className="w-6 h-6 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">85</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle>Surat Diproses</CardTitle>
                        <FileText className="w-6 h-6 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">15</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle>Notifikasi</CardTitle>
                        <Bell className="w-6 h-6 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-lg">2 Surat butuh tindakan segera</p>
                    </CardContent>
                </Card>

                {/* Grafik Surat Masuk & Keluar */}
                <Card className="col-span-2">
                    <CardHeader>
                        <CardTitle>Statistik Surat</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={data}>
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="masuk" stroke="#3b82f6" strokeWidth={2} />
                                <Line type="monotone" dataKey="keluar" stroke="#10b981" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer> */}
                    </CardContent>
                </Card>

                {/* Akses Cepat */}
                <Card className="col-span-2">
                    <CardHeader>
                        <CardTitle>Akses Cepat</CardTitle>
                    </CardHeader>
                    <CardContent className="flex gap-4">
                        <Link href={route('letter.compose.create')}>
                            <Button variant="default">Buat Surat Baru</Button>
                        </Link>
                        <Button variant="outline">Cetak Laporan</Button>
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
