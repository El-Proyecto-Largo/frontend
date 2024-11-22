import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "./ui/sidebar"
import { Button } from "./ui/button";
import { MapPinIcon, PlusIcon } from "lucide-react";

import PostThreadAuthor from "./PostThreadAuthor";
import { useEffect, useState } from "react";
import NewPostForm from "./NewPostForm";
import NewPostDialog from "./NewPostDialog";

export default function TopBar() {
  const [zip, setZip] = useState("");

  useEffect(() => {
    const zipCode = localStorage.getItem('zip');
    if (zipCode) {
      setZip(zipCode);
    }
  }, []);

  return (
    <nav className="flex flex-no-wrap z-10 bg-background sticky top-0 w-full h-16 p-5 gap-3 items-center shadow-sm mx-auto">
      <SidebarTrigger />
      <Separator orientation="vertical" />

      <div className="flex flex-1 justify-between">
        <div className="flex gap-2 my-auto">
          <h1 className="font-semibold">Overcastly</h1>
        </div>

        <div className="flex gap-3">
          {/* <PostThreadAuthor authorId={JSON.parse(localStorage.getItem("userData")).userId} /> */}
          <NewPostDialog />

          <Button variant="ghost">
            <MapPinIcon />
            {zip ? <p>{zip}</p> : <p>No location!</p>}
          </Button>
        </div>
      </div>
    </nav>
  );
}