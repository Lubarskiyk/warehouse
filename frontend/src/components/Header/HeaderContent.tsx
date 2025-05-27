import { useCurrentUser } from "@/api/tanstackReactQuery/users/queries";
import { Button } from "@/components/ui";
import { LogOut } from "lucide-react";
import { useAuth } from '@/api/tanstackReactQuery/auth/mutations';

export default function HeaderContent() {
  const { data, isPending, isError } = useCurrentUser();
  const {logoutMutation} = useAuth();
  const user = data?.data;

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (isError || !user) {
    return <p>Error loading user</p>;
  }

  return (
    <div className="flex items-center gap-2 justify-end w-full">
      <p>Привіт, {user.name === "" ? user.login : user.name} !</p>
      <Button variant="outline" size="sm" onClick={() => logoutMutation.mutate()}>
        <LogOut className="w-4 h-4" />
      </Button>
    </div>
  );
}
