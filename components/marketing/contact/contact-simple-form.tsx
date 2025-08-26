"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/base/form/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Locale } from "@/lib/types";

type Props = {
  locale: Locale;
};

export const ContactSimpleForm = ({ locale }: Props) => {
  const [selectedCountryPhone, setSelectedCountryPhone] = useState("US");
  const isArabic = locale === "ar";
  const dir = isArabic ? ("rtl" as const) : ("ltr" as const);

  return (
    <div dir={dir} className="max-w-xl py-4 md:py-8 bg-transparent">
      <div className="px-4 md:px-8">
        <div className="flex w-full flex-col items-center text-center">
          <h2 className="mt-1 text-xl font-semibold text-primary md:text-3xl">
            {isArabic ? "لنعمل معًا" : "Get in touch"}
          </h2>
          <p className="mt-4 text-tertiary md:mt-4 text-sm md:text-lg text-muted-foreground">
            {isArabic
              ? "يسعدنا سماعك. يرجى ملء هذا النموذج."
              : "We'd love to hear from you. Please fill out this form."}
          </p>
        </div>

        <Form
          dir={dir}
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const data = Object.fromEntries(new FormData(e.currentTarget));
            console.log("Form data:", data);
          }}
          className="mx-auto mt-6 flex flex-col gap-8 md:mt-8 md:max-w-120"
        >
          <div className="flex flex-col gap-6 mb-4">
            <div className="flex flex-col gap-x-8 gap-y-6 md:flex-row">
              <Input
                className="h-12"
                name="firstName"
                placeholder={isArabic ? "الاسم الأول" : "First name"}
              />
              <Input
                className="h-12"
                name="lastName"
                placeholder={isArabic ? "اسم العائلة" : "Last name"}
              />
            </div>

            <Input
              className="h-12"
              name="email"
              placeholder={isArabic ? "you@company.com" : "you@company.com"}
            />

            <Input
              className="h-12"
              name="email"
              placeholder={isArabic ? "you@company.com" : "you@company.com"}
            />

            <Textarea
              //   label={isArabic ? "الرسالة" : "Message"}
              placeholder={
                isArabic ? "اترك لنا رسالة..." : "Leave us a message..."
              }
              rows={5}
            />
          </div>

          <Button type="submit" className="h-12 font-bold">
            {isArabic ? "إرسال الرسالة" : "Send message"}
          </Button>
        </Form>
      </div>
    </div>
  );
};
