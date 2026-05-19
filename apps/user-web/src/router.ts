import { DefaultNotFound } from "@repo/ui/components/pages/default-not-found";
import { createRouter } from "@tanstack/react-router";

import { DefaultErrorComponent } from "@/components/default-error";
import { routeTree } from "@/routeTree.gen";

export function getRouter() {
  const router = createRouter({
    defaultNotFoundComponent: DefaultNotFound,
    defaultErrorComponent: DefaultErrorComponent,
    scrollRestoration: true,
    routeTree,
  });

  return router;
}
