import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { faqData } from "./constant/constant";
import styles from "./FAQ.module.css";

const FAQ = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <>
      <h2>Preguntas frecuentes</h2>
      {faqData.map((faq) => (
        <Accordion
          key={faq.id}
          className={`${styles.accordion} ${isDark ? styles.darkMode : ""}`}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${faq.id}-content`}
            id={`panel${faq.id}-header`}
            className={styles.accordionSummary}
          >
            <Typography component="span">{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <div
              className={`${styles.answerText} ${
                isDark ? styles.darkMode : ""
              }`}
              dangerouslySetInnerHTML={{ __html: faq.answer }}
            />
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};
export default FAQ;
