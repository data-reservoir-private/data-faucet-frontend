import type React from 'react';
import { useFormContext } from '#/integrations/tanstack-form/form-context';

export default function FormContainer({ children, className } : { children: React.ReactNode, className?: string }) {
  const form = useFormContext();
  return (
    <form
      className={className}
      onSubmit={e => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit()
      }}
    >
      {children}
    </form>
  )
}
