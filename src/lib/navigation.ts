/** Mirrors https://www.pushtisahitya.org/includes/TopMenuList.htm — links open the canonical host. */

export const LEGACY_ORIGIN = "https://www.pushtisahitya.org";

function normalizeLegacyPath(path: string) {
  const cleaned = path.replace(/^(\.\.\/)+/g, "").replace(/^\/+/, "");
  return cleaned;
}

function toLocalLibraryPath(path: string) {
  const normalized = normalizeLegacyPath(path);
  return `/library/${normalized}`;
}

function L(path: string) {
  const normalized = normalizeLegacyPath(path);
  // Keep direct links for file assets; route HTML pages locally.
  if (normalized.toLowerCase().endsWith(".pdf") || normalized.toLowerCase().endsWith(".mp3")) {
    return `${LEGACY_ORIGIN}/${normalized}`;
  }
  return toLocalLibraryPath(normalized);
}

export type NavNode = {
  label: string;
  /** Missing = non-clickable group heading */
  href?: string;
  children?: NavNode[];
};

export const mainNavigation: NavNode[] = [
  { label: "Home", href: "/" },
  {
    label: "Acharyas",
    children: [
      { label: "Shree Vallabhacharyaji", href: L("Shreevallabhacharyaji.shtml") },
      { label: "Shree Gopinathji", href: L("ShreeGopinathji.shtml") },
      { label: "Shree Vitthalnathji", href: L("ShreeVitthalnathji.shtml") },
    ],
  },
  {
    label: "Scriptures",
    children: [
      {
        label: "TatvarthDeep Nibandh",
        children: [
          { label: "Shastrarth Prakaran", href: L("ShastarthPrakaran.shtml") },
          { label: "Sarvanirnaya Prakaran", href: L("SarvanirnayaPrakaran.shtml") },
          { label: "Shree Bhagwatarth Prakaran", href: L("BhagwatarthPrakaran.shtml") },
        ],
      },
      {
        label: "Bhasya Granthas",
        children: [
          { label: "Purva Mimamsa bhasya" },
          { label: "Anubhasya", href: L("Anubhasyam.shtml") },
          { label: "Gayatribhasya", href: L("Gujarati/granthas/bhasya/GayatriBhasyam.pdf") },
          { label: "Prasthaan Ratnaakar", href: L("PrasthaanRatnaakar.shtml") },
        ],
      },
      {
        label: "Shree Bhagwat Commentaries",
        children: [
          { label: "Shuksma Tika" },
          { label: "Shree Subodhini", href: L("ShreeSubodhini.shtml") },
          {
            label: "Shreemad Bhagwatam - Various Commentaries",
            href: L("BhagwatVariousCommentaries.shtml"),
          },
        ],
      },
      {
        label: "Shree Bhagwad Geetopanishad Commentaries",
        href: L("ShreeGitopanishad.shtml"),
      },
      {
        label: "Prakaran Granthas",
        children: [
          {
            label: "Shodash Granthas",
            children: [
              { label: "Shree Yamunashtakam", href: L("Shreeyamunastakam.shtml") },
              { label: "Balbodh", href: L("Balbodh.shtml") },
              { label: "Siddhant Muktavali", href: L("SiddhantMuktavali.shtml") },
              { label: "Pushti Pravaha Maryada Bhed", href: L("PushtiPravahaMaryada.shtml") },
              { label: "Siddhant Rahasyam", href: L("SiddhantRashasya.shtml") },
              { label: "Navratnam", href: L("Navratam.shtml") },
              { label: "Antahkaran Prabodh", href: L("Antahkaranprabodh.shtml") },
              { label: "Vivek Dhairya Ashraya", href: L("VivekDhairyaAshraya.shtml") },
              { label: "Krishnashraya Stotram", href: L("Krishnashraya.shtml") },
              { label: "Chatuhshloki", href: L("Chatuhshloki.shtml") },
              { label: "Bhakti Vadhini", href: L("BhaktiVardhini.shtml") },
              { label: "JalBhed", href: L("Jalbhed.shtml") },
              { label: "PanchPadhyani", href: L("PanchPadhyani.shtml") },
              { label: "Sanyas Nirnaya", href: L("Sanyasnirnaya.shtml") },
              { label: "Nirodh Lakshanam", href: L("Nirodhlakshana.shtml") },
              { label: "Sevafalam", href: L("Sevafal.shtml") },
            ],
          },
          { label: "Shiksha Shloki" },
          { label: "Pancha Shloki" },
        ],
      },
      {
        label: "Vaad Granthas",
        children: [
          { label: "Patravalambana", href: L("Patravalambana.shtml") },
          { label: "Avtarvadavali", href: L("Avtarvadavali.shtml") },
          { label: "Other Vaad Granthas", href: L("Vadavali.shtml") },
        ],
      },
      {
        label: "Prakirna Granthas",
        children: [
          { label: "Naam Patharth", href: L("NaamPatharthGranth.shtml") },
          { label: "Rup Varanarth", href: L("RupChintan.shtml") },
          { label: "Leela Chintanarth", href: L("LeelaChintan.shtml") },
          {
            label: "Tatva Chintanarth",
            href: L("TatvaChintan.shtml"),
            children: [
              { label: "Brahmvaad", href: L("Brahmvaad.shtml") },
              { label: "Krishna-Bhakti", href: L("Bhakti.shtml") },
            ],
          },
          { label: "Vaarta Sahitya", href: L("VaartaSahitya.shtml") },
          { label: "Vachanamruts", href: L("Vachanamruts.shtml") },
          { label: "Jeevan Charitra", href: L("JeevanCharitra.shtml") },
          { label: "Seva Vidhi", href: L("SevaVidhi.shtml") },
          { label: "Kirtan Granthas", href: L("Kirtans.shtml") },
          { label: "Samagri-Paak", href: L("SamagriPaak.shtml") },
          { label: "Shree Vallabhacharyaji Vanshavali", href: L("Vanshavali.shtml") },
          { label: "Sampraday Pradeep", href: L("SampradayPradeep.shtml") },
          { label: "Shree Harirai Vangmuktavali Granthas", href: L("HariraiVangmuktavali.shtml") },
        ],
      },
      { label: "Manuscripts", href: L("Manuscripts.shtml") },
      {
        label: "Pushtimargiya Magazines",
        children: [
          { label: "Magazines Index", href: L("Magazines.shtml") },
          { label: "Pushti Bhakti Sudha Magazine", href: L("PushtiBhaktiSudhaMagazine.shtml") },
          { label: "Shuddh Bhakti Magazine", href: L("ShuddhBhaktiMagazine.shtml") },
        ],
      },
    ],
  },
  {
    label: "Misc. Scriptures",
    children: [
      { label: "Vedic", href: L("Vedic_scriptures.shtml") },
      { label: "Puranic", href: L("Puranic_scriptures.shtml") },
      { label: "Darshanic", href: L("Darshanic_scriptures.shtml") },
      {
        label: "Sanskrit",
        children: [
          { label: "Vyakarana", href: L("Sanskrit_Grammar.shtml") },
          { label: "Koshas", href: L("Sanskrit_Kosha.shtml") },
          { label: "Miscelleneous", href: L("Sanskrit_Misc.shtml") },
        ],
      },
    ],
  },
  {
    label: "Seva Sahitya",
    children: [
      { label: "Vastra Sahitya", href: L("Seva-Sahitya-Vastra-Introduction.shtml") },
      { label: "Shringar Sahitya", href: L("Seva-Sahitya-Shringar-Introduction.shtml") },
      { label: "Anya Sahitya", href: L("Seva-Sahitya-Pichvai.shtml") },
      { label: "Utsav Bhavna", href: L("UtsavBhavna.shtml") },
    ],
  },
  {
    label: "Articles",
    children: [
      { label: "Articles Index", href: L("Misc-Articles.shtml") },
      { label: "Bhakti in Veda (Bhumadhikaran)", href: L("English/Philosophy/Articles/BhaktiInVeda/Bhumadhikaran.htm") },
      { label: "Is God Cruel?", href: L("Gujarati/articles/NirdayBhagavan/IsGodCruel.htm") },
      { label: "Purushottamya Gyanirasan Vaad", href: L("Gujarati/articles/Purushottamyagyanirasanvaad.htm") },
      { label: "Sankhya Yog", href: L("Gujarati/articles/SaankhyaYog/SankyaYog.htm") },
      { label: "Theory of Shankara and Vallabha", href: L("Gujarati/articles/ShankarAndVallabh/TheoryofShankaraandVallabha.htm") },
      {
        label: "Shree Vallabhacharya's Principles",
        href: L("Gujarati/articles/ShreeVallabhacharyasPrinciplesAndOnlinePushtimargiyaTeleconferenceSatsangs/ShreeVallabhacharyasPrinciplesAndOnlinePushti.html"),
      },
      { label: "Nirodh Leela", href: L("NirodhLeela.html") },
    ],
  },
  { label: "Vachanamruts", href: L("Articles.shtml") },
  { label: "Search Granth", href: "/search" },
  { label: "Blogs", href: "/blogs" },
  { label: "Subscribe", href: L("Subscribe.shtml") },
  {
    label: "Contact Us",
    children: [
      { label: "Contact Page", href: "/contact" },
      { label: "Legacy Contact", href: L("contactus.shtml") },
      { label: "Copyright Policy", href: L("copyright.shtml") },
    ],
  },
];

export const scripturesTree =
  mainNavigation.find((n) => n.label === "Scriptures")?.children ?? [];
export const acharyasTree =
  mainNavigation.find((n) => n.label === "Acharyas")?.children ?? [];
export const miscScripturesTree =
  mainNavigation.find((n) => n.label === "Misc. Scriptures")?.children ?? [];
export const sevaTree =
  mainNavigation.find((n) => n.label === "Seva Sahitya")?.children ?? [];
