"use client"
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useRef } from 'react';

const SearchBar = () => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams();
    const debouncedReference = useRef<ReturnType<typeof setTimeout> | null>(null)

    const handleSearch = (value: string) => {

        //? clear debounce reference from call stack
        if (debouncedReference.current) {
            clearTimeout(debouncedReference.current)
        }
        //? using debouncing to prevent rendering on every key stroke
        debouncedReference.current = setTimeout(() => {
            const params = new URLSearchParams()
            if (value) {
                params.set('searchTerm', value)
            } else {
                params.delete("searchTerm")
            }
            router.push(`${pathname}?${params.toString()}`)

        }, 500)
    }


    return (
        <div className="relative w-full max-w-md mb-4">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
                type="text"
                placeholder="Search properties..."
                defaultValue={searchParams.get("searchTerm")?.toString() ?? ""}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
            />
        </div>
    );
};

export default SearchBar;