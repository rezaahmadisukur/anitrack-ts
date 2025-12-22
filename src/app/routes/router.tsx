import { HomePage, AnimeSearch, TopAnime } from "@/pages";
import { useRoutes } from "react-router-dom";

const AppRouter = () => {
  const element = useRoutes([
    {
      path: "/",
      element: <HomePage />
    },
    {
      path: "/anime-search",
      element: <AnimeSearch />
    },
    {
      path: "/top/anime",
      element: <TopAnime />
    }
  ]);
  return element;
};

export default AppRouter;
