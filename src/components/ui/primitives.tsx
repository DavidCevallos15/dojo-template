import { ArrowRight, ArrowUpRight, Sparkle } from 'lucide-react';
import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Reveal } from '@/components/motion/Reveal';
import { site } from '@/data/content';

export function Eyebrow({ children, className, center = false }: { children: ReactNode; className?: string; center?: boolean }) {
  return (
    <Reveal y={12} className={cn('mb-4 flex items-center gap-2', center && 'justify-center', className)}>
      <Sparkle className="size-3.5 text-brand" strokeWidth={2.5} aria-hidden />
      <span className="text-[13px] font-medium uppercase tracking-[0.08em] text-brand">{children}</span>
    </Reveal>
  );
}

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: 'primary' | 'dark' | 'ghost' | 'light' };

export function ButtonLink({ variant = 'primary', className, children, ...props }: LinkProps) {
  const styles = {
    primary:
      'bg-brand text-white shadow-[0_10px_30px_-10px_var(--color-brand)] hover:bg-brand-deep hover:shadow-[0_14px_36px_-10px_var(--color-brand)]',
    dark: 'bg-ink text-white hover:bg-neutral-800',
    light: 'bg-white text-ink hover:bg-neutral-100',
    ghost: 'text-ink hover:text-brand',
  }[variant];
  const Icon = variant === 'ghost' ? ArrowRight : ArrowUpRight;

  return (
    <a
      className={cn(
        'group inline-flex items-center gap-2 rounded-xl px-5 py-3 text-[15px] font-semibold motion-interactive transition-all active:scale-[0.97]',
        variant === 'ghost' && 'px-0',
        styles,
        className,
      )}
      {...props}
    >
      {children}
      <Icon
        className="size-4 motion-interactive transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-px"
        strokeWidth={2.4}
        aria-hidden
      />
    </a>
  );
}

export function TextLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a href={href} className={cn('group inline-flex items-center gap-1.5 text-[15px] font-medium text-ink hover:text-brand motion-micro transition-colors', className)}>
      {children}
      <ArrowRight className="size-4 motion-interactive transition-transform group-hover:translate-x-1" aria-hidden />
    </a>
  );
}

export function Wordmark({ className, size = 'md' }: { className?: string; size?: 'md' | 'lg' }) {
  return (
    <span className={cn('flex flex-col leading-none', className)}>
      <span className={cn('font-bold tracking-tight text-brand', size === 'lg' ? 'text-2xl' : 'text-lg')}>{site.name}</span>
      <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.22em] text-brand/70">{site.tagline}</span>
    </span>
  );
}
