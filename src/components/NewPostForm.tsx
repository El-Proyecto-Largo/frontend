"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Label } from "@/components/ui/label"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "./ui/textarea"
import { useEffect, useState } from "react"
import { getUserData } from "@/lib/utils"
import ProfilePicture from "./ProfilePicture"
import { useMutation, useQueryClient } from "react-query"

import { SheetClose } from "./ui/sheet"
import axios from "axios"
import { toast } from "sonner"
import { Navigate, useNavigate } from "react-router-dom"

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

// TODO: image functionality still broken, 
const formSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Enter a title." })
    .max(50, { message: "Maximum word count is 50." }),
  body: z
    .string()
    .min(1, { message: "Enter body text." })
    .max(1000, { message: "Maximum word count is 1000 words." }),
  image: z
    .custom<File | undefined>()
    .refine(
      (file) => {
        console.log('File object for size check:', file);  // Log the actual file object
        return !file || file.size <= MAX_FILE_SIZE;
      },
      { message: "Maximum image size is 5 MB." }
    )
    .refine(
      (file) => {
        console.log('File object for type check:', file);  // Log the actual file object
        return !file || ACCEPTED_IMAGE_TYPES.includes(file?.type);
      },
      { message: ".jpg, .jpeg, .png, .webp files are accepted only" }
    ),
});

export default function NewPostForm({ setOpen }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [userData, setUserData] = useState([]);
  
  useEffect(() => {
    setUserData(getUserData());
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      body: "",
      image: "",
    }
  });

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer: ${userData["token"]}`,
  }

  const mutation = useMutation({
    mutationFn: (newPost) => {
      newPost["latitude"] = localStorage.getItem("latitude");
      newPost["longitude"] = localStorage.getItem('longitude');
      return axios.post(
        "http://localhost:5000/api/createpost",
        newPost,
        { headers: headers}
      );
    },
    onSuccess: (postData) => {
      console.log(postData.data.postId);
      queryClient.invalidateQueries(["postsData"]);
      navigate(`posts/${postData.data.postId}`);
      setOpen(false);
    },
    onError: (error) => {
      toast("Unable to create new post: " + error);
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    mutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Title</FormLabel> */}
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Body</FormLabel> */}
              <FormControl>
                <Textarea placeholder="Body" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel>Image</FormLabel> */}
              <FormControl>
                <Input type="file" id="image" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end mt-3">
          <Button type="submit">Create Post</Button>
        </div>
      </form>
    </Form>
  );
}