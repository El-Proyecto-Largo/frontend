import axios from "axios";
import { useQuery } from "react-query";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import PostThreadAuthor from "./PostThreadAuthor";

export interface ReplyProps {
  title?: string,
  body: string,
  image: string | null,
  latitude?: number,
  longitude?: number,
  authorId: string,
  tags?: string[] | null,
  id: string,
}

// TODO

export default function PostThreadReplyCard({ body, image, authorId, id }: ReplyProps) {
  return (
    <div className="flex flex-wrap flex-1">
      <div>
        <PostThreadAuthor authorId={authorId}/>
      </div>

      <Card className="grow">
        <CardContent>
          {body}
        </CardContent>
        <CardFooter>

        </CardFooter>
      </Card>

    </div>
  );
}