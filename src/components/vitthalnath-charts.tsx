 "use client";

import Link from "next/link";
import { useState } from "react";

type Lang = "hi" | "en";
type LocalizedText = { hi: string; en: string };

type ChartItem = {
  label: LocalizedText;
  href: string;
};

type BranchChild =
  | { type: "item"; item: ChartItem }
  | { type: "group"; item: ChartItem; children: ChartItem[] };

type ChartBranch = {
  title: LocalizedText;
  children?: BranchChild[];
};

function t(hi: string, en: string): LocalizedText {
  return { hi, en };
}

function text(label: LocalizedText, lang: Lang) {
  return lang === "hi" ? label.hi : label.en;
}

function searchHref(queryEn: string) {
  return `/search?q=${encodeURIComponent(queryEn)}`;
}

const chartOne: ChartBranch[] = [
  {
    title: t("वाद", "Vaad"),
    children: [
      { type: "item", item: { label: t("विद्वन्मण्डन", "Vidvanmaṇḍana"), href: searchHref("Vidvanmaṇḍana") } },
      { type: "item", item: { label: t("भक्तिहेतुनिर्णय", "Bhaktihetunirṇaya"), href: searchHref("Bhaktihetunirṇaya") } },
      { type: "item", item: { label: t("भक्तिहंस", "Bhaktihaṃsa"), href: searchHref("Bhaktihaṃsa") } },
      { type: "item", item: { label: t("मुक्तितारतम्य", "Muktitāratamya"), href: searchHref("Muktitāratamya") } },
      { type: "item", item: { label: t("उत्सवनिर्णय", "Utsavanirṇaya"), href: "/library/UtsavBhavna.shtml" } },
      { type: "item", item: { label: t("जन्माष्टमीनिर्णय", "Janmāṣṭamīnirṇaya"), href: searchHref("Janmāṣṭamīnirṇaya") } },
      { type: "item", item: { label: t("रामनवमीनिर्णय", "Rāmanavamīnirṇaya"), href: searchHref("Rāmanavamīnirṇaya") } },
      { type: "item", item: { label: t("डोलोत्सवनिर्णय", "Ḍolotsavanirṇaya"), href: searchHref("Ḍolotsavanirṇaya") } },
    ],
  },
  { title: t("९ विज्ञप्ति", "9 Vijñapti") },
  {
    title: t("सेवोपयोगी", "Sevopayogi"),
    children: [
      { type: "item", item: { label: t("पुरुषोत्तमप्रतिष्ठाप्रकार", "Puruṣottamapratiṣṭhāprakāra"), href: searchHref("Puruṣottamapratiṣṭhāprakāra") } },
      {
        type: "group",
        item: { label: t("आर्या", "Āryā"), href: searchHref("Āryā") },
        children: [
          { label: t("प्रबोध", "Prabodh"), href: "/library/Antahkaranprabodh.shtml" },
          { label: t("मंगला", "Mangala"), href: searchHref("Mangala") },
          { label: t("पलना", "Palana"), href: searchHref("Palana") },
          { label: t("राजभोग", "Rājabhoga"), href: searchHref("Rājabhoga") },
          { label: t("शयन", "Shayan"), href: searchHref("Shayan") },
        ],
      },
      {
        type: "group",
        item: { label: t("पद", "Pad"), href: searchHref("Pad") },
        children: [{ label: t("अष्टपदी", "Aṣṭapadī"), href: searchHref("Aṣṭapadī") }],
      },
      { type: "item", item: { label: t("सेवाश्लोकी", "Sevāśloki"), href: "/library/Sevafal.shtml" } },
    ],
  },
  { title: t("१६ पत्र", "16 Patra") },
  {
    title: t("स्तोत्र", "Stotra"),
    children: [
      { type: "item", item: { label: t("मंगला-चरण", "Maṅgalācaraṇa"), href: searchHref("Maṅgalācaraṇa") } },
      {
        type: "group",
        item: { label: t("आचार्य", "Acharya"), href: searchHref("Acharya") },
        children: [
          { label: t("सर्वोत्तम", "Sarvottam"), href: searchHref("Sarvottam") },
          { label: t("वल्लभाष्टक", "Vallabhāṣṭaka"), href: searchHref("Vallabhāṣṭaka") },
          { label: t("स्फुरत्कृष्ण-प्रेमामृत", "Sphuratkṛṣṇapremāmṛta"), href: searchHref("Sphuratkṛṣṇapremāmṛta") },
        ],
      },
      {
        type: "group",
        item: { label: t("स्वामिनी", "Swamini"), href: searchHref("Swamini") },
        children: [
          { label: t("श्रीस्वामिनी प्रार्थना", "Śrīsvāminīprārthanā"), href: searchHref("Śrīsvāminīprārthanā") },
          { label: t("श्रीस्वामिनी अष्टकम्", "Śrīsvāminīaṣṭakam"), href: searchHref("Śrīsvāminīaṣṭakam") },
          { label: t("श्रीस्वामिनी स्तोत्रम्", "Śrīsvāminīstotram"), href: searchHref("Śrīsvāminīstotram") },
          { label: t("श्रीराधा", "Shri Radha"), href: searchHref("Shri Radha") },
          { label: t("राधाप्रार्थना-चतु:श्लोकी", "Rādhāprārthanācatuḥślokī"), href: "/library/Chatuhshloki.shtml" },
          { label: t("श्रीयमुना", "Shri Yamuna"), href: searchHref("Shri Yamuna") },
          { label: t("यमुनाष्टपदी", "Yamunāṣṭapadī"), href: searchHref("Yamunāṣṭapadī") },
        ],
      },
      {
        type: "group",
        item: { label: t("प्रभु", "Prabhu"), href: searchHref("Prabhu") },
        children: [
          { label: t("भुजंगप्रयाताष्टकम्", "Bhujaṅgaprayātāṣṭakam"), href: searchHref("Bhujaṅgaprayātāṣṭakam") },
          { label: t("श्रीगोकुलाष्टकम्", "Śrīgokulāṣṭakam"), href: searchHref("Śrīgokulāṣṭakam") },
          { label: t("ललितत्रिभंगीस्तोत्रम्", "Lalitatribhaṅgīstotram"), href: searchHref("Lalitatribhaṅgīstotram") },
        ],
      },
    ],
  },
  {
    title: t("उपदेश", "Upadesh"),
    children: [
      { type: "item", item: { label: t("चतु:श्लोकी-१", "Catuḥślokī-1"), href: "/library/Chatuhshloki.shtml" } },
      { type: "item", item: { label: t("चतु:श्लोकी-२", "Catuḥślokī-2"), href: "/library/Chatuhshloki.shtml" } },
      { type: "item", item: { label: t("रक्षासमरणम्", "Rakṣāsmaraṇam"), href: searchHref("Rakṣāsmaraṇam") } },
      { type: "item", item: { label: t("भक्तिजीवनम्", "Bhaktijīvanam"), href: searchHref("Bhaktijīvanam") } },
    ],
  },
  {
    title: t("लीला", "Leela"),
    children: [
      { type: "item", item: { label: t("दानलीलाष्टक", "Dānalīlāṣṭaka"), href: searchHref("Dānalīlāṣṭaka") } },
      { type: "item", item: { label: t("रससर्वस्व", "Rasasarvasva"), href: searchHref("Rasasarvasva") } },
      { type: "item", item: { label: t("स्वप्नदर्शन", "Svapnadarśana"), href: searchHref("Svapnadarśana") } },
      { type: "item", item: { label: t("गुप्तरस", "Guptarasa"), href: searchHref("Guptarasa") } },
      { type: "item", item: { label: t("व्रतचर्यापदी", "Vratacaryāpadī"), href: searchHref("Vratacaryāpadī") } },
    ],
  },
  {
    title: t("प्रकीर्ण", "Prakirna"),
    children: [{ type: "item", item: { label: t("शृंगारसमण्डन", "Śṛṅgārasamaṇḍana"), href: "/library/LeelaChintan.shtml" } }],
  },
];

