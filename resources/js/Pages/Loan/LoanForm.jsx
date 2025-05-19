import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function LoanForm({ loan }) {
    const [showReturnDialog, setShowReturnDialog] = useState(false);
    const hasReturn = !!loan.return;
    const isReturned = loan.is_returned;
    console.log(loan);
    const { data, setData, put, processing, errors } = useForm({
        loan_date: loan.loan_date || new Date().toISOString().slice(0, 10),
        due_date: loan.due_date || new Date().toISOString().slice(0, 10),
        is_returned: loan.is_returned || false,
    });

    const {
        data: returnForm,
        setData: setReturnForm,
        post: postReturn,
        processing: returnProcessing,
        errors: returnErrors,
    } = useForm({
        return_date: new Date().toISOString().slice(0, 10),
        is_damaged: false,
        is_lost: false,
        is_late: false,
        damage_description: "",
        fine_amount: 0,
        replacement_instructions: "",
    });

    const handleLoanUpdate = (e) => {
        e.preventDefault();
        put(`/loans/${loan.id}`);
    };

    const handleReturnSubmit = () => {
        postReturn(`/returns/${loan.id}`);
    };

    return (
        <AuthenticatedLayout header={<h2>Edit Loan</h2>}>
            <Head title="Edit Loan" />

            <div className="py-12 max-w-4xl mx-auto space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Informasi Peminjaman</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="flex flex-col items-start">
                            <Label>Nama Peminjam</Label>
                            <Link className="underline italic" href={`/users/${loan.request?.user?.id}`}>{loan.request?.user?.name}</Link>
                        </div>
                        <div>
                            <Label>Email</Label>
                            <p>{loan.request?.user?.email}</p>
                        </div>
                        <div className="flex flex-col items-start">
                            <p>Judul Buku</p>
                            <a className="italic underline" href={`/boooks/${loan.request?.book?.id}`}>{loan.request?.book?.title}</a>
                        </div>
                        <div>
                            <Label>Penulis</Label>
                            <p>{loan.request?.book?.author}</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Edit Loan</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLoanUpdate} className="space-y-4">
                            <div>
                                <Label>Loan Date</Label>
                                <Input
                                    type="date"
                                    value={data.loan_date}
                                    onChange={(e) =>
                                        setData("loan_date", e.target.value)
                                    }
                                />
                                {errors.loan_date && (
                                    <p className="text-red-500 text-sm">
                                        {errors.loan_date}
                                    </p>
                                )}
                            </div>
                            <div>
                                <Label>Due Date</Label>
                                <Input
                                    type="date"
                                    value={data.due_date}
                                    onChange={(e) =>
                                        setData("due_date", e.target.value)
                                    }
                                />
                                {errors.due_date && (
                                    <p className="text-red-500 text-sm">
                                        {errors.due_date}
                                    </p>
                                )}
                            </div>

                            {(!isReturned || !hasReturn) && !loan.return && (
                                <Button type="submit" disabled={processing}>
                                    Update Loan
                                </Button>
                            )}
                        </form>
                    </CardContent>
                </Card>

                {!isReturned && !hasReturn && (
                    <div className="flex justify-end">
                        <Dialog
                            open={showReturnDialog}
                            onOpenChange={setShowReturnDialog}
                        >
                            <DialogTrigger asChild>
                                <Button variant="secondary">
                                    Atur Pengembalian
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Form Pengembalian</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                    <div>
                                        <Label>Tanggal Pengembalian</Label>
                                        <Input
                                            type="date"
                                            value={returnForm.return_date}
                                            onChange={(e) => {
                                                const returnDate =
                                                    e.target.value;
                                                setReturnForm(
                                                    "return_date",
                                                    returnDate
                                                );
                                                const isLate =
                                                    new Date(returnDate) >
                                                    new Date(loan.due_date);
                                                setReturnForm(
                                                    "is_late",
                                                    isLate
                                                );
                                            }}
                                        />
                                        {returnErrors.return_date && (
                                            <p className="text-red-500 text-sm">
                                                {returnErrors.return_date}
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex gap-4">
                                        <label className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                checked={returnForm.is_damaged}
                                                onChange={(e) =>
                                                    setReturnForm(
                                                        "is_damaged",
                                                        e.target.checked
                                                    )
                                                }
                                            />
                                            <span>Rusak</span>
                                        </label>
                                        <label className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                checked={returnForm.is_lost}
                                                onChange={(e) =>
                                                    setReturnForm(
                                                        "is_lost",
                                                        e.target.checked
                                                    )
                                                }
                                            />
                                            <span>Hilang</span>
                                        </label>
                                    </div>

                                    {returnForm.is_damaged && (
                                        <div>
                                            <Label>Deskripsi Kerusakan</Label>
                                            <Input
                                                value={
                                                    returnForm.damage_description
                                                }
                                                onChange={(e) =>
                                                    setReturnForm(
                                                        "damage_description",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    )}

                                    {returnForm.is_lost && (
                                        <div>
                                            <Label>Instruksi Penggantian</Label>
                                            <Input
                                                value={
                                                    returnForm.replacement_instructions
                                                }
                                                onChange={(e) =>
                                                    setReturnForm(
                                                        "replacement_instructions",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    )}

                                    <div>
                                        <Label>Denda (Rp)</Label>
                                        <Input
                                            type="number"
                                            value={returnForm.fine_amount}
                                            onChange={(e) =>
                                                setReturnForm(
                                                    "fine_amount",
                                                    parseFloat(e.target.value)
                                                )
                                            }
                                        />
                                    </div>

                                    {returnForm.is_late && (
                                        <div>
                                            <Label>Status</Label>
                                            <p className="text-yellow-600 font-medium">
                                                Terlambat
                                            </p>
                                        </div>
                                    )}

                                    <div className="flex justify-end gap-2">
                                        <Button
                                            variant="outline"
                                            onClick={() =>
                                                setShowReturnDialog(false)
                                            }
                                        >
                                            Batal
                                        </Button>
                                        <Button
                                            onClick={handleReturnSubmit}
                                            disabled={returnProcessing}
                                        >
                                            Simpan Pengembalian
                                        </Button>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                )}
                {(isReturned || hasReturn) && loan.return && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Informasi Pengembalian</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label>Tanggal Pengembalian</Label>
                                <p>{loan.return.return_date}</p>
                            </div>
                            <div>
                                <Label>Status Keterlambatan</Label>
                                <p
                                    className={
                                        loan.return.is_late
                                            ? "text-yellow-600"
                                            : ""
                                    }
                                >
                                    {loan.return.is_late
                                        ? "Terlambat"
                                        : "Tepat Waktu"}
                                </p>
                            </div>
                            <div>
                                <Label>Rusak</Label>
                                <p>{loan.return.is_damaged ? "Ya" : "Tidak"}</p>
                            </div>
                            {loan.return.is_damaged && (
                                <div>
                                    <Label>Deskripsi Kerusakan</Label>
                                    <p>
                                        {loan.return.damage_description || "-"}
                                    </p>
                                </div>
                            )}
                            <div>
                                <Label>Hilang</Label>
                                <p>{loan.return.is_lost ? "Ya" : "Tidak"}</p>
                            </div>
                            {loan.return.is_lost && (
                                <div>
                                    <Label>Instruksi Penggantian</Label>
                                    <p>
                                        {loan.return.replacement_instructions ||
                                            "-"}
                                    </p>
                                </div>
                            )}
                            <div>
                                <Label>Denda</Label>
                                <p>
                                    Rp{" "}
                                    {parseFloat(
                                        loan.return.fine_amount
                                    ).toLocaleString()}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
