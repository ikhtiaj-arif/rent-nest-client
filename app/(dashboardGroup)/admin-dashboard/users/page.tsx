import { getAllUsers } from "../../_actions/adminActions";
import AdminUsersTable from "../../_components/AdminUsersTable";
import { PageHeader } from "@/components/shared/PageHeader";

interface Props {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function AdminDashboardUsersPage({
  searchParams,
}: Props) {
  const query = await searchParams;

  const res = await getAllUsers({
    query: {
      page: query.page || "1",
      limit: query.limit || "10",
      searchTerm: query.searchTerm,
    },
  });

  const users = res?.data?.data || [];
  const meta = res?.data?.meta;

  return (
    <div className="space-y-6 animate-fade-in-up">
      <PageHeader
        title="User Management"
        description="View and manage all registered users on the platform."
      />

      <AdminUsersTable
        users={users}
        meta={meta}
      />
    </div>
  );
}