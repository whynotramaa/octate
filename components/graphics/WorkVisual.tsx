import { Phone } from "@/components/ui/DeviceMockup";
import { ConceptScreen, type ConceptId } from "./ConceptScreen";

/**
 * Cover for a work card: the desktop site in a quiet browser frame, the phone version
 * stepping in front. Drawn in HTML, so it's sharp at every size and weighs nothing.
 */
export function WorkVisual({ concept, url }: { concept: ConceptId; url: string }) {
  return (
    <div className="bg-paper-2 absolute inset-0">
      <div className="absolute top-[9%] left-[7%] w-[82%] overflow-hidden rounded-[10px] shadow-[0_0_0_1px_var(--color-rule),var(--shadow-lift)]">
        <div className="bg-paper flex h-6 items-center gap-1.5 border-b border-[var(--color-rule)] px-2.5">
          <span className="bg-paper-3 size-1.5 rounded-full" />
          <span className="bg-paper-3 size-1.5 rounded-full" />
          <span className="bg-paper-3 size-1.5 rounded-full" />
          <span className="text-muted mx-auto text-[0.5625rem]">{url}</span>
        </div>
        <div className="relative aspect-[16/10]">
          <ConceptScreen id={concept} layout="desktop" />
        </div>
      </div>
      <div className="absolute right-[6%] bottom-[-18%] w-[24%]">
        <Phone className="w-full">
          <ConceptScreen id={concept} />
        </Phone>
      </div>
    </div>
  );
}
