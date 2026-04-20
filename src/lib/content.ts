export const site = {
  name: "Pushti Sahitya",
  tagline: "A repository of Pushti Bhakti Margiya granthas",
  url: "https://www.pushtisahitya.org",
  email: "admin@pushtisahitya.org",
} as const;

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/blogs", label: "Blogs" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/copyright", label: "Copyright" },
] as const;

export type UpdateItem = {
  title: string;
  description: string;
  links: { label: string; href: string; external?: boolean }[];
};

export const recentUpdates: UpdateItem[] = [
  {
    title: "Historic debate in Pushtimarg",
    description:
      "Charcha Sabha paksh grahan by Goswami Hariraiji — Sevaswarup, Seva pradarshan, Sevaprayojan & Sevasthal in Pushtimarg.",
    links: [{ label: "Watch videos", href: "https://youtu.be/kodnCcLhs6Y", external: true }],
  },
  {
    title: "Public seva not in Pushtimarg",
    description:
      "Secret of Shree Kumbhandasji Vaarta and public haveli seva not prescribed by Sri Vallabhacharya. Talk by Goswami Shree Shyam Manoharji (Kishangarh–Parla).",
    links: [
      {
        label: "Listen (audio)",
        href: "https://www.pushtisahitya.org/audio/VallabhVachanamrut.mp3",
        external: true,
      },
    ],
  },
  {
    title: "Vedant principles — Swaminarayan sampraday",
    description:
      "“Vedant Principles according to Swaminarayan Sampraday and the Process of Development of Bhakti Sadhana.”",
    links: [
      {
        label: "Download PDF",
        href: "https://www.pushtisahitya.org/sanskrit/AnyaVaad/SwaminarayanSampradaySiddhant-AksharPurushottamDwaitNiraasVaad.pdf",
        external: true,
      },
    ],
  },
  {
    title: "Vedic religion — is it pagan?",
    description:
      "Paper by Goswami Shree Shyam Manoharji (Parla): “Vaishnavi Astha” — is Vedic Sanatan Hindu religion polytheistic pagan? Available in Gujarati.",
    links: [
      {
        label: "Part 1 (PDF)",
        href: "https://www.pushtisahitya.org/Gujarati/articles/vaishnavi_astha_1.pdf",
        external: true,
      },
      {
        label: "Part 2 (PDF)",
        href: "https://www.pushtisahitya.org/Gujarati/articles/vaishnavi_astha_2.pdf",
        external: true,
      },
    ],
  },
  {
    title: "Are you a true Pushtimargiya?",
    description: "Articles and Siddhant Sukti for reflection.",
    links: [
      {
        label: "Read article (PDF)",
        href: "https://www.pushtisahitya.org/Gujarati/articles/Tame_pan.pdf",
        external: true,
      },
      {
        label: "Pushti Siddhant Sukti (PDF)",
        href: "https://www.pushtisahitya.org/Gujarati/articles/siddhant_sukti.pdf",
        external: true,
      },
    ],
  },
];
