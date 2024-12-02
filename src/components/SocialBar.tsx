import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

import { MapPinIcon, PlusIcon } from "lucide-react";
import { Slider } from "./ui/slider";
import { cn } from "@/lib/utils";

// TODO

export default function SocialBar() {

  return (
    <div className="flex flex-nowrap z-10 bg-background sticky top-[4rem] w-full ps-5 pe-5 pb-3 gap-3 items-center shadow-sm mx-auto">
      <div className="flex flex-1 justify-between">
        <div className="flex flex-col gap-2">
          <Input placeholder="Search..." />
        </div>

        <div className="flex">
          <Slider 
            defaultValue={[30]}
            min={1}
            max={500}
            step={1}
            className="w-32"
          /> 
        </div>
      </div>
    </div>
  );
}