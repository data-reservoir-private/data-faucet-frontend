import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(private)/_private/utility/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      Welcome. Pick a utility from the list above to get started.
    </div>
  )
}
