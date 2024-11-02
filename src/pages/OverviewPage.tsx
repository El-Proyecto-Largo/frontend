import MapView from "@/components/MapView";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


export default function OverviewPage() {
  return (
    <>
      <div className="flex min-h-screen p-10 gap-5">
        <div className="grow">
          <Card>
            <CardHeader>
              <CardTitle>Map View</CardTitle>
              <CardDescription>Map view (probably going to use the same component)</CardDescription>
            </CardHeader>
            <CardContent>
              {/* <MapView className="h-96"/> */}
            </CardContent>
          </Card>
        </div>

        <div className="gap-5">
          <Card>
            <CardHeader>
              <CardTitle>View 1</CardTitle>
              <CardDescription>meow</CardDescription>
            </CardHeader>
            <CardContent>
              <img src="https://purr.objects-us-east-1.dream.io/i/AwO5H.jpg" width={200}/>    
            </CardContent>
            <CardFooter>footer</CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>RSS Feed</CardTitle>
              <CardDescription>meow</CardDescription>
            </CardHeader>
            <CardContent>
              <img src="https://purr.objects-us-east-1.dream.io/i/AwO5H.jpg" width={200}/>    
            </CardContent>
            <CardFooter>footer</CardFooter>
          </Card>
        </div>
     </div>
    </>
  );
}