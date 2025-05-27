"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "./ui/sidebar";
import { Link, usePage } from "@inertiajs/react";

export function NavMain({
  items
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
      isActive?: boolean;
      disabled?: boolean;
    }[];
    disabled?: boolean;
  }[]
}) {
  const { url } = usePage();

  return (
    <>
      {items.map((item, index) => {
        return (
        <Collapsible
            key={item.title}
            defaultOpen={!!item.items?.filter(item => item.url === url).length}
            className="group/collapsible"
        >
            <SidebarMenuItem>
            {item.items?.length ? (
                <>
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton isActive={url === item.url}>
                    {item.icon && <item.icon />}
                    <span>{item.title}{" "}</span>
                    {item.items?.length && (
                        <>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </>
                    )}
                    </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <SidebarMenuSub>
                    {item.items.map((item) => (
                        <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild isActive={url === item.url}>
                            <Link href={item.url} disabled={item.disabled}>{item.title}</Link>
                        </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                    ))}
                    </SidebarMenuSub>
                </CollapsibleContent>
                </>
            ) : (
                <SidebarMenuButton className="w-full" asChild isActive={url === item.url}>
                <Link href={item.url} disabled={item.disabled}>
                    {item.icon && <item.icon />}
                    <span>{item.title}{" "}</span>
                    {item.items?.length && (
                    <>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </>
                    )}
                </Link>
                </SidebarMenuButton>
            )}
            </SidebarMenuItem>
        </Collapsible>
        )
      })}
    </>
  );
}
