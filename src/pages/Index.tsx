
import React from "react";
import WeatherForm from "@/components/WeatherForm";
import WeatherCard from "@/components/WeatherCard";

const Index = () => {
  const [records, setRecords] = React.useState<any[]>([]);

  const handleSubmit = (data: any) => {
    setRecords((prev) => [data, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F1F0FB] p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-2">Weather Records</h1>
          <p className="text-muted-foreground">Track and record your local weather observations</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <WeatherForm onSubmit={handleSubmit} />
          </div>
          
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {records.map((record, index) => (
                <WeatherCard key={index} record={record} />
              ))}
            </div>
            {records.length === 0 && (
              <div className="text-center p-8 bg-white/60 backdrop-blur-lg rounded-xl">
                <p className="text-muted-foreground">No weather records yet. Start by adding one!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
