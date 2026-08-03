"use client";

import { Star } from "lucide-react";
import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { createReview } from "@/app/(dashboardGroup)/_actions/tenantActions";
import { initialAuthState } from "@/lib/types";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  propertyId: string;
  rentalRequestId: string;
}

export default function ReviewForm({
  propertyId,
  rentalRequestId,
}: Props) {

  const [state, formAction, pending] = useActionState(
    createReview,
    initialAuthState
  );
  const formRef = useRef<HTMLFormElement>(null);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  useEffect(() => {
    if (!state.message) return;

    if (state.success) {
      toast.success(state.message);
      startTransition(() => {
        setRating(0);
      });
      formRef.current?.reset();
    } else {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5" />
          Leave a Review
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form ref={formRef} action={formAction} className="space-y-4">
          <input
            type="hidden"
            name="propertyId"
            value={propertyId}
          />

          <input
            type="hidden"
            name="rentalRequestId"
            value={rentalRequestId}
          />

          <div className="space-y-3">
            <Label>Rating</Label>

            <input
              type="hidden"
              name="rating"
              value={rating}
            />

            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-8 w-8 transition-colors ${star <= (hoveredRating || rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                      }`}
                  />
                </button>
              ))}
            </div>

            <p className="text-sm text-muted-foreground">
              {rating === 0
                ? "Select a rating"
                : `${rating} out of 5`}
            </p>
          </div>

          <div className="space-y-2">
            <Label>Comment</Label>

            <Textarea
              name="comment"
              rows={4}
              placeholder="Share your experience..."
              required
            />
          </div>

          <Button
            type="submit"
            disabled={pending}
            className="w-full"
          >
            {pending ? "Submitting..." : "Submit Review"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}