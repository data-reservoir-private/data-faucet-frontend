import { createFileRoute } from '@tanstack/react-router'
import HaydayTransactionUpload from '#/components/app/job/hayday-transaction-upload';

export const Route = createFileRoute('/(private)/_private/job')({
  component: RouteComponent,
})

function RouteComponent() {
  
  return (
    <div className='p-8 flex max-md:flex-col gap-4'>
      <HaydayTransactionUpload type='hayday'/>
      <HaydayTransactionUpload type='transaction'/>
    </div>
  )
}
