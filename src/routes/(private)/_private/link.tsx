import { createFileRoute } from '@tanstack/react-router'
import { Button } from '#/components/ui/button'
import { LINKS } from '#/constants/links'

export const Route = createFileRoute('/(private)/_private/link')({
  component: RouteComponent,
})

function RouteComponent() {
  const getBorderColor = (type: string) => {
    switch (type) {
      case 'frontend':
        return 'border-blue-600';
      case 'backend':
        return 'border-purple-600';
      case 'other':
        return 'border-gray-600';
      default:
        return 'border-gray-600';
    }
  };

  const getChipStyles = (type: string) => {
    switch (type) {
      case 'frontend':
        return 'bg-blue-900 text-blue-300';
      case 'backend':
        return 'bg-purple-900 text-purple-300';
      case 'other':
        return 'bg-gray-700 text-gray-300';
      default:
        return 'bg-gray-700 text-gray-300';
    }
  };

  const getTypeLabel = (type: string) => {
    return type.toUpperCase();
  };

  return (
    <div className='flex flex-col p-6'>
      <h1 className='text-2xl font-bold mb-6 text-white'>Links</h1>
      <div className='flex flex-wrap gap-3'>
        {
          LINKS.map((link) => (
            <div 
              key={link.name} 
              className={`flex flex-col justify-between p-4 rounded-lg border ${getBorderColor(link.type)} w-full sm:w-80 bg-gray-900`}
            >
              <div className='flex items-center gap-2 mb-4'>
                <span className='font-medium text-white'>
                  {link.name}
                </span>
                <span className={`px-2 py-0.5 rounded text-xs font-semibold ${getChipStyles(link.type)}`}>
                  {getTypeLabel(link.type)}
                </span>
              </div>
              <a 
                href={link.url} 
                target='_blank' 
                rel='noopener noreferrer'
              >
                <Button className='w-full'>Visit</Button>
              </a>
            </div>
          ))
        }
      </div>
    </div>
  )
}
