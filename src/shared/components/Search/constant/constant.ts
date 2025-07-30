export const TRIP_TYPES = [
  { value: "1", label: "Ida y vuelta" },
  { value: "2", label: "Solo ida" },
];

export const CLASS_OPTIONS = [
  { value: "economy", label: "Turista" },
  { value: "premium_economy", label: "Turista Premium " },
  { value: "business", label: "Bussiness" },
  { value: "first", label: "Primera" },
];

export const DEFAULT_SEARCH_DATA = {
  tripType: "1",
  passengers: {
    adults: 1,
    childrens: 0,
    infants: 0,
  },
  cabinClass: "economy",
  origin: "",
  destination: "",
  originSkyId: "",
  originEntityId: "",
  destinationSkyId: "",
  destinationEntityId: "",
  date: "",
  returnDate: "",
};
