import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Logo, Stack } from "@/components/ui/bits";
import { microcopy } from "@/content/microcopy";

export default function NotFound() {
  const t = microcopy.notFound;
  return (
    <main className="flex min-h-dvh flex-col bg-ink text-bone">
      <header className="border-b border-bone/10">
        <div className="shell flex h-16 items-center">
          <Link href="/" aria-label="BeOutlier home">
            <Logo className="h-8" priority />
          </Link>
        </div>
      </header>
      <div className="shell flex flex-1 flex-col justify-center py-20">
        <p className="display text-[8rem] leading-none text-mint sm:text-[12rem]">404</p>
        <Stack as="h1" lines={[t.title]} className="mt-4 max-w-4xl text-5xl sm:text-7xl" />
        <p className="mt-6 text-lg text-bone/70">{t.body}</p>
        <div className="mt-10">
          <ButtonLink href="/" variant="light" size="lg">
            {t.cta}
          </ButtonLink>
        </div>
      </div>
    </main>
  );
}
