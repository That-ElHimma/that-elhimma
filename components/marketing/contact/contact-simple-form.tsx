"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/base/form/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Locale } from "@/lib/types";

type Props = { locale: Locale };

export const ContactSimpleForm = ({ locale }: Props) => {
  const [selectedCountryPhone, setSelectedCountryPhone] = useState("US"); // (kept if you later add a phone intl input)
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

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
          onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const formEl = e.currentTarget;           // <-- capture now
            setStatus("loading");
            setErrorMsg(null);
          
            const fd = new FormData(formEl);
            const payload = Object.fromEntries(fd.entries());
          
            try {
              const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
              });
          
              const data = await res.json();
          
              if (!res.ok || !data.ok) {
                setStatus("error");
                setErrorMsg(
                  data?.error ||
                    (isArabic ? "حدث خطأ أثناء الإرسال. حاول مرة أخرى." : "Something went wrong. Please try again.")
                );
                return;
              }
          
              setStatus("ok");
              formEl.reset();                         // <-- safe now
            } catch (err) {
              setStatus("error");
              setErrorMsg(isArabic ? "تعذر الاتصال بالخادم." : "Could not reach the server.");
            }
          }}
          
          className="mx-auto mt-6 flex flex-col gap-8 md:mt-8 md:max-w-120"
        >
          <div className="flex flex-col gap-6 mb-4">
            <div className="flex flex-col gap-x-8 gap-y-6 md:flex-row">
              <Input
                className="h-12"
                name="firstName"
                required
                placeholder={isArabic ? "الاسم الأول" : "First name"}
              />
              <Input
                className="h-12"
                name="lastName"
                required
                placeholder={isArabic ? "اسم العائلة" : "Last name"}
              />
            </div>

            <Input
              className="h-12"
              type="email"
              name="email"
              required
              placeholder="you@company.com"
            />

            <Input
              className="h-12"
              name="phone"
              placeholder={
                isArabic ? "رقم الهاتف (اختياري)" : "Phone (optional)"
              }
            />

            {/* Honeypot field (hidden from humans) */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />

            <Textarea
              name="message"
              required
              placeholder={
                isArabic ? "اترك لنا رسالة..." : "Leave us a message..."
              }
              rows={5}
            />
          </div>

          <Button
            type="submit"
            className="h-12 font-bold"
            disabled={status === "loading"}
          >
            {status === "loading"
              ? isArabic
                ? "جارٍ الإرسال..."
                : "Sending..."
              : isArabic
              ? "إرسال الرسالة"
              : "Send message"}
          </Button>

          {status === "ok" && (
            <p className="text-green-600 text-sm">
              {isArabic
                ? "تم إرسال رسالتك بنجاح."
                : "Your message has been sent."}
            </p>
          )}
          {status === "error" && (
            <p className="text-red-600 text-sm">{errorMsg}</p>
          )}
        </Form>
      </div>
    </div>
  );
};
