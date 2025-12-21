import AppLayout from "@/components/layout/app-layout";
import { Button } from "@/components/ui/button";
import { getApi } from "@/service/api";
import { BowArrow } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type TGenre = {
  name: string;
  count: number;
};

const Anime = () => {
  const [genres, setGenres] = useState<TGenre[]>([]);
  const [explicitGenres, setExplicitGenres] = useState<TGenre[]>([]);
  const [themes, setThemes] = useState<TGenre[]>([]);
  const [demographics, setDemographics] = useState<TGenre[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await getApi("genres/anime", "");
        setGenres(response.slice(0, 18));
        setExplicitGenres(response.slice(18, 21));
        setThemes(response.slice(21, 73));
        setDemographics(response.slice(73, 78));
      } catch (error) {
        console.error(error);
      }
    };
    load();
  }, []);

  return (
    <AppLayout>
      <h1 className="text-2xl font-semibold">Anime Search</h1>

      {/* Genres */}
      <section className="my-10">
        <h3 className="my-5">Genres</h3>
        <div className="grid grid-cols-2 gap-5  lg:grid-cols-5">
          {genres.length > 0 &&
            genres.map((item) => (
              <Link to={""}>
                <Button className="w-full cursor-pointer flex justify-between">
                  <span>
                    {item.name} ({item.count.toLocaleString()})
                  </span>
                  <BowArrow />
                </Button>
              </Link>
            ))}
        </div>
      </section>

      {/* Explicit Genres */}
      <section className="my-10">
        <h3 className="my-5">Explicit Genres</h3>
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-5">
          {explicitGenres.length > 0 &&
            explicitGenres.map((item) => (
              <Link to={""}>
                <Button className="w-full cursor-pointer flex justify-between">
                  <span>
                    {item.name} ({item.count.toLocaleString()})
                  </span>
                  <BowArrow />
                </Button>
              </Link>
            ))}
        </div>
      </section>

      {/* Themes */}
      <section className="my-10">
        <h3 className="my-5">Themes</h3>
        <div className="grid grid-cols-2 gap-5  lg:grid-cols-5">
          {themes.length > 0 &&
            themes.map((item) => (
              <Link to={""}>
                <Button className="w-full cursor-pointer flex justify-between">
                  <span>
                    {item.name} ({item.count.toLocaleString()})
                  </span>
                  <BowArrow />
                </Button>
              </Link>
            ))}
        </div>
      </section>

      {/* Demographics */}
      <section className="my-10">
        <h3 className="my-5">Demographics</h3>
        <div className="grid grid-cols-2 gap-5  lg:grid-cols-5">
          {demographics.length > 0 &&
            demographics.map((item) => (
              <Link to={""}>
                <Button className="w-full cursor-pointer flex justify-between">
                  <span>
                    {item.name} ({item.count.toLocaleString()})
                  </span>
                  <BowArrow />
                </Button>
              </Link>
            ))}
        </div>
      </section>
    </AppLayout>
  );
};

export default Anime;
