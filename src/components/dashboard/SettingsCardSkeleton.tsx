import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "../ui/separator";

export const SettingsCardSkeleton = () => {
  return (
    <>
      <div className="p-6 flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-10 font-medium">
          <Skeleton className="h-4 w-full xl:w-[90%]" />
          <Skeleton className="h-4 w-full" />
        </div>
        <div className="grid grid-cols-2 gap-10 font-medium">
          <Skeleton className="h-4 w-full xl:w-[70%]" />
          <Skeleton className="h-4 w-full" />
        </div>
        <Separator />
        <div className="grid grid-cols-2 gap-10 font-medium">
          <Skeleton className="h-4 w-full xl:w-[90%]" />
          <Skeleton className="h-4 xl:w-[90%]" />
        </div>
        <div className="grid grid-cols-2 gap-10 font-medium">
          <Skeleton className="h-4 w-full xl:w-[60%]" />
          <Skeleton className="h-4 w-full" />
        </div>
        <div className="grid grid-cols-2 gap-10 font-medium">
          <Skeleton className="h-4 w-full xl:w-[90%]" />
          <Skeleton className="h-4 w-full xl:w-[70%]" />
        </div>
      </div>
    </>
  );
};
