import { useSelector } from "react-redux";
import { memo } from "react";
import Loading from "./components/Loading";
import type { RootState } from "../../../store/store";

const Spinner = memo(() => {
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);

  if (!isLoading) return null;

  return <Loading />;
});

Spinner.displayName = "Spinner";

export default Spinner;
