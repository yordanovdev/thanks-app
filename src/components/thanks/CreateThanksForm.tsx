"use client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { PlusCircle } from "lucide-react";

const formSchema = z.object({
  description: z.string().min(1, {
    message: "Description is required",
  }),
});

export default function CreateThanksForm() {
  const createThanks = useMutation(api.thanks.createThanksItem);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await createThanks({
      date: new Date().toISOString(),
      description: values.description ?? "",
    });
    toast.success("Thanks item created!");
    form.reset();
  }

  return (
    <Card className="mb-8 mx-auto max-w-2xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>What are you grateful for today?</CardTitle>
            <CardDescription>
              Taking time to appreciate the good things in life can improve your
              mental well-being.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 w-full my-8">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe in detail what you are thankful for:"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full cursor-pointer">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Gratitude
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
