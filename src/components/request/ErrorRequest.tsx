import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function ErrorRequest({
  refresh,
  goBackUrl,
  error = "Request failed.",
  description = "There was an issue processing your request. Please try refreshing or go back to the previous page.",
}: {
  refresh?: () => void;
  goBackUrl?: string;
  error?: string;
  description?: string;
}) {
  return (
    <div className="flex items-center px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-xl mx-auto">
      <div className="w-full space-y-6 text-center">
        <div className="space-y-3">
          <h1 className="text-ld font-bold tracking-tighter sm:text-md transition-transform">
            {error}
          </h1>
          <p className="text-gray-500">{description}</p>
        </div>
        {refresh && <Button onClick={refresh}>Refresh</Button>}
        {goBackUrl && (
          <Button asChild>
            <Link
              to={goBackUrl}
              className="inline-flex h-10 items-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
            >
              Go back
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
