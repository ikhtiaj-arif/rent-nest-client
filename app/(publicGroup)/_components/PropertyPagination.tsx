"use client";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import {
    usePathname,
    useRouter,
    useSearchParams,
} from "next/navigation";

interface Props {
    meta: {
        page: number;
        totalPage: number;
        total: number;
        limit: number;
    };
}

export default function PropertyPagination({ meta }: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const navigate = (page: number) => {
        if (page < 1 || page > meta?.totalPage) return;

        const params = new URLSearchParams(searchParams.toString());

        params.set("page", page.toString());

        router.push(`${pathname}?${params.toString()}`);
    };

    if (meta?.totalPage <= 1) return null;

    const pages: (number | "...")[] = [];

    if (meta?.totalPage <= 5) {
        for (let i = 1; i <= meta?.totalPage; i++) {
            pages.push(i);
        }
    } else if (meta?.page <= 3) {
        pages.push(1, 2, 3, 4, "...", meta?.totalPage);
    } else if (meta?.page >= meta?.totalPage - 2) {
        pages.push(
            1,
            "...",
            meta?.totalPage - 3,
            meta?.totalPage - 2,
            meta?.totalPage - 1,
            meta?.totalPage
        );
    } else {
        pages.push(
            1,
            "...",
            meta?.page - 1,
            meta?.page,
            meta?.page + 1,
            "...",
            meta?.totalPage
        );
    }

    const isFirstPage = meta?.page === 1;
    const isLastPage = meta?.page === meta?.totalPage;

    return (
        <Pagination className="mt-10">
            <PaginationContent>

                {/* Previous */}

                <PaginationItem>
                    <PaginationPrevious
                        href={isFirstPage ? undefined : "#"}
                        aria-disabled={isFirstPage}
                        tabIndex={isFirstPage ? -1 : undefined}
                        className={cn(
                            isFirstPage &&
                                "pointer-events-none opacity-50"
                        )}
                        onClick={(e) => {
                            e.preventDefault();

                            if (!isFirstPage) {
                                navigate(meta?.page - 1);
                            }
                        }}
                    />
                </PaginationItem>

                {/* Page Numbers */}

                {pages.map((page, index) =>
                    page === "..." ? (
                        <PaginationItem key={index}>
                            <PaginationEllipsis />
                        </PaginationItem>
                    ) : (
                        <PaginationItem key={page}>
                            <PaginationLink
                                href="#"
                                isActive={page === meta?.page}
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate(page);
                                }}
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    )
                )}

                {/* Next */}

                <PaginationItem>
                    <PaginationNext
                        href={isLastPage ? undefined : "#"}
                        aria-disabled={isLastPage}
                        tabIndex={isLastPage ? -1 : undefined}
                        className={cn(
                            isLastPage &&
                                "pointer-events-none opacity-50"
                        )}
                        onClick={(e) => {
                            e.preventDefault();

                            if (!isLastPage) {
                                navigate(meta?.page + 1);
                            }
                        }}
                    />
                </PaginationItem>

            </PaginationContent>
        </Pagination>
    );
}