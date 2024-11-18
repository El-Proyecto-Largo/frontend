import { SidebarProvider } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/sonner"
import { Outlet } from "react-router-dom"
import AppSidebar from "./AppSidebar"
import TopBar from "./TopBar"

// TODO

export default function Dashboard() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-col flex-1">
        <TopBar />
        <main>
          <Outlet />
        </main>
        <Toaster />
      </div>
    </SidebarProvider>
  )
}