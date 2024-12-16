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
import postReq from "@/helpers/postReq";
import { useQuery } from "@tanstack/react-query";
// import { debounce } from "@/helpers/request";

import { NotFoundData } from "@/components/request/NotFoundData";
import { ErrorRequest } from "@/components/request/ErrorRequest";
import { CardProps, CardUI } from "@/components/dashboard/Card";
// import { cardData } from "@/data/cardData";

export function Dashboard() {
  const [user] = useCurrentUser();
  const [page, setPage] = useState(1);
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

  async function getAllFactorCode() {
    try {
      const response = await postReq({
        data: {
          uid: user?.uid || "",
          page: page,
          perPage: 10,
          search: "",
        },
        url: "/api/twoFactor/get-all",
      });

      if (response?.status === 200) {
        return response.json();
      } else return {};
    } catch (e) {
      console.log(e, "error getCompaigns");
    }
  }

  const getAllTwoFactorQuery = useQuery({
    queryKey: ["get-all-twoFactors", page],
    queryFn: getAllFactorCode,
    enabled: !!user?.uid,
  });

  console.log(getAllTwoFactorQuery, "getAllTwoFactorQuery");

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

        {getAllTwoFactorQuery.isSuccess ? (
          getAllTwoFactorQuery.data?.data.length > 0 ? (
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 [@media(min-width:2000px)]:grid-cols-4 place-items-center">
              {getAllTwoFactorQuery.data?.data.map(
                (item: CardProps, index: number) => (
                  <CardUI key={index} {...item} />
                )
              )}
            </div>
          ) : (
            <NotFoundData />
          )
        ) : null}

        {getAllTwoFactorQuery.isError ? <ErrorRequest /> : null}
      </div>
    </DashboardLayout>
  );
}
