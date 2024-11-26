import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"


import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import NewPostForm from "./NewPostForm";
import { useEffect, useState } from "react";
import { getUserData } from "@/lib/utils";
import PostThreadAuthor from "./PostThreadAuthor";

export default function NewPostDialog() {
  const [userData, setUserData] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setUserData(getUserData());
  }, []);

  return (
    // <Dialog>
    //   <DialogTrigger asChild>
    //     <Button variant="ghost">
    //       <PlusIcon />
    //     </Button>
    //   </DialogTrigger>
    //   <DialogContent className="sm:max-w-md">
    //     <DialogHeader className="gap-3">
    //       <DialogTitle>Create Post</DialogTitle>
    // <div className="flex justify-center align-middle md:justify-normal md:align-baseline">
    //   {userData ? <PostThreadAuthor authorId={userData["userId"]}/> : <></>}
    // </div>
    //     </DialogHeader>
    //     <div className="flex items-center space-x-2">
    //       <div className="grid flex-1 gap-2">
    //         <NewPostForm />
    //       </div>

    //     </div>
    //   </DialogContent>
    // </Dialog>

    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Button variant="ghost">
          <PlusIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create Post</SheetTitle>
        </SheetHeader>
        <div className="pb-4 pt-4">
          {userData ? <PostThreadAuthor authorId={userData["userId"]} /> : <></>}
        </div>
        <NewPostForm setOpen={setOpen} />
      </SheetContent>
    </Sheet>

  );
}