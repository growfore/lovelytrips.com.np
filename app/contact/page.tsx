
"use client";

import { RandomHeaderImage } from "@/components/site/random-header-image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Phone, Send, CheckCircle2 } from "lucide-react";
import Link from "next/link";

import { Footer } from "@/components/site/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { siteConfig } from "@/lib/siteConfig";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

const contactRows = [
  { icon: Mail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  ...(siteConfig.phone
    ? [{ icon: Phone, label: "Phone", value: siteConfig.phone, href: `tel:${siteConfig.phone.replace(/[^+\d]/g, "")}` }]
    : []),
] as const;

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", phone: "", subject: "", message: "" },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(data: FormValues) {
    setError("");
    try {
      const text = [
        `── Contact Message ──`,
        `Name:      ${data.name}`,
        `Email:     ${data.email}`,
        `Phone:     ${data.phone || "Not provided"}`,
        `Subject:   ${data.subject || "Not provided"}`,
        ``,
        `Message:`,
        data.message,
      ].join("\n");

      const res = await fetch("/api/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          replyTo: data.email,
          subject: `Contact form message from ${data.name}`,
          text,
        }),
      });
      if (!res.ok) throw new Error(`API returned ${res.status}`);
      setSent(true);
    } catch {
      setError("Something went wrong. Please try again or email us directly.");
    }
  }

  return (
    <div className="min-h-screen bg-paper overflow-x-clip">
      <section className="relative h-[50vh] min-h-[400px] w-full">
        <div className="absolute inset-0 [mask-image:url(/hero-mask-2.webp)] [-webkit-mask-image:url(/hero-mask-2.webp)] [mask-size:100%_100%] [-webkit-mask-size:100%_100%] [mask-repeat:no-repeat] [-webkit-mask-repeat:no-repeat]">
          <RandomHeaderImage />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/25 to-ink/5" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/45 via-ink/10 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-10 pb-10 px-6">
          <div className="max-w-5xl mx-auto">
            <nav className="text-[11px] tracking-[0.2em] uppercase text-white/70 mb-3">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2 text-white/40">/</span>
              <span className="text-white/90">Contact</span>
            </nav>
            <h1 className="font-script text-4xl md:text-6xl leading-tight text-white drop-shadow-lg">
              Contact Us
            </h1>
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-3">
              {sent ? (
                <div className="rounded-xl border border-border bg-card p-8 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h2 className="mt-4 text-xl font-bold text-ink">Message Sent!</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Thanks for reaching out. We&apos;ll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {error && (
                      <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive" role="alert">
                        {error}
                      </div>
                    )}
                    <div className="grid gap-5 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold text-ink">
                              Full Name <span className="text-primary">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Your name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold text-ink">
                              Email <span className="text-primary">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="your@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold text-ink">Phone Number</FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="+977 ..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold text-ink">Subject</FormLabel>
                            <FormControl>
                              <Input placeholder="What is this about?" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-ink">
                            Message <span className="text-primary">*</span>
                          </FormLabel>
                          <FormControl>
                            <Textarea rows={5} placeholder="Tell us about your dream trip..." className="resize-y" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" disabled={isSubmitting} className="rounded-full bg-primary px-8 py-3 font-semibold text-primary-foreground hover:bg-primary/90">
                      <Send className="h-4 w-4" />
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              )}
            </div>

            <div className="lg:col-span-2">
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-lg font-bold text-ink">Company Info</h3>
                <ul className="mt-4 space-y-4">
                  {contactRows.map(({ icon: Icon, label, value, href }) => (
                    <li key={label} className="flex items-start gap-3">
                      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-forest" />
                      <div>
                        <p className="text-sm font-semibold text-ink">{label}</p>
                        <a href={href} className="text-sm text-muted-ink hover:text-ink transition-colors">
                          {value}
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-xl overflow-hidden border border-border shadow-sm">
            <iframe
              src={siteConfig.mapEmbedUrl}
              title="Find us on Google Maps"
              width="100%"
              height="400"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
