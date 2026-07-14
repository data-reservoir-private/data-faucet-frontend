import { createFileRoute } from '@tanstack/react-router'
import { Base64 } from 'js-base64';
import { useAppForm } from '#/integrations/tanstack-form/form-hook';

export const Route = createFileRoute('/(private)/_private/utility/base64')({
  component: RouteComponent,
})

function RouteComponent() {

  const form = useAppForm({
    defaultValues: {
      encode: '',
      decode: '',
    }
  });

  return (
    <form.AppForm>
      <form.FormContainer className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {/* Encode field */}
        <div className='flex flex-col gap-2 grow'>
          <span className='text-sm'>Encoded value</span>
          <form.AppField name='encode' listeners={{
            onChangeDebounceMs: 500,
            onChange: ({ value }) => {
              form.setFieldValue('decode', Base64.decode(value), { dontRunListeners: true });
            }
          }}>
            {(field) => (
              <field.FormTextArea
                minRows={40}
                className='w-full font-[consolas] min-h-100'
              />
            )}
          </form.AppField>
        </div>

        {/* Decode field */}
        <div className='flex flex-col gap-2 grow'>
          <span className='text-sm'>Decoded value</span>
          <form.AppField name='decode' listeners={{
            onChangeDebounceMs: 500,
            onChange: ({ value }) => {
              form.setFieldValue('encode', Base64.encode(value), { dontRunListeners: true });
            }
          }}>
            {(field) => (
              <field.FormTextArea
                minRows={40}
                className='w-full font-[consolas] min-h-100'
              />
            )}
          </form.AppField>
        </div>
      </form.FormContainer>
    </form.AppForm>
  )
}
