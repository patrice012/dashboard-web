import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

import { DashboardLayout } from "@/components/dashboard/Layout";

import { CreateTwoFactorCodeDialog } from "@/components/dashboard/NewTwoFactorCode";
export const description =
  "A products dashboard with a sidebar navigation and a main content area. The dashboard has a header with a search input and a user menu. The sidebar has a logo, navigation links, and a card with a call to action. The main content area shows an empty state with a call to action.";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useEffect, useState } from "react";
import postReq from "@/helpers/postReq";
import { useQuery } from "@tanstack/react-query";

import { NotFoundData } from "@/components/request/NotFoundData";
import { ErrorRequest } from "@/components/request/ErrorRequest";
import { CardProps, CardUI } from "@/components/dashboard/Card";
import { CardSkeleton } from "@/components/dashboard/CardSkeleton";

export function Dashboard() {
  const [user] = useCurrentUser();
  const [isLoading, setIsLoading] = useState(true);

  console.log(isLoading);

  useEffect(() => {
    if (user) {
      setIsLoading(false);
    }
  }, [user]);

  async function getAllFactorCode() {
    try {
      const response = await postReq({
        data: {
          uid: user?.uid || "",
          page: 1,
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
    queryKey: ["get-all-twoFactors", 1],
    queryFn: getAllFactorCode,
    enabled: !!user?.uid,
  });

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
            <CreateTwoFactorCodeDialog>
              <Button size="lg" className=" flex-row gap-2 items-center">
                <Plus className="h-4 w-4" />
                <span className=" text-[15px] font-semibold sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Create new
                </span>
              </Button>
            </CreateTwoFactorCodeDialog>
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

        {getAllTwoFactorQuery.isLoading || getAllTwoFactorQuery.isRefetching ? (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 [@media(min-width:2000px)]:grid-cols-4 place-items-center">
            {Array.from({ length: 6 }).map((_, index: number) => (
              <CardSkeleton key={index} />
            ))}
          </div>
        ) : null}

        {getAllTwoFactorQuery.isError ? <ErrorRequest /> : null}
      </div>
    </DashboardLayout>
  );
}
