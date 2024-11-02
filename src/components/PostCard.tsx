import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Badge } from "@/components/ui/badge";

interface PostCardProps {
  title: string,
  body: string,
  image: string | null,
  latitude: number,
  longitude: number,
  author: string,
  tags: string[] | null,
}

export default function PostCard({ title, body, image, latitude, longitude, author, tags }: PostCardProps) {
  return (
    <Card className="break-inside-avoid mb-5">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          <div className="flex gap-2 flex-wrap">
            {tags ? tags.map((tag) => (<Badge>{tag}</Badge>)): <></>}
          </div>
        </CardDescription>

      </CardHeader>
      {image ? <CardContent><img src={image} className="object-cover h-48 w-48"/></CardContent> : <></>}
      <CardFooter>
        {body}
      </CardFooter>
    </Card>
  );
}