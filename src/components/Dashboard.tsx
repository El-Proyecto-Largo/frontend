import { SidebarProvider } from "@/components/ui/sidebar"
import { Outlet } from "react-router-dom"
import AppSidebar from "./AppSidebar"
import TopBar from "./TopBar"

export default function Dashboard() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-col flex-1">
        <TopBar />
        <main className="">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  )
}