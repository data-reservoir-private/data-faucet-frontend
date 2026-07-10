import { Input as InputPrimitive } from "@base-ui/react/input"
import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const inputVariants = cva(
  "w-full min-w-0 rounded-md border border-input bg-input/20 transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-xs/relaxed file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
  {
    variants: {
      size: {
        default: "h-7 px-2 py-0.5 text-sm md:text-xs/relaxed",
        "2xl": "h-12 px-2.5 py-0.5 text-lg md:text-md/relaxed",
      }
    }
  }
)
export type InputVariants = VariantProps<typeof inputVariants>

function Input({ className, type, size, ...props }: Omit<InputPrimitive.Props, "size"> & InputVariants) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        cn(inputVariants({ size: size ?? 'default', className }))
      )}
      {...props}
    />
  )
}

export { Input }
