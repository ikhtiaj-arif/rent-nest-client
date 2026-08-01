"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

 

import PropertyPagination from "@/app/(publicGroup)/_components/PropertyPagination";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { updateUserById } from "../_actions/adminActions";

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

export default function AdminUsersTable({
  users,
  meta,
}: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const updateStatus = (
    id: string,
    status: "ACTIVE" | "BANNED"
  ) => {
    startTransition(async () => {
      const res = await updateUserById(id, { status });

      if (res.success) {
        toast.success(res.message);

        router.refresh();
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="w-[140px]">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">
                  {user.name}
                </TableCell>

                <TableCell>{user.email}</TableCell>

                <TableCell>{user.phone}</TableCell>

                <TableCell>
                  <Badge variant="outline">
                    {user.role}
                  </Badge>
                </TableCell>

                <TableCell>
                  <Badge
                    variant={
                      user.status === "ACTIVE"
                        ? "default"
                        : "destructive"
                    }
                  >
                    {user.status}
                  </Badge>
                </TableCell>

                <TableCell>
                  {new Date(user.createdAt).toLocaleDateString()}
                </TableCell>

                <TableCell>
                  {user.role === "ADMIN" ? (
                    <span className="text-xs text-muted-foreground">
                      Protected
                    </span>
                  ) : (
                    <Button
                      size="sm"
                      variant={
                        user.status === "ACTIVE"
                          ? "destructive"
                          : "default"
                      }
                      disabled={pending}
                      onClick={() =>
                        updateStatus(
                          user.id,
                          user.status === "ACTIVE"
                            ? "BANNED"
                            : "ACTIVE"
                        )
                      }
                    >
                      {user.status === "ACTIVE"
                        ? "Ban"
                        : "Activate"}
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}

            {!users.length && (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="py-12 text-center text-muted-foreground"
                >
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <PropertyPagination meta={meta} />
    </>
  );
}