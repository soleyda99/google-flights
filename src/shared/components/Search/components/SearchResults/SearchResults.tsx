import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Avatar,
  Divider,
  Chip,
  Button,
} from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FlightIcon from "@mui/icons-material/Flight";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import CloseIcon from "@mui/icons-material/Close";
import type {
  FlightInfo,
  Itinerary,
  SearchResultsProps,
} from "./interfaces/type";
import { formatDuration, formatTime } from "../../../../utils/format";

export const SearchResults = ({
  itineraries,
  onClearResults,
}: SearchResultsProps) => {
  if (!itineraries || itineraries.length === 0) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        py={8}
        px={2}
        textAlign="center"
      >
        <SearchOffIcon sx={{ fontSize: 64, color: "grey.400", mb: 2 }} />
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No se encontraron vuelos disponibles
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Intenta con otras fechas o destinos
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h5" color="primary.main" fontWeight="bold">
          Resultados de búsqueda
        </Typography>
        {onClearResults && (
          <Button
            variant="outlined"
            onClick={onClearResults}
            startIcon={<CloseIcon />}
            size="small"
          >
            Limpiar resultados
          </Button>
        )}
      </Box>
      {itineraries.map((itinerary, index) => (
        <FlightCard key={index} itinerary={itinerary} />
      ))}
    </Box>
  );
};

const FlightCard = ({ itinerary }: { itinerary: Itinerary }) => {
  const [legIda, legVuelta] = itinerary.legs;

  const getInfo = (leg: Itinerary["legs"][0]): FlightInfo => ({
    airlineName: leg.carriers.marketing[0]?.name || "Unknown Airline",
    logoUrl: leg.carriers.marketing[0]?.logoUrl || "",
    departureTime: formatTime(leg.departure),
    arrivalTime: formatTime(leg.arrival),
    duration: formatDuration(leg.durationInMinutes),
    from: leg.origin.displayCode,
    to: leg.destination.displayCode,
  });

  const ida = getInfo(legIda);
  const vuelta = legVuelta ? getInfo(legVuelta) : null;
  const price = itinerary.price.formatted;
  const isRoundTrip = !!legVuelta;

  return (
    <Card
      sx={{
        width: "100%",
        mb: 3,
        boxShadow: 2,
        borderRadius: 2,
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          boxShadow: 4,
          transform: "translateY(-2px)",
        },
      }}
    >
      <CardContent sx={{ p: { xs: 2, md: 3 } }}>
        {/* Header con precio y tipo de vuelo */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
          flexWrap="wrap"
          gap={1}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <FlightIcon color="primary" />
            <Chip
              label={isRoundTrip ? "Ida y vuelta" : "Solo ida"}
              color={isRoundTrip ? "primary" : "secondary"}
              size="small"
              variant="outlined"
            />
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="h5" color="success.main" fontWeight="bold">
              {price}
            </Typography>
          </Box>
        </Box>

        {/* Vuelo de ida */}
        <Box mb={isRoundTrip ? 3 : 0}>
          <Typography variant="h6" gutterBottom color="primary.main">
            Ida
          </Typography>
          <FlightInfo flight={ida} />
        </Box>

        {/* Vuelo de vuelta (solo si existe) */}
        {isRoundTrip && (
          <>
            <Divider sx={{ my: 3 }} />
            <Box>
              <Typography variant="h6" gutterBottom color="primary.main">
                Vuelta
              </Typography>
              <FlightInfo flight={vuelta!} />
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  );
};

const FlightInfo = ({ flight }: { flight: FlightInfo }) => (
  <Box>
    {/* Diseño responsive usando Grid */}
    <Grid container spacing={{ xs: 2, md: 3 }} alignItems="center">
      {/* Aerolínea */}
      <Grid size={{ xs: 12, md: 3 }}>
        <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
          <Avatar
            src={flight.logoUrl}
            alt={flight.airlineName}
            sx={{
              width: { xs: 40, md: 48 },
              height: { xs: 40, md: 48 },
              objectFit: "contain",
              imageRendering: "crisp-edges",
              marginBottom: 1,
            }}
          />
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
          <Typography variant="subtitle1" fontWeight="medium">
            {flight.airlineName}
          </Typography>
        </Box>
      </Grid>

      {/* Detalles del vuelo */}
      <Grid size={{ xs: 12, md: 9 }}>
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
          {/* Salida */}
          <Grid size={{ xs: 6, md: 3 }} textAlign="center">
            <Box
              sx={{
                p: { xs: 1, md: 0 },
                bgcolor: { xs: "grey.50", md: "transparent" },
                borderRadius: { xs: 1, md: 0 },
              }}
            >
              <FlightTakeoffIcon color="primary" fontSize="small" />
              <Typography variant="h6" fontWeight="bold">
                {flight.departureTime}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {flight.from}
              </Typography>
            </Box>
          </Grid>

          {/* Duración */}
          <Grid size={{ xs: 12, md: 3 }} textAlign="center">
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={1}
              sx={{ mt: { xs: 1, md: 0 } }}
            >
              <AccessTimeIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {flight.duration}
              </Typography>
            </Box>
          </Grid>

          {/* Llegada */}
          <Grid size={{ xs: 6, md: 3 }} textAlign="center">
            <Box
              sx={{
                p: { xs: 1, md: 0 },
                bgcolor: { xs: "grey.50", md: "transparent" },
                borderRadius: { xs: 1, md: 0 },
              }}
            >
              <FlightLandIcon color="primary" fontSize="small" />
              <Typography variant="h6" fontWeight="bold">
                {flight.arrivalTime}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {flight.to}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Box>
);
