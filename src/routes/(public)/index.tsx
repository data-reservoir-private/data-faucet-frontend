import { Show, SignInButton } from '@clerk/react';
import { createFileRoute, redirect } from '@tanstack/react-router'
import { Button } from '#/components/ui/button'
import { createHead } from '#/utilities/head';

export const Route = createFileRoute('/(public)/')({
  component: Home,
  head: () => createHead('Login'),
  beforeLoad: async ({ context }) => {
    if (context.userID) {
      throw redirect({ to: '/dashboard' });
    }
  }
});

function Home() {
  return (
    <div className='flex min-w-svw min-h-svh justify-center items-center'>
      <Show when='signed-out'>
        <div className='w-full max-w-sm border border-gray-300 rounded-lg p-8'>
          <h1 className='text-2xl font-bold text-center mb-8'>Data Faucet</h1>
          <SignInButton fallbackRedirectUrl={'/dashboard'} forceRedirectUrl={'/dashboard'}>
            <Button className='w-full'>
              Sign In
            </Button>
          </SignInButton>
        </div>
      </Show>
    </div>
  )
}
