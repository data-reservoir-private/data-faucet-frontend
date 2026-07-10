import { useFieldContext } from "#/integrations/tanstack-form/form-context";
import { Field, FieldDescription, FieldLabel } from "../ui/field";
import { Input, type InputVariants } from "../ui/input";

type FormTextFieldProps = {
  label?: string;
  className?: string;
  topLabel?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
} & InputVariants

export default function FormTextField({ label, className, topLabel, disabled, readOnly, size = 'default' }: FormTextFieldProps) {
  const field = useFieldContext<string>();
  return (
    <Field className="flex flex-col gap-1">
      { topLabel && <FieldLabel>{label}</FieldLabel>}
      <div className="flex flex-col gap-1">
        <Input
          placeholder={label}
          className={className}
          disabled={disabled}
          readOnly={readOnly}
          aria-invalid={!field.state.meta.isValid}
          value={field.state.value}
          onChange={e => field.handleChange(e.currentTarget.value)}
          size={size}
        />
        {!field.state.meta.isValid && (
          <FieldDescription aria-invalid>{field.state.meta.errors.map(x => x.message).join(', ')}</FieldDescription>
        )}
      </div>
    </Field>
  )
}
