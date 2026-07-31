"use client";

import { useActionState, useEffect } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";

import { createReview } from "@/app/(dashboardGroup)/_actions/tenantActions";
import { initialAuthState } from "@/lib/types";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  propertyId: string;
  rentalRequestId: string;
}

export default function ReviewForm({
  propertyId,
  rentalRequestId,
}: Props) {
    console.log("IDS", propertyId, rentalRequestId);
  const [state, formAction, pending] = useActionState(
    createReview,
    initialAuthState
  );

  useEffect(() => {
    if (!state.message) return;

    if (state.success) {
      toast.success(state.message);
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
        <form action={formAction} className="space-y-4">
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

          <div className="space-y-2">
            <Label>Rating</Label>

            <Select name="rating" required>
              <SelectTrigger>
                <SelectValue placeholder="Select rating" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="1">1 ⭐</SelectItem>
                <SelectItem value="1.5">1.5 ⭐</SelectItem>
                <SelectItem value="2">2 ⭐</SelectItem>
                <SelectItem value="2.5">2.5 ⭐</SelectItem>
                <SelectItem value="3">3 ⭐</SelectItem>
                <SelectItem value="3.5">3.5 ⭐</SelectItem>
                <SelectItem value="4">4 ⭐</SelectItem>
                <SelectItem value="4.5">4.5 ⭐</SelectItem>
                <SelectItem value="5">5 ⭐</SelectItem>
              </SelectContent>
            </Select>
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