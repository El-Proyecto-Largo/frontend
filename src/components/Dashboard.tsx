import { SidebarProvider } from "@/components/ui/sidebar"
import { Outlet } from "react-router-dom"
import AppSidebar from "./AppSidebar"
import TopBar from "./TopBar"
import axios from 'axios';

// TODO

export default function Dashboard() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-col flex-1">
        <TopBar />
        <main className="h-[calc(100vh-4rem)]">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  )
}