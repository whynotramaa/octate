import type { Metadata } from "next";
import { tiers } from "@/content/pricing";
import { faqsByTag } from "@/content/faq";
import { Wordmark, Mark } from "@/components/ui/Logo";
import { Button, ButtonLink } from "@/components/ui/Button";
import { TextLink } from "@/components/ui/TextLink";
import { Tag, Badge } from "@/components/ui/Tag";
import { Card } from "@/components/ui/Card";
import { Section, Folio } from "@/components/ui/Section";
import { StatStrip } from "@/components/ui/StatStrip";
import { Accordion } from "@/components/ui/Accordion";
import { Timeline, EightDots } from "@/components/ui/Timeline";
import { RegionToggle } from "@/components/ui/RegionToggle";
import { FoundingBanner } from "@/components/ui/FoundingBanner";
import { PricingCard } from "@/components/ui/PricingCard";
import { ComparisonTable } from "@/components/ui/ComparisonTable";
import { WorkCard, type WorkItem } from "@/components/ui/WorkCard";
import { CTABand } from "@/components/ui/CTABand";
import { Field, Honeypot } from "@/components/ui/Field";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { Phone, Laptop, ScreenPlaceholder } from "@/components/ui/DeviceMockup";

export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
};

const swatches = [
  { name: "paper", hex: "#F6F3EE", cls: "bg-paper shadow-hairline", note: "Base" },
  { name: "paper-2", hex: "#EDE8E0", cls: "bg-paper-2", note: "Bands, cards" },
  { name: "paper-3", hex: "#E4DED4", cls: "bg-paper-3", note: "Pressed" },
  { name: "rule", hex: "#D9D2C7", cls: "bg-rule", note: "Hairlines" },
  { name: "muted", hex: "#5E5852", cls: "bg-muted", note: "6.3:1 on paper" },
  { name: "ink", hex: "#141414", cls: "bg-ink", note: "Text, dark bands" },
  { name: "accent", hex: "#6B1E2E", cls: "bg-accent", note: "10:1 on paper" },
  { name: "accent-on-dark", hex: "#D9A0A9", cls: "bg-accent-on-dark", note: "8.4:1 on ink" },
];

const typeScale = [
  { token: "text-display", sample: "Look as good as it is.", cls: "font-display text-display" },
  { token: "text-h2", sample: "Three ways to work with us.", cls: "font-display text-h2" },
  { token: "text-h3", sample: "One fixed price.", cls: "font-display text-h3" },
  { token: "text-number", sample: "10+ ₹14,999 $599 रू24,999", cls: "numeral text-number" },
  {
    token: "text-lead",
    sample: "Premium sites for clinics, med spas and local brands.",
    cls: "text-lead",
  },
  {
    token: "text-body",
    sample:
      "We use AI tools for the repetitive build work and spend our time on design, copy and testing.",
    cls: "text-body",
  },
  { token: "text-small", sample: "Standard rate from Jan 1, 2027", cls: "text-small" },
  { token: "label", sample: "Fig. 03 · Dental · Pune", cls: "label" },
];

const sampleWork: WorkItem[] = [
  {
    slug: "sample-clinic",
    title: "Sample client card",
    industry: "Dental clinic",
    city: "Pune",
    deliverable: "Website and booking",
    isConcept: false,
    result: "Launched Oct 2026",
    speed: { score: 98, lcp: "1.2s" },
    placeholder: <ScreenPlaceholder variant="clinic" />,
  },
  {
    slug: "sample-spa",
    title: "Sample concept card",
    industry: "Med spa",
    city: "Austin",
    deliverable: "Website concept",
    isConcept: true,
    placeholder: <ScreenPlaceholder variant="spa" />,
  },
];

