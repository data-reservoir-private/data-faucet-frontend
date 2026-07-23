import type { AnyRouteMatch } from "@tanstack/react-router";

export const createHead = (title: string, other?: AnyRouteMatch['meta']) => ({
  meta: [
    {
      title: `${title} - Data Faucet`
    },
    ...(other ?? [])
  ] as AnyRouteMatch['meta'],
})