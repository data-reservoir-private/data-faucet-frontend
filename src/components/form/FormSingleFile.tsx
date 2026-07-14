import { useFieldContext } from '#/integrations/tanstack-form/form-context';
import { Field } from '../ui/field';
import { SingleFileUpload } from '../ui/file-upload';

type FormSingleFileProps = {
  acceptedFileTypes?: string[];
};

export default function FormSingleFile({ acceptedFileTypes }: FormSingleFileProps) {
  const field = useFieldContext<File | null>();

  return (
    <Field>
      <SingleFileUpload
        value={field.state.value}
        onChange={(file) => field.setValue(file)}
        acceptedFileTypes={acceptedFileTypes}
      />
    </Field>
  )
}
