import { cn } from "@/lib/utils";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";

type CardProps = {
  title: string;
  activeUntil: string;
  description: string;
  category: string;
  tags: string[];
};

export function CardUI({
  title,
  activeUntil,
  description,
  category,
  tags,
  className,
  ...props
}: CardProps & { className?: string }) {
  const { mainBg, lighterBg } = statusColors(category) || {};

  return (
    <Card className={cn("w-[390px] shadow-lg", className)} {...props}>
      {/* Header */}
      <CardHeader className="flex flex-col gap-2 pt-5 pb-2">
        <div className="flex items-center justify-start gap-2 px-2 py-1 border-2 border-solid rounded-lg w-fit">
          <h4 className="text-gray-700 dark:text-slate-100 text-sm font-medium">
            Active until:
          </h4>
          <span className="font-semibold text-sm">{activeUntil}</span>
        </div>
        <CardTitle className="text-[1.1rem] font-bold mt-0">{title}</CardTitle>
      </CardHeader>

      {/* Content */}
      <CardContent className="pb-4">
        <p className="text-gray-600 dark:text-slate-100 text-sm leading-relaxed line-clamp-2 ">
          {description}
        </p>
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex items-center gap-4">
        <div
          className={cn(
            "flex items-center justify-center gap-2 px-2 py-2 rounded-lg",
            lighterBg
          )}
        >
          <span
            className={cn(
              "w-2 h-2 -translate-y-[.07rem] block rounded-[2px] animate-pulse",
              mainBg
            )}
          ></span>
          <span className="text-[.85rem] dark:text-slate-950 text-nowrap font-semibold">
            {category}
          </span>
        </div>
        {tags.map((tag, index) => (
          <div
            key={index}
            className="flex items-center justify-center gap-2  px-[.44rem] py-2 rounded-lg border text-gray-700 dark:text-slate-100 text-sm font-medium"
          >
            <span>{tag}</span>
          </div>
        ))}
      </CardFooter>
    </Card>
  );
}

// Helper Function: Dynamic color assignment based on category
const statusColors = (status: string) => {
  if (status.toLowerCase().includes("business and marketing"))
    return { mainBg: "bg-blue-600", lighterBg: "bg-blue-200" };
  if (status.toLowerCase().includes("design"))
    return { mainBg: "bg-green-600", lighterBg: "bg-green-200" };
  if (status.toLowerCase().includes("project manager"))
    return { mainBg: "bg-yellow-600", lighterBg: "bg-yellow-200" };
  if (status.toLowerCase().includes("development"))
    return { mainBg: "bg-sky-600", lighterBg: "bg-sky-200" };
  return { mainBg: "bg-gray-400", lighterBg: "bg-gray-200" };
};
