
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning } from "lucide-react";

interface WeatherRecord {
  temperature: string;
  condition: string;
  notes: string;
  date: string;
}

const WeatherIcon = ({ condition }: { condition: string }) => {
  switch (condition) {
    case "sunny":
      return <Sun className="h-6 w-6 text-yellow-500" />;
    case "cloudy":
      return <Cloud className="h-6 w-6 text-gray-500" />;
    case "rainy":
      return <CloudRain className="h-6 w-6 text-blue-500" />;
    case "snowy":
      return <CloudSnow className="h-6 w-6 text-blue-200" />;
    case "stormy":
      return <CloudLightning className="h-6 w-6 text-purple-500" />;
    default:
      return null;
  }
};

const WeatherCard = ({ record }: { record: WeatherRecord }) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg bg-white/60 backdrop-blur-lg border-none">
      <CardHeader className="flex flex-row items-center justify-between bg-primary/5 p-4">
        <div className="flex items-center gap-2">
          <WeatherIcon condition={record.condition} />
          <span className="capitalize font-medium">{record.condition}</span>
        </div>
        <span className="text-sm text-muted-foreground">
          {new Date(record.date).toLocaleDateString()}
        </span>
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-2">
          <span className="text-2xl font-bold">{record.temperature}°C</span>
        </div>
        {record.notes && (
          <p className="text-sm text-muted-foreground">{record.notes}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
