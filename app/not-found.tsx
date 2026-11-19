import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Stack, Wordmark } from "@/components/ui/bits";
import { microcopy } from "@/content/microcopy";

export default function NotFound() {
  const t = microcopy.notFound;
  return (
    <main className="flex min-h-dvh flex-col bg-coral text-navy">
      <header className="bg-navy">
        <div className="shell flex h-16 items-center">
          <Link href="/" aria-label="BeOutlier home">
            <Wordmark />
          </Link>
        </div>
      </header>
      <div className="shell flex flex-1 flex-col justify-center py-20">
        <p className="display text-[8rem] leading-none sm:text-[12rem]">404</p>
        <Stack as="h1" lines={[t.title]} className="mt-4 max-w-4xl text-5xl sm:text-7xl" />
        <p className="heavy mt-6 text-xl">{t.body}</p>
        <div className="mt-10">
          <ButtonLink href="/" variant="navy" size="lg">
            {t.cta}
          </ButtonLink>
        </div>
      </div>
    </main>
  );
}
