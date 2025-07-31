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
import type { AirportSuggestion } from "../../interfaces/types";
import { getAirports } from "../../../../../services/searchServices";
import { useDebounce } from "../../hooks/debounceTime";

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
    if (!query || query?.length < 3) return [];

    try {
      const response = await getAirports(query);
      return response.data as AirportSuggestion[];
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
          {suggestions?.length > 0 && (
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
