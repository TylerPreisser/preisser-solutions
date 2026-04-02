"use client";

import { Section } from "@/components/layout/section";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  // TODO: Form submission handler (Formspree, Cloudflare Workers, etc.)
  return (
    <Section>
      <div className="max-w-2xl mx-auto">
        <h2 className="text-center">Let&apos;s Talk</h2>
        <form className="mt-12 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Name" id="name" name="name" required />
            <Input label="Email" id="email" name="email" type="email" required />
          </div>
          <Input label="Company" id="company" name="company" />
          <div>
            <label htmlFor="message" className="block text-sm font-medium">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              className="mt-1 block w-full rounded-lg border border-border px-4 py-3 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-y"
              required
            />
          </div>
          <Button>Send Message</Button>
        </form>
      </div>
    </Section>
  );
}
