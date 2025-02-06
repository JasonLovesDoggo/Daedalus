"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

import { ProfileFormData, profileSchema } from "@/lib/validations/profile";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { HobbiesSelect } from "@/components/ui/hobbies-select";
import { Input } from "@/components/ui/input";
import { PlatformSelect } from "@/components/ui/platform-select";
import { Textarea } from "@/components/ui/textarea";

interface ProfileFormProps {
  initialData?: Partial<ProfileFormData>;
}

export function ProfileForm({ initialData }: ProfileFormProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { data: session } = useSession();

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      bio: initialData?.bio || "",
      hobbies: initialData?.hobbies || "",
      integrations: initialData?.integrations || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "integrations",
  });

  const onSubmit = async (data: ProfileFormData) => {
    console.log("data", data);

    startTransition(async () => {
      try {
        const res = await fetch("/api/profile", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const result = await res.json();

        if (!result.success) {
          throw new Error(result.error || "Failed to update profile");
        }

        toast.success(result.message);
        router.push(`/profile/${session?.user?.id}`);
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Something went wrong",
        );
      }
    });
  };

  const addNewPlatform = () => {
    append({ platform: "github", url: "" });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormItem>
          <FormLabel>Display name (unchangeable)</FormLabel>
          <Input value={session?.user.name?.split(" ")[0] || ""} disabled />
        </FormItem>

        {/* Bio Section */}
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell others about yourself..."
                  className="min-h-[120px] resize-y"
                  {...field}
                  value={field.value || ""}
                  disabled={isPending}
                />
              </FormControl>
              <FormDescription>
                A brief introduction about yourself. Max 500 characters.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Hobbies Section */}
        <FormField
          control={form.control}
          name="hobbies"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hobbies</FormLabel>
              <FormControl>
                <HobbiesSelect
                  value={field.value}
                  onChange={field.onChange}
                  disabled={isPending}
                />
              </FormControl>
              <FormDescription>
                Select from common hobbies or type your own. Your hobbies help
                us match you with like-minded hackers.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Social Integrations Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <FormLabel className="text-lg">Social Integrations</FormLabel>
              <FormDescription>
                Connect your social media accounts and websites
              </FormDescription>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addNewPlatform}
              disabled={isPending}
              className="shrink-0 gap-2"
            >
              <PlusCircle className="h-4 w-4" />
              Add Platform
            </Button>
          </div>

          <div className="space-y-4">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="relative rounded-lg border p-4 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-start gap-4">
                  <FormField
                    control={form.control}
                    name={`integrations.${index}.platform`}
                    render={({ field }) => (
                      <FormItem className="flex-[2]">
                        <FormControl>
                          <PlatformSelect
                            value={field.value}
                            onChange={field.onChange}
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`integrations.${index}.url`}
                    render={({ field }) => (
                      <FormItem className="flex-[3]">
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="https://..."
                            disabled={isPending}
                            className="transition-all focus-visible:ring-1"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => remove(index)}
                    disabled={isPending}
                    className="shrink-0"
                  >
                    <span className="sr-only">Remove platform</span>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </Form>
  );
}
