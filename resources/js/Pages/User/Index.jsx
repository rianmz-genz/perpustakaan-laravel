import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableHeader,
    TableRow,
    TableCell,
    TableBody,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog";

const Index = () => {
    const { users } = usePage().props;

    const handleDelete = (id) => {
        router.delete(`/users/${id}`);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Pengguna
                </h2>
            }
        >
            <Head title="User" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader className="flex items-start justify-between">
                            <CardTitle className="text-lg font-bold">
                                Daftar Pengguna
                            </CardTitle>
                            <Link href={route("users.create")}>
                                <Button>Buat Pengguna</Button>
                            </Link>
                        </CardHeader>

                        <CardContent className="overflow-x-auto">
                            <Table>
                                <TableHeader className="bg-primary text-primary-foreground">
                                    <TableRow>
                                        <TableCell className="font-semibold">
                                            Nama
                                        </TableCell>
                                        <TableCell className="font-semibold">
                                            Email
                                        </TableCell>
                                        <TableCell className="font-semibold">
                                            Role
                                        </TableCell>
                                        <TableCell className="font-semibold text-center">
                                            Aksi
                                        </TableCell>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {users.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell>{user.name}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>{user.role}</TableCell>
                                            <TableCell className="text-center">
                                                <Link
                                                    href={`/users/${user.id}/edit`}
                                                >
                                                    <Button
                                                        variant="outline"
                                                        className="mr-2"
                                                    >
                                                        Ubah
                                                    </Button>
                                                </Link>

                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button variant="destructive">
                                                            Delete
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>
                                                                Are you sure?
                                                            </DialogTitle>
                                                        </DialogHeader>
                                                        <p>
                                                            This action cannot
                                                            be undone.
                                                        </p>
                                                        <DialogFooter>
                                                            <Button variant="outline">
                                                                Cancel
                                                            </Button>
                                                            <Button
                                                                variant="destructive"
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        user.id
                                                                    )
                                                                }
                                                            >
                                                                Hapus
                                                            </Button>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </Dialog>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
