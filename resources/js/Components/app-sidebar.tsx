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
import axios from "axios";
import menus from "../data/menus"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const page = usePage()
  const userRoles = page.props.auth.user?.roles.map(role => role.name) || []

  const filteredMenu = menus.navMain
  .map(menu => {
    if (menu.items) {
      const filteredItems = menu.items.filter(item =>
        !item.roles || item.roles.some(role => userRoles.includes(role))
      );

      if (filteredItems.length > 0) {
        return { ...menu, items: filteredItems };
      }
    } else {
      if (!menu.roles || menu.roles.some(role => userRoles.includes(role))) {
        return menu;
      }
    }

    return null;
  })
  .filter(menu => menu !== null);

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
            <NavMain items={filteredMenu}/>
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
