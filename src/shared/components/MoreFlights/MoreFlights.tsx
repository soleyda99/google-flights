import { Box } from "@mui/material";
import styles from "./MoreFlights.module.css";
import { flightsFromQuito } from "./constant/constant";

const MoreFlights = () => {
  return (
    <div>
      <h3 className={styles.subtitle}>
        Encuentra vuelos económicos en rutas populares
      </h3>

      <Box sx={{ width: "100%" }}>
        <div className={styles.flightLinks}>
          {flightsFromQuito.map((flight, index) => (
            <a key={index} href="#" className={styles.flightLink}>
              {flight}
            </a>
          ))}
        </div>
      </Box>
    </div>
  );
};
export default MoreFlights;
