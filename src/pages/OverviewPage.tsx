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
      <div className="flex p-10 gap-5">
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
        <WeatherConditions />
     </div>
    </>
  );
}