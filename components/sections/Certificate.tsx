import Image from "next/image";
import { Logo } from "@/components/ui/bits";
import { certificateLogos } from "@/content/site";

/**
 * The certificate template, drawn in HTML so it stays sharp at any size.
 * Bracketed fields are placeholders filled per student.
 */
export function Certificate({ className = "" }: { className?: string }) {
  return (
    <figure
      className={`relative w-full overflow-hidden border border-ink bg-white text-ink shadow-[0_40px_90px_-30px_rgb(0_0_0/0.55)] ${className}`}
      aria-label="BeOutlier certificate template"
    >
      <div className="aspect-[1.414/1] w-full">
        <div className="flex h-full flex-col">
          {/* Header band: the logo on its native mint */}
          <div className="flex items-center justify-between gap-4 bg-mint px-[5%] py-[3.2%]">
            <Logo className="h-[clamp(16px,3.4vw,34px)]" />
            <p className="label !text-[clamp(6px,0.9vw,10px)] text-ink/75">Certificate no. [BO 2027 0001]</p>
          </div>

          {/* Body */}
          <div className="relative flex flex-1 flex-col justify-between border-[0.5px] border-ink/20 px-[5%] py-[4%]">
            {certificateLogos.show ? (
              <div className="absolute top-[6%] right-[5%] flex items-center gap-[clamp(6px,1.4vw,16px)]">
                {certificateLogos.items.map((l) => (
                  <Image
                    key={l.src}
                    src={l.src}
                    alt={l.alt}
                    width={l.width}
                    height={l.height}
                    className="h-[clamp(16px,3.6vw,40px)] w-auto"
                  />
                ))}
              </div>
            ) : null}
            <div>
              <p className="label !text-[clamp(6px,0.9vw,10px)] text-ink/60">Certificate of Achievement</p>
              <p className="mt-[2%] text-[clamp(8px,1.3vw,14px)] text-ink-muted">This certifies that</p>
              <p className="display mt-[1%] text-[clamp(22px,5.2vw,58px)] leading-none">[Student Name]</p>
              <p className="mt-[2.5%] max-w-[78%] text-[clamp(8px,1.3vw,14px)] leading-snug">
                built <span className="font-semibold">[Project name]</span> in the{" "}
                <span className="font-semibold">[Program]</span>, [House], Summer 2027.
              </p>
            </div>

            <div className="flex items-end justify-between gap-6">
              <div className="grid flex-1 grid-cols-2 gap-[6%]">
                {["Program Director", "Lead Mentor"].map((role) => (
                  <div key={role}>
                    <p className="font-[cursive] text-[clamp(10px,1.8vw,20px)] italic text-ink/70">[Signature]</p>
                    <div className="mt-[4%] border-t border-ink" />
                    <p className="label mt-[4%] !text-[clamp(5px,0.8vw,9px)] text-ink/70">{role}</p>
                  </div>
                ))}
              </div>
              {/* The BeOutlier stamp, pressed on at a slight angle */}
              <Image
                src="/brand/stamp.webp"
                alt="BeOutlier stamp: By exposure, from practice"
                width={332}
                height={330}
                className="w-[21%] shrink-0 -rotate-[8deg] opacity-90 mix-blend-multiply"
              />
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}
