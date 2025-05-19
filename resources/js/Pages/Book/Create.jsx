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
        cover_image: null, // Tambahkan ini
    });
    const submit = (e) => {
        e.preventDefault();

        if (isEdit) {
            post(`/books/${book.id}`, {
                method: "put", // Method spoofing
            });
        } else {
            post("/books", { forceFormData: true });
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight">
                    {isEdit ? "Edit" : "Create"} Book
                </h2>
            }
        >
            <Head title={isEdit ? "Edit Book" : "Create Book"} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                {isEdit ? "Edit Book" : "Add New Book"}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form
                                onSubmit={submit}
                                className="space-y-6"
                                encType="multipart/form-data"
                            >
                                {[
                                    "title",
                                    "author",
                                    "publisher",
                                    "year_published",
                                    "total_stock",
                                    "available_stock",
                                ].map((field) => (
                                    <div key={field}>
                                        <Label htmlFor={field}>
                                            {field
                                                .replace("_", " ")
                                                .toUpperCase()}
                                        </Label>
                                        <Input
                                            id={field}
                                            type={
                                                field.includes("stock") ||
                                                field === "year_published"
                                                    ? "number"
                                                    : "text"
                                            }
                                            value={data[field]}
                                            onChange={(e) =>
                                                setData(field, e.target.value)
                                            }
                                        />
                                        {errors[field] && (
                                            <p className="text-red-500 text-sm">
                                                {errors[field]}
                                            </p>
                                        )}
                                    </div>
                                ))}
                                {isEdit && book.cover_image && (
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">
                                            Current Cover:
                                        </p>
                                        <img
                                            src={`/storage/${book.cover_image}`}
                                            alt="Cover"
                                            className="w-32 rounded"
                                        />
                                    </div>
                                )}

                                <div>
                                    <Label htmlFor="cover_image">
                                        Cover Image
                                    </Label>
                                    <Input
                                        id="cover_image"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) =>
                                            setData(
                                                "cover_image",
                                                e.target.files[0]
                                            )
                                        }
                                    />
                                    {errors.cover_image && (
                                        <p className="text-red-500 text-sm">
                                            {errors.cover_image}
                                        </p>
                                    )}
                                </div>

                                <Button type="submit" disabled={processing}>
                                    {isEdit ? "Update" : "Save"}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
