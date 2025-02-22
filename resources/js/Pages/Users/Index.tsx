import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Department, LetterNumber, LetterType, User } from "@/types/types";
import { DataTable } from "./DataTable"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link, useForm } from "@inertiajs/react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog"
import React from "react";
import FormEdit from "@/components/user/form-edit";
import { Button } from "@/components/ui/button";

export default function Index({ users, departments }: PageProps<{ users: User[], departments: Department[] }>) {
    const [selectedUser, setSelectedUser] = React.useState<User>()
    const [dialogEditIsOpen, setDialogEditIsOpen] = React.useState(false)
    const [dialogDeleteIsOpen, setDialogDeleteIsOpen] = React.useState(false)

    const editUser = (user: User) => {
        setSelectedUser(user)
        setDialogEditIsOpen(true)
    }

    const deleteUser = (user: User) => {
        setSelectedUser(user)
        setDialogDeleteIsOpen(true)
    }

    const handleSuccessUpdate = () => {
        setDialogEditIsOpen(false)
    }

    const { delete: destroy, post, processing } = useForm()

    const handleDeleteUser = () => {
        destroy(route('users.destroy', selectedUser?.id.toString()))
    }

    const handleRestoreUser = () => {
        post(route('users.restore', selectedUser?.id.toString()))
    }

    return (
        <AuthenticatedLayout
            header={
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem className="hidden md:block">
                            <BreadcrumbLink href={route('dashboard')}>
                                Dashboard
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block" />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Nomor Surat</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            }
        >
            <DataTable data={users} departments={departments} onEdit={editUser} onDelete={deleteUser}/>
            <Dialog
                open={dialogEditIsOpen} onOpenChange={setDialogEditIsOpen}
            >
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit User</DialogTitle>
                        <DialogDescription />
                    </DialogHeader>
                    {selectedUser && (
                        <FormEdit user={selectedUser} onSuccess={handleSuccessUpdate} departments={departments} />
                    )}
                </DialogContent>
            </Dialog>
            <AlertDialog open={dialogDeleteIsOpen} onOpenChange={setDialogDeleteIsOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Apakah anda yakin?</AlertDialogTitle>
                        <AlertDialogDescription>
                            {!!selectedUser?.deleted_at ?
                                "Apakah anda yakin untuk memulihkan akun ini?" :
                                "Aksi ini akan menghapus semua informasi yang dimiliki pengguna terkait."
                            }
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction asChild>
                            {!selectedUser?.deleted_at ?
                            <Button
                                onClick={handleDeleteUser}
                                disabled={processing}
                            >Ya, Hapus</Button>
                            : <Button
                                onClick={handleRestoreUser}
                                disabled={processing}
                            >Ya, Pulihkan</Button>}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AuthenticatedLayout>
    )
}
