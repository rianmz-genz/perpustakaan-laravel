
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import {
    Table, TableHeader, TableRow, TableCell, TableBody
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger
} from "@/components/ui/dialog";

export default function Index() {
    const { books } = usePage().props;

    const handleDelete = (id) => {
        router.delete(`/books/${id}`);
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold">Book Management</h2>}>
            <Head title="Books" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto space-y-6 sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader className="flex justify-between items-start">
                            <CardTitle>List of Books</CardTitle>
                            <Link href={route("books.create")}><Button>Create Book</Button></Link>
                        </CardHeader>
                        <CardContent className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableCell>Title</TableCell>
                                        <TableCell>Author</TableCell>
                                        <TableCell>Publisher</TableCell>
                                        <TableCell>Year</TableCell>
                                        <TableCell>Stock</TableCell>
                                        <TableCell>Available</TableCell>
                                        <TableCell className="text-center">Actions</TableCell>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {books.map((book) => (
                                        <TableRow key={book.id}>
                                            <TableCell>{book.title}</TableCell>
                                            <TableCell>{book.author}</TableCell>
                                            <TableCell>{book.publisher}</TableCell>
                                            <TableCell>{book.year_published}</TableCell>
                                            <TableCell>{book.total_stock}</TableCell>
                                            <TableCell>{book.available_stock}</TableCell>
                                            <TableCell className="text-center">
                                                <Link href={`/books/${book.id}/edit`}><Button variant="outline" className="mr-2">Edit</Button></Link>
                                                <Dialog>
                                                    <DialogTrigger asChild><Button variant="destructive">Delete</Button></DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>Are you sure?</DialogTitle>
                                                        </DialogHeader>
                                                        <p>This action cannot be undone.</p>
                                                        <DialogFooter>
                                                            <Button variant="outline">Cancel</Button>
                                                            <Button variant="destructive" onClick={() => handleDelete(book.id)}>Delete</Button>
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