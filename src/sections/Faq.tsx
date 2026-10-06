import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { useId, useState } from 'react';
import { faq } from '@/data/content';
import { cn } from '@/lib/cn';
import { dur, ease } from '@/lib/motion';
import { RevealLines } from '@/components/motion/RevealLines';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { Eyebrow } from '@/components/ui/primitives';

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section-y">
      <div className="container-page max-w-3xl">
        <Eyebrow center>{faq.eyebrow}</Eyebrow>
        <RevealLines className="text-center text-[clamp(2.25rem,5vw,3.75rem)] font-bold leading-none tracking-[-0.045em]" lines={[faq.title]} />

        <Stagger className="mt-12 flex flex-col gap-3" stagger={0.06} amount={0.1}>
          {faq.items.map((item, i) => (
            <StaggerItem key={item.q} y={20}>
              <FaqItem q={item.q} a={item.a} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function FaqItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  const id = useId();
  return (
    <div
      className={cn(
        'rounded-2xl border bg-white transition-[border-color,box-shadow] duration-300',
        open ? 'border-brand/30 shadow-[0_18px_40px_-28px_rgba(0,0,0,0.35)]' : 'border-line hover:border-ink/20',
      )}
    >
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={id}
          className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left text-[16px] font-medium"
        >
          {q}
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: dur.disclosure, ease: ease.disclosure }}
            className={cn('grid size-8 shrink-0 place-items-center rounded-full transition-colors', open ? 'bg-brand text-white' : 'text-brand')}
          >
            <ChevronDown className="size-4" strokeWidth={2.5} />
          </motion.span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            role="region"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: dur.disclosure * 1.3, ease: ease.disclosure }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 text-[15px] leading-relaxed text-muted">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
