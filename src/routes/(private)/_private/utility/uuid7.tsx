import { createFileRoute } from '@tanstack/react-router';
import UUIDComponent from '#/components/app/utility/uuid';
import { createHead } from '#/utilities/head';

export const Route = createFileRoute('/(private)/_private/utility/uuid7')({
  component: RouteComponent,
  head: () => createHead('UUID v7 Generator'),
})

function RouteComponent() {
  return <UUIDComponent type='v7'/>
}
