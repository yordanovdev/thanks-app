"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Card, CardContent } from "../ui/card";
import { ThanksItem } from "./ThanksItem";

export const ThanksList = () => {
  const thanks = useQuery(api.thanks.getThanks, {});
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Your Gratitude List</h2>

      {thanks?.length === 0 ? (
        <Card className="bg-muted">
          <CardContent className="py-8 text-center text-muted-foreground">
            <p>Your gratitude list is empty. Add your first item above!</p>
          </CardContent>
        </Card>
      ) : (
        <>
          {thanks ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {thanks?.map((thank) => (
                <ThanksItem key={thank._id} thank={thank} />
              ))}
            </div>
          ) : (
            <ThanksListSkeleton />
          )}
        </>
      )}
    </div>
  );
};

const ThanksListSkeleton = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <Card key={index} className="animate-pulse bg-muted w-full h-32" />
      ))}
    </div>
  );
};
