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
      { label: "Our Major", href: "#features", order: 1 },
      { label: "Our Process", href: "#howwework", order: 2 },
      { label: "Projects", href: "#previous-work", order: 3 },
      { label: "Contact Us", href: "#contact", order: 4 },
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
        name: "Mudiri",
        description: "Web app for team task management.",
        imageUrl:
          "https://www.meistertask.com/_next/image?url=https%3A%2F%2Fa.storyblok.com%2Ff%2F289344%2F1521x1001%2F61554d4bfc%2Fui-image_project-management.png%3Fv%3D3&w=3840&q=75",
        features: ["Cloud storage", "Secure system", "Simple interface"],
      },
      {
        id: 2,
        name: "Mahfazati",
        description: "Integrated e-payment system for small businesses.",
        imageUrl:
          "https://i0.wp.com/blogrevamp.cashfree.com/wp-content/uploads/2021/09/integrated-payment-systems.png?fit=5835%2C3001&ssl=1",
        features: [
          "Payment gateway integration",
          "Invoice and billing management",
          "Fraud protection",
        ],
      },
      {
        id: 3,
        name: "Rasid",
        description: "Mobile app for real-time data tracking.",
        imageUrl:
          "https://cdn.prod.website-files.com/64bf6aa2443faa46c887a8c0/64dddf954cf92e0dc844b071_time-tracker-app-for-desk-mobile-remote-teams.png",
        features: [
          "Real-time tracking with GPS",
          "Instant alerts and notifications",
          "Offline support with sync later",
        ],
      },
      {
        id: 4,
        name: "Data Center",
        description:
          "Enterprise-grade data center offering high-availability, secure, and scalable infrastructure to host critical applications and services.",
        imageUrl:
          "https://www.ki.si/fileadmin/_processed_/9/9/csm_IMG_5626q_1_88dc232e61.jpg",
        features: [
          "High-availability infrastructure",
          "24/7 monitoring, security, response",
          "Scalable infrastructure",
        ],
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
      { label: "مجالنا", href: "#features", order: 1 },
      { label: "كيف نعمل", href: "#howwework", order: 2 },
      { label: "اعمالنا", href: "#previous-work", order: 3 },
      { label: "اتصل بنا", href: "#contact", order: 4 },
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
        name: "مشروع مديري",
        description: "تطبيق ويب لإدارة المهام للفرق.",
        imageUrl:
          "https://www.meistertask.com/_next/image?url=https%3A%2F%2Fa.storyblok.com%2Ff%2F289344%2F1521x1001%2F61554d4bfc%2Fui-image_project-management.png%3Fv%3D3&w=3840&q=75",
        features: ["تخزين سحابي", "نظام حماية", "واجهة بسيطة"],
      },
      {
        id: 2,
        name: "محفظتي",
        description: "نظام دفع إلكتروني متكامل للشركات الصغيرة.",
        imageUrl:
          "https://i0.wp.com/blogrevamp.cashfree.com/wp-content/uploads/2021/09/integrated-payment-systems.png?fit=5835%2C3001&ssl=1",
        features: [
          "تكامل بوابات الدفع",
          "إدارة الفواتير والمستحقات",
          "حماية ضد الاحتيال",
        ],
      },
      {
        id: 3,
        name: "راصد",
        description: "تطبيق جوال لتتبع البيانات في الوقت الفعلي.",
        imageUrl:
          "https://cdn.prod.website-files.com/64bf6aa2443faa46c887a8c0/64dddf954cf92e0dc844b071_time-tracker-app-for-desk-mobile-remote-teams.png",
        features: [
          "تتبع لحظي ومواقع GPS",
          "إشعارات وتنبيهات فورية",
          "دعم أوفلاين ومزامنة لاحقة",
        ],
      },
      {
        id: 4,
        name: "مركز البيانات",
        description:
          "مركز بيانات بمواصفات مؤسسية يوفر بنية تحتية عالية التوفر، اتصال آمن، وسعة قابلة للتوسع لاستضافة التطبيقات والخدمات الحساسة.",
        imageUrl:
          "https://www.ki.si/fileadmin/_processed_/9/9/csm_IMG_5626q_1_88dc232e61.jpg",
        features: [
          "بنية تحتية عالية التوفر (طاقة وتبريد مكرّر)",
          "سعة قابلة للتوسع للرفوف والتخزين والشبكة",
        ],
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
