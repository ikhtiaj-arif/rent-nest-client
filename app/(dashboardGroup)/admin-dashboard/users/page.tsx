import { getAllUsers } from "../../_actions/adminActions";
import AdminUsersTable from "../../_components/AdminUsersTable";

 

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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Users</h1>
        <p className="text-muted-foreground">
          Manage tenants, landlords and admins.
        </p>
      </div>

      <AdminUsersTable
        users={users}
        meta={meta}
      />
    </div>
  );
}