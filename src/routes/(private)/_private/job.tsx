import { createFileRoute } from '@tanstack/react-router'
import HaydayTransactionUpload from '#/components/app/job/hayday-transaction-upload';
import TransjakartaFetch from '#/components/app/job/transjakarta-fetch';
import TransjakartaFetchJSON from '#/components/app/job/transjakarta-fetch-json';
import TransjakartaSync from '#/components/app/job/transjakarta-sync';
import { createHead } from '#/utilities/head';

export const Route = createFileRoute('/(private)/_private/job')({
  component: RouteComponent,
  head: () => createHead('J*bs'),
})

function RouteComponent() {
  
  return (
    <div className='flex flex-col gap-4 p-8'>
      <div className='flex max-md:flex-col gap-4'>
        <HaydayTransactionUpload type='hayday'/>
        <HaydayTransactionUpload type='transaction'/>
      </div>
      <div className='flex max-md:flex-col gap-4'>
        <TransjakartaFetch />
        <TransjakartaFetchJSON />
        <TransjakartaSync />
      </div>
    </div>
  )
}
