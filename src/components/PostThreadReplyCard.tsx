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

import { dateFromObjectId } from "@/lib/utils";

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
    <div>
      <Card className="grow">
        <CardHeader>
          <PostThreadAuthor authorId={authorId}/>
        </CardHeader>
        <CardContent>
          {body}
          {image ? <img src={image} className="rounded-sm object-scale-down mt-3"/> : <></>}
        </CardContent>
        <CardFooter>
          <CardDescription>
            {`${dateFromObjectId(id).toLocaleTimeString()} · ${dateFromObjectId(id).toDateString()} `}
          </CardDescription>
        </CardFooter>
      </Card>

    </div>
  );
}