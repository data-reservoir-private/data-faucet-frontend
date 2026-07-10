import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(private)/_private/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(private)/_private/dashboard"!</div>
}
