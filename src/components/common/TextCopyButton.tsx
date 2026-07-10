import { CheckIcon, CopyIcon, XIcon } from 'lucide-react';
import { useState } from 'react';
import { Button, type ButtonVariant } from '@/components/ui/button';
import { Spinner } from '../ui/spinner';

export default function TextCopyButton({ content, size }: { content: string } & ButtonVariant) {
  const [state, setState] = useState<'idle' | 'processing' | 'success' | 'failed'>('idle');
  const handleCopy = () => {
    setState('processing');
    navigator.clipboard.writeText(content).then(() => {
      setState('success');
      setTimeout(() => setState('idle'), 500);
    }, () => {
      setState('failed');
      setTimeout(() => setState('idle'), 500);
    });
  };

  function IconState() {
    return state === 'idle' ? <CopyIcon size={28} /> :
      state === 'processing' ? <Spinner />:
        state === 'success' ? <CheckIcon size={28} /> : <XIcon size={28} />
  }

  return (
    <Button
      variant='default'
      onClick={handleCopy}
      disabled={state !== 'idle'}
      className='grow'
      size={size}
    >
      {IconState()}
    </Button>
  )
}