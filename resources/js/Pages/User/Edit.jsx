import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Edit({ user }) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "anggota",
        password: "",
        nim: user.mahasiswa?.nim || "",
        fakultas: user.mahasiswa?.fakultas || "",
        prodi: user.mahasiswa?.prodi || "",
        angkatan: user.mahasiswa?.angkatan || "",
    });

    const submit = (e) => {
        e.preventDefault();
        put(`/users/${user.id}`);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold text-gray-800">
                    Edit User
                </h2>
            }
        >
            <Head title="Edit User" />
            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Edit User Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={submit} className="space-y-4">
                                <div>
                                    <Label>Name</Label>
                                    <Input
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                    />
                                    {errors.name && (
                                        <p className="text-red-500">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <Label>Email</Label>
                                    <Input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                    />
                                    {errors.email && (
                                        <p className="text-red-500">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <Label>
                                        Password (Leave blank to keep current
                                        password)
                                    </Label>
                                    <Input
                                        type="password"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                    />
                                    {errors.password && (
                                        <p className="text-red-500">
                                            {errors.password}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <Label>Role</Label>
                                    <select
                                        value={data.role}
                                        onChange={(e) =>
                                            setData("role", e.target.value)
                                        }
                                        className="input w-full p-2 border rounded-md"
                                    >
                                        <option value="admin">Admin</option>
                                        <option value="anggota">Anggota</option>
                                    </select>
                                    {errors.role && (
                                        <p className="text-red-500">
                                            {errors.role}
                                        </p>
                                    )}
                                </div>

                                {data.role === "anggota" && (
                                    <>
                                        <div>
                                            <Label>NIM</Label>
                                            <Input
                                                value={data.nim}
                                                onChange={(e) =>
                                                    setData(
                                                        "nim",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {errors.nim && (
                                                <p className="text-red-500">
                                                    {errors.nim}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <Label>Fakultas</Label>
                                            <Input
                                                value={data.fakultas}
                                                onChange={(e) =>
                                                    setData(
                                                        "fakultas",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {errors.fakultas && (
                                                <p className="text-red-500">
                                                    {errors.fakultas}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <Label>Prodi</Label>
                                            <Input
                                                value={data.prodi}
                                                onChange={(e) =>
                                                    setData(
                                                        "prodi",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {errors.prodi && (
                                                <p className="text-red-500">
                                                    {errors.prodi}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <Label>Angkatan</Label>
                                            <Input
                                                value={data.angkatan}
                                                onChange={(e) =>
                                                    setData(
                                                        "angkatan",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {errors.angkatan && (
                                                <p className="text-red-500">
                                                    {errors.angkatan}
                                                </p>
                                            )}
                                        </div>
                                    </>
                                )}

                                <Button type="submit" disabled={processing}>
                                    Update
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
