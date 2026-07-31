"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";
 
import { toast } from "sonner";
import { createPaymentAction } from "../../_actions/tenantActions";

interface Props {
  rentalRequestId: string;
}

export default function PayNowButton({
  rentalRequestId,
}: Props) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    try {
      const res = await createPaymentAction(rentalRequestId);

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      window.location.href = res.data.paymentUrl;
    } catch {
      toast.error("Failed to create payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={loading}
      className="w-full"
    >
      {loading && (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      )}

      Pay Now
    </Button>
  );
}