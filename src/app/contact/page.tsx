import type { Metadata } from "next";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Pushti Sahitya for copyright questions and general inquiries.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:py-20">
      <div className="glass-panel px-8 py-10 sm:px-10 sm:py-12">
        <h1 className="font-serif text-4xl font-semibold tracking-tight text-[#722f37]">Contact</h1>
        <p className="mt-4 text-lg text-[#5c4a3d]">
          For copyright concerns about granthas in electronic form, or other questions about the
          portal, please write to the administrators.
        </p>

        <div className="mt-10 rounded-2xl border-2 border-[#c9a227]/40 bg-[#fff9ed] p-8">
          <p className="text-sm font-medium uppercase tracking-wider text-[#722f37]/80">Email</p>
          <a
            href={`mailto:${site.email}`}
            className="mt-2 inline-block text-xl font-semibold text-[#1a5c3a] hover:text-[#722f37] hover:underline"
          >
            {site.email}
          </a>
          <p className="mt-6 text-sm leading-relaxed text-[#5c4a3d]">
            The live contact form and full details may also be available on the{" "}
            <a
              href="https://www.pushtisahitya.org/contactus.shtml"
              className="font-medium text-[#722f37] underline underline-offset-2 hover:text-[#5a252c]"
              target="_blank"
              rel="noopener noreferrer"
            >
              original contact page
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
