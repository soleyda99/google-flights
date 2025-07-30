import {
  Navigate,
  Route,
  Routes,
  BrowserRouter as Router,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import "./App.css";
import Loading from "./shared/components/Spinner/components/Loading";
import Spinner from "./shared/components/Spinner/Spinner";
import { useTheme } from "./shared/hooks/useTheme";
import { getTheme } from "./shared/theme/theme";

function App() {
  const Home = lazy(() => import("./pages/Home/Home"));

  const { mode } = useTheme();
  const theme = getTheme(mode);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Suspense fallback={<Loading />}>
        <Router>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </Router>
      </Suspense>
      <Spinner />
    </ThemeProvider>
  );
}

export default App;
