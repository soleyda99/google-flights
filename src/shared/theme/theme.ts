import { createTheme } from "@mui/material/styles";

export const getTheme = (mode: "light" | "dark") => {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: "#1a73e8",
      },
      secondary: {
        main: "#8ab4f8",
      },
      background: {
        default: mode === "dark" ? "#202124" : "#ffffff",
        paper: mode === "dark" ? "#36373A" : "#ffffff",
      },
      text: {
        primary: mode === "dark" ? "#e8eaed" : "#202124",
        secondary: mode === "dark" ? "#9aa0a6" : "#5f6368",
      },
      divider:
        mode === "dark" ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.12)",
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: mode === "dark" ? "#36373A" : "#ffffff",
            color: mode === "dark" ? "#e8eaed" : "#202124",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor:
                  mode === "dark" ? "#ffffff" : "rgba(0, 0, 0, 0.23)",
              },
              "&:hover fieldset": {
                borderColor:
                  mode === "dark" ? "#ffffff" : "rgba(0, 0, 0, 0.87)",
              },
              "&.Mui-focused fieldset": {
                borderColor: mode === "dark" ? "#ffffff" : "#1976d2",
              },
            },
            "& .MuiInputLabel-root": {
              color: mode === "dark" ? "#ffffff" : "inherit",
            },
            "& .MuiInputBase-input": {
              color: mode === "dark" ? "#ffffff" : "inherit",
            },
            "& .MuiInputBase-input::placeholder": {
              color: mode === "dark" ? "rgba(255, 255, 255, 0.7)" : "inherit",
            },
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor:
                  mode === "dark" ? "#ffffff" : "rgba(0, 0, 0, 0.23)",
              },
              "&:hover fieldset": {
                borderColor:
                  mode === "dark" ? "#ffffff" : "rgba(0, 0, 0, 0.87)",
              },
              "&.Mui-focused fieldset": {
                borderColor: mode === "dark" ? "#ffffff" : "#1976d2",
              },
            },
            "& .MuiSelect-select": {
              color: mode === "dark" ? "#ffffff" : "inherit",
            },
          },
        },
      },

      MuiAccordion: {
        styleOverrides: {
          root: {
            backgroundColor: mode === "dark" ? "transparent" : "#ffffff",
            color: mode === "dark" ? "#ffffff" : "#202124",
            "&:before": {
              display: "none",
            },
            borderBottom:
              mode === "dark"
                ? "1px solid rgba(255, 255, 255, 0.12)"
                : "1px solid rgba(0, 0, 0, 0.12)",
          },
        },
      },

      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: mode === "dark" ? "#202124" : "#ffffff",
            color: mode === "dark" ? "#ffffff" : "#202124",
            boxShadow:
              mode === "dark"
                ? "0 1px 3px rgba(0, 0, 0, 0.3)"
                : "0 1px 3px rgba(0, 0, 0, 0.1)",
          },
        },
      },
    },
  });
};
