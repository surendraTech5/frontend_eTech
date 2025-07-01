import { columns } from "@/components/users/columns";
import { UserTable } from "@/components/users/user-table";
import { users } from "@/data/mock-data";

const Users = () => {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-6 pt-6">
      <UserTable columns={columns} data={users} />
    </div>
  );
};

export default Users; 