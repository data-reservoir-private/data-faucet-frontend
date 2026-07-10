import { useFieldContext } from "#/integrations/tanstack-form/form-context";
import { Field, FieldDescription, FieldLabel } from "../ui/field";
import { Input, type InputVariants } from "../ui/input";

type FormTextFieldProps = {
  label?: string;
  className?: string;
  topLabel?: boolean;
  min: number;
  max: number;
  step: number;
} & InputVariants

export default function FormNumberField({ label, className, topLabel, min, max, step, size = 'default' }: FormTextFieldProps) {
  const field = useFieldContext<number>();
  return (
    <Field className="flex flex-col gap-1">
      { topLabel && <FieldLabel>{label}</FieldLabel>}
      <div className="flex flex-col gap-1">
        <Input
          type="number"
          min={min}
          step={step}
          max={max}
          placeholder={label}
          className={className}
          size={size}
          aria-invalid={!field.state.meta.isValid}
          value={field.state.value}
          onChange={e => field.handleChange(parseFloat(e.currentTarget.value))}
        />
        {!field.state.meta.isValid && (
          <FieldDescription aria-invalid>{field.state.meta.errors.map(x => x.message).join(', ')}</FieldDescription>
        )}
      </div>
    </Field>
  )
}
