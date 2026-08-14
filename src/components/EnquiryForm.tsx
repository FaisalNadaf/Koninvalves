import { useMemo, useState, type FormEvent } from 'react'
import { Send, CheckCircle2, AlertCircle } from 'lucide-react'
import { company } from '../data/company'
import { categories, productsByCategory } from '../data/categories'
import { Reveal, Stagger, StaggerItem } from '../lib/motion'

/**
 * B2B enquiry form.
 *
 * TRANSPORT — read before changing:
 *
 * There is no backend in this project, and none is faked. The form composes a
 * structured message and hands it to the visitor's mail client addressed to
 * KONIN's published sales address, so it genuinely works as shipped.
 *
 * To post to a server instead, set FORM_ENDPOINT to the URL. The legacy site
 * posted to:
 *   https://www.koninvalve.com/TestResult_attach_captcha_code.php
 * That endpoint also expected captcha / OTP fields that are not reproduced
 * here, so it is left disconnected rather than wired up to fail silently.
 */
const FORM_ENDPOINT: string | null = null

type Status = 'idle' | 'sending' | 'sent' | 'error'

const FIELD = 'field'

const LABEL = 'block text-[13px] font-semibold text-ink-900'

const ERROR = 'mt-2 flex items-center gap-1.5 text-[12.5px] font-medium text-signal-600'

