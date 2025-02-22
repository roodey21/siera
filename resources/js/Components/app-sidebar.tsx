"use client"

import * as React from "react"
import { FileDigit, GalleryVerticalEnd, House, Mails, Pencil, Users2 } from "lucide-react"
import { route } from "ziggy-js";

import { SearchForm } from "@/components/search-form"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavMain } from "./nav-main"
import { Link, usePage } from "@inertiajs/react"
import { NavUser } from "./nav-user";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: House,
      isActive: false
    },
    {
      title: "Tulis Surat",
      url: "/dashboard/compose",
      icon: Pencil,
      isActive: false
    },
    {
      title: "Surat Menyurat",
      url: "#",
      icon: Mails,
      items: [
        {
          title: "Surat Masuk",
          url: '/dashboard/inbox',
          isActive: false
        },
        {
          title: "Surat Keluar",
          url: '/dashboard/sent',
          isActive: false
        },
        {
          title: "Disposisi",
          url: "#",
        },
      ],
    },
    {
      title: "Nomor Surat",
      url: '/dashboard/letter-number',
      icon: FileDigit,
      isActive: false
    },
    {
      title: "Kelola Pengguna",
      url: '/dashboard/users',
      icon: Users2
    }
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const page = usePage()

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href={route('dashboard')}>
                <div className="flex items-center justify-center rounded-lg aspect-square size-8 bg-sidebar-primary text-sidebar-primary-foreground">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Siera</span>
                  <span className="">Your Organization</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        {/* <SearchForm /> */}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <NavMain items={data.navMain}/>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser
            user={page.props.auth.user}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
