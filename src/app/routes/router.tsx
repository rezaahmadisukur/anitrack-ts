import { HomePage, Anime } from "@/pages";
import { useRoutes } from "react-router-dom";

const AppRouter = () => {
  const element = useRoutes([
    {
      path: "/",
      element: <HomePage />
    },
    {
      path: "/anime",
      element: <Anime />
    }
  ]);
  return element;
};

export default AppRouter;
