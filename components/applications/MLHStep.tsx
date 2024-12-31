"use client";

import { Control } from "react-hook-form";

import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

interface MLHStepProps {
  control: Control<any>;
}

export function MLHStep({ control }: MLHStepProps) {
  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="mlhCheckbox1"
        render={({ field }) => (
          <FormItem className="flex items-center space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <FormLabel>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </FormLabel>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="mlhCheckbox2"
        render={({ field }) => (
          <FormItem className="flex items-center space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <FormLabel>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </FormLabel>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="mlhCheckbox3"
        render={({ field }) => (
          <FormItem className="flex items-center space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <FormLabel>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </FormLabel>
          </FormItem>
        )}
      />
    </div>
  );
}
