import React from "react";
import { Locale } from "@/lib/types";
import { BoltIcon, ChartPieIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/solid";
import { MessageCircleMore } from "lucide-react";
import Image from "next/image";

type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement> & { title?: string | undefined }>;

type Step = {
  icon: IconComponent;
  title: string;
  description: string;
  points: string[];
  imageLight: string;
  imageDark: string;
};

function UiIcon({ Icon, className, title }: { Icon: IconComponent; className?: string; title?: string }) {
  return <Icon className={className} aria-hidden={title ? "false" : "true"} role="img" title={title} />;
}

export default function HowWeWorkSection({ locale }: { locale: Locale }) {
  const isArabic = locale === "ar";
  const dir = isArabic ? "rtl" : "ltr";
  const alignText = isArabic ? "text-right" : "text-left";

  const steps: Step[] = [
    {
      icon: MessageCircleMore as IconComponent,
      title: isArabic ? "المناقشة والتخطيط" : "Discuss & Plan",
      description: isArabic
        ? "نبدأ بفهم أهدافك وتحدياتك. التواصل الواضح يضمن عدم تفويت أي تفاصيل."
        : "We start by understanding your goals and challenges. Clear communication ensures no detail is missed.",
      points: isArabic
        ? ["الاستشارة الأولية مع فريقك", "تحديد أهداف المشروع ومعايير النجاح", "وضع الجداول الزمنية والتوقعات"]
        : ["Initial consultation with your team", "Define project goals and success metrics", "Set timelines and expectations"],
      imageLight: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0",
      imageDark: "https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0",
    },
    {
      icon: BoltIcon as IconComponent,
      title: isArabic ? "التنفيذ بكفاءة" : "Execute Efficiently",
      description: isArabic
        ? "يعمل فريقنا بسرعة ودقة، مع إبقائك على اطلاع في كل مرحلة لضمان سير العمل بسلاسة."
        : "Our team works rapidly and precisely, keeping you updated at every stage to ensure smooth progress.",
      points: isArabic
        ? ["التطوير المرن والتسليم التدريجي", "التحديثات اليومية وتتبع التقدم", "التكيف السريع مع التغييرات والتعليقات"]
        : ["Agile development and iterative delivery", "Daily updates and progress tracking", "Quick adaptation to changes and feedback"],
      imageLight: "https://images.unsplash.com/photo-1753715613434-9c7cb58876b9?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.1.0",
      imageDark: "https://images.unsplash.com/photo-1753715613434-9c7cb58876b9?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.1.0",
    },
    {
      icon: ChartPieIcon as IconComponent,
      title: isArabic ? "المراجعة والتحسين" : "Review & Optimize",
      description: isArabic
        ? "بعد التسليم، نقوم بمراجعة النتائج وتحليل البيانات واقتراح التحسينات لتعظيم العائد على الاستثمار."
        : "After delivery, we review results, analyze data, and suggest improvements to maximize your ROI.",
      points: isArabic
        ? ["تحليل النتائج والبيانات", "جمع ملاحظات العملاء", "تنفيذ التحسينات للتكرارات المستقبلية"]
        : ["Analyze outcomes and metrics", "Collect client feedback", "Implement improvements for future iterations"],
      imageLight: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0",
      imageDark: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0",
    },
  ];

  return (
    <section dir={dir} className="flex flex-col max-w-6xl mx-auto gap-12 overflow-hidden py-16 sm:gap-16 md:gap-20 lg:gap-24">
      <div className="px-4 md:px-8">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
          <h2 className="my-2 text-primary text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            {isArabic ? "كيف نعمل" : "How We Work"}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-prose mb-4">
            {isArabic
              ? "نتبع طريقة عمل بسيطة وفعالة لضمان نجاح كل مشروع. من التخطيط إلى التنفيذ، فريقنا يحافظ على الشفافية والسرعة والكفاءة."
              : "We follow a simple, efficient workflow to ensure every project succeeds. From planning to execution, our team keeps things transparent, fast, and effective."}
          </p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-container flex flex-col gap-12 px-4 md:px-8 lg:gap-24">
        {steps.map((step, index) => {
          const Icon = step.icon;

          // Decide which element should render first.
          // LTR: even => [text, image], odd => [image, text]
          // RTL: mirror => even => [image, text], odd => [text, image]
          const renderTextFirst = !isArabic ? index % 2 === 0 : index % 2 === 1;

          const TextColumn = (
            <div key="text" className={`max-w-xl flex-1 self-center ${alignText}`}>
              <div className="flex items-center gap-3">
                <UiIcon Icon={Icon} className="h-8 w-8 text-brand transition-transform transform hover:scale-110" title={step.title} />
                <h3 className="my-1 text-primary text-lg sm:text-xl md:text-3xl font-bold tracking-tight">
                  {step.title}
                </h3>
              </div>

              <p className="mt-2 md:mt-4 text-lg text-muted-foreground max-w-prose">
                {step.description}
              </p>

              <ul className={`mt-8 flex flex-col gap-4 pl-2 md:gap-5 md:pl-4 ${isArabic ? "pr-2" : ""}`}>
                {step.points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-brand/10">
                      <CheckIcon className="h-4 w-4 text-brand" />
                    </span>
                    <span className="text-sm md:text-lg text-muted-foreground max-w-prose">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          );

          const ImageColumn = (
            <div key="image" className="relative w-full flex-1 h-64 lg:h-128 rounded-xl overflow-hidden shadow-sm transform transition-transform hover:scale-102">
              {/* dark image */}
              <div className="absolute inset-0 hidden dark:block">
                <Image
                  src={step.imageDark}
                  alt={isArabic ? `${step.title} توضيح` : `${step.title} illustration`}
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL={`${step.imageLight}?q=10&w=50&auto=format&fit=crop`}
                  aria-hidden="true"
                />
              </div>

              {/* light image */}
              <div className="absolute inset-0 block dark:hidden">
                <Image
                  src={step.imageLight}
                  alt={isArabic ? `${step.title} توضيح` : `${step.title} illustration`}
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL={`${step.imageLight}?q=10&w=50&auto=format&fit=crop`}
                  aria-hidden="true"
                />
              </div>
            </div>
          );

          return (
            <div key={step.title} className="grid grid-cols-1 gap-10 md:gap-20 lg:grid-cols-2 lg:gap-24 items-center">
              {renderTextFirst ? (
                <>
                  {TextColumn}
                  {ImageColumn}
                </>
              ) : (
                <>
                  {ImageColumn}
                  {TextColumn}
                </>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
