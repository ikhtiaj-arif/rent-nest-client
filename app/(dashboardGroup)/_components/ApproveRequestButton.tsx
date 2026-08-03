"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";

import { initialAuthState } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { updateLandlordRequestAction } from "../_actions/adminActions";
 

interface ApproveRequestButtonProps {
  requestId: string;
}

export default function ApproveRequestButton({
  requestId,
}: ApproveRequestButtonProps) {
  const [state, formAction, pending] = useActionState(
    updateLandlordRequestAction.bind(null, requestId),
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
    <form action={formAction}>
      <input
        type="hidden"
        name="status"
        value="APPROVED"
      />

      <Button
        type="submit"
        name="requestId"
        value={requestId}
        disabled={pending}
      >
        {pending ? "Approving..." : "Approve"}
      </Button>
    </form>
  );
}