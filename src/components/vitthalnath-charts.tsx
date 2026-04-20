import Link from "next/link";

type ChartItem = {
  label: string;
  href: string;
};

type BranchChild =
  | { type: "item"; item: ChartItem }
  | { type: "group"; item: ChartItem; children: ChartItem[] };

type ChartBranch = {
  title: string;
  children?: BranchChild[];
};

function searchHref(label: string) {
  return `/search?q=${encodeURIComponent(label)}`;
}

const chartOne: ChartBranch[] = [
  {
    title: "वाद",
    children: [
      { type: "item", item: { label: "विद्वमण्डन", href: searchHref("विद्वमण्डन") } },
      { type: "item", item: { label: "भक्तिहेतुनिर्णय", href: searchHref("भक्तिहेतुनिर्णय") } },
      { type: "item", item: { label: "भक्तिहंस", href: searchHref("भक्तिहंस") } },
      { type: "item", item: { label: "मुक्तितारतम्य", href: searchHref("मुक्तितारतम्य") } },
      { type: "item", item: { label: "उत्सवनिर्णय", href: "/library/UtsavBhavna.shtml" } },
      { type: "item", item: { label: "जन्माष्टमीनिर्णय", href: searchHref("जन्माष्टमीनिर्णय") } },
      { type: "item", item: { label: "रामनवमीनिर्णय", href: searchHref("रामनवमी") } },
      { type: "item", item: { label: "डोलोत्सवनिर्णय", href: searchHref("डोलोत्सवनिर्णय") } },
    ],
  },
  { title: "९ विज्ञप्ति" },
  {
    title: "सेवोपयोगी",
    children: [
      { type: "item", item: { label: "पुरुषोत्तमप्रतिष्ठाप्रकार", href: searchHref("पुरुषोत्तमप्रतिष्ठाप्रकार") } },
      {
        type: "group",
        item: { label: "आर्या", href: searchHref("आर्या") },
        children: [
          { label: "प्रबोध", href: "/library/Antahkaranprabodh.shtml" },
          { label: "मंगला", href: searchHref("मंगला") },
          { label: "पलना", href: searchHref("पलना") },
          { label: "राजभोग", href: searchHref("राजभोग") },
          { label: "शयन", href: searchHref("शयन") },
        ],
      },
      {
        type: "group",
        item: { label: "पद", href: searchHref("पद") },
        children: [{ label: "अष्टपदी", href: searchHref("अष्टपदी") }],
      },
      { type: "item", item: { label: "सेवाश्लोकी", href: "/library/Sevafal.shtml" } },
    ],
  },
  { title: "१६ पत्र" },
  {
    title: "स्तोत्र",
    children: [
      { type: "item", item: { label: "मंगला-चरण", href: searchHref("मंगला-चरण") } },
      {
        type: "group",
        item: { label: "आचार्य", href: searchHref("आचार्य") },
        children: [
          { label: "सर्वोत्तम", href: searchHref("सर्वोत्तम") },
          { label: "वल्लभाष्टक", href: searchHref("वल्लभाष्टक") },
          { label: "स्फुरत्कृष्ण-प्रेमामृत", href: searchHref("स्फुरत्कृष्ण-प्रेमामृत") },
        ],
      },
      {
        type: "group",
        item: { label: "स्वामिनी", href: searchHref("स्वामिनी") },
        children: [
          { label: "श्रीस्वामिनी प्रार्थना", href: searchHref("श्रीस्वामिनी प्रार्थना") },
          { label: "श्रीस्वामिनी अष्टकम्", href: searchHref("श्रीस्वामिनी अष्टकम्") },
          { label: "श्रीस्वामिनी स्तोत्रम्", href: searchHref("श्रीस्वामिनी स्तोत्रम्") },
          { label: "श्रीराधा", href: searchHref("श्रीराधा") },
          { label: "राधाप्रार्थना-चतु:श्लोकी", href: "/library/Chatuhshloki.shtml" },
          { label: "श्रीयमुना", href: searchHref("श्रीयमुना") },
          { label: "यमुनाष्टपदी", href: searchHref("यमुनाष्टपदी") },
        ],
      },
      {
        type: "group",
        item: { label: "प्रभु", href: searchHref("प्रभु") },
        children: [
          { label: "भुजंगप्रयाताष्टकम्", href: searchHref("भुजंगप्रयाताष्टकम्") },
          { label: "श्रीगोकुलाष्टकम्", href: searchHref("श्रीगोकुलाष्टकम्") },
          { label: "ललितत्रिभंगीस्तोत्रम्", href: searchHref("ललितत्रिभंगीस्तोत्रम्") },
        ],
      },
    ],
  },
  {
    title: "उपदेश",
    children: [
      { type: "item", item: { label: "चतु:श्लोकी-१", href: "/library/Chatuhshloki.shtml" } },
      { type: "item", item: { label: "चतु:श्लोकी-२", href: "/library/Chatuhshloki.shtml" } },
      { type: "item", item: { label: "रक्षासमरणम्", href: searchHref("रक्षासमरणम्") } },
      { type: "item", item: { label: "भक्तिजीवनम्", href: searchHref("भक्तिजीवनम्") } },
    ],
  },
  {
    title: "लीला",
    children: [
      { type: "item", item: { label: "दानलीलाष्टक", href: searchHref("दानलीलाष्टक") } },
      { type: "item", item: { label: "रससर्वस्व", href: searchHref("रससर्वस्व") } },
      { type: "item", item: { label: "स्वप्नदर्शन", href: searchHref("स्वप्नदर्शन") } },
      { type: "item", item: { label: "गुप्तरस", href: searchHref("गुप्तरस") } },
      { type: "item", item: { label: "व्रतचर्यापदी", href: searchHref("व्रतचर्यापदी") } },
    ],
  },
  {
    title: "प्रकीर्ण",
    children: [{ type: "item", item: { label: "शृंगारसमण्डन", href: "/library/LeelaChintan.shtml" } }],
  },
];