function Block({
  id,
  title,
  note,
  children,
}: {
  id: string;
  title: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="border-rule border-t py-14">
      <div className="mb-8 flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
        <h2 className="font-display text-h3">{title}</h2>
        {note ? (
          <p className="text-small text-muted md:max-w-[52ch] md:text-right">{note}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

export default function StyleguidePage() {
  const past = new Date("2027-02-01T00:00:00Z");
  return (
    <>
      <div className="container-site pt-12 pb-6">
        <Folio folio="SG" name="Styleguide" />
        <h1 className="font-display text-display mt-8">The octate system.</h1>
        <p className="text-lead text-muted mt-5 max-w-[56ch]">
          Tokens and components for this site and for client builds. Hidden page: not linked, not
          indexed.
        </p>
      </div>

      <div className="container-site">
        <Block
          id="logo"
          title="Logo"
          note="Drawn on an 8×8 grid. The oxblood pixel is the full stop, and launch day."
        >
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="grid h-44 place-items-center text-[3.5rem]">
              <Wordmark withStudio className="h-[42px]" />
            </Card>
            <Card tone="ink" className="grid h-44 place-items-center text-[3.5rem]">
              <Wordmark withStudio onDark className="text-paper h-[42px]" />
            </Card>
            <Card className="flex h-44 items-center justify-center gap-6">
              <Mark className="size-16" />
              <Mark tile className="size-16" />
              <Mark tile className="size-8" />
              <Mark tile className="size-4" />
            </Card>
          </div>
        </Block>

        <Block
          id="colour"
          title="Colour"
          note="Paper, ink, one accent. Oxblood never sits on ink; dark bands use accent-on-dark."
        >
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {swatches.map((s) => (
              <div key={s.name}>
                <div className={`h-24 rounded-md ${s.cls}`} />
                <p className="mt-3 font-semibold">{s.name}</p>
                <p className="text-small text-muted">
                  {s.hex} · {s.note}
                </p>
              </div>
            ))}
          </div>
        </Block>

        <Block
          id="type"
          title="Type"
          note="Zarathustra (display, OFL) + Coconat (text, UI and wide numerals, OFL). ₹ and रू come from 1KB subsets."
        >
          <div className="divide-rule divide-y">
            {typeScale.map((t) => (
              <div
                key={t.token}
                className="grid gap-2 py-5 md:grid-cols-[180px_1fr] md:items-baseline"
              >
                <code className="label text-muted">{t.token}</code>
                <p className={t.cls}>{t.sample}</p>
              </div>
            ))}
          </div>
        </Block>

        <Block id="buttons" title="Buttons and links">
          <div className="flex flex-wrap items-center gap-4">
            <ButtonLink href="#" size="lg" arrow>
              Book a 15-min call
            </ButtonLink>
            <ButtonLink href="#" size="lg" variant="secondary">
              See pricing
            </ButtonLink>
            <ButtonLink href="#" variant="ghost">
              How we work
            </ButtonLink>
            <Button size="sm">Small</Button>
            <Button>Medium</Button>
            <Button disabled>Disabled</Button>
            <TextLink href="#" arrow>
              See all work
            </TextLink>
          </div>
          <div className="on-dark bg-ink mt-6 flex flex-wrap items-center gap-4 rounded-lg p-6">
            <ButtonLink href="#" size="lg" variant="primary-dark" arrow>
              Book a call
            </ButtonLink>
            <ButtonLink href="#" size="lg" variant="secondary-dark">
              Message on WhatsApp
            </ButtonLink>
            <TextLink href="#" onDark arrow>
              How we work
            </TextLink>
          </div>
        </Block>

        <Block
          id="tags"
          title="Tags and badges"
          note="Concept tag is mandatory on every concept card, page and thumbnail."
        >
          <div className="flex flex-wrap items-center gap-3">
            <Tag>Dental</Tag>
            <Tag>Website</Tag>
            <Tag variant="concept" />
            <Badge>Most chosen</Badge>
            <span className="bg-ink rounded-lg p-3">
              <Tag variant="concept" onDark />
            </span>
            <EightDots />
            <EightDots active={3} />
          </div>
        </Block>

        <Block
          id="stats"
          title="Stat strip"
          note="Reads content/stats.ts. No number is typed anywhere else."
        >
          <StatStrip />
        </Block>

        <Block
          id="pricing"
          title="Region, founding, pricing"
          note="Toggle changes every price on the page instantly. Server HTML holds all three regions."
        >
          <RegionToggle />
          <FoundingBanner className="mt-8" />
          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {tiers.map((t) => (
              <PricingCard key={t.id} tier={t} />
            ))}
          </div>
          <p className="label text-muted mt-10 mb-4">
            After Jan 1, 2027: banner gone, standard prices only
          </p>
          <FoundingBanner now={past} />
          <div className="grid gap-5 lg:grid-cols-3">
            {tiers.slice(0, 2).map((t) => (
              <PricingCard key={t.id} tier={t} now={past} compact />
            ))}
          </div>
          <div className="mt-12">
            <ComparisonTable />
          </div>
        </Block>

        <Block
          id="work"
          title="Work cards"
          note="Client work shows a measured speed line. Concepts show the tag and nothing else."
        >
          <div className="grid gap-10 md:grid-cols-2">
            {sampleWork.map((w, i) => (
              <WorkCard key={w.slug} item={w} index={i + 1} />
            ))}
          </div>
        </Block>

        <Block
          id="timeline"
          title="Timeline"
          note="Eight dots, Day 0 to Day 7. Horizontal from 1024px, vertical below."
        >
          <Timeline />
        </Block>

        <Block
          id="accordion"
          title="Accordion"
          note="Native details/summary. Zero JS. One open at a time."
        >
          <Accordion items={faqsByTag("home").slice(0, 4)} name="sg-faq" />
        </Block>

        <Block id="forms" title="Form fields">
          <form className="relative grid max-w-2xl gap-5 md:grid-cols-2" action="#">
            <Field label="Your name" name="sg-name" required placeholder="Dr. Mehta" />
            <Field label="Business name" name="sg-biz" required />
            <Field
              label="Website"
              name="sg-site"
              type="url"
              hint="If you have one."
              placeholder="https://"
            />
            <Field
              label="WhatsApp"
              name="sg-phone"
              type="tel"
              required
              error="Add a number we can message."
            />
            <Field
              label="What you need"
              name="sg-plan"
              as="select"
              options={["Launch", "Signature", "Partner", "Not sure"]}
              required
              className="md:col-span-2"
            />
            <Field label="Message" name="sg-msg" as="textarea" className="md:col-span-2" />
            <Honeypot />
            <Button type="submit" size="lg" arrow className="md:col-span-2 md:justify-self-start">
              Send
            </Button>
          </form>
        </Block>

        <Block id="devices" title="Device mockups and before/after">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="bg-paper-2 relative aspect-[4/3] overflow-hidden rounded-lg">
              <div className="absolute top-[10%] left-[6%] w-[78%]">
                <Laptop url="yourclinic.in" className="w-full">
                  <ScreenPlaceholder variant="clinic" />
                </Laptop>
              </div>
              <div className="absolute right-[6%] bottom-[-14%] w-[26%]">
                <Phone className="w-full">
                  <ScreenPlaceholder variant="clinic" compact />
                </Phone>
              </div>
            </div>
            <BeforeAfterSlider
              label="Homepage, before and after"
              before={
                <div className="absolute inset-0 grid place-items-center bg-[#dcdcdc] text-[#777]">
                  <span className="font-[Times,serif] text-2xl">Welcome to our clinic!!</span>
                </div>
              }
              after={<ScreenPlaceholder variant="clinic" />}
            />
          </div>
        </Block>
      </div>

      <Section
        folio="07"
        name="Section"
        title="Section with folio, heading and sub."
        sub="Every band opens with a running head, like a magazine."
        tone="paper-2"
      />
      <CTABand
        dark
        title="Let's see what your site could look like."
        sub="Book a 15-minute call. We'll come with ideas specific to your business, not a sales script."
      />
    </>
  );
}
