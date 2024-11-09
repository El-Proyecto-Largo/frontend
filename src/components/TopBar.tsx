import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "./ui/sidebar"

import PostThreadAuthor from "./PostThreadAuthor";

export default function TopBar() {
  return (
    <nav className="flex flex-no-wrap z-10 bg-background sticky top-0 w-full h-16 p-5 gap-3 items-center shadow-sm mx-auto">
      <SidebarTrigger />
      <Separator orientation="vertical" />

      <div className="flex flex-1 justify-between">
        <div className="flex gap-2">
          <h1 className="font-semibold">Overcastly</h1>
        </div>

        <div className="flex">
          {/* <PostThreadAuthor authorId={JSON.parse(localStorage.getItem("userData")).userId} /> */}
          
        </div>
      </div>
    </nav>
  );
}