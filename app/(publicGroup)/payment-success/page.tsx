import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Props {
  searchParams: Promise<{
    session_id?: string;
  }>;
}

export default async function PaymentSuccessPage({
  searchParams,
}: Props) {
  await searchParams;

  return (
    <main className="container flex min-h-[80vh] items-center justify-center py-10">
      <Card className="w-full max-w-xl">
        <CardHeader className="items-center text-center space-y-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-950">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>

          <CardTitle className="text-3xl">
            Payment Submitted
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6 text-center">
          <p className="text-muted-foreground">
            Thank you! Your payment has been received successfully.
          </p>

          <p className="text-sm text-muted-foreground">
            We&apos;re currently confirming your payment. This usually takes only a
            few seconds. Once confirmed by our payment provider, your payment
            status will automatically be updated.
          </p>

          <div className="rounded-lg border bg-muted/40 p-4 text-sm">
            You can safely leave this page. Your payment will continue to be
            processed in the background.
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild className="flex-1">
              <Link href="/dashboard/payments">
                View Payments
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button
              variant="outline"
              asChild
              className="flex-1"
            >
              <Link href="/dashboard">
                Go to Dashboard
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}