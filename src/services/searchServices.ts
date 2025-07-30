import type { SearchData } from "../shared/components/Search/interfaces/types";
import axiosInstance from "./interceptor";

export const getAirports = async (origin: string) => {
  const response = await axiosInstance.get(
    `v1/flights/searchAirport?query=${origin}&locale=en-US`
  );
  return response.data;
};

export const searchFlights = async (data: SearchData) => {
  const response = await axiosInstance.get(
    `v2/flights/searchFlightsComplete?originSkyId=${data.originSkyId}&date=${data.date}&returnDate=${data.returnDate}&destinationSkyId=${data.destinationSkyId}&originEntityId=${data.originEntityId}&destinationEntityId=${data.destinationEntityId}&cabinClass=${data.cabinClass}&adults=${data.passengers.adults}&sortBy=best&currency=USD&market=en-US&countryCode=US`
  );
  return response.data;
};
