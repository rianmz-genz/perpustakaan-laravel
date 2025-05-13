import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoanRequestForm({ loanRequest = null, users = [], books = [] }) {
    const isEdit = !!loanRequest;
    const { data, setData, post, put, processing, errors } = useForm({
        user_id: loanRequest?.user_id || "",
        book_id: loanRequest?.book_id || "",
        request_date: loanRequest?.request_date || new Date().toISOString().slice(0, 10),
        status: loanRequest?.status || "pending",
    });
    console.log(data, loanRequest)

    const submit = (e) => {
        e.preventDefault();
        isEdit ? put(`/loanrequests/${loanRequest.id}`) : post("/loanrequests");
    };

    return (
        <AuthenticatedLayout header={<h2>{isEdit ? 'Edit' : 'Create'} Loan Request</h2>}>
            <Head title={isEdit ? 'Edit Loan Request' : 'Create Loan Request'} />

            <div className="py-12 max-w-4xl mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle>{isEdit ? 'Edit Loan Request' : 'Add Loan Request'}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <Label>User</Label>
                                <select value={data.user_id} onChange={e => setData('user_id', e.target.value)} className="w-full border p-2 rounded">
                                    <option value="">Select user</option>
                                    {users.map(user => (
                                        <option key={user.id} value={user.id}>{user.name}</option>
                                    ))}
                                </select>
                                {errors.user_id && <p className="text-red-500 text-sm">{errors.user_id}</p>}
                            </div>
                            <div>
                                <Label>Book</Label>
                                <select value={data.book_id} onChange={e => setData('book_id', e.target.value)} className="w-full border p-2 rounded">
                                    <option value="">Select book</option>
                                    {books.map(book => (
                                        <option key={book.id} value={book.id}>{book.title}</option>
                                    ))}
                                </select>
                                {errors.book_id && <p className="text-red-500 text-sm">{errors.book_id}</p>}
                            </div>
                            <div>
                                <Label>Request Date</Label>
                                <Input type="date" value={data.request_date} onChange={e => setData('request_date', e.target.value)} />
                                {errors.request_date && <p className="text-red-500 text-sm">{errors.request_date}</p>}
                            </div>
                            <div>
                                <Label>Status</Label>
                                <select value={data.status} onChange={e => setData('status', e.target.value)} className="w-full border p-2 rounded">
                                    {["pending", "approved", "rejected"].map(status => (
                                        <option key={status} value={status}>{status}</option>
                                    ))}
                                </select>
                                {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}
                            </div>

                            <Button type="submit" disabled={processing}>
                                {isEdit ? 'Update' : 'Save'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
