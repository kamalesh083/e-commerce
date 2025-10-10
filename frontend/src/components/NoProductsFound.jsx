import React from "react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { PackageX } from "lucide-react";

const NoProductsFound = () => {
  return (
    <Empty className="flex flex-col items-center justify-center col-span-full h-[60vh]">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <PackageX className="h-24 w-24 text-purple-500" />
        </EmptyMedia>
        <EmptyTitle className="text-4xl  text-white mt-4">
          No Results Found
        </EmptyTitle>
        <EmptyDescription className="text-gray-400 text-center text-lg max-w-md mt-2">
          We couldn't find any products matching your search. Try adjusting your
          keywords or check back later.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
};

export default NoProductsFound;
