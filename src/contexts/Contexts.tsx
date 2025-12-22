import type { TChildren } from "@/types";
import {
  createContext,
  useState,
  type Dispatch,
  type FC,
  type SetStateAction
} from "react";

export interface IContext {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const Context = createContext<IContext>({
  page: 0,
  setPage: () => {}
});

const ContextProvider: FC<TChildren> = ({ children }) => {
  const [page, setPage] = useState<number>(1);

  const ContextValue = {
    page,
    setPage
  };

  return <Context.Provider value={ContextValue}>{children}</Context.Provider>;
};

export default ContextProvider;
