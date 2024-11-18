import { Edit2Icon, TrashIcon } from "lucide-react";
import { Button } from "./ui/button";
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
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function PostControls( {id}: {id: string} ) {
  const queryClient = useQueryClient();
  const [userData, setUserData] = useState([]);
  

  useEffect(() => {
    const userDataString = localStorage.getItem("userData");
    // const userData = userDataString ? JSON.parse(userDataString) : null;
    if (userDataString) {
      setUserData(JSON.parse(userDataString))
    }
    else console.log("Error parsing user data, perhaps the token is invalid?");
    
  }, []);

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer: ${userData["token"]}`,
  }

  const mutation = useMutation({
    mutationFn: () => {
      return axios.delete(`http://localhost:5000/api/deletepost/${id}`, {headers: headers});
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["repliesData"]);
      toast("Your post has been deleted.");
    }
  })

  function handleDelete() {
    event.preventDefault();
    console.log(`Deleting reply ${id}...`);

    mutation.mutate();
  }

  return (
    <div>
      <Button variant="ghost">
        <Edit2Icon />
      </Button>
      <Dialog>
        <DialogTrigger>
          <Button variant="ghost">
            <TrashIcon />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>Your post will be removed. This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" onClick={handleDelete} variant="destructive">
                Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}