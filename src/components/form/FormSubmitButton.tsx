import type React from 'react';
import { useFormContext } from '#/integrations/tanstack-form/form-context';
import { Button } from '../ui/button';
import { Spinner } from '../ui/spinner';

export default function FormSubmitButton({ children, className, onClick } : { children: React.ReactNode, className?: string, onClick?: () => void }) {
  const form = useFormContext();
  return (
    <Button
      type="submit"
      variant={form.state.isSubmitting ? 'ghost' : 'success'}
      disabled={form.state.isSubmitting}
      className={className}
      onClick={() => { onClick?.() }}
    >
      {form.state.isSubmitting && <Spinner className="mr-2" />}
      {!form.state.isSubmitting && children}
    </Button>
  )
}
