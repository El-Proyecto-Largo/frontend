import LatestPosts from "@/components/LatestPosts";
import MapView from "@/components/MapView";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import WeatherConditions from "@/components/WeatherConditions";


export default function OverviewPage() {
  return (
    <>
      <div className="grid columns-1 justify-center md:flex p-10 gap-5">
        {/* <div className="grow">
          <Card>
            <CardHeader>
              <CardTitle>Map View</CardTitle>
              <CardDescription>Map view (probably going to use the same component)</CardDescription>
            </CardHeader>
            <CardContent>
              <MapView className="h-96"/>
            </CardContent>
          </Card>
        </div> */}
        <div>
          <WeatherConditions />
        </div>
        <div>
          <LatestPosts />
        </div>
        <div>
          <LatestPosts />
        </div>
     </div>
    </>
  );
}