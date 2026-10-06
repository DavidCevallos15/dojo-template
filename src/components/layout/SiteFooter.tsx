import { Mail, MapPin, Phone } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';
import { site } from '@/data/content';
import { ease, viewportOnce } from '@/lib/motion';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { Wordmark } from '@/components/ui/primitives';

const SOCIAL: { key: keyof typeof site.social; label: string; icon: ReactNode }[] = [
  {
    key: 'instagram',
    label: 'Instagram',
    icon: (
      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
      </svg>
    ),
  },
  {
    key: 'facebook',
    label: 'Facebook',
    icon: (
      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8.5a.5.5 0 0 1 .5-.5Z" />
      </svg>
    ),
  },
  {
    key: 'youtube',
    label: 'YouTube',
    icon: (
      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2.5" y="5" width="19" height="14" rx="4" />
        <path d="m10 9 5 3-5 3V9Z" fill="currentColor" />
      </svg>
    ),
  },
];

export function SiteFooter() {
  const reduce = useReducedMotion();
  const year = new Date().getFullYear();

  return (
    <footer id="contacto" className="border-t border-line pt-20">
      <Stagger className="container-page grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_1fr_1.2fr]" stagger={0.1} amount={0.2}>
        <StaggerItem>
          <Wordmark size="lg" />
          <p className="mt-4 max-w-[26ch] text-[15px] leading-relaxed text-muted">
            Karate japonés auténtico en {site.city} desde {site.since}.
          </p>
          <ul className="mt-6 flex gap-2">
            {SOCIAL.map((s) => (
              <li key={s.key}>
                <a
                  href={site.social[s.key]}
                  aria-label={s.label}
                  className="grid size-10 place-items-center rounded-full border border-line text-brand transition-all duration-200 hover:-translate-y-0.5 hover:border-brand hover:bg-brand hover:text-white"
                >
                  {s.icon}
                </a>
              </li>
            ))}
          </ul>
        </StaggerItem>

        <StaggerItem>
          <h4 className="text-sm font-semibold uppercase tracking-[0.1em]">Navegación</h4>
          <ul className="mt-5 space-y-3">
            {[{ label: 'Inicio', href: '#inicio' }, ...site.nav].map((n) => (
              <li key={n.href}>
                <a href={n.href} className="text-[15px] text-muted transition-colors hover:text-brand">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </StaggerItem>

        <StaggerItem>
          <h4 className="text-sm font-semibold uppercase tracking-[0.1em]">Contacto</h4>
          <ul className="mt-5 space-y-4 text-[15px] text-muted">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
              <span>
                {site.contact.address}
                <br />
                {site.contact.city}
              </span>
            </li>
            <li>
              <a href={`tel:${site.contact.phone.replace(/\s/g, '')}`} className="flex gap-3 hover:text-brand">
                <Phone className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
                {site.contact.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.contact.email}`} className="flex gap-3 hover:text-brand">
                <Mail className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
                {site.contact.email}
              </a>
            </li>
          </ul>
        </StaggerItem>

        <StaggerItem>
          <h4 className="text-sm font-semibold uppercase tracking-[0.1em]">Encuéntranos</h4>
          <a
            href={site.contact.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="group relative mt-5 block aspect-[4/3] overflow-hidden rounded-2xl bg-brand-soft ring-1 ring-brand/15"
            aria-label="Ver ubicación en el mapa"
          >
            {/* Mapa estilizado (sin imagen): calles + pin */}
            <svg aria-hidden viewBox="0 0 320 240" className="absolute inset-0 size-full" preserveAspectRatio="xMidYMid slice">
              <g stroke="white" strokeWidth="10" fill="none" strokeLinecap="round">
                <path d="M-10 70 C80 60 160 110 330 90" />
                <path d="M-10 180 C90 170 200 200 330 160" />
                <path d="M90 -10 C100 80 70 160 110 250" />
                <path d="M230 -10 C210 90 250 170 220 250" />
              </g>
              <g stroke="white" strokeWidth="4" fill="none" opacity="0.7">
                <path d="M-10 125 L330 135" />
                <path d="M160 -10 L170 250" />
              </g>
            </svg>
            <motion.span
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: -40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ type: 'spring', stiffness: 380, damping: 16, delay: 0.5 }}
              className="absolute left-[54%] top-[38%] -translate-x-1/2 -translate-y-full"
            >
              <span className="absolute left-1/2 top-full size-3 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-brand/50" />
              <MapPin className="size-10 fill-brand text-white drop-shadow-lg" strokeWidth={1.5} />
            </motion.span>
            <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-brand shadow-sm transition-transform duration-300 group-hover:-translate-y-0.5">
              Ver ubicación
            </span>
          </a>
        </StaggerItem>
      </Stagger>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: ease.reveal }}
        className="container-page mt-16 border-t border-line py-8 text-center text-sm text-muted"
      >
        © {year} {site.name}. Todos los derechos reservados.
      </motion.div>
    </footer>
  );
}
