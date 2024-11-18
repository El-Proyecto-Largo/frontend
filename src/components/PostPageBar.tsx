import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Form } from "./ui/form";
import { SendHorizonalIcon, ImageIcon } from "lucide-react";
import { QueryClient, useIsMutating, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { RefObject, useEffect, useState } from "react";
import { Input } from "./ui/input";
import { toast } from "sonner"
import PostThreadAuthor from "./PostThreadAuthor";

// TODO



export default function PostPageBar({ id, bottomRef }: {id: string, bottomRef: RefObject<HTMLDivElement>}) {
  const queryClient = useQueryClient();

  const [replyBody, setReplyBody] = useState("");
  const [replyImage, setReplyImage] = useState(null);
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
    mutationFn: (newReply) => {
      return axios.post(
        "http://localhost:5000/api/createreply", 
        newReply, 
        {headers: headers}
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["repliesData"]);
      toast("Successfully created post!"); 
    },
    onError: (error) => {
      toast("Encountered an error when trying to reply: " + error)
    }
  });

  function handleReplyBody(e: any): void {
    setReplyBody(e.target.value);
  }

  function handleReplyImage(e: any): void {
    setReplyImage(e.target.value);
  }

  function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(`Creating reply to ${id}...`);

    // const userDataString = localStorage.getItem("userData");
    // const userData = userDataString ? JSON.parse(userDataString) : null;

    mutation.mutate({ body: replyBody, image: replyImage, originalPostId: id });
  }

  return (
    <Form>
      <form id="replyForm" onSubmit={handleSubmit} className="flex flex-nowrap z-10 bg-background sticky top-0 w-full p-5 gap-3 items-center shadow-sm mx-auto">
          {/* <Textarea placeholder="Leave a reply..."/> */}
          <Input type="textarea" placeholder="Leave a reply..." onChange={handleReplyBody}/>
          <div className="flex gap-2">
            <Button variant="outline">
              <ImageIcon />
            </Button>
            <Button type="submit">
              <SendHorizonalIcon />
            </Button>
          </div>
      </form>
    </Form>
  );
}