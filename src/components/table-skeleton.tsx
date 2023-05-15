import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function TableSkeleton() {
  return (
    <Card className="w-full">
      <CardContent>
        <div className="flex flex-col gap-10 mt-5">
          <Skeleton className="h-[20px] w-full" />
          <Skeleton className="h-[20px] w-full" />
          <Skeleton className="h-[20px] w-full" />
          <Skeleton className="h-[20px] w-full" />
          <Skeleton className="h-[20px] w-full" />
        </div>
      </CardContent>
    </Card>
  );
}
