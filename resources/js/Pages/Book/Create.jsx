
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function BookForm({ book = null }) {
    const isEdit = !!book;
    const { data, setData, post, put, processing, errors } = useForm({
        title: book?.title || "",
        author: book?.author || "",
        publisher: book?.publisher || "",
        year_published: book?.year_published || new Date().getFullYear(),
        total_stock: book?.total_stock || 0,
        available_stock: book?.available_stock || 0,
    });

    const submit = (e) => {
        e.preventDefault();
        isEdit ? put(`/books/${book.id}`) : post("/books");
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight">{isEdit ? 'Edit' : 'Create'} Book</h2>}>
            <Head title={isEdit ? 'Edit Book' : 'Create Book'} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>{isEdit ? 'Edit Book' : 'Add New Book'}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={submit} className="space-y-6">
                                {["title", "author", "publisher", "year_published", "total_stock", "available_stock"].map((field) => (
                                    <div key={field}>
                                        <Label htmlFor={field}>{field.replace("_", " ").toUpperCase()}</Label>
                                        <Input
                                            id={field}
                                            type={field.includes("stock") || field === "year_published" ? "number" : "text"}
                                            value={data[field]}
                                            onChange={(e) => setData(field, e.target.value)}
                                        />
                                        {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
                                    </div>
                                ))}
                                <Button type="submit" disabled={processing}>{isEdit ? 'Update' : 'Save'}</Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}