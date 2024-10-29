import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "./ui/sidebar"

export default function TopBar() {
  return (
    // <header className="flex flex-1 h-16 p-5 gap-3 items-center shadow-sm mx-auto">
    <header className="flex flex-no-wrap z-10 bg-background sticky top-0 w-full h-16 p-5 gap-3 items-center shadow-sm mx-auto">
      <SidebarTrigger />
      <Separator orientation="vertical" />

      <div className="flex flex-1 justify-between">
        <div className="flex gap-2">
          <h1 className="font-semibold">Overcastly</h1>
        </div>

        <div className="flex">
          <h1>Example</h1>
        </div>
      </div>
    </header>
  );
}