"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { RsvpFormSchema, RsvpFormValues } from "@/lib/validations/rsvp-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const TSHIRT_SIZES = ["XS", "S", "M", "L", "XL", "2XL", "3XL"] as const;

const RSVPForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<RsvpFormValues>({
    resolver: zodResolver(RsvpFormSchema),
    defaultValues: {
      emergencyContactName: "",
      relationshipToParticipant: "",
      emergencyContactPhoneNumber: "",
      alternativePhoneNumber: "",
      dietaryRestrictions: "",
      tshirtSize: "M",
      agreeToTerms: false,
      mediaConsent: false,
    },
  });

  const onSubmit = (values: RsvpFormValues) => {
    startTransition(async () => {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        toast.error("Something went wrong. Please try again.");
        return;
      }

      const data = await response.json();

      if (data.error) {
        toast.error(data.error);
        return;
      }

      toast.success("You're in! We can't wait to see you!");
      router.push("/dashboard");
      router.refresh();
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 rounded-lg border border-border/50 bg-card/50 p-6"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="emergencyContactName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Emergency Contact Name *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John Doe"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="relationshipToParticipant"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Relationship to Participant *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Parent, Sibling, Friend"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="emergencyContactPhoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Emergency Contact Phone Number *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="1234567890 (min. 10 digits)"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="alternativePhoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alternative Phone Number (Optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="1234567890 (min. 10 digits)"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="dietaryRestrictions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dietary Restrictions (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value || ""}
                  placeholder="Please list any dietary restrictions or allergies"
                  disabled={isPending}
                />
              </FormControl>
              <FormDescription>
                This helps us ensure we can accommodate your dietary needs
                during the event.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tshirtSize"
          render={({ field }) => (
            <FormItem>
              <FormLabel>T-Shirt Size *</FormLabel>
              <Select
                disabled={isPending}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your t-shirt size" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {TSHIRT_SIZES.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Please select your t-shirt size for the event swag.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="agreeToTerms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isPending}
                />
              </FormControl>
              <div className="space-y-1.5 leading-none">
                <FormLabel>I agree to the terms and conditions *</FormLabel>
                <FormDescription>
                  I understand and agree that the emergency contact information
                  provided will only be used in case of emergencies during the
                  event. I also confirm that I have informed the listed contact
                  that their information has been provided.
                </FormDescription>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mediaConsent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isPending}
                />
              </FormControl>
              <div className="leading-none">
                <FormLabel>
                  I agree to be subjected to photos and filming during the
                  duration of the event. *
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isPending}
          variant="primary"
          className="w-full"
        >
          {isPending ? "Submitting..." : "Confirm Attendance"}
        </Button>
      </form>
    </Form>
  );
};

export default RSVPForm;
