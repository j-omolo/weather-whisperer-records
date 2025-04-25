
const API_KEY = "f589032dad83487aa7e84219252504";
const BASE_URL = "https://api.weatherapi.com/v1";

export interface WeatherData {
  temperature: string;
  condition: string;
  notes: string;
  date: string;
  location?: string;
}

export async function fetchCurrentWeather(location: string): Promise<WeatherData> {
  try {
    const response = await fetch(
      `${BASE_URL}/current.json?key=${API_KEY}&q=${encodeURIComponent(location)}`
    );
    
    if (!response.ok) {
      throw new Error("Weather data not available");
    }
    
    const data = await response.json();
    
    // Map API response to our app's data structure
    return {
      temperature: data.current.temp_c.toString(),
      condition: mapConditionToApp(data.current.condition.text),
      notes: `Humidity: ${data.current.humidity}%, Wind: ${data.current.wind_kph} km/h`,
      date: new Date().toISOString(),
      location: data.location.name
    };
  } catch (error) {
    console.error("Error fetching weather:", error);
    throw error;
  }
}

// Map API condition to our app conditions
function mapConditionToApp(apiCondition: string): string {
  const condition = apiCondition.toLowerCase();
  
  if (condition.includes("sun") || condition.includes("clear")) {
    return "sunny";
  } else if (condition.includes("rain") || condition.includes("drizzle") || condition.includes("shower")) {
    return "rainy";
  } else if (condition.includes("snow") || condition.includes("sleet") || condition.includes("ice")) {
    return "snowy";
  } else if (condition.includes("thunder") || condition.includes("storm")) {
    return "stormy";
  } else {
    return "cloudy"; // Default
  }
}
