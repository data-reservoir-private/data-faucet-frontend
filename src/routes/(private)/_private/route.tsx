import { createFileRoute, Outlet } from '@tanstack/react-router'
import Header from '#/components/layout/Header'

export const Route = createFileRoute('/(private)/_private')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Header/>
      <div className='grow w-full min-h-full'>
        <Outlet />
      </div>
    </>
  )
}
