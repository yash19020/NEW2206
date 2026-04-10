import type { Metadata } from "next";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Copyright policy",
  description: "Copyright and disclaimer information for Pushti Sahitya.",
};

export default function CopyrightPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:py-20">
      <div className="glass-panel px-8 py-10 sm:px-10 sm:py-12">
        <h1 className="font-serif text-4xl font-semibold tracking-tight text-[#722f37]">
          Copyright policy
        </h1>
        <p className="mt-4 text-lg text-[#5c4a3d]">
          Summary of how the portal treats rights and reuse. For the authoritative text, see the
          source site.
        </p>

        <div className="mt-10 space-y-6 leading-relaxed text-[#4a3728]">
          <p>
            If you have any copyright concerns about granthas published in electronic form on this
            website, please email{" "}
            <a href={`mailto:${site.email}`} className="font-medium text-[#722f37] hover:underline">
              {site.email}
            </a>
            .
          </p>
          <p>
            The portal states that it is non-profit and that materials are offered to serve Pushti
            Sampraday. This UI does not replace legal notices on the original host.
          </p>
          <p>
            <a
              href="https://www.pushtisahitya.org/copyright.shtml"
              className="font-semibold text-[#1a5c3a] underline underline-offset-2 hover:text-[#722f37]"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open full copyright policy on pushtisahitya.org ↗
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
