import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { PageProps } from "@/types"
import { LetterNumber, LetterType } from "@/types/types"
import { DataTable } from "./DataTable"
import { columns } from "./Columns"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Head, Link } from "@inertiajs/react"

export default function Index({ letterNumbers, letterTypes }: PageProps<{ letterNumbers: LetterNumber[], letterTypes: LetterType[] }>) {
    return (
        <AuthenticatedLayout
            header={
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem className="hidden md:block">
                            <Link href={route('dashboard')}>
                                Dashboard
                            </Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block" />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Nomor Surat</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            }
        >
            <Head title="Nomor Surat" />

            <DataTable columns={columns} data={letterNumbers} letterTypes={letterTypes} />
        </AuthenticatedLayout>
    )
}
