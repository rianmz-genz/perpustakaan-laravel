import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

export default function LoanRequestForm({
    loanRequest = null,
    users = [],
    books = [],
}) {
    const isEdit = !!loanRequest;
    const [showApproveDialog, setShowApproveDialog] = useState(false);
    const [dueDate, setDueDate] = useState(
        new Date().toISOString().slice(0, 10)
    );

    const { data, setData, post, put, processing, errors } = useForm({
        user_id: loanRequest?.user_id || "",
        book_id: loanRequest?.book_id || "",
        request_date:
            loanRequest?.request_date || new Date().toISOString().slice(0, 10),
        status: loanRequest?.status || "pending",
    });

    const handleApprove = () => {
        router.post(`/loanrequests/${loanRequest.id}/acc-or-reject`, {
            status: "approved",
            due_date: dueDate,
        });
    };

    const handleReject = () => {
        router.post(`/loanrequests/${loanRequest.id}/acc-or-reject`, {
            status: "rejected",
        });
    };

    const submit = (e) => {
        e.preventDefault();
        isEdit ? put(`/loanrequests/${loanRequest.id}`) : post("/loanrequests");
    };

    return (
        <AuthenticatedLayout
            header={<h2>{isEdit ? "Edit" : "Create"} Loan Request</h2>}
        >
            <Head
                title={isEdit ? "Edit Loan Request" : "Create Loan Request"}
            />

            <div className="py-12 max-w-4xl mx-auto space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>
                            {isEdit ? "Edit Loan Request" : "Add Loan Request"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <Label>User</Label>
                                <select
                                    value={data.user_id}
                                    onChange={(e) =>
                                        setData("user_id", e.target.value)
                                    }
                                    className="w-full border p-2 rounded"
                                >
                                    <option value="">Select user</option>
                                    {users.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.user_id && (
                                    <p className="text-red-500 text-sm">
                                        {errors.user_id}
                                    </p>
                                )}
                            </div>
                            <div>
                                <Label>Book</Label>
                                <select
                                    value={data.book_id}
                                    onChange={(e) =>
                                        setData("book_id", e.target.value)
                                    }
                                    className="w-full border p-2 rounded"
                                >
                                    <option value="">Select book</option>
                                    {books.map((book) => (
                                        <option key={book.id} value={book.id}>
                                            {book.title}
                                        </option>
                                    ))}
                                </select>
                                {errors.book_id && (
                                    <p className="text-red-500 text-sm">
                                        {errors.book_id}
                                    </p>
                                )}
                            </div>
                            <div>
                                <Label>Request Date</Label>
                                <Input
                                    type="date"
                                    value={data.request_date}
                                    onChange={(e) =>
                                        setData("request_date", e.target.value)
                                    }
                                />
                                {errors.request_date && (
                                    <p className="text-red-500 text-sm">
                                        {errors.request_date}
                                    </p>
                                )}
                            </div>

                            {(!isEdit ||  loanRequest?.status === "pending") && (
                                <Button type="submit" disabled={processing}>
                                    {isEdit ? "Update" : "Save"}
                                </Button>
                            )}
                        </form>
                    </CardContent>
                </Card>

                {/* Actions if pending */}
                {isEdit && loanRequest?.status === "pending" && (
                    <div className="flex gap-4 justify-end">
                        {/* Reject */}
                        <Button variant="destructive" onClick={handleReject}>
                            Reject
                        </Button>

                        {/* Approve */}
                        <Dialog
                            open={showApproveDialog}
                            onOpenChange={setShowApproveDialog}
                        >
                            <DialogTrigger asChild>
                                <Button variant="default">Approve</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Set Due Date</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                    <div>
                                        <Label>Tenggat Pengembalian</Label>
                                        <Input
                                            type="date"
                                            value={dueDate}
                                            onChange={(e) =>
                                                setDueDate(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <Button
                                            variant="outline"
                                            onClick={() =>
                                                setShowApproveDialog(false)
                                            }
                                        >
                                            Cancel
                                        </Button>
                                        <Button onClick={handleApprove}>
                                            Submit
                                        </Button>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
