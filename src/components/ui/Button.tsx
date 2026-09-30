import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
type Props = ButtonHTMLAttributes<HTMLButtonElement> & { busy?: boolean; primary?: boolean };
/** Tombol bersama: status proses dan ukuran sentuh mengikuti token global. */
export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { busy, primary, disabled, className, children, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      {...props}
      className={cn(primary && 'primary', className)}
      disabled={disabled || busy}
      aria-busy={busy}
    >
      {busy ? 'Memproses…' : children}
    </button>
  );
});
