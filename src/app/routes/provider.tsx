import type { TChildren } from "@/types";
import { BrowserRouter } from "react-router-dom";

const AppProvider = ({ children }: TChildren) => {
  return (
    <div>
      <BrowserRouter>{children}</BrowserRouter>
    </div>
  );
};

export default AppProvider;
