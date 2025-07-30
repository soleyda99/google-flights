import { Button } from "@mui/material";
import styles from "./Footer.module.css";
import {
  Language as LanguageIcon,
  LocationOn as LocationIcon,
  LocalAtm,
} from "@mui/icons-material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const navigationLinks = [
  { text: "Acerca de", href: "#" },
  { text: "Privacidad", href: "#" },
  { text: "Condiciones", href: "#" },
  { text: "Participar en estudios de usuarios", href: "#" },
  { text: "Comentarios", href: "#" },
  { text: "Centro de ayuda", href: "#" },
];

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <hr className={styles.separator} />
      <div className={styles.configSection}>
        <Button variant="outlined" className={styles.configButton}>
          <LanguageIcon className={styles.configIcon} />{" "}
          <span>Idioma · Español (Latinoamérica)</span>
        </Button>

        <Button variant="outlined" className={styles.configButton}>
          <LocationIcon className={styles.configIcon} />
          <span>Ubicación · Argentina</span>
        </Button>

        <Button variant="outlined" className={styles.configButton}>
          <LocalAtm className={styles.configIcon} />
          <span>Moneda · ARS</span>
        </Button>
      </div>
      {/* Sección de texto informativo */}
      <div className={styles.infoSection}>
        <p className={styles.infoText}>
          Se aplicaron las opciones de idioma y moneda actuales: español
          (Latinoamérica) - Argentina - ARS
          <br />
          Es posible que las monedas que se muestren difieran de las que se usan
          para comprar vuelos.
          <a href="#" className={styles.infoLink}>
            {" "}
            Más información
          </a>
        </p>
        <p className={styles.infoText}>
          Los precios son finales. Incluyen todos los impuestos y las tarifas,
          incluidas las de la forma de pago común más económica (que puede
          variar en función del proveedor). Es posible que se apliquen cargos
          adicionales por usar otras formas de pago o por equipaje, comidas, uso
          de WLAN o servicios adicionales. Los precios, la disponibilidad y los
          detalles del viaje se basan en la información más reciente de nuestros
          socios. Tal información se actualiza en los resultados en menos de 24
          horas. Los socios pueden aplicar condiciones adicionales. En ese caso,
          deberás revisar los precios y las condiciones de los proveedores de
          servicios antes de reservar.
        </p>
      </div>
      {/* Separador */}
      {/* Sección de enlaces de navegación */}
      <div className={styles.navigationSection}>
        <nav className={styles.navigation}>
          {navigationLinks.map((link, index) => (
            <a key={index} href={link.href} className={styles.navLink}>
              {link.text}
            </a>
          ))}
        </nav>
      </div>
      <hr className={styles.separator} />

      {/* Sección de enlaces desplegables */}
      <div className={styles.dropdownSection}>
        <Button
          id="demo-customized-button"
          aria-haspopup="true"
          variant="outlined"
          disableElevation
          className={styles.dropdownButton}
          endIcon={<KeyboardArrowDownIcon />}
        >
          Sitios internacionales
        </Button>

        <Button
          id="demo-customized-button"
          aria-haspopup="true"
          variant="outlined"
          disableElevation
          className={styles.dropdownButton}
          endIcon={<KeyboardArrowDownIcon />}
        >
          Explorar vuelos
        </Button>
      </div>
    </footer>
  );
};
export default Footer;
