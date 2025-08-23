// lib/data.ts
import type {
  SiteContent,
  Feature,
  PreviousWork,
  Locale,
  SiteSettings,
  Feedback,
  NavLink,
  SocialLinks,
} from "./types";
import { HeartHandshake } from "lucide-react";

const DemoContent: Record<Locale, SiteContent> = {
  en: {
    siteSettings: {
      companyName: "That El-himma",
      logoPath: "/images/path55-9.png",
      brandPrimaryLight: "#15803d",
      brandAccentLight: "#5c4426",
      brandPrimaryDark: "#22c55e",
      brandAccentDark: "#a07b4a",
      heroTitle: "Tech that turns ambition into results.",
      heroSubtitle:
        "wards accelerated business growth through technological development and innovative software solutions,\n we provide an integrated commercial agency that supports your business from idea to execution and opens new opportunities in the market",
      heroCtaLabel: "Start Free",
      heroCtaHref: "#get-started",
      finalCtaTitle: "Ready to streamline your growth?",
      finalCtaSubtitle:
        "Join teams shipping faster with predictable, compounding outcomes.",
      finalCtaLabel: "Get Started",
      finalCtaHref: "#get-started",
      contactTitle: "Contact Us",
      contactSubtitle:
        "We’d love to learn about your goals. Tell us how we can help.",
      feedbackTitle: "Customer Feedback",
      feedbackSubtitle:
        "Unfiltered feedback from users who ship faster with That El-himma.",
    },
    navLinks: [
      { label: "Home", href: "#home", order: 0 },
      { label: "Features", href: "#features", order: 1 },
      { label: "Testimonials", href: "#testimonials", order: 2 },
      { label: "Feedback", href: "#feedback", order: 3 },
      { label: "Contact", href: "#contact", order: 4 },
    ],
    features: [
      {
        id: 1,
        icon: "HeartHandshake",
        title: "Commercial Agency Services",
        description:
          "Expand your business reach with trusted partnerships and market entry support.",
        order: 0,
      },
      {
        id: 2,
        icon: "Code",
        title: "Technology Development",
        description:
          "Custom platforms and applications built to accelerate your digital growth.",
        order: 1,
      },
      {
        id: 3,
        icon: "Layers",
        title: "Software Solutions",
        description:
          "Tailored software that simplifies operations and delivers measurable results.",
        order: 2,
      },
      {
        id: 4,
        icon: "RefreshCw",
        title: "Digital Transformation",
        description:
          "End-to-end strategies that integrate innovation into your core business.",
        order: 3,
      },
      {
        id: 5,
        icon: "Target",
        title: "Consulting & Strategy",
        description:
          "Expert guidance from idea validation to market execution.",
        order: 4,
      },
      {
        id: 6,
        title: "Support & Scalability",
        icon: "TrendingUp",
        description:
          "Ongoing support and scalable solutions to grow with your business needs.",
        order: 5,
      },
    ],
    previousWorks: [
      {
        id: 1,
        name: "Project Alpha",
        description: "Web app for team task management.",
        imageUrl:
          "https://www.meistertask.com/_next/image?url=https%3A%2F%2Fa.storyblok.com%2Ff%2F289344%2F1521x1001%2F61554d4bfc%2Fui-image_project-management.png%3Fv%3D3&w=3840&q=75",
      },
      {
        id: 2,
        name: "Project Beta",
        description: "Integrated e-payment system for small businesses.",
        imageUrl:
          "https://i0.wp.com/blogrevamp.cashfree.com/wp-content/uploads/2021/09/integrated-payment-systems.png?fit=5835%2C3001&ssl=1",
      },
      {
        id: 3,
        name: "Project Gamma",
        description: "Mobile app for real-time data tracking.",
        imageUrl:
          "https://cdn.prod.website-files.com/64bf6aa2443faa46c887a8c0/64dddf954cf92e0dc844b071_time-tracker-app-for-desk-mobile-remote-teams.png",
      },
      {
        id: 4,
        name: "Project Delta",
        description: "Dashboard for analytics and insights.",
        imageUrl:
          "https://www.figma.com/community/resource/667a5295-9efd-41a9-bff3-37cc8dff24c9/thumbnail",
      },
    ],
    footerLinks: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Security", href: "#" },
    ],
    socialLinks: { twitter: "#", linkedin: "#", github: "#" },
  },
  ar: {
    siteSettings: {
      companyName: "ذات الهمة",
      logoPath: "/images/path55-9.png",
      brandPrimaryLight: "#15803d",
      brandAccentLight: "#5c4426",
      brandPrimaryDark: "#22c55e",
      brandAccentDark: "#a07b4a",
      heroTitle: "تقنية تترجم الطموح لنتائج",
      heroSubtitle:
        "نحو نمو تجاري متسارع عبر تطوير تكنولوجي وحلول برمجية مبتكرة، نوفر لك وكالة تجارية متكاملة تدعم أعمالك من الفكرة حتى التنفيذ وتفتح لك آفاقاً جديدة في السوق.",
      heroCtaLabel: "ابدأ مجانًا",
      heroCtaHref: "#get-started",
      finalCtaTitle: "جاهز لتبسيط نموك؟",
      finalCtaSubtitle: "انضم إلى فرقٍ تشحن أسرع بنتائج متوقعة ومتراكمة.",
      finalCtaLabel: "ابدأ الآن",
      finalCtaHref: "#get-started",
      contactTitle: "تواصل معنا",
      contactSubtitle: "يسعدنا التعرف على أهدافك. أخبرنا كيف يمكننا المساعدة.",
      feedbackTitle: "ملاحظات العملاء",
      feedbackSubtitle: "آراء مباشرة من مستخدمين يشحنون أسرع مع ستريم لاين.",
    },
    navLinks: [
      { label: "الرئيسية", href: "#home", order: 0 },
      { label: "الميزات", href: "#features", order: 1 },
      { label: "اعمالنا", href: "#previous-work", order: 2 },
      { label: "الملاحظات", href: "#feedback", order: 3 },
      { label: "تواصل", href: "#contact", order: 4 },
    ],
    features: [
      {
        id: 1,
        icon: "HeartHandshake",
        title: "خدمات الوكالات التجارية",
        description:
          "توسيع نطاق عملك عبر شراكات موثوقة ودعم دخول الأسواق الجديدة.",
        order: 0,
      },
      {
        id: 2,
        icon: "Code",
        title: "التطوير التكنولوجي",
        description: "منصات وتطبيقات مخصّصة تُبنى لتسريع نموك الرقمي.",
        order: 1,
      },
      {
        id: 3,
        icon: "Layers",
        title: "الحلول البرمجية",
        description:
          "برمجيات مُصممة خصيصًا لتبسيط عملياتك وتحقيق نتائج ملموسة.",
        order: 2,
      },
      {
        id: 4,
        icon: "RefreshCw",
        title: "التحول الرقمي",
        description: "استراتيجيات متكاملة تُدخل الابتكار في جوهر عملك.",
        order: 3,
      },
      {
        id: 5,
        icon: "Target",
        title: "الاستشارات والاستراتيجيات",
        description: "إرشاد متخصص من مرحلة الفكرة حتى التنفيذ في السوق.",
        order: 4,
      },
      {
        id: 6,
        icon: "TrendingUp",
        title: "الدعم وقابلية التوسع",
        description: "حلول قابلة للتوسع ودعم مستمر لينمو عملك بثبات.",
        order: 5,
      },
    ],
    previousWorks: [
      {
        id: 1,
        name: "مشروع ألف",
        description: "تطبيق ويب لإدارة المهام للفرق.",
        imageUrl:
          "https://www.meistertask.com/_next/image?url=https%3A%2F%2Fa.storyblok.com%2Ff%2F289344%2F1521x1001%2F61554d4bfc%2Fui-image_project-management.png%3Fv%3D3&w=3840&q=75",
      },
      {
        id: 2,
        name: "مشروع باء",
        description: "نظام دفع إلكتروني متكامل للشركات الصغيرة.",
        imageUrl:
          "https://i0.wp.com/blogrevamp.cashfree.com/wp-content/uploads/2021/09/integrated-payment-systems.png?fit=5835%2C3001&ssl=1",
      },
      {
        id: 3,
        name: "مشروع جيم",
        description: "تطبيق جوال لتتبع البيانات في الوقت الفعلي.",
        imageUrl:
          "https://cdn.prod.website-files.com/64bf6aa2443faa46c887a8c0/64dddf954cf92e0dc844b071_time-tracker-app-for-desk-mobile-remote-teams.png",
      },
      {
        id: 4,
        name: "مشروع دلتا",
        description: "لوحة تحكم للتحليلات والرؤى.",
        imageUrl:
          "https://www.figma.com/community/resource/667a5295-9efd-41a9-bff3-37cc8dff24c9/thumbnail",
      },
    ],
    footerLinks: [
      { label: "الخصوصية", href: "#" },
      { label: "الشروط", href: "#" },
      { label: "الأمان", href: "#" },
    ],
    socialLinks: { twitter: "#", linkedin: "#", github: "#" },
  },
};

export async function getContent(locale: Locale = "en"): Promise<SiteContent> {
  try {
    const demo = DemoContent[locale].siteSettings;

    return {
      siteSettings: demo,
      navLinks: DemoContent[locale].navLinks,
      features: DemoContent[locale].features,
      previousWorks: DemoContent[locale].previousWorks,
      footerLinks: DemoContent[locale].footerLinks,
      socialLinks: DemoContent[locale].socialLinks,
    };
  } catch {
    return DemoContent[locale];
  }
}
