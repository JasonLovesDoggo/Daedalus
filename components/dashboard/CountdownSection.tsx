"use client";

import { CountdownTimer } from "../ui/CountdownTimer";
import { Snowflakes } from "../ui/Snowflakes";

export const CountdownSection = () => {
  const targetDate = new Date("2025-02-21T18:00:00-05:00"); // Feb 21st 6 PM EST

  return (
    <div className="relative overflow-hidden rounded-md border border-gray-300 p-4 md:p-8 lg:col-span-2 xl:p-12">
      <Snowflakes />

      <div className="relative z-10 flex h-full flex-col justify-between">
        <CountdownTimer targetDate={targetDate} />

        {/* Bottom left decorative section */}
        <div className="flex items-center gap-4">
          <img
            src="/beaver-wave.webp"
            alt="Beaver mascot"
            className="size-20"
          />
          <div className="">
            <p className="font-rubik font-bold text-textPrimary md:text-lg">
              The countdown begins!
            </p>
            <p className="md:text-lg">
              <span className="text-textMuted">
                Gear up for an epic adventure
              </span>{" "}
              ⛰
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
