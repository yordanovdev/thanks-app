"use client";

import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Authenticated, Unauthenticated } from "convex/react";
import { Thanks } from "../thanks/Thanks";
import { Button } from "../ui/button";

export function AuthWrapper() {
  return (
    <div className="relative">
      <Unauthenticated>
        <div className="min-h-[50vh] flex flex-col items-center justify-center gap-6 text-center p-8">
          <h1 className="text-4xl font-bold tracking-tight">
            Welcome to Thanks App
          </h1>
          <p className="text-lg text-muted-foreground max-w-md">
            Join our community to share and express gratitude with others.
          </p>
          <SignInButton mode="modal">
            <Button size="lg" className="font-semibold cursor-pointer">
              Get Started
              <span className="ml-2" aria-hidden="true">
                →
              </span>
            </Button>
          </SignInButton>
        </div>
      </Unauthenticated>
      <Authenticated>
        <div className="absolute top-0 right-0 p-4">
          <UserButton />
        </div>
        <Thanks />
      </Authenticated>
    </div>
  );
}
