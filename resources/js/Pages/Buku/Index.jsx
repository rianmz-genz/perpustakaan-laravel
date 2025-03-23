import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";
import TableBuku from "./Partials/TableBuku";

const Index = ({ listBuku }) => {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Buku
                </h2>
            }
        >
            <Head title="Buku" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <TableBuku listBuku={listBuku} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
