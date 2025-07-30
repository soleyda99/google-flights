export interface SearchData {
  tripType: string;
  passengers: {
    adults: number;
    childrens: number;
    infants: number;
  };
  cabinClass: string;
  origin: string;
  destination: string;
  originSkyId: string;
  originEntityId: string;
  destinationSkyId: string;
  destinationEntityId: string;
  date: string;
  returnDate: string;
}

export interface AirportSuggestion {
  skyId: string;
  entityId: string;
  presentation: {
    title: string;
    suggestionTitle: string;
    subtitle: string;
  };
  navigation: {
    entityId: string;
    entityType: "CITY" | "AIRPORT";
    localizedName: string;
    relevantFlightParams: {
      skyId: string;
      entityId: string;
      flightPlaceType: string;
      localizedName: string;
    };
  };
}
