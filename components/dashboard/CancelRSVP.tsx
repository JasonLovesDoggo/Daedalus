"use client";

import { useState, useTransition } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

const CancelRSVP = () => {
  const { data } = useSession();
  const [isPending, startTransition] = useTransition();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const onSubmit = () => {
    startTransition(async () => {
      try {
        const response = await fetch("/api/rsvp/cancel", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: data?.user.id }),
        });

        if (!response.ok) {
          throw new Error("Failed to cancel RSVP");
        }

        toast.success("RSVP cancelled successfully");
        setShowConfirmation(false);
      } catch (error) {
        toast.error("Failed to cancel RSVP. Please try again.");
      }
    });
  };

  return (
    <>
      {showConfirmation ? (
        <div className="space-y-2">
          <p className="text-xs text-textMuted md:text-sm">
            Are you sure you want to cancel your RSVP? This action cannot be
            undone.
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setShowConfirmation(false)}
              className="hover:text-text text-xs text-success md:text-sm"
            >
              Let's keep it!
            </button>
            <span className="my-auto h-4 w-0.5 bg-textMuted" />
            <button
              type="button"
              onClick={onSubmit}
              disabled={isPending}
              className="group relative text-xs text-primary transition-colors hover:text-primaryDark disabled:opacity-50 md:text-sm"
            >
              {isPending ? "Cancelling..." : "Confirm Cancellation"}
              <span className="absolute inset-x-0 bottom-0 h-px origin-center scale-x-0 bg-primaryDark transition-transform group-hover:scale-x-100" />
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <p className="text-xs text-textMuted md:text-sm">
            No longer able to attend? You can cancel your RSVP and give your
            spot to someone on the waitlist!{" "}
          </p>
          <form>
            <button
              type="button"
              onClick={() => setShowConfirmation(true)}
              className="group relative text-xs text-primary transition-colors hover:text-primaryDark md:text-sm"
            >
              Cancel RSVP
              <span className="absolute inset-x-0 bottom-0 h-px origin-center scale-x-0 bg-primaryDark transition-transform group-hover:scale-x-100" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
export default CancelRSVP;
