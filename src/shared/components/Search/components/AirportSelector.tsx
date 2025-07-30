import { useState } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  Typography,
  Chip,
} from "@mui/material";
import {
  Flight as FlightIcon,
  LocationCity as CityIcon,
} from "@mui/icons-material";
import type { AirportSuggestion } from "../interfaces/types";
import { useDebounce } from "../hooks/debounceTime";

interface AirportSelectorProps {
  value: string;
  onChange: (value: string, skyId: string, entityId: string) => void;
  placeholder: string;
  icon: React.ReactNode;
}

export const AirportSelector = ({
  value,
  onChange,
  placeholder,
  icon,
}: AirportSelectorProps) => {
  const [suggestions, setSuggestions] = useState<AirportSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const getAirportSuggestions = async (
    query: string
  ): Promise<AirportSuggestion[]> => {
    if (!query || query.length < 3) return [];

    try {
      // const response = await getAirports(query);

      const body = {
        status: true,
        timestamp: 1753908526036,
        data: [
          {
            skyId: "BUEA",
            entityId: "27536465",
            presentation: {
              title: "Buenos Aires",
              suggestionTitle: "Buenos Aires (Any)",
              subtitle: "Argentina",
            },
            navigation: {
              entityId: "27536465",
              entityType: "CITY",
              localizedName: "Buenos Aires",
              relevantFlightParams: {
                skyId: "BUEA",
                entityId: "27536465",
                flightPlaceType: "CITY",
                localizedName: "Buenos Aires",
              },
              relevantHotelParams: {
                entityId: "27536465",
                entityType: "CITY",
                localizedName: "Buenos Aires",
              },
            },
          },
          {
            skyId: "EZE",
            entityId: "95673318",
            presentation: {
              title: "Buenos Aires Ministro Pistarini",
              suggestionTitle: "Buenos Aires Ministro Pistarini (EZE)",
              subtitle: "Argentina",
            },
            navigation: {
              entityId: "95673318",
              entityType: "AIRPORT",
              localizedName: "Buenos Aires Ministro Pistarini",
              relevantFlightParams: {
                skyId: "EZE",
                entityId: "95673318",
                flightPlaceType: "AIRPORT",
                localizedName: "Buenos Aires Ministro Pistarini",
              },
              relevantHotelParams: {
                entityId: "27536465",
                entityType: "CITY",
                localizedName: "Buenos Aires",
              },
            },
          },
          {
            skyId: "AEP",
            entityId: "128668190",
            presentation: {
              title: "Buenos Aires Jorge Newbery",
              suggestionTitle: "Buenos Aires Jorge Newbery (AEP)",
              subtitle: "Argentina",
            },
            navigation: {
              entityId: "128668190",
              entityType: "AIRPORT",
              localizedName: "Buenos Aires Jorge Newbery",
              relevantFlightParams: {
                skyId: "AEP",
                entityId: "128668190",
                flightPlaceType: "AIRPORT",
                localizedName: "Buenos Aires Jorge Newbery",
              },
              relevantHotelParams: {
                entityId: "27536465",
                entityType: "CITY",
                localizedName: "Buenos Aires",
              },
            },
          },
          {
            skyId: "BUN",
            entityId: "128668350",
            presentation: {
              title: "Buenaventura",
              suggestionTitle: "Buenaventura (BUN)",
              subtitle: "Colombia",
            },
            navigation: {
              entityId: "128668350",
              entityType: "AIRPORT",
              localizedName: "Buenaventura",
              relevantFlightParams: {
                skyId: "BUN",
                entityId: "128668350",
                flightPlaceType: "AIRPORT",
                localizedName: "Buenaventura",
              },
              relevantHotelParams: {
                entityId: "27539610",
                entityType: "CITY",
                localizedName: "Buenaventura",
              },
            },
          },
          {
            skyId: "PSO",
            entityId: "128668935",
            presentation: {
              title: "Pasto",
              suggestionTitle: "Pasto (PSO)",
              subtitle: "Colombia",
            },
            navigation: {
              entityId: "128668935",
              entityType: "AIRPORT",
              localizedName: "Pasto",
              relevantFlightParams: {
                skyId: "PSO",
                entityId: "128668935",
                flightPlaceType: "AIRPORT",
                localizedName: "Pasto",
              },
              relevantHotelParams: {
                entityId: "27546048",
                entityType: "CITY",
                localizedName: "Pasto",
              },
            },
          },
          {
            skyId: "MDQ",
            entityId: "95673708",
            presentation: {
              title: "Mar Del Plata",
              suggestionTitle: "Mar Del Plata (MDQ)",
              subtitle: "Argentina",
            },
            navigation: {
              entityId: "95673708",
              entityType: "AIRPORT",
              localizedName: "Mar Del Plata",
              relevantFlightParams: {
                skyId: "MDQ",
                entityId: "95673708",
                flightPlaceType: "AIRPORT",
                localizedName: "Mar Del Plata",
              },
              relevantHotelParams: {
                entityId: "27544890",
                entityType: "CITY",
                localizedName: "Mar Del Plata",
              },
            },
          },
          {
            skyId: "BHI",
            entityId: "128668280",
            presentation: {
              title: "Bahia Blanca",
              suggestionTitle: "Bahia Blanca (BHI)",
              subtitle: "Argentina",
            },
            navigation: {
              entityId: "128668280",
              entityType: "AIRPORT",
              localizedName: "Bahia Blanca",
              relevantFlightParams: {
                skyId: "BHI",
                entityId: "128668280",
                flightPlaceType: "AIRPORT",
                localizedName: "Bahia Blanca",
              },
              relevantHotelParams: {
                entityId: "27538775",
                entityType: "CITY",
                localizedName: "Bahia Blanca",
              },
            },
          },
          {
            skyId: "EUQ",
            entityId: "194761123",
            presentation: {
              title: "Evelio Javier",
              suggestionTitle: "Evelio Javier (EUQ)",
              subtitle: "Philippines",
            },
            navigation: {
              entityId: "194761123",
              entityType: "AIRPORT",
              localizedName: "Evelio Javier",
              relevantFlightParams: {
                skyId: "EUQ",
                entityId: "194761123",
                flightPlaceType: "AIRPORT",
                localizedName: "Evelio Javier",
              },
              relevantHotelParams: {
                entityId: "27540963",
                entityType: "CITY",
                localizedName: "San Jose de Buenavista",
              },
            },
          },
        ],
      };
      return body.data as AirportSuggestion[];
    } catch {
      return [];
    }
  };

  // Función debounced para buscar sugerencias
  const debouncedSearch = useDebounce(async (value: string) => {
    if (value.length >= 3) {
      const suggestions = await getAirportSuggestions(value);
      setSuggestions(suggestions);
    } else {
      setSuggestions([]);
    }
  }, 1000);

  const handleInputChange = (inputValue: string) => {
    onChange(inputValue, "", "");
    setShowSuggestions(true);
    debouncedSearch(inputValue);
  };

  const handleSuggestionSelect = (suggestion: AirportSuggestion) => {
    const displayText = suggestion.presentation.title;
    onChange(displayText, suggestion.skyId, suggestion.entityId);
    setShowSuggestions(false);
    setSuggestions([]);
  };

  const getEntityIcon = (entityType: string) => {
    return entityType === "CITY" ? <CityIcon /> : <FlightIcon />;
  };

  const getEntityTypeLabel = (entityType: string) => {
    return entityType === "CITY" ? "Ciudad" : "Aeropuerto";
  };

  return (
    <Box sx={{ position: "relative" }}>
      <TextField
        fullWidth
        value={value}
        onChange={(e) => handleInputChange(e.target.value)}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => {
          setTimeout(() => setShowSuggestions(false), 200);
        }}
        autoComplete="off"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">{icon}</InputAdornment>
            ),
          },
        }}
        placeholder={placeholder}
        variant="outlined"
        size="medium"
      />
      {showSuggestions && (
        <Paper
          elevation={8}
          sx={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            zIndex: 9999,
            maxHeight: 300,
            overflow: "auto",
            mt: 0.5,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          {suggestions.length > 0 && (
            <List dense>
              {suggestions.map((suggestion, index) => (
                <ListItem
                  key={`${suggestion.skyId}-${index}`}
                  onClick={() => handleSuggestionSelect(suggestion)}
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "action.hover",
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    {getEntityIcon(suggestion.navigation.entityType)}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Typography variant="body2" component="span">
                          {suggestion.presentation.title}
                        </Typography>
                        <Chip
                          label={getEntityTypeLabel(
                            suggestion.navigation.entityType
                          )}
                          size="small"
                          variant="outlined"
                          sx={{ height: 20, fontSize: "0.7rem" }}
                        />
                        {suggestion.navigation.entityType === "AIRPORT" && (
                          <Chip
                            label={suggestion.skyId}
                            size="small"
                            color="primary"
                            sx={{ height: 20, fontSize: "0.7rem" }}
                          />
                        )}
                      </Box>
                    }
                    secondary={suggestion.presentation.subtitle}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Paper>
      )}
    </Box>
  );
};
