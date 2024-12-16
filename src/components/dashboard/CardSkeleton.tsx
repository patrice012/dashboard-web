import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

export type CardProps = {
  createdAt: string;
  updatedAt: string;
  email: string;
  factorCode: string;
  _id: string;
};

export function CardSkeleton({ ...props }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-neutral-200 bg-white text-neutral-950 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50 w-[390px] h-[100px] shadow-lg flex flex-col items-start justify-center p-3 gap-2 "
      )}
      {...props}
    >
      <div className=""></div>
      <Skeleton className="h-4 w-[75%]" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-[90%]" />
    </div>
  );
}
