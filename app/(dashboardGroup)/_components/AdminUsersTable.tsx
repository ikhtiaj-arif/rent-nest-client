"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import PropertyPagination from "@/app/(publicGroup)/_components/PropertyPagination";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { EmptyState } from "@/components/shared/EmptyState";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { updateUserById } from "../_actions/adminActions";
import { Users } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "TENANT" | "LANDLORD" | "ADMIN";
  status: "ACTIVE" | "BANNED";
  createdAt: string;
}

interface Props {
  users: User[];
  meta: {
    page: number;
    totalPage: number;
    total: number;
    limit: number;
  };
}

export default function AdminUsersTable({ users, meta }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const updateStatus = (id: string, status: "ACTIVE" | "BANNED") => {
    startTransition(async () => {
      const res = await updateUserById(id, { status });
      if (res.success) {
        toast.success(res.message || `User status changed to ${status}.`);
        router.refresh();
      } else {
        toast.error(res.message || "Failed to update user status.");
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border/60 bg-card overflow-hidden shadow-xs">
        <Table>
          <TableHeader className="bg-muted/40">
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead className="hidden md:table-cell">Contact</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden sm:table-cell">Joined</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.map((user) => {
              const initial = (user.name || "U").charAt(0).toUpperCase();
              return (
                <TableRow key={user.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0">
                        {initial}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-sm text-foreground truncate">{user.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                    {user.phone || "—"}
                  </TableCell>

                  <TableCell>
                    <StatusBadge status={user.role} />
                  </TableCell>

                  <TableCell>
                    <StatusBadge status={user.status} />
                  </TableCell>

                  <TableCell className="hidden sm:table-cell text-xs text-muted-foreground">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>

                  <TableCell className="text-right">
                    {user.role === "ADMIN" ? (
                      <span className="text-xs font-medium text-muted-foreground px-2 py-1 bg-muted rounded-md">
                        Protected
                      </span>
                    ) : (
                      <ConfirmDialog
                        trigger={
                          <Button
                            size="sm"
                            variant={user.status === "ACTIVE" ? "destructive" : "default"}
                            disabled={pending}
                            className="h-8 text-xs font-medium"
                          >
                            {user.status === "ACTIVE" ? "Ban" : "Activate"}
                          </Button>
                        }
                        title={user.status === "ACTIVE" ? "Ban User Account" : "Activate User Account"}
                        description={
                          user.status === "ACTIVE"
                            ? `Are you sure you want to ban ${user.name}? They will lose access to platform features.`
                            : `Are you sure you want to restore active access for ${user.name}?`
                        }
                        confirmLabel={user.status === "ACTIVE" ? "Ban Account" : "Activate Account"}
                        variant={user.status === "ACTIVE" ? "destructive" : "default"}
                        isLoading={pending}
                        onConfirm={() =>
                          updateStatus(user.id, user.status === "ACTIVE" ? "BANNED" : "ACTIVE")
                        }
                      />
                    )}
                  </TableCell>
                </TableRow>
              );
            })}

            {!users.length && (
              <TableRow>
                <TableCell colSpan={6} className="p-0">
                  <EmptyState
                    icon={Users}
                    title="No users found"
                    description="There are currently no users matching your criteria."
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <PropertyPagination meta={meta} />
    </div>
  );
}