const chartTwo: ChartBranch[] = [
  {
    title: t("व्याख्या", "Vyakhya"),
    children: [
      { type: "item", item: { label: t("गीतातात्पर्य / गीताहेतुनिर्णय", "Gītātātparya / Gītāhetunirṇaya"), href: "/library/ShreeGitopanishad.shtml" } },
      { type: "item", item: { label: t("न्यासादेश", "Nyāsādeśa"), href: searchHref("Nyāsādeśa") } },
      { type: "item", item: { label: t("सुबोधिनीपे टिप्पणी", "Subodhinī-ṭippaṇī"), href: "/library/ShreeSubodhini.shtml" } },
      { type: "item", item: { label: t("गायत्री", "Gayatri"), href: searchHref("Gayatri") } },
      {
        type: "group",
        item: { label: t("षोडशग्रंथ", "Ṣoḍaśagrantha"), href: "/library/Shreeyamunastakam.shtml" },
        children: [
          { label: t("यमुनाष्टक", "Yamunāṣṭaka"), href: "/library/Shreeyamunastakam.shtml" },
          { label: t("सिद्धान्तमुक्तावली", "Siddhāntamuktāvalī"), href: "/library/SiddhantMuktavali.shtml" },
          { label: t("नवरत्न", "Navratna"), href: "/library/Navratam.shtml" },
        ],
      },
      { type: "item", item: { label: t("वृत्रासुर चतुःश्लोकी", "Vṛtrāsura Catuḥślokī"), href: "/library/Chatuhshloki.shtml" } },
      { type: "item", item: { label: t("भागवत (१-३ अध्याय व्याख्या)", "Bhāgavata (1-3 Adhyāya Vyākhyā)"), href: "/library/BhagwatarthPrakaran.shtml" } },
      { type: "item", item: { label: t("गीतगोविन्द", "Gītagovinda"), href: searchHref("Gītagovinda") } },
      { type: "item", item: { label: t("कृष्णप्रेमामृत", "Kṛṣṇapremāmṛta"), href: searchHref("Kṛṣṇapremāmṛta") } },
      { type: "item", item: { label: t("मधुराष्टक", "Madhurāṣṭaka"), href: searchHref("Madhurāṣṭaka") } },
    ],
  },
  {
    title: t("पूर्ति", "Poorti"),
    children: [
      { type: "item", item: { label: t("ब्रह्मसूत्र", "Brahmasūtra"), href: searchHref("Brahmasūtra") } },
      { type: "item", item: { label: t("निबन्धपे प्रकाश और योजना", "Nibandha-prakāśa aura yojanā"), href: searchHref("Nibandha prakāśa yojanā") } },
    ],
  },
  {
    title: t("स्वतंत्र", "Swatantra"),
    children: [
      { type: "item", item: { label: t("भगवानपि ता रात्रीः", "Bhagavān api tā rātrīḥ"), href: searchHref("Bhagavān api tā rātrīḥ") } },
      { type: "item", item: { label: t("श्रुतिगीतार्थ", "Śrutigītārtha"), href: searchHref("Śrutigītārtha") } },
      { type: "item", item: { label: t("कायेनवाचा-मनसेन्द्रियैः वा", "Kāyena-vācā-manasendriyaiḥ vā"), href: searchHref("Kāyena vācā manasendriyaiḥ vā") } },
      { type: "item", item: { label: t("नृदेहम् आद्यं सुलभम्", "Nṛdeham ādyam sulabham"), href: searchHref("Nṛdeham ādyam sulabham") } },
      { type: "item", item: { label: t("कथाइमास्ते", "Kathaimaste"), href: searchHref("Kathaimaste") } },
      { type: "item", item: { label: t("नैवात्मनप्रभुः अयं", "Naivātmanaprabhuḥ ayaṃ"), href: searchHref("Naivātmanaprabhuḥ ayaṃ") } },
    ],
  },
  {
    title: t("प्रक्षेप", "Prakshep"),
    children: [{ type: "item", item: { label: t("भाष्य सुबोधिनी प्रकाश आदिमे प्रकीर्ण", "Bhāṣya Subodhinī prakāśa ādime prakīrṇa"), href: "/library/ShreeSubodhini.shtml" } }],
  },
];

