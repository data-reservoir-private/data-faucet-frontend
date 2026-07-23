import { createFileRoute } from '@tanstack/react-router'
import JobHistory from '#/components/app/job/job-history'
import { createHead } from '#/utilities/head'

export const Route = createFileRoute('/(private)/_private/dashboard')({
  component: RouteComponent,
  head: () => createHead('Dashboard'),
})

function RouteComponent() {
  return (
    <div className="flex flex-col gap-4 p-6">
      <JobHistory/>
    </div>
  )
}
