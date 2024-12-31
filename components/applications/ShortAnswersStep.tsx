"use client";

import { Control } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Textarea } from "../ui/textarea";

interface ShortAnswersStepProps {
  control: Control<any>;
}

export function ShortAnswersStep({ control }: ShortAnswersStepProps) {
  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="shortAnswer1"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Short Answer 1</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                className="min-h-[150px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="shortAnswer2"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Short Answer 2</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                className="min-h-[150px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
