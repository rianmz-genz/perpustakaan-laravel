import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        password: "",
        role: "anggota",
        nim: "",
        fakultas: "",
        prodi: "",
        angkatan: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post("/users");
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Create User</h2>}
        >
            <Head title="Create User" />

            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Create a New User</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData("name", e.target.value)}
                                    />
                                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData("email", e.target.value)}
                                    />
                                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={data.password}
                                        onChange={(e) => setData("password", e.target.value)}
                                    />
                                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="role">Role</Label>
                                    <select
                                        id="role"
                                        value={data.role}
                                        onChange={(e) => setData("role", e.target.value)}
                                        className="w-full border rounded-md p-2"
                                    >
                                        <option value="admin">Admin</option>
                                        <option value="anggota">Anggota</option>
                                    </select>
                                    {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
                                </div>

                                {data.role === "anggota" && (
                                    <>
                                        <div>
                                            <Label htmlFor="nim">NIM</Label>
                                            <Input
                                                id="nim"
                                                value={data.nim}
                                                onChange={(e) => setData("nim", e.target.value)}
                                            />
                                            {errors.nim && <p className="text-red-500 text-sm">{errors.nim}</p>}
                                        </div>

                                        <div>
                                            <Label htmlFor="fakultas">Fakultas</Label>
                                            <Input
                                                id="fakultas"
                                                value={data.fakultas}
                                                onChange={(e) => setData("fakultas", e.target.value)}
                                            />
                                            {errors.fakultas && <p className="text-red-500 text-sm">{errors.fakultas}</p>}
                                        </div>

                                        <div>
                                            <Label htmlFor="prodi">Prodi</Label>
                                            <Input
                                                id="prodi"
                                                value={data.prodi}
                                                onChange={(e) => setData("prodi", e.target.value)}
                                            />
                                            {errors.prodi && <p className="text-red-500 text-sm">{errors.prodi}</p>}
                                        </div>

                                        <div>
                                            <Label htmlFor="angkatan">Angkatan</Label>
                                            <Input
                                                id="angkatan"
                                                type="number"
                                                value={data.angkatan}
                                                onChange={(e) => setData("angkatan", e.target.value)}
                                            />
                                            {errors.angkatan && <p className="text-red-500 text-sm">{errors.angkatan}</p>}
                                        </div>
                                    </>
                                )}

                                <Button type="submit" disabled={processing}>
                                    Save
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
