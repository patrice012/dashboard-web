import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
// } from "@/components/ui/pagination";

// import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
import { DashboardLayout } from "@/components/dashboard/Layout";

import { NewTwoFactorCodeDialog } from "@/components/dashboard/NewTwoFactorCode";
// import postReq from "@/helpers/postReq";
export const description =
  "A products dashboard with a sidebar navigation and a main content area. The dashboard has a header with a search input and a user menu. The sidebar has a logo, navigation links, and a card with a call to action. The main content area shows an empty state with a call to action.";

import { useCurrentUser } from "@/hooks/useCurrentUser";
// import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
// import { debounce } from "@/helpers/request";

// import { NotFoundData } from "@/components/request/NotFoundData";
// import { ErrorRequest } from "@/components/request/ErrorRequest";
// import { TwoFactorType } from "./type";
// import { CardUI } from "@/components/dashboard/Card";
// import { cardData } from "@/data/cardData";

export function Dashboard() {
  const [user] = useCurrentUser();
  // const [page, setPage] = useState(1);
  // const [searchTerms, setSearchTerms] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  console.log(isLoading);

  useEffect(() => {
    if (user) {
      setIsLoading(false);
    }
  }, [user]);

  // const [debouncedSearch] = useState(() =>
  //   debounce((value: string) => {
  //     setSearchTerms(value);
  //     setPage(1);
  //   }, 500)
  // );

  // const handleSearchValueChange = (value: string) => {
  //   debouncedSearch(value);
  // };

  return (
    <DashboardLayout>
      <div className="flex flex-1 flex-col gap-4">
        <div className="flex items-center">
          <div className="ml-auto w-full flex items-center justify-between gap-2">
            <div className="w-full flex-1">
              <h1 className="text-lg font-bold md:text-xl">Lorem</h1>
              <p className="text-gray-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
            <NewTwoFactorCodeDialog>
              <Button size="lg" className=" flex-row gap-2 items-center">
                <Plus className="h-4 w-4" />
                <span className=" text-[15px] font-semibold sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Create new
                </span>
              </Button>
            </NewTwoFactorCodeDialog>
          </div>
        </div>

        {/* <div className="relative w-full ml-auto flex-1 md:grow-0">
          <Search className="absolute left-2.5 top-3.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search compaigns..."
            className="w-full rounded-lg bg-background pl-8 h-11"
            onChange={(e) => {
              handleSearchValueChange(e.target.value);
            }}
          />
        </div> */}

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 [@media(min-width:2000px)]:grid-cols-4 place-items-center">
          {/* {cardData.map((card, index) => (
            <CardUI key={index} {...card} />
          ))} */}
        </div>
      </div>
    </DashboardLayout>
  );
}
