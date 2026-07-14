import { createFormHook } from '@tanstack/react-form'
import FormNumberField from '#/components/form/FormNumberField'
import FormSingleFile from '#/components/form/FormSingleFile'
import FormContainer from '@/components/form/FormContainer'
import FormSubmitButton from '@/components/form/FormSubmitButton'
import FormTextArea from '@/components/form/FormTextArea'
import FormTextField from '@/components/form/FormTextField'
import { fieldContext, formContext } from './form-context'

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldComponents: {
    FormTextField,
    FormTextArea,
    FormNumberField,
    FormSingleFile
  },
  formComponents: {
    FormContainer,
    FormSubmitButton
  },
  fieldContext,
  formContext,
})
