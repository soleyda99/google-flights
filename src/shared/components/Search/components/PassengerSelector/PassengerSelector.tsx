import { useState } from "react";
import { Box, Typography, Popover, IconButton } from "@mui/material";
import {
  Person as PersonIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  KeyboardArrowDown as ArrowDownIcon,
} from "@mui/icons-material";

interface PassengerCounts {
  adults: number;
  childrens: number;
  infants: number;
}

interface PassengerSelectorProps {
  value: PassengerCounts;
  onChange: (passengers: PassengerCounts) => void;
  className?: string;
}

export const PassengerSelector = ({
  value,
  onChange,
  className,
}: PassengerSelectorProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  // Asegurar que todos los valores sean números válidos
  const safeValue = {
    adults: Number(value?.adults) || 0,
    childrens: Number(value?.childrens) || 0,
    infants: Number(value?.infants) || 0,
  };

  const totalPassengers =
    safeValue.adults + safeValue.childrens + safeValue.infants;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const updatePassengerCount = (
    type: keyof PassengerCounts,
    operation: "add" | "subtract"
  ) => {
    const newValue = { ...safeValue };

    if (operation === "add") {
      newValue[type]++;
    } else if (operation === "subtract" && newValue[type] > 0) {
      newValue[type]--;
    }

    // Validaciones
    if (type === "adults" && newValue.adults === 0) {
      // No puede haber 0 adultos
      return;
    }

    const newTotalPassengers =
      (newValue.adults || 0) +
      (newValue.childrens || 0) +
      (newValue.infants || 0);

    if (newTotalPassengers > 9) {
      // Máximo 9 pasajeros
      return;
    }

    onChange(newValue);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Box
        onClick={handleClick}
        sx={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          border: "1px solid #e0e0e0",
          borderRadius: 1,
          padding: "8px 12px",
          "&:hover": {
            borderColor: "#1976d2",
          },
          width: "100px",
        }}
        className={className}
      >
        <PersonIcon sx={{ color: "grey.500", mr: 1 }} />
        <Typography variant="body2" sx={{ mr: 1 }}>
          {totalPassengers}
        </Typography>
        <ArrowDownIcon sx={{ color: "grey.500" }} />
      </Box>

      <Popover
        id="simple-popover"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        disableAutoFocus
        disableEnforceFocus
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{
          "& .MuiPopover-paper": {
            width: 320,
            borderRadius: 2,
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          {/* Passenger Types */}
          <Box sx={{ mb: 2 }}>
            {/* Adults */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Adultos
                </Typography>
              </Box>
              <IconButton
                size="small"
                onClick={() => updatePassengerCount("adults", "subtract")}
                disabled={safeValue.adults <= 1}
                sx={{ color: "#1976d2" }}
              >
                <RemoveIcon />
              </IconButton>
              <Typography
                variant="body2"
                sx={{ mx: 2, minWidth: 20, textAlign: "center" }}
              >
                {safeValue.adults}
              </Typography>
              <IconButton
                size="small"
                onClick={() => updatePassengerCount("adults", "add")}
                sx={{ color: "#1976d2" }}
              >
                <AddIcon />
              </IconButton>
            </Box>

            {/* Children */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Niños
                </Typography>
                <Typography variant="caption" sx={{ color: "grey.600" }}>
                  De 2 a 12 años
                </Typography>
              </Box>
              <IconButton
                size="small"
                onClick={() => updatePassengerCount("childrens", "subtract")}
                disabled={safeValue.childrens <= 0}
                sx={{ color: "#1976d2" }}
              >
                <RemoveIcon />
              </IconButton>
              <Typography
                variant="body2"
                sx={{ mx: 2, minWidth: 20, textAlign: "center" }}
              >
                {safeValue.childrens}
              </Typography>
              <IconButton
                size="small"
                onClick={() => updatePassengerCount("childrens", "add")}
                sx={{ color: "#1976d2" }}
              >
                <AddIcon />
              </IconButton>
            </Box>

            {/* Infants*/}
            <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Bebés
                </Typography>
                <Typography variant="caption" sx={{ color: "grey.600" }}>
                  0-2 años
                </Typography>
              </Box>
              <IconButton
                size="small"
                onClick={() => updatePassengerCount("infants", "subtract")}
                disabled={safeValue.infants <= 0}
                sx={{ color: "#1976d2" }}
              >
                <RemoveIcon />
              </IconButton>
              <Typography
                variant="body2"
                sx={{ mx: 2, minWidth: 20, textAlign: "center" }}
              >
                {safeValue.infants}
              </Typography>
              <IconButton
                size="small"
                onClick={() => updatePassengerCount("infants", "add")}
                sx={{ color: "#1976d2" }}
              >
                <AddIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Popover>
    </>
  );
};
