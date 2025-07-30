import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../store/slices/themeSlice";
import type { RootState } from "../../store/store";

export const useTheme = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return {
    isDarkMode,
    mode: isDarkMode ? "dark" : ("light" as "dark" | "light"),
    toggleTheme: handleToggleTheme,
  };
};
