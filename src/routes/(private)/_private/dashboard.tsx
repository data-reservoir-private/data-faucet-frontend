import { createFileRoute } from '@tanstack/react-router'
import JobHistory from '#/components/app/job/job-history'

export const Route = createFileRoute('/(private)/_private/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex flex-col gap-4 p-6">
      <JobHistory/>
    </div>
  )
}
