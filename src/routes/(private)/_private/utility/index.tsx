import { createFileRoute } from '@tanstack/react-router'
import { createHead } from '#/utilities/head'

export const Route = createFileRoute('/(private)/_private/utility/')({
  component: RouteComponent,
  head: () => createHead('Utility Index'),
})

function RouteComponent() {
  return (
    <div>
      Welcome. Pick a utility from the list above to get started.
    </div>
  )
}
