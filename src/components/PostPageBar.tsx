import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { SendHorizonalIcon, ImageIcon } from "lucide-react";

// TODO

export default function PostPageBar() {
  return (
    <div className="flex flex-nowrap z-10 bg-background sticky top-0 w-full p-5 gap-3 items-center shadow-sm mx-auto">
      <Textarea placeholder="Leave a reply..."/>
      <div className="flex flex-col gap-2">
        <Button variant="outline">
          <ImageIcon />
        </Button>
        <Button>
          <SendHorizonalIcon />
        </Button>
      </div>
    </div>
  );
}