import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { Separator } from '#/components/ui/separator';
import { UTILITIES_LINKS } from '#/constants/links'

export const Route = createFileRoute('/(private)/_private/utility')({
  component: RouteComponent,
})

function RouteComponent() {
  // Get last segment of the current route path
  const currentPath = window.location.pathname;

  const utility = UTILITIES_LINKS.find(link => link.url === currentPath);

  return (
    <div className='flex flex-col p-6'>
      <div className='flex gap-3 mb-6'>
        {
          UTILITIES_LINKS.map((link) => (
            <Link to={link.url} key={link.name} className='flex items-center text-xs gap-2 p-2 rounded-lg border border-gray-600 bg-gray-900 hover:bg-gray-800 transition-colors'>
              <span className='text-sm'>
                {link.icon}
              </span>
              <span className='font-medium text-white'>{link.name}</span>
            </Link>
          ))
        }
      </div>
      {
        utility && (
          <div>
            <h1 className='text-2xl font-bold mb-4 text-white'>{utility.name}</h1>
            <Separator className='mb-4'/>
            <Outlet/>
          </div>
        )
      }
      {
        !utility && <Outlet/>
      }

    </div>
  )
}
