import { createFileRoute } from '@tanstack/react-router'
import { useAppForm } from '#/integrations/tanstack-form/form-hook';
import { createHead } from '#/utilities/head';

export const Route = createFileRoute('/(private)/_private/utility/color')({
  component: RouteComponent,
  head: () => createHead('Color Utility'),
})

function RouteComponent() {
  const form = useAppForm({
    defaultValues: {
      hex: '#000000',
      rgb: { r: 0, g: 0, b: 0 },
      hsl: { h: 0, s: 0, l: 0 },
      oklch: { l: 0, c: 0, h: 0 },
      cmyk: { c: 0, m: 0, y: 0, k: 0 },
    }
  });
  
  
  return (
    <form.AppForm>
      <form.FormContainer>
        Test
      </form.FormContainer>
    </form.AppForm>
  )
}
