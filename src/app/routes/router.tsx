import { HomePage } from "@/pages";
import { useRoutes } from "react-router-dom";

const AppRouter = () => {
  const element = useRoutes([
    {
      path: "/",
      element: <HomePage />
    }
  ]);
  return element;
};

export default AppRouter;
