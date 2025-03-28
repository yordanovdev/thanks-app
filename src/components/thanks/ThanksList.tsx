"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

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
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {thanks?.map((thank) => (
            <Card key={thank._id}>
              <CardHeader>
                <CardTitle>{thank.name}</CardTitle>
                <CardDescription>
                  {new Date(thank.date).toLocaleDateString()} at{" "}
                  {new Date(thank.date).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>{thank.description || "No description provided."}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
