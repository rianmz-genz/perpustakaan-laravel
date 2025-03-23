import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function TableBuku({ listBuku }) {
    return (
        <Table>
            <TableHeader className="bg-primary rounded-md">
                <TableRow>
                    <TableHead className="text-primary-foreground">ISBN</TableHead>
                    <TableHead className="text-primary-foreground">Judul</TableHead>
                    <TableHead className="text-primary-foreground">Penerbit</TableHead>
                    <TableHead className="text-primary-foreground">Penulis</TableHead>
                    <TableHead className="text-primary-foreground">Tahun Terbit</TableHead>
                    <TableHead className="text-primary-foreground">Stok</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {listBuku.map((buku) => (
                    <TableRow key={buku.id}>
                        <TableCell className="font-medium">
                            {buku.isbn}
                        </TableCell>
                        <TableCell>{buku.judul}</TableCell>
                        <TableCell>{buku.penerbit}</TableCell>
                        <TableCell>{buku.penulis}</TableCell>
                        <TableCell>{buku.tahun_terbit}</TableCell>
                        <TableCell>{buku.stok}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
