import Link from "next/link";
import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PaymentStatusPoller } from "@/app/(publicGroup)/_components/PaymentStatusPoller";

interface Props {
  searchParams: Promise<{
    session_id?: string;
  }>;
}

export default async function PaymentSuccessPage({ searchParams }: Props) {
  const { session_id: sessionId } = await searchParams;

  return (
    <main className="container flex min-h-[80vh] items-center justify-center py-10">
      {sessionId ? (
        <PaymentStatusPoller sessionId={sessionId} />
      ) : (
        // Someone landed here without a session_id — e.g. navigated back,
        // bookmarked the URL, or opened it directly. We have nothing to
        // poll, so don't pretend otherwise; point them somewhere useful.
        <Card className="w-full max-w-xl">
          <CardHeader className="items-center text-center space-y-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-950">
              <AlertTriangle className="h-10 w-10 text-amber-600" />
            </div>

            <CardTitle className="text-3xl">No Payment Found</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6 text-center">
            <p className="text-muted-foreground">
              We couldn&apos;t find a payment session for this page. If you
              just completed a payment, check your payment history below.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild className="flex-1">
                <Link href="/dashboard/payments">View Payments</Link>
              </Button>

              <Button variant="outline" asChild className="flex-1">
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </main>
  );
}
