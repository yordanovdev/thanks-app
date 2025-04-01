import { useForm } from "react-hook-form";
import { Doc } from "../../../convex/_generated/dataModel";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { PencilIcon, X, Trash2 } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { cn } from "@/lib/utils";

type ThanksItemProps = {
  thank: Doc<"thanks">;
};

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
});

export const ThanksItem = ({ thank }: ThanksItemProps) => {
  const [editMode, setEditMode] = useState(false);
  const updateThankItem = useMutation(api.thanks.updateThanksItem);
  const deleteThankItem = useMutation(api.thanks.deleteThanksItem);
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: thank,
  });

  const onUpdate = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    await updateThankItem({
      id: thank._id,
      name: values.name,
      description: values.description ?? "",
    });
    setLoading(false);
    setEditMode(false);
  };

  const onDelete = async () => {
    setLoading(true);
    if (confirm("Are you sure you want to delete this item?")) {
      await deleteThankItem({ id: thank._id });
    }
    setLoading(false);
  };

  return (
    <Card
      key={thank._id}
      className={cn(
        "relative group transition-all duration-200",
        loading && "opacity-50 pointer-events-none"
      )}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onUpdate)}>
          <CardHeader>
            {editMode ? (
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name:</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="I am thankful for:"
                        type="text"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <CardTitle className="w-10/12">
                {!thank.name ? (
                  <p className="opacity-80">Generating title...</p>
                ) : (
                  thank.name
                )}
              </CardTitle>
            )}

            {!editMode && (
              <CardDescription className="my-1">
                {new Date(thank.date).toLocaleDateString()} at{" "}
                {new Date(thank.date).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            {editMode ? (
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="mt-3">
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
            ) : (
              <p>{thank.description || "No description provided."}</p>
            )}
            {editMode && (
              <Button className="mt-3" type="submit">
                Update
              </Button>
            )}
          </CardContent>
        </form>
      </Form>
      <div className="absolute right-2 top-2 flex gap-1 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => setEditMode(!editMode)}
          className="h-9 w-9 p-0 hover:bg-zinc-200/80 md:h-8 md:w-8"
        >
          {editMode ? (
            <X className="h-4 w-4" />
          ) : (
            <PencilIcon className="h-4 w-4" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={onDelete}
          className="h-9 w-9 p-0 hover:bg-red-100 text-red-500 md:h-8 md:w-8"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};
