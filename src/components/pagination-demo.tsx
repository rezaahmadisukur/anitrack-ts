import { Context } from "@/contexts/Contexts";
import { useContext } from "react";
import { Button } from "./ui/button";

export interface IPagination {
  current_page: number;
  has_next_page: true;
  items: TItems;
  last_visible_page: number;
}

export type TItems = {
  count: number;
  total: number;
  per_page: number;
};

export function PaginationDemo({
  pagination
}: {
  pagination: IPagination | undefined;
}) {
  const { setPage } = useContext(Context);
  return (
    <div className="flex justify-center items-center gap-10">
      <Button
        onClick={() => setPage((prev) => prev - 1)}
        className="cursor-pointer"
      >
        Prev
      </Button>

      <span>
        {pagination?.current_page} / {pagination?.last_visible_page}
      </span>

      <Button
        onClick={() => setPage((prev) => prev + 1)}
        className="cursor-pointer"
      >
        Next
      </Button>
    </div>
  );
}
