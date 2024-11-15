import { SidebarInset } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

export default function Users() {
  return (
    <SidebarInset>
      <header className="flex sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4">
        <Button>Add User</Button>
      </header>

      <p className="aspect-video h-12 w-full rounded-lg bg-muted/50">
        Users Page
      </p>
    </SidebarInset>
  );
}
