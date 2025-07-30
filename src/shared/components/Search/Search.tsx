import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Button,
  Select,
  MenuItem,
  FormControl,
  IconButton,
  Grid,
} from "@mui/material";

import {
  SwapHoriz as SwapIcon,
  FlightTakeoff as FlightTakeoffIcon,
  LocationOn as LocationIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import {
  TRIP_TYPES,
  CLASS_OPTIONS,
  DEFAULT_SEARCH_DATA,
} from "./constant/constant";
import { PassengerSelector } from "./components/PassengerSelector";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AirportSelector } from "./components/AirportSelector";
import type { SearchData } from "./interfaces/types";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { searchFlights } from "../../../services/searchServices";

const Search = () => {
  const [searchData, setSearchData] = useState<SearchData>(DEFAULT_SEARCH_DATA);

  const handleSwapLocations = () => {
    setSearchData((prev) => ({
      ...prev,
      origin: prev.destination,
      destination: prev.origin,
      originSkyId: prev.destinationSkyId,
      originEntityId: prev.destinationEntityId,
      destinationSkyId: prev.originSkyId,
      destinationEntityId: prev.originEntityId,
    }));
  };

  const handleSearch = async () => {
    const response = await searchFlights(searchData);
    console.log(response, "prueba");
  };

  const handleOriginChange = (
    value: string,
    skyId: string,
    entityId: string
  ) => {
    setSearchData((prev) => ({
      ...prev,
      origin: value,
      originSkyId: skyId,
      originEntityId: entityId,
    }));
  };

  const handleDestinationChange = (
    value: string,
    skyId: string,
    entityId: string
  ) => {
    setSearchData((prev) => ({
      ...prev,
      destination: value,
      destinationSkyId: skyId,
      destinationEntityId: entityId,
    }));
  };

  const handleDateChange = (date: Dayjs | null) => {
    if (date) {
      const formattedDate = date.format("YYYY-MM-DD");
      setSearchData((prev) => ({
        ...prev,
        date: formattedDate,
      }));
    }
  };

  const handleReturnDateChange = (date: Dayjs | null) => {
    if (date) {
      const formattedDate = date.format("YYYY-MM-DD");
      setSearchData((prev) => ({
        ...prev,
        returnDate: formattedDate,
      }));
    }
  };

  return (
    <Card sx={{ marginBottom: "50px", overflow: "visible" }}>
      <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 }, overflow: "visible" }}>
        {/* Top Row - Dropdowns */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <FormControl size="small">
            <Select
              value={searchData.tripType}
              onChange={(e) =>
                setSearchData((prev) => ({
                  ...prev,
                  tripType: e.target.value,
                  returnDate: "",
                }))
              }
              startAdornment={<SwapIcon sx={{ color: "grey.500", mr: 1 }} />}
            >
              {TRIP_TYPES.map((tripType) => (
                <MenuItem key={tripType.value} value={tripType.value}>
                  {tripType.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <PassengerSelector
            value={searchData.passengers}
            onChange={(passengers) =>
              setSearchData((prev) => ({
                ...prev,
                passengers,
              }))
            }
          />

          <FormControl size="small">
            <Select
              value={searchData.cabinClass}
              onChange={(e) =>
                setSearchData((prev) => ({
                  ...prev,
                  cabinClass: e.target.value,
                }))
              }
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              {CLASS_OPTIONS.map((classOption) => (
                <MenuItem key={classOption.value} value={classOption.value}>
                  {classOption.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Origin/Destination & Dates */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, sm: 5 }}>
            <AirportSelector
              value={searchData.origin}
              onChange={handleOriginChange}
              placeholder="Origen"
              icon={<FlightTakeoffIcon sx={{ color: "grey.500", mr: 1 }} />}
            />
          </Grid>
          <Grid
            size={{ xs: 12, sm: 2 }}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton
              onClick={handleSwapLocations}
              sx={{
                width: 40,
                height: 40,
              }}
            >
              <SwapIcon />
            </IconButton>
          </Grid>
          <Grid size={{ xs: 12, sm: 5 }}>
            <AirportSelector
              value={searchData.destination}
              onChange={handleDestinationChange}
              placeholder="Destino"
              icon={<LocationIcon sx={{ color: "grey.500", mr: 1 }} />}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: searchData.tripType === "2" ? 12 : 6 }}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Fecha de ida"
                format="DD-MM-YYYY"
                onChange={handleDateChange}
                slotProps={{
                  textField: {
                    fullWidth: true,
                  },
                }}
                minDate={dayjs()}
              />
            </DemoContainer>
          </Grid>

          {searchData.tripType !== "2" && (
            <Grid size={{ xs: 12, sm: 6 }}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Fecha de vuelta"
                  format="DD-MM-YYYY"
                  onChange={handleReturnDateChange}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                    },
                  }}
                  minDate={dayjs(searchData.date)}
                />
              </DemoContainer>
            </Grid>
          )}
        </Grid>

        {/* Search Button */}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            onClick={handleSearch}
            startIcon={<SearchIcon />}
            size="medium"
            sx={{
              borderRadius: 8,
            }}
          >
            Buscar
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
export default Search;
