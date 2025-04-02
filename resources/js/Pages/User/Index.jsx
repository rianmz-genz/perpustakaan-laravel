import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Link, usePage, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableHeader,
    TableRow,
    TableCell,
    TableBody,
} from "@/components/ui/table";

const Index = () => {
    const { users } = usePage().props;

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this user?")) {
            router.delete(`/users/${id}`);
        }
    };
    console.log(users);
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    User
                </h2>
            }
        >
            <Head title="User" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <Link href={route("users.create")}>
                        <Button className="mt-4">Create User</Button>
                    </Link>

                    <Table className="mt-6">
                        <TableHeader>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                    <TableCell>
                                        <Link href={`/users/${user.id}/edit`}>
                                            <Button
                                                variant="outline"
                                                className="mr-2"
                                            >
                                                Edit
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="destructive"
                                            onClick={() =>
                                                handleDelete(user.id)
                                            }
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
