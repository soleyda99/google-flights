export interface FlightInfo {
  airlineName: string;
  logoUrl: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  from: string;
  to: string;
}

export interface Itinerary {
  legs: Array<{
    carriers: {
      marketing: Array<{
        name: string;
        logoUrl: string;
      }>;
    };
    departure: string;
    arrival: string;
    durationInMinutes: number;
    origin: {
      displayCode: string;
    };
    destination: {
      displayCode: string;
    };
  }>;
  price: {
    formatted: string;
  };
}

export interface SearchResultsProps {
  itineraries: Itinerary[];
  onClearResults?: () => void;
}
