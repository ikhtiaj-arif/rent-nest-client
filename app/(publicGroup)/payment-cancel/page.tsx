import Link from "next/link";
import { CircleX, CreditCard } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PaymentCancelPage() {
  return (
    <main className="container flex min-h-[80vh] items-center justify-center py-10">
      <Card className="w-full max-w-xl">
        <CardHeader className="items-center text-center space-y-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-950">
            <CircleX className="h-10 w-10 text-red-600" />
          </div>

          <CardTitle className="text-3xl">
            Payment Cancelled
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6 text-center">
          <p className="text-muted-foreground">
            Your payment wasn&apos;t completed. No money has been charged.
          </p>

          <div className="rounded-lg border bg-muted/40 p-4 text-sm">
            You can return to your payment list and try again whenever you&apos;re
            ready.
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild className="flex-1">
              <Link href="/tenant-dashboard/payments">
                <CreditCard className="mr-2 h-4 w-4" />
                Try Again
              </Link>
            </Button>

            <Button
              variant="outline"
              asChild
              className="flex-1"
            >
              <Link href="/tenant-dashboard">
                Back to Dashboard
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}