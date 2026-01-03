"use client";

import * as React from "react";
import { Bot, Command, SquareTerminal } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";

const data = {
  navMain: [
    {
      title: "Anime",
      url: "/",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Anime Search",
          url: "/anime-search"
        },
        {
          title: "Top Anime",
          url: "/top/anime"
        },
        {
          title: "Seasonal Anime",
          url: "#"
        }
      ]
    },
    {
      title: "Manga",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Manga Search",
          url: "#"
        },
        {
          title: "Top Manga",
          url: "#"
        }
      ]
    }
  ]
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Ani Track - TS</span>
                  <span className="truncate text-xs">AnimeList</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
    </Sidebar>
  );
}
