import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

import { MapPinIcon, PlusIcon } from "lucide-react";

// TODO

export default function SocialBar() {
  return (
    <div className="flex flex-nowrap z-10 bg-background sticky top-0 w-full ps-5 pe-5 pb-3 gap-3 items-center shadow-sm mx-auto">
      <div className="flex flex-1 justify-between">
        <div className="flex flex-col gap-2">
          <Input placeholder="Search..." />
        </div>

        <div className="flex flex-col gap-2">
          <Button variant="ghost">
            <PlusIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}