function BranchNode({ branch, lang }: { branch: ChartBranch; lang: Lang }) {
  const hasChildren = Boolean(branch.children?.length);
  return (
    <div className={`vt-branch${hasChildren ? "" : " vt-branch--leaf"}`}>
      <span className="vt-node vt-node--section">{text(branch.title, lang)}</span>
      {hasChildren ? (
        <div className="vt-children">
          {branch.children?.map((child, idx) =>
            child.type === "item" ? (
              <div className="vt-child-row" key={`${branch.title.hi}-${idx}-${child.item.label.hi}`}>
                <Link href={child.item.href} className="vt-node vt-node--leaf">
                  {text(child.item.label, lang)}
                </Link>
              </div>
            ) : (
              <div className="vt-child-row" key={`${branch.title.hi}-${idx}-${child.item.label.hi}`}>
                <div className="vt-subtree">
                  <Link href={child.item.href} className="vt-node vt-node--leaf">
                    {text(child.item.label, lang)}
                  </Link>
                  <div className="vt-sub-children">
                    {child.children.map((sub) => (
                      <div className="vt-sub-child-row" key={`${child.item.label.hi}-${sub.label.hi}`}>
                        <Link href={sub.href} className="vt-node vt-node--leaf">
                          {text(sub.label, lang)}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ),
          )}
        </div>
      ) : null}
    </div>
  );
}

function ChartTree({ title, branches, lang }: { title: LocalizedText; branches: ChartBranch[]; lang: Lang }) {
  const branchesClass = title.hi === "व्याख्या" ? "vt-branches vt-branches--chart-2" : "vt-branches";
  return (
    <section className="vt-chart glass-panel mb-6 p-4 sm:p-6">
      <div className="vt-root-wrap">
        <span className="vt-node vt-node--root">{text(title, lang)}</span>
      </div>
      <div className="vt-root-vline" />
      <div className={branchesClass}>
        {branches.map((branch) => (
          <BranchNode key={branch.title.hi} branch={branch} lang={lang} />
        ))}
      </div>
    </section>
  );
}

export function VitthalnathCharts() {
  const [lang, setLang] = useState<Lang>("hi");

  return (
    <div className="mb-8">
      <div className="mb-4 flex items-center justify-end gap-2">
        <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[#5c4a3d]">Language</span>
        <button
          type="button"
          onClick={() => setLang("hi")}
          className={`vt-lang-pill rounded-full border px-3 py-1 text-xs font-semibold transition ${
            lang === "hi"
              ? "vt-lang-pill--active border-[#722f37] bg-[#f5e6c8] text-[#4a1c24]"
              : "border-[#c9a227]/45 bg-[#fffdf8] text-[#5c4a3d] hover:bg-[#fff9ed]"
          }`}
        >
          हिंदी
        </button>
        <button
          type="button"
          onClick={() => setLang("en")}
          className={`vt-lang-pill rounded-full border px-3 py-1 text-xs font-semibold transition ${
            lang === "en"
              ? "vt-lang-pill--active border-[#1f2937] bg-[#e5e7eb] text-[#111827]"
              : "border-[#c9a227]/45 bg-[#fffdf8] text-[#5c4a3d] hover:bg-[#fff9ed]"
          }`}
        >
          English
        </button>
      </div>
      <ChartTree title={t("मूल", "Mool")} branches={chartOne} lang={lang} />
      <ChartTree title={t("व्याख्या", "Vyakhya")} branches={chartTwo} lang={lang} />
    </div>
  );
}

