
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, Search } from "lucide-react";
import { fetchCurrentWeather } from "@/services/weatherService";
import { useToast } from "@/hooks/use-toast";

const WeatherForm = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const [temperature, setTemperature] = useState("");
  const [condition, setCondition] = useState("");
  const [notes, setNotes] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      temperature,
      condition,
      notes,
      date: new Date().toISOString(),
      location: location || undefined,
    });
    setTemperature("");
    setCondition("");
    setNotes("");
  };

  const handleFetchWeather = async () => {
    if (!location.trim()) {
      toast({
        title: "Location required",
        description: "Please enter a location to fetch weather data",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const data = await fetchCurrentWeather(location);
      setTemperature(data.temperature);
      setCondition(data.condition);
      setNotes(data.notes);
      
      toast({
        title: "Weather fetched",
        description: `Current weather for ${data.location}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch weather data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white/60 backdrop-blur-lg rounded-xl shadow-lg">
      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <div className="flex space-x-2">
          <Input
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter city name"
            className="bg-white/80 flex-1"
          />
          <Button 
            type="button" 
            onClick={handleFetchWeather} 
            disabled={loading}
            variant="outline"
          >
            {loading ? (
              <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
            ) : (
              <Search className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="temperature">Temperature (°C)</Label>
        <Input
          id="temperature"
          type="number"
          value={temperature}
          onChange={(e) => setTemperature(e.target.value)}
          placeholder="Enter temperature"
          required
          className="bg-white/80"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="condition">Weather Condition</Label>
        <Select value={condition} onValueChange={setCondition} required>
          <SelectTrigger id="condition" className="bg-white/80">
            <SelectValue placeholder="Select condition" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sunny">
              <div className="flex items-center gap-2">
                <Sun className="h-4 w-4" />
                Sunny
              </div>
            </SelectItem>
            <SelectItem value="cloudy">
              <div className="flex items-center gap-2">
                <Cloud className="h-4 w-4" />
                Cloudy
              </div>
            </SelectItem>
            <SelectItem value="rainy">
              <div className="flex items-center gap-2">
                <CloudRain className="h-4 w-4" />
                Rainy
              </div>
            </SelectItem>
            <SelectItem value="snowy">
              <div className="flex items-center gap-2">
                <CloudSnow className="h-4 w-4" />
                Snowy
              </div>
            </SelectItem>
            <SelectItem value="stormy">
              <div className="flex items-center gap-2">
                <CloudLightning className="h-4 w-4" />
                Stormy
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add your weather observations..."
          className="bg-white/80"
        />
      </div>

      <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
        Record Weather
      </Button>
    </form>
  );
};

export default WeatherForm;
