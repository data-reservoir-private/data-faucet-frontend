import { useFieldContext } from "#/integrations/tanstack-form/form-context";
import { Field, FieldDescription, FieldLabel } from "../ui/field";
import { Input, type InputVariants } from "../ui/input";

type FormNumberFieldProps = {
  label?: string;
  className?: string;
  topLabel?: boolean;
  onClickEnter?: () => void;
  min: number;
  max: number;
  step: number;
} & InputVariants

export default function FormNumberField({ label, className, topLabel, onClickEnter, min, max, step, size = 'default' }: FormNumberFieldProps) {
  const field = useFieldContext<number>();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) =>   {
    if (e.key === "Enter" && onClickEnter) {
      onClickEnter();
    }
  }

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
          onKeyDown={handleKeyDown}
        />
        {!field.state.meta.isValid && (
          <FieldDescription aria-invalid>{field.state.meta.errors.map(x => x.message).join(', ')}</FieldDescription>
        )}
      </div>
    </Field>
  )
}
