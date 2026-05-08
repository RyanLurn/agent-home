import { DefaultNotFound } from "@repo/ui/components/pages/default-not-found";
import { createRouter } from "@tanstack/react-router";

import { routeTree } from "@/routeTree.gen";

export function getRouter() {
  const router = createRouter({
    defaultNotFoundComponent: DefaultNotFound,
    scrollRestoration: true,
    routeTree,
  });

  return router;
}
