import { createFileRoute } from '@tanstack/react-router';
import UUIDComponent from '#/components/app/utility/uuid';

export const Route = createFileRoute('/(private)/_private/utility/uuid7')({
  component: RouteComponent,
})

function RouteComponent() {
  return <UUIDComponent type='v7'/>
}
