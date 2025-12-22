import AppLayout from "@/components/layout/app-layout";
import { PaginationDemo } from "@/components/pagination-demo";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Context } from "@/contexts/Contexts";
import { getApi } from "@/service/api";
import { type IAnime } from "@/types";
import { Hash, Plus, Star } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TopAnime = () => {
  const [data, setData] = useState<IAnime[]>([]);
  const [pagination, setPagination] = useState();
  const { page } = useContext(Context);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await getApi(`top/anime`, `page=${page}`);
        setData(response.data);
        setPagination(response.pagination);
      } catch (error) {
        console.error(error);
      }
    };
    load();
  }, [page]);

  console.log(data);

  return (
    <AppLayout>
      <Link
        to={"#"}
        className="text-lg hover:underline transition-all duration-300 hover:text-primary"
      >
        Top Anime
      </Link>
      {/* Grid anime top */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 my-5 gap-5">
        {data.length > 0 &&
          data.map((item, index) => (
            <Card key={index} className="p-3">
              <div className="flex gap-5 items-center">
                {/* left card (image) */}
                <div className="overflow-hidden rounded-lg w-full border max-w-fit">
                  <img
                    src={item.images.webp.image_url}
                    alt={item.title}
                    width={150}
                  />
                </div>
                {/* right card (content) */}
                <div className="flex flex-col">
                  <Badge className="px-5 py-2 rounded-sm bg-primary-foreground/10 text-primary border-primary">
                    {item.status}
                  </Badge>
                  <p className="flex gap-1 text-xs font-medium my-3">
                    <span className="capitalize">{item.season}</span>
                    <span>{item.year}</span>
                    {item.year && "|"}
                    <span>{item.episodes} Episodes</span>
                  </p>
                  <p className="font-semibold line-clamp-1 text-lg">
                    {item.title}
                  </p>
                  {/* Stars and Ranking */}
                  <div className="grid grid-cols-2 gap-3">
                    {/* Left: Stars and Users */}
                    <div className="flex flex-col gap-1 text-xs">
                      <p className="flex gap-1 text-lg items-center font-bold">
                        <Star className="size-6" />
                        {item.score}
                      </p>
                      <p className="flex gap-1">
                        {item.members} <span>users</span>
                      </p>
                    </div>
                    {/* Right: Ranking */}
                    <div className="flex flex-col gap-1 text-xs">
                      <p className="flex gap-1 text-lg items-center font-bold">
                        <Hash className="size-6" />
                        {item.rank}
                      </p>
                      <p className="flex gap-1">
                        <span>Ranking</span>
                      </p>
                    </div>
                  </div>

                  {/* Genres */}
                  <div className="flex gap-1 mt-3">
                    {item.genres.slice(0, 2).map((genre, index) => (
                      <Badge key={index}>{genre.name}</Badge>
                    ))}
                    {item.genres.length > 2 && (
                      <Badge>
                        <Plus />
                        <span>{item.genres.length - 2}</span>
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
      </div>

      {/* Pagination */}
      <div className="py-10">
        <PaginationDemo pagination={pagination} />
      </div>
    </AppLayout>
  );
};

export default TopAnime;
