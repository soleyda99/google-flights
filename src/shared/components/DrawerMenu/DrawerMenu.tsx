import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Flight as FlightIcon,
  Search as SearchIcon,
  Hotel as HotelIcon,
  Home as HomeIcon,
  TrendingUp as TrendingUpIcon,
  Language as LanguageIcon,
  AttachMoney as MoneyIcon,
  LocationOn as LocationIcon,
  Settings as SettingsIcon,
  Feedback as FeedbackIcon,
  Help as HelpIcon,
  Luggage as SuitcaseIcon,
} from "@mui/icons-material";

export default function DrawerMenu() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  // Cerrar el drawer cuando se hace scroll
  useEffect(() => {
    const handleScroll = () => {
      setOpen(false);
    };

    if (open) {
      window.addEventListener("scroll", handleScroll, { passive: true });
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [open]);

  const DrawerList = (
    <Box
      sx={{
        width: 250,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        paddingBottom: "70px",
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List>
        {[
          { text: "Viajes", icon: <SuitcaseIcon /> },
          { text: "Explorar", icon: <SearchIcon /> },
          { text: "Vuelos", icon: <FlightIcon />, selected: true },
          { text: "Hoteles", icon: <HotelIcon /> },
          { text: "Alquileres vacacionales", icon: <HomeIcon /> },
        ].map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              sx={{
                backgroundColor: item.selected
                  ? "rgba(25, 118, 210, 0.08)"
                  : "transparent",
                "&:hover": {
                  backgroundColor: item.selected
                    ? "rgba(25, 118, 210, 0.12)"
                    : "rgba(0, 0, 0, 0.04)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: item.selected ? "#2196F3" : "",
                  paddingX: "7px",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  color: item.selected ? "#2196F3" : "inherit",
                  fontWeight: item.selected ? 500 : 400,
                  fontSize: "13px",
                  "& .MuiListItemText-primary": {
                    fontSize: "13px",
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />

      <List>
        {[
          { text: "Precios de vuelos que sigues", icon: <TrendingUpIcon /> },
          { text: "Cambiar idioma", icon: <LanguageIcon /> },
          { text: "Cambiar moneda", icon: <MoneyIcon /> },
          { text: "Cambiar ubicación", icon: <LocationIcon /> },
        ].map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ paddingX: "7px" }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  "& .MuiListItemText-primary": {
                    fontSize: "13px",
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <List sx={{ marginTop: "auto" }}>
        <Divider />

        {[
          { text: "Configuración de Vuelos", icon: <SettingsIcon /> },
          { text: "Sugerencias", icon: <FeedbackIcon /> },
          { text: "Ayuda", icon: <HelpIcon /> },
        ].map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ paddingX: "7px" }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  "& .MuiListItemText-primary": {
                    fontSize: "13px",
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        disableScrollLock={true}
        open={open}
        variant="temporary"
        onClose={toggleDrawer(false)}
        sx={{
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            marginTop: "55px",
            boxShadow: "none",
          },
        }}
        ModalProps={{
          BackdropProps: {
            sx: {
              backgroundColor: "transparent",
            },
          },
        }}
      >
        {DrawerList}
      </Drawer>
    </div>
  );
}
