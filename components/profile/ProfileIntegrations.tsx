"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PlusCircle, Trash2 } from "lucide-react";
import { Control, UseFieldArrayReturn } from "react-hook-form";

import { ProfileFormData } from "@/lib/validations/profile";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PlatformSelect } from "@/components/ui/platform-select";

interface ProfileIntegrationsProps {
  control: Control<ProfileFormData>;
  fieldArray: UseFieldArrayReturn<ProfileFormData, "integrations">;
  isPending: boolean;
}

export function ProfileIntegrations({
  control,
  fieldArray,
  isPending,
}: ProfileIntegrationsProps) {
  const { fields, append, remove } = fieldArray;
  const addNewPlatform = () => {
    append({ platform: "github", url: "" });
  };

  const handleRemove = (index: number) => {
    remove(index);
  };

  return (
    <div className="h-auto rounded-lg border p-2.5 transition-[height] md:p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
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
          <PlusCircle className="size-4" />
          Add Platform
        </Button>
      </div>

      {/* <AnimatePresence> */}
      {fields.map((field) => (
        <motion.div
          layout
          key={field.id}
          initial={{ opacity: 0, scale: 0.8, height: 0 }}
          animate={{ opacity: 1, scale: 1, height: "auto" }}
          exit={{ opacity: 0, scale: 0.8, height: 0 }}
          transition={{
            opacity: { duration: 0.2 },
            scale: { duration: 0.2 },
            height: { duration: 0.2 },
            layout: { duration: 0.2 },
          }}
          className="mt-4"
        >
          <div className="rounded-lg border p-4 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <FormField
                control={control}
                name={`integrations.${fields.indexOf(field)}.platform`}
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
                control={control}
                name={`integrations.${fields.indexOf(field)}.url`}
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
                onClick={() => handleRemove(fields.indexOf(field))}
                disabled={isPending}
                className="shrink-0"
              >
                <span className="sr-only">Remove platform</span>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      ))}
      {/* </AnimatePresence> */}
    </div>
  );
}