export default function EnquiryForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const productOptions = useMemo(
    () =>
      categories.map((c) => ({
        label: c.name,
        items: productsByCategory[c.key].map((p) => p.name),
      })),
    []
  )

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const get = (k: string) => String(data.get(k) ?? '').trim()

    const next: Record<string, string> = {}
    if (!get('name')) next.name = 'Please enter your name.'
    if (!get('email')) next.email = 'Please enter your email address.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(get('email')))
      next.email = 'Please enter a valid email address.'
    if (!get('requirement')) next.requirement = 'Please describe your requirement.'

    setErrors(next)
    if (Object.keys(next).length > 0) {
      const first = form.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)
      first?.focus()
      return
    }

    setStatus('sending')

    const lines = [
      `Name: ${get('name')}`,
      `Company: ${get('company') || '—'}`,
      `Email: ${get('email')}`,
      `Phone: ${get('phone') || '—'}`,
      `Product / Solution: ${get('product') || '—'}`,
      '',
      'Requirement:',
      get('requirement'),
      '',
      get('message') ? `Additional notes:\n${get('message')}` : '',
    ]
      .filter(Boolean)
      .join('\n')

    if (FORM_ENDPOINT) {
      fetch(FORM_ENDPOINT, { method: 'POST', body: data })
        .then((r) => setStatus(r.ok ? 'sent' : 'error'))
        .catch(() => setStatus('error'))
      return
    }

    const subject = `Enquiry from ${get('name')}${get('company') ? ` — ${get('company')}` : ''}`
    window.location.href = `mailto:${company.emails[0]}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(lines)}`
    setStatus('sent')
  }

  if (status === 'sent') {
    return (
      /* Mounted in place of the form, already on screen, so this reveal plays
         immediately — which is what the confirmation wants: the panel arrives
         rather than being swapped in. */
      <Reveal
        direction="scale"
        role="status"
        className="flex flex-col items-start gap-5 rounded-3xl border border-steel-150 bg-white p-8 shadow-e3 sm:p-10"
      >
        <span className="grid size-12 place-items-center rounded-full border border-brand-100 bg-linear-to-b from-brand-50 to-white text-brand-700 shadow-e1">
          <CheckCircle2 className="size-6" aria-hidden="true" />
        </span>
        <h3 className="font-display text-2xl font-bold text-ink-900">Your enquiry is ready</h3>
        <p className="text-[14.5px] leading-relaxed text-steel-600">
          We have opened your email client with the enquiry filled in — send it and our
          engineering team will come back to you. If nothing opened, email us directly at{' '}
          <a
            href={`mailto:${company.emails[0]}`}
            className="font-semibold text-brand-700 underline underline-offset-2"
          >
            {company.emails[0]}
          </a>{' '}
          or call{' '}
          <a
            href={`tel:${company.phones[0].replace(/\s/g, '')}`}
            className="font-semibold text-brand-700 underline underline-offset-2"
          >
            {company.phones[0]}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="btn btn-outline-ink mt-2"
        >
          Send another enquiry
        </button>
      </Reveal>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-3xl border border-steel-150 bg-white p-6 shadow-e3 sm:p-9"
    >
      {/* The three lines of the ask, then the fields — each element animates as
          itself rather than inside a wrapper, so the margins that set the
          rhythm of the block are the ones that were always there.

          Everything moves a short distance: the form is a card that is itself
          arriving on the page, and a full-length slide inside a moving card
          reads as two animations fighting. */}
      <Stagger step={0.08} amount={0.25}>
        <StaggerItem as="p" direction="from-bottom" distance={0.5} className="eyebrow">
          Request a quotation
        </StaggerItem>
        <StaggerItem
          as="h2"
          direction="from-bottom"
          distance={0.5}
          className="h-sub mt-5 text-ink-900"
        >
          Tell us what you need
        </StaggerItem>
        <StaggerItem
          as="p"
          direction="from-bottom"
          distance={0.5}
          className="mt-3 text-[14px] leading-relaxed text-steel-500"
        >
          Fields marked <span aria-hidden="true">*</span> are required. The more duty detail you
          give — media, temperature, pressure class, line size — the faster we can specify.
        </StaggerItem>
      </Stagger>

      {/* One field after another, quickly: seven fields at 60 ms is under half
          a second end to end, so the form is complete about as fast as it can
          be read down to. */}
      <Stagger className="mt-7 grid gap-5 sm:grid-cols-2" step={0.06} amount={0.12}>
        <StaggerItem direction="from-bottom" distance={0.45}>
          <label htmlFor="f-name" className={LABEL}>
            Name <span className="text-signal-600">*</span>
          </label>
          <input
            id="f-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'e-name' : undefined}
            className={`${FIELD} mt-2 ${errors.name ? 'field-error' : ''}`}
            placeholder="Your full name"
          />
          {errors.name && (
            <p id="e-name" className={ERROR}>
              <AlertCircle className="size-3.5" aria-hidden="true" />
              {errors.name}
            </p>
          )}
        </StaggerItem>

        <StaggerItem direction="from-bottom" distance={0.45}>
          <label htmlFor="f-company" className={LABEL}>
            Company
          </label>
          <input
            id="f-company"
            name="company"
            type="text"
            autoComplete="organization"
            className={`${FIELD} mt-2`}
            placeholder="Company or organisation"
          />
        </StaggerItem>

        <StaggerItem direction="from-bottom" distance={0.45}>
          <label htmlFor="f-email" className={LABEL}>
            Email <span className="text-signal-600">*</span>
          </label>
          <input
            id="f-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'e-email' : undefined}
            className={`${FIELD} mt-2 ${errors.email ? 'field-error' : ''}`}
            placeholder="you@company.com"
          />
          {errors.email && (
            <p
              id="e-email"
              className={ERROR}
            >
              <AlertCircle className="size-3.5" aria-hidden="true" />
              {errors.email}
            </p>
          )}
        </StaggerItem>

        <StaggerItem direction="from-bottom" distance={0.45}>
          <label htmlFor="f-phone" className={LABEL}>
            Phone
          </label>
          <input
            id="f-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            className={`${FIELD} mt-2`}
            placeholder="+91 00000 00000"
          />
        </StaggerItem>

        <StaggerItem direction="from-bottom" distance={0.45} className="sm:col-span-2">
          <label htmlFor="f-product" className={LABEL}>
            Product / Solution
          </label>
          <select id="f-product" name="product" className={`${FIELD} mt-2`} defaultValue="">
            <option value="">Select a product or solution…</option>
            {productOptions.map((g) => (
              <optgroup key={g.label} label={g.label}>
                {g.items.map((i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </optgroup>
            ))}
            <option value="Other / not listed">Other / not listed</option>
          </select>
        </StaggerItem>

        <StaggerItem direction="from-bottom" distance={0.45} className="sm:col-span-2">
          <label htmlFor="f-requirement" className={LABEL}>
            Requirement <span className="text-signal-600">*</span>
          </label>
          <textarea
            id="f-requirement"
            name="requirement"
            rows={4}
            required
            aria-invalid={Boolean(errors.requirement)}
            aria-describedby={errors.requirement ? 'e-requirement' : 'h-requirement'}
            className={`${FIELD} mt-2 resize-y ${errors.requirement ? 'field-error' : ''}`}
            placeholder="e.g. 12 off 200 mm wafer butterfly valves, PN16, EPDM seat, gear operated, for a raw water line"
          />
          {errors.requirement ? (
            <p
              id="e-requirement"
              className={ERROR}
            >
              <AlertCircle className="size-3.5" aria-hidden="true" />
              {errors.requirement}
            </p>
          ) : (
            <p id="h-requirement" className="mt-2 text-[12.5px] text-steel-500">
              Include quantity, size, pressure class, media and temperature where known.
            </p>
          )}
        </StaggerItem>

        <StaggerItem direction="from-bottom" distance={0.45} className="sm:col-span-2">
          <label htmlFor="f-message" className={LABEL}>
            Additional notes
          </label>
          <textarea
            id="f-message"
            name="message"
            rows={3}
            className={`${FIELD} mt-2 resize-y`}
            placeholder="Delivery timeline, inspection requirements, project reference…"
          />
        </StaggerItem>
      </Stagger>

      {/* The submit row waits for the fields above it rather than racing them. */}
      <Reveal
        direction="from-bottom"
        distance={0.6}
        delay={0.1}
        amount={0.4}
        className="mt-7 flex flex-wrap items-center gap-4 border-t border-steel-150 pt-7"
      >
        <button type="submit" className="btn btn-primary btn-lg group" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send Enquiry'}
          <Send
            className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </button>
        <p className="text-[12.5px] text-steel-500">
          Opens your email client addressed to {company.emails[0]}
        </p>
      </Reveal>

      {status === 'error' && (
        <p
          role="alert"
          className="mt-5 flex items-center gap-2 rounded-xl border border-signal-100 bg-signal-50 px-4 py-3 text-[13px] font-medium text-signal-700"
        >
          <AlertCircle className="size-4" aria-hidden="true" />
          Something went wrong. Please email {company.emails[0]} directly.
        </p>
      )}
    </form>
  )
}
