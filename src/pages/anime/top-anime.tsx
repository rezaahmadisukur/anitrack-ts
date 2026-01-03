import AppLayout from "@/components/layout/app-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { VITE_JIKAN_REST_API } from "@/service/env";
import { type IAnime } from "@/types";
import axios from "axios";
import { Hash, Plus, Star } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const TopAnime = () => {
  const [data, setData] = useState<IAnime[]>([]);
  const [totalData, setTotalData] = useState<number>(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const ITEM_PER_PAGE = 25;

  useEffect(() => {
    if (!searchParams.has("page") as boolean) {
      const params = new URLSearchParams(searchParams);
      params.set("page", "1");
      setSearchParams(params, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  // Fetch Data
  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`${VITE_JIKAN_REST_API}/top/anime`, {
        params: {
          page: currentPage
        }
      });
      setData(response.data.data);
      setTotalData(response.data.pagination.items.total);
    } catch (error) {
      console.error(error);
    }
  }, [currentPage]);

  useEffect(() => {
    const load = async () => {
      await fetchData();
    };
    load();
  }, [fetchData]);

  // Handle Change Page
  const handleChangePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    setSearchParams(params);

    // after move page go to top page
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const generatePagination = (currentPage: number, totalPage: number) => {
    if (totalData <= 7) {
      return Array.from({ length: totalPage }, (_, i) => i + 1);
    }

    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, "...", totalPage];
    }

    if (currentPage >= totalPage - 3) {
      return [
        1,
        "...",
        totalPage - 4,
        totalPage - 3,
        totalPage - 2,
        totalPage - 1,
        totalPage
      ];
    }

    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPage
    ];
  };

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
        <div className="flex justify-center items-center gap-3 flex-wrap">
          <Button
            disabled={currentPage <= 1}
            onClick={() => {
              handleChangePage(currentPage - 1);
            }}
            className="cursor-pointer"
          >
            Prev
          </Button>

          {generatePagination(
            currentPage,
            Math.ceil(totalData / ITEM_PER_PAGE)
          ).map((page, index) => {
            if (page === "...") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="px-2 text-muted-foreground"
                >
                  ...
                </span>
              );
            }

            return (
              <Button
                key={index}
                variant={currentPage === page ? "default" : "outline"}
                onClick={() => {
                  handleChangePage(Number(page));
                }}
              >
                {page}
              </Button>
            );
          })}

          {/* {new Array(Math.ceil(totalData / ITEM_PER_PAGE))
            .fill(1)
            .map((_, index) => {
              return (
                <Button
                  variant={currentPage === index + 1 ? "default" : "outline"}
                  onClick={() => {
                    handleChangePage(index + 1);
                  }}
                >
                  {index + 1}
                </Button>
              );
            })} */}

          <Button
            onClick={() => {
              handleChangePage(currentPage + 1);
            }}
            className="cursor-pointer"
          >
            Next
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default TopAnime;
