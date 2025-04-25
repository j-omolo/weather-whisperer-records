
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning } from "lucide-react";

const WeatherForm = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const [temperature, setTemperature] = React.useState("");
  const [condition, setCondition] = React.useState("");
  const [notes, setNotes] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      temperature,
      condition,
      notes,
      date: new Date().toISOString(),
    });
    setTemperature("");
    setCondition("");
    setNotes("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white/60 backdrop-blur-lg rounded-xl shadow-lg">
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
