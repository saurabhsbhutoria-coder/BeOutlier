import { Placeholder } from "@/components/ui/bits";
import { dropOrder, feeText, getProgram, type Program } from "@/content/programs";
import { microcopy } from "@/content/microcopy";

/** Home section 07 and /parents: fees, safety, supervision, what your child brings home. All facts from CLAUDE.md. */
export function ParentsBlock() {
  const all = dropOrder.map((id) => getProgram(id)).filter(Boolean) as Program[];
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <div className="border-t border-ink bg-transparent pt-6 pb-2">
        <p className="label text-ink-muted">Fees</p>
        <ul className="mt-4 divide-y divide-ink/10">
          {all.map((p) => (
            <li key={p.id} className="flex items-baseline justify-between gap-4 py-3">
              <span className="font-semibold">{p.title}</span>
              <span className="whitespace-nowrap font-semibold">
                {feeText(p.fee) ?? <Placeholder>{microcopy.placeholders.fee}</Placeholder>}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm text-ink-muted">Residentials: stay and meals included.</p>
      </div>
      <div className="border-t border-ink bg-transparent pt-6 pb-2">
        <p className="label text-ink-muted">Safety and supervision</p>
        <ul className="mt-5 flex flex-col gap-4 leading-relaxed">
          <li>
            <span className="heavy">Every program.</span> 1 mentor for every 9 students.
          </li>
          <li>
            <span className="heavy">Residentials.</span> Wardens on duty. 3 students per room. Doctor and medical team on site.
            Security team. CCTV surveillance.
          </li>
          <li>
            <span className="heavy">Day 1.</span> You drop your child off and stay for the orientation.
          </li>
        </ul>
      </div>
      <div className="border-t border-ink bg-transparent pt-6 pb-2">
        <p className="label text-ink-muted">What your child brings home</p>
        <ul className="mt-5 flex flex-col gap-4 leading-relaxed">
          <li>
            <span className="heavy">Founders.</span> Their own brand. Their profits. Their journal.
          </li>
          <li>
            <span className="heavy">Engineers.</span> A working robot, theirs to keep.
          </li>
          <li>
            <span className="heavy">Designers.</span> An architectural project for a real space in Goa, and an artistic piece made with their own hands.
          </li>
        </ul>
      </div>
      <div className="flex flex-col gap-4 border-t border-ink bg-transparent pt-6 pb-2">
        <p className="label text-ink-muted">Testimonials</p>
        <Placeholder block>{microcopy.placeholders.testimonials}</Placeholder>
      </div>
    </div>
  );
}
