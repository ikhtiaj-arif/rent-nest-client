"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  ArrowRight,
  Loader2,
  XCircle,
  Clock,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getPaymentBySession } from "@/app/(dashboardGroup)/_actions/tenantActions";

type PollStatus = "polling" | "completed" | "failed" | "timeout";

const POLL_INTERVAL_MS = 2000;
const MAX_ATTEMPTS = 10; // ~20 seconds total before we stop and show a fallback

interface Props {
  sessionId: string;
}

export function PaymentStatusPoller({ sessionId }: Props) {
  const [status, setStatus] = useState<PollStatus>("polling");
  const [propertyTitle, setPropertyTitle] = useState<string | null>(null);

  useEffect(() => {
    let attempts = 0;
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const poll = async () => {
      attempts += 1;

      try {
        const res = await getPaymentBySession(sessionId);
        const payment = res?.data;

        if (cancelled) return;

        if (payment?.status === "COMPLETED") {
          setPropertyTitle(payment.rentalRequest?.property?.title ?? null);
          setStatus("completed");
          return;
        }

        if (payment?.status === "FAILED") {
          setStatus("failed");
          return;
        }

        // Still PENDING, or the payment record hasn't landed in our DB
        // yet (can happen for the first second or two right after the
        // Stripe redirect) — keep polling either way.
        if (attempts >= MAX_ATTEMPTS) {
          setStatus("timeout");
          return;
        }

        timeoutId = setTimeout(poll, POLL_INTERVAL_MS);
      } catch {
        if (cancelled) return;

        if (attempts >= MAX_ATTEMPTS) {
          setStatus("timeout");
          return;
        }

        timeoutId = setTimeout(poll, POLL_INTERVAL_MS);
      }
    };

    poll();

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [sessionId]);

  if (status === "polling") {
    return (
      <Card className="w-full max-w-xl">
        <CardHeader className="items-center text-center space-y-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>

          <CardTitle className="text-3xl">Confirming Payment</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4 text-center">
          <p className="text-muted-foreground">
            We&apos;re confirming your payment with our provider. This
            usually takes just a few seconds — please don&apos;t close this
            page.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (status === "failed") {
    return (
      <Card className="w-full max-w-xl">
        <CardHeader className="items-center text-center space-y-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-950">
            <XCircle className="h-10 w-10 text-red-600" />
          </div>

          <CardTitle className="text-3xl">Payment Failed</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6 text-center">
          <p className="text-muted-foreground">
            Your payment couldn&apos;t be completed. You haven&apos;t been
            charged. You can try again from your rental requests.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild className="flex-1">
              <Link href="/dashboard/rental-requests">
                Back to Requests
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button variant="outline" asChild className="flex-1">
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (status === "timeout") {
    return (
      <Card className="w-full max-w-xl">
        <CardHeader className="items-center text-center space-y-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-950">
            <Clock className="h-10 w-10 text-amber-600" />
          </div>

          <CardTitle className="text-3xl">Still Processing</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6 text-center">
          <p className="text-muted-foreground">
            This is taking longer than usual. Your payment may still be
            processing on our end — check your payment history in a moment,
            or refresh this page to check again.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button className="flex-1" onClick={() => window.location.reload()}>
              Check Again
            </Button>

            <Button variant="outline" asChild className="flex-1">
              <Link href="/dashboard/payments">View Payments</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // status === "completed"
  return (
    <Card className="w-full max-w-xl">
      <CardHeader className="items-center text-center space-y-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-950">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </div>

        <CardTitle className="text-3xl">Payment Successful</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6 text-center">
        <p className="text-muted-foreground">
          {propertyTitle
            ? `Your payment for "${propertyTitle}" has been confirmed.`
            : "Your payment has been confirmed."}{" "}
          Your rental is now active.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild className="flex-1">
            <Link href="/dashboard/payments">
              View Payments
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>

          <Button variant="outline" asChild className="flex-1">
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
