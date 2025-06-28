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

export default function Index({ loans }) {
    const { delete: destroy } = useForm();
    console.log(loans);
    return (
        <AuthenticatedLayout header={<h2>Peminjaman</h2>}>
            <Head title="Loan Requests" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto space-y-6 sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader className="flex justify-between items-start">
                            <CardTitle>Daftar Peminjaman</CardTitle>
                            {/* <Link href={route("loans.create")}>
                                <Button>Create Peminjaman</Button>
                            </Link> */}
                        </CardHeader>
                        <CardContent className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableCell>
                                            Permintaan Peminjaman
                                        </TableCell>
                                        <TableCell>
                                            Tanggal Peminjaman
                                        </TableCell>
                                        <TableCell>
                                            Tenggat Peminjaman
                                        </TableCell>
                                        <TableCell>
                                            Sudah Dikembalikan
                                        </TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {loans.map((lr) => (
                                        <TableRow key={lr.id}>
                                            <TableCell className="p-2">
                                                <Link
                                                className="underline"
                                                    href={`/loanrequests/${lr.request.id}/edit`}
                                                >
                                                    Permintaan {lr.request.id}
                                                </Link>
                                            </TableCell>
                                            <TableCell className="p-2">
                                                {lr.loan_date}
                                            </TableCell>
                                            <TableCell className="p-2">
                                                {lr.due_date}
                                            </TableCell>
                                            <TableCell className="p-2">
                                                {lr.is_returned
                                                    ? "Ya"
                                                    : "Belum"}
                                            </TableCell>
                                            <TableCell className="p-2 space-x-2">
                                                <Link
                                                    href={`/loans/${lr.id}/edit`}
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
                                                                        `/loans/${lr.id}`
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
