import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/(private)')({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (!context.userID) throw redirect({ to: '/', search: { login: true } });
  }
})

function RouteComponent() {
  return <Outlet/>
}
