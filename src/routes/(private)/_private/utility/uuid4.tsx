import { createFileRoute } from '@tanstack/react-router';
import UUIDComponent from '#/components/app/utility/uuid';
import { createHead } from '#/utilities/head';

export const Route = createFileRoute('/(private)/_private/utility/uuid4')({
  component: RouteComponent,
  head: () => createHead('UUID v4 Generator'),
})

function RouteComponent() {
  return <UUIDComponent type='v4'/>
}
