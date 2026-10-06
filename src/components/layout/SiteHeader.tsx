import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/cn';
import { dur, ease } from '@/lib/motion';
import { site } from '@/data/content';
import { Wordmark } from '@/components/ui/primitives';

export function SiteHeader() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 24));

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top,0px)]">
      <motion.div
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: dur.reveal, ease: ease.reveal }}
        className={cn(
          'border-b motion-interactive transition-[background-color,border-color,backdrop-filter]',
          scrolled || open ? 'border-line bg-white/80 backdrop-blur-xl' : 'border-transparent bg-transparent',
        )}
      >
        <div className="container-page flex h-[72px] items-center justify-between gap-6">
          <a href="#inicio" aria-label={`${site.name} — inicio`}>
            <Wordmark />
          </a>

          <nav aria-label="Principal" className="hidden md:block">
            <ul className="flex items-center gap-8">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="relative text-[15px] text-ink/80 hover:text-ink motion-micro transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-brand after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#contacto"
              className="hidden rounded-lg bg-ink px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand motion-interactive transition-colors sm:inline-block"
            >
              Contáctanos
            </a>
            <button
              type="button"
              className="grid size-10 place-items-center rounded-lg border border-line md:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.nav
              id="mobile-nav"
              aria-label="Móvil"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: dur.disclosure, ease: ease.disclosure }}
              className="overflow-hidden md:hidden"
            >
              <ul className="container-page flex flex-col gap-1 pb-6">
                {[...site.nav, { label: 'Contáctanos', href: '#contacto' }].map((item, i) => (
                  <motion.li
                    key={item.href + item.label}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i, duration: dur.disclosure, ease: ease.disclosure }}
                  >
                    <a href={item.href} onClick={() => setOpen(false)} className="block rounded-lg px-2 py-3 text-lg font-medium hover:bg-mist">
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
}
