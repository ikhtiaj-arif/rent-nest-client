"use client";

import { useTransition } from "react";
import { toast } from "sonner";

 

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { endRentalAction } from "../_actions/tenantActions";

interface EndRentalDialogProps {
  rentalRequestId: string;
}

export default function EndRentalDialog({
  rentalRequestId,
}: EndRentalDialogProps) {
  const [pending, startTransition] = useTransition();

  const handleEndRental = () => {
    startTransition(async () => {
      const result = await endRentalAction(rentalRequestId);

      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="sm" variant="destructive">
          End Rental
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            End this rental?
          </AlertDialogTitle>

          <AlertDialogDescription>
            This will end the current rental agreement. This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={pending}>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleEndRental();
            }}
            disabled={pending}
          >
            {pending ? "Ending..." : "End Rental"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}