const chartTwo: ChartBranch[] = [
  {
    title: "व्याख्या",
    children: [
      { type: "item", item: { label: "गीतातात्पर्य / गीताहेतुनिर्णय", href: "/library/ShreeGitopanishad.shtml" } },
      { type: "item", item: { label: "न्यासादेश", href: searchHref("न्यासादेश") } },
      { type: "item", item: { label: "सुबोधिनीपे टिप्पणी", href: "/library/ShreeSubodhini.shtml" } },
      { type: "item", item: { label: "गायत्री", href: searchHref("गायत्री") } },
      {
        type: "group",
        item: { label: "षोडशग्रंथ", href: "/library/Shreeyamunastakam.shtml" },
        children: [
          { label: "यमुनाष्टक", href: "/library/Shreeyamunastakam.shtml" },
          { label: "सिद्धान्तमुक्तावली", href: "/library/SiddhantMuktavali.shtml" },
          { label: "नवरत्न", href: "/library/Navratam.shtml" },
        ],
      },
      { type: "item", item: { label: "वृत्रासुर चतुःश्लोकी", href: "/library/Chatuhshloki.shtml" } },
      { type: "item", item: { label: "भागवत (१-३ अध्याय व्याख्या)", href: "/library/BhagwatarthPrakaran.shtml" } },
      { type: "item", item: { label: "गीतगोविन्द", href: searchHref("गीतगोविन्द") } },
      { type: "item", item: { label: "कृष्णप्रेमामृत", href: searchHref("कृष्णप्रेमामृत") } },
      { type: "item", item: { label: "मधुराष्टक", href: searchHref("मधुराष्टक") } },
    ],
  },
  {
    title: "पूर्ति",
    children: [
      { type: "item", item: { label: "ब्रह्मसूत्र", href: searchHref("ब्रह्मसूत्र") } },
      { type: "item", item: { label: "निबन्धपे प्रकाश और योजना", href: searchHref("निबन्धपे प्रकाश और योजना") } },
    ],
  },
  {
    title: "स्वतंत्र",
    children: [
      { type: "item", item: { label: "भगवानपि ता रात्रीः", href: searchHref("भगवानपि ता रात्रीः") } },
      { type: "item", item: { label: "श्रुतिगीतार्थ", href: searchHref("श्रुतिगीतार्थ") } },
      { type: "item", item: { label: "कायेनवाचा-मनसेन्द्रियैः वा", href: searchHref("कायेनवाचा मनसेन्द्रियै") } },
      { type: "item", item: { label: "नृदेहम् आद्यं सुलभम्", href: searchHref("नृदेहम् आद्यं सुलभम्") } },
      { type: "item", item: { label: "कथाइमास्ते", href: searchHref("कथाइमास्ते") } },
      { type: "item", item: { label: "नैवात्मनप्रभुः अयं", href: searchHref("नैवात्मनप्रभुः अयं") } },
    ],
  },
  {
    title: "प्रक्षेप",
    children: [{ type: "item", item: { label: "भाष्य सुबोधिनी प्रकाश आदिमे प्रकीर्ण", href: "/library/ShreeSubodhini.shtml" } }],
  },
];

function BranchNode({ branch }: { branch: ChartBranch }) {
  const hasChildren = Boolean(branch.children?.length);
  return (
    <div className={`vt-branch${hasChildren ? "" : " vt-branch--leaf"}`}>
      <span className="vt-node vt-node--section">{branch.title}</span>
      {hasChildren ? (
        <div className="vt-children">
          {branch.children?.map((child, idx) =>
            child.type === "item" ? (
              <div className="vt-child-row" key={`${branch.title}-${idx}-${child.item.label}`}>
                <Link href={child.item.href} className="vt-node vt-node--leaf">
                  {child.item.label}
                </Link>
              </div>
            ) : (
              <div className="vt-child-row" key={`${branch.title}-${idx}-${child.item.label}`}>
                <div className="vt-subtree">
                  <Link href={child.item.href} className="vt-node vt-node--leaf">
                    {child.item.label}
                  </Link>
                  <div className="vt-sub-children">
                    {child.children.map((sub) => (
                      <div className="vt-sub-child-row" key={`${child.item.label}-${sub.label}`}>
                        <Link href={sub.href} className="vt-node vt-node--leaf">
                          {sub.label}
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

function ChartTree({ title, branches }: { title: string; branches: ChartBranch[] }) {
  const branchesClass = title === "व्याख्या" ? "vt-branches vt-branches--chart-2" : "vt-branches";
  return (
    <section className="vt-chart glass-panel mb-6 p-4 sm:p-6">
      <div className="vt-root-wrap">
        <span className="vt-node vt-node--root">{title}</span>
      </div>
      <div className="vt-root-vline" />
      <div className={branchesClass}>
        {branches.map((branch) => (
          <BranchNode key={branch.title} branch={branch} />
        ))}
      </div>
    </section>
  );
}

export function VitthalnathCharts() {
  return (
    <div className="mb-8">
      <ChartTree title="मूल" branches={chartOne} />
      <ChartTree title="व्याख्या" branches={chartTwo} />
    </div>
  );
}

