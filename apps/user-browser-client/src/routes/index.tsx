import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@repo/ui/components/button";
import { toast } from "@repo/ui/components/toaster";

export const Route = createFileRoute("/")({ component: IndexPage });

function IndexPage() {
  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-y-2">
      <h1 className="text-2xl font-bold">Ultra Bun</h1>
      <Button onClick={() => toast.success("Yippee!")}>Click me!</Button>
    </div>
  );
}
