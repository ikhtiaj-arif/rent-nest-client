import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

interface Review {
    id: string;
    rating: number;
    comment: string;
    createdAt: string;
}

interface PropertyReviewsProps {
    reviews: Review[];
}

export default function PropertyReviews({
    reviews,
}: PropertyReviewsProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>
                    Reviews ({reviews.length})
                </CardTitle>

                {reviews.length > 0 && (
                    <div className="flex items-center gap-1 text-sm font-medium">
                        <Star className="h-4 w-4 fill-current text-yellow-500" />
                        {(
                            reviews.reduce(
                                (sum, review) => sum + review.rating,
                                0
                            ) / reviews.length
                        ).toFixed(1)}
                    </div>
                )}
            </CardHeader>

            <CardContent>
                {reviews.length === 0 ? (
                    <div className="rounded-lg border border-dashed py-12 text-center">
                        <Star className="mx-auto mb-3 h-10 w-10 text-muted-foreground/50" />

                        <h3 className="font-semibold">
                            No Reviews Yet
                        </h3>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Be the first tenant to leave a review for this
                            property.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {reviews.map((review, index) => (
                            <div key={review.id}>
                                <div className="flex gap-4">
                                    <Avatar>
                                        <AvatarFallback>
                                            T
                                        </AvatarFallback>
                                    </Avatar>

                                    <div className="flex-1">
                                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                            <div>
                                                <p className="font-medium">
                                                    Anonymous Tenant
                                                </p>

                                                <p className="text-xs text-muted-foreground">
                                                    {new Date(
                                                        review.createdAt
                                                    ).toLocaleDateString()}
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-1">
                                                {Array.from({
                                                    length: 5,
                                                }).map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`h-4 w-4 ${
                                                            i <
                                                            review.rating
                                                                ? "fill-yellow-500 text-yellow-500"
                                                                : "text-muted-foreground/30"
                                                        }`}
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        <p className="mt-3 text-sm leading-7 text-muted-foreground">
                                            {review.comment}
                                        </p>
                                    </div>
                                </div>

                                {index !== reviews.length - 1 && (
                                    <div className="mt-6 border-b" />
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}