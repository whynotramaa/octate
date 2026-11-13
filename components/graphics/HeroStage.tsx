import { Phone, Laptop } from "@/components/ui/DeviceMockup";
import { Tag } from "@/components/ui/Tag";
import { ConceptScreen } from "./ConceptScreen";

/**
 * Hero visual. Not "a website": the thing a website is for.
 * Two concept sites, and every few seconds a booking request lands.
 * Pure HTML/CSS: crisp, tiny, and the H1 stays the LCP element.
 *
 * Layout (sm and up):          Mobile:
 *   ┌───────── laptop ───┐        ┌ phone ┐
 *   │                 ┌──┴┐       │       │ ┌ request ┐
 *   └────────────────┐│ph.│       │       │ └─────────┘
 *   ┌ request ┐      ││   │       └───────┘
 *   └─────────┘      └────┘
 */
function BookingRequest() {
  return (
    <div>
      <div className="typing-cycle bg-paper shadow-lift mb-2 inline-flex items-center gap-1 rounded-full px-3 py-2">
        <span className="bg-muted size-1.5 rounded-full" />
        <span className="bg-muted size-1.5 rounded-full" />
        <span className="bg-muted size-1.5 rounded-full" />
      </div>
      <div className="toast-cycle bg-paper rounded-md p-4 shadow-[0_0_0_1px_var(--color-rule),var(--shadow-lift)]">
        <p className="label text-muted flex items-center gap-2 text-[0.625rem]">
          <span className="bg-accent inline-block size-2" aria-hidden />
          New booking request
        </p>
        <p className="font-display mt-2 text-[1.15rem] leading-tight whitespace-nowrap">
          Skin consult · Tue, 11:00
        </p>
        <p className="text-muted mt-1 text-[0.75rem]">via your website · just now</p>
      </div>
    </div>
  );
}

export function HeroStage() {
  return (
    <figure className="relative">
      <div className="relative mx-auto aspect-[1/1.02] w-full max-w-[30rem] sm:aspect-[5/4] sm:max-w-none">
        {/* faint dot field: the grid everything is drawn on */}
        <div
          aria-hidden
          className="text-ink/25 absolute inset-[-8%] [background-image:radial-gradient(currentColor_1px,transparent_1.4px)] [mask-image:radial-gradient(closest-side,black_30%,transparent)] [background-size:16px_16px]"
        />

        {/* laptop, back left (from sm) */}
        <div className="parallax-slow absolute top-[2%] left-0 hidden w-[84%] sm:block">
          <Laptop url="halcyon-aesthetics.com" className="w-full">
            <ConceptScreen id="spa" layout="desktop" />
          </Laptop>
        </div>

        {/* phone, front right on sm+, centred-left on mobile */}
        <div className="parallax-fast absolute top-0 left-[6%] w-[52%] sm:top-auto sm:right-0 sm:bottom-0 sm:left-auto sm:w-[31%]">
          <Phone className="w-full">
            <ConceptScreen id="skin" />
          </Phone>
        </div>

        {/* the outcome */}
        <div className="absolute right-0 bottom-[6%] w-[64%] sm:right-auto sm:bottom-[3%] sm:left-[4%] sm:w-[48%]">
          <BookingRequest />
        </div>
      </div>
      <figcaption className="text-muted mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.8125rem] sm:mt-6">
        <Tag variant="concept" />
        <span className="numeral text-[0.75rem]">Fig. 01</span>
        <span>Studio concepts for a skin clinic and a med spa.</span>
      </figcaption>
    </figure>
  );
}
