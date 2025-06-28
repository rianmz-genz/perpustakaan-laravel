import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
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
import { Badge } from "@/components/ui/badge";

export default function Index({ loanRequests }) {
    const { delete: destroy } = useForm();
    console.log(loanRequests);
    return (
        <AuthenticatedLayout header={<h2>Loan Requests</h2>}>
            <Head title="Loan Requests" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto space-y-6 sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader className="flex justify-between items-start">
                            <CardTitle>Daftar Permintaan Peminjaman</CardTitle>
                            <Link href={route("loanrequests.create")}>
                                <Button>Create Permintaan Peminjaman</Button>
                            </Link>
                        </CardHeader>
                        <CardContent className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableCell>User</TableCell>
                                        <TableCell>Book</TableCell>
                                        <TableCell>Request</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {loanRequests.map((lr) => (
                                        <TableRow key={lr.id}>
                                            <TableCell className="p-2">
                                                {lr.user?.name}
                                            </TableCell>
                                            <TableCell className="p-2">
                                                {lr.book?.title}
                                            </TableCell>
                                            <TableCell className="p-2">
                                                {lr.request_date}
                                            </TableCell>
                                            <TableCell className="p-2 space-x-3">
                                                {statusMapping[lr.status]}
                                                {lr.loan && <Link
                                                    className="underline"
                                                    href={`/loans/${lr.loan.id}/edit`}
                                                >
                                                    Peminjaman {lr.loan.id}
                                                </Link>}
                                            </TableCell>
                                            <TableCell className="p-2 space-x-2">
                                                <Link
                                                    href={`/loanrequests/${lr.id}/edit`}
                                                >
                                                    <Button size="sm">
                                                        Edit
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
                                                                size="sm"
                                                                onClick={() => {
                                                                    destroy(
                                                                        `/loanrequests/${lr.id}`
                                                                    );
                                                                }}
                                                            >
                                                                Delete
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
}

const statusMapping = {
    pending: <Badge variant={"yellow"}>Pending</Badge>,
    approved: <Badge variant={"default"}>Diterima</Badge>,
    rejected: <Badge variant={"destructive"}>Ditolak</Badge>,
};
