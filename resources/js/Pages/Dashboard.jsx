import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const peminjamData = [
    { name: 'Asep', jumlah: 14 },
    { name: 'Rina', jumlah: 11 },
    { name: 'Budi', jumlah: 9 },
    { name: 'Tari', jumlah: 8 },
    { name: 'Doni', jumlah: 7 },
];

const bukuFavorit = [
    { name: 'Laskar Pelangi', value: 12 },
    { name: 'Bumi', value: 10 },
    { name: 'Negeri 5 Menara', value: 8 },
    { name: 'Dilan 1990', value: 6 },
];

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-8 sm:px-6 lg:px-8">

                    {/* Chart: Top Peminjam */}
                    <Card>
                        <CardContent className="p-6">
                            <h3 className="mb-4 text-lg font-medium text-gray-700">Top Peminjam</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart layout="vertical" data={peminjamData} margin={{ left: 20 }}>
                                    <XAxis type="number" />
                                    <YAxis dataKey="name" type="category" />
                                    <Tooltip />
                                    <Bar dataKey="jumlah" fill="#8884d8" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Chart: Buku yang Digemari */}
                    <Card>
                        <CardContent className="p-6">
                            <h3 className="mb-4 text-lg font-medium text-gray-700">Buku yang Paling Digemari</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={bukuFavorit}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                        label
                                    >
                                        {bukuFavorit.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
