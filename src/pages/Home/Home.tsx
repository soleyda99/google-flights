import { useState } from "react";
import { Header } from "../../shared/components/Header/Header";
import { useTheme } from "../../shared/hooks/useTheme";
import { MainLayouts } from "../../layouts/MainLayouts";
import Search from "../../shared/components/Search/Search";
import FAQ from "../../shared/components/FAQ/FAQ";
import MoreFlights from "../../shared/components/MoreFlights/MoreFlights";
import Footer from "../../shared/components/Footer/Footer";
import flightsWhite from "../../assets/flights_white.svg";
import flightsBlack from "../../assets/flights_black.svg";

const Home = () => {
  const { isDarkMode } = useTheme();
  const [showSearchResults, setShowSearchResults] = useState(false);
  const logo = isDarkMode ? flightsBlack : flightsWhite;

  return (
    <>
      <Header />
      <div
        style={{
          margin: "0 auto 40px",
          maxWidth: "1248px",
          position: "relative",
        }}
      >
        <img src={logo} alt="Fondo de viajes" width="100%" height="auto" />
        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "50%",
            transform: "translate(-50%, 0)",
            fontSize: 56,
            fontWeight: 400,
            letterSpacing: 0,
            color: isDarkMode ? "#e8eaed" : "#202124",
            textAlign: "center",
            width: "100%",
          }}
        >
          Vuelos
        </div>
      </div>
      <MainLayouts>
        <Search onSearchResultsChange={setShowSearchResults} />
        {!showSearchResults && (
          <>
            <FAQ />
            <MoreFlights />
          </>
        )}
        <Footer />
      </MainLayouts>
    </>
  );
};

export default Home;
