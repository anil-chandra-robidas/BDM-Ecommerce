'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  MessageSquare,
  ChevronDown,
  HelpCircle,
  ChevronRight,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Headphones,
  Building,
  ArrowRight,
  Globe,
} from 'lucide-react';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  orderNumber: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: 'General Inquiry',
    orderNumber: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeShowroom, setActiveShowroom] = useState<'ny' | 'london' | 'tokyo'>('ny');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: 'General Inquiry',
        orderNumber: '',
        message: '',
      });
    }, 900);
  };

  const contactCards = [
    {
      icon: MapPin,
      title: 'Our Flagship HQ',
      line1: '540 Madison Ave, Floor 18',
      line2: 'New York, NY 10022, USA',
      action: 'Get Directions',
      href: 'https://maps.google.com/?q=540+Madison+Ave+New+York',
    },
    {
      icon: Phone,
      title: 'Direct Concierge Line',
      line1: '+1 (800) 555-BDM (236)',
      line2: '+1 (555) 123-4567 (International)',
      action: 'Call Now',
      href: 'tel:+18005555893',
    },
    {
      icon: Mail,
      title: 'Email Inquiries',
      line1: 'concierge@bdmecommerce.com',
      line2: 'support@bdmecommerce.com',
      action: 'Send Email',
      href: 'mailto:concierge@bdmecommerce.com',
    },
    {
      icon: Clock,
      title: 'Concierge Desk Hours',
      line1: 'Monday – Friday: 8:00 AM – 9:00 PM EST',
      line2: 'Saturday – Sunday: 9:00 AM – 6:00 PM EST',
      action: '24/7 Priority Support',
      href: '#',
    },
  ];

  const showrooms = {
    ny: {
      city: 'New York',
      address: '540 Madison Ave, New York, NY 10022',
      phone: '+1 (800) 555-5893',
      hours: 'Mon-Sat: 10am - 8pm | Sun: 11am - 6pm',
      services: 'Private Fitting Suites, Bespoke Fragrance Bar, VIP Lounge',
    },
    london: {
      city: 'London',
      address: '28 Bond Street, Mayfair, London W1S 2AA',
      phone: '+44 20 7946 0912',
      hours: 'Mon-Sat: 10am - 7pm | Sun: 12pm - 5pm',
      services: 'Made-to-Measure Tailoring, Fine Jewelry Consultation',
    },
    tokyo: {
      city: 'Tokyo',
      address: '5-7-1 Ginza, Chuo-ku, Tokyo 104-0061',
      phone: '+81 3 5555 0143',
      hours: 'Mon-Sun: 11am - 8pm',
      services: 'Modern Tech Showcase, Japanese Artisan Capsule Drops',
    },
  };

  const faqs = [
    {
      question: 'What are your shipping options and delivery times?',
      answer:
        'We offer Standard Shipping (4-6 business days, free on orders over $50 or $9.99), Express Shipping (2-3 business days, $15.00), and Next-Day Priority Delivery ($29.00). Orders placed before 2:00 PM EST on business days are processed and dispatched on the same day.',
    },
    {
      question: 'What is your return and refund policy?',
      answer:
        'We offer a 30-day hassle-free return window for all unused, unworn items in original packaging with tags attached. Once your returned package arrives at our warehouse, refunds are automatically processed back to your original payment method within 3 to 5 business days.',
    },
    {
      question: 'How do I track my order status?',
      answer:
        'As soon as your package ships, you will receive an email confirmation containing your direct tracking number and estimated carrier delivery date. You can also view live status updates directly within your LUXE account dashboard.',
    },
    {
      question: 'Are all products 100% authentic and covered by warranty?',
      answer:
        'Yes, unconditionally. Every product sold on LUXE is sourced directly from licensed designers and authorized brand partners. All electronics and hardware items include a complimentary 1-year manufacturer warranty.',
    },
    {
      question: 'How can I schedule a personal styling session?',
      answer:
        'You can request a private appointment either in-person at any of our showrooms (New York, London, Tokyo) or virtually via 1-on-1 video call by choosing "Styling Appointment" in our contact form or calling our concierge directly.',
    },
  ];

  return (
    <div className="bg-slate-50/60 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-indigo-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4 h-4 text-slate-400" />
          <span className="font-semibold text-slate-800">Contact Us</span>
        </nav>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-100/70 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Dedicated Concierge Service</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            We&apos;re Here to <span className="text-gradient">Assist You</span>
          </h1>
          <p className="text-slate-600 mt-4 text-base sm:text-lg leading-relaxed">
            Have questions about an order, styling assistance, or bespoke requests? Reach out to our dedicated concierge specialists.
          </p>

          {/* Quick response badge */}
          <div className="mt-4 inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200/80 px-4 py-1.5 rounded-full text-xs font-bold text-emerald-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Average response time: Under 20 minutes
          </div>
        </div>

        {/* Two-Column Section: Form (Left) & Info Cards (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Left: Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-10">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <div className="w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0 shadow-inner">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">Send Direct Message</h2>
                <p className="text-xs text-slate-400 font-medium">Complete the form below and our team will get back to you promptly.</p>
              </div>
            </div>

            {isSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center animate-fade-in my-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-extrabold text-emerald-900 mb-2">
                  Message Sent Successfully!
                </h3>
                <p className="text-emerald-700 text-sm max-w-md mx-auto mb-6 leading-relaxed">
                  Thank you for reaching out. A dedicated concierge specialist has received your request and will contact you via email shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="btn-primary py-2.5 px-6 text-sm"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 text-slate-700">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Your Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Eleanor Vance"
                      className="input-field font-semibold text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="eleanor@example.com"
                      className="input-field font-semibold text-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Inquiry Category
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="input-field font-semibold text-slate-900 cursor-pointer"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Order Status">Order Status & Tracking</option>
                      <option value="Returns & Refunds">Returns & Exchanges</option>
                      <option value="Product Sizing / Fit">Product Sizing & Fit Advice</option>
                      <option value="Styling Appointment">Book Personal Styling Session</option>
                      <option value="Wholesale / Partnerships">Wholesale & Brand Partnerships</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Order Reference (Optional)
                    </label>
                    <input
                      type="text"
                      name="orderNumber"
                      value={formData.orderNumber}
                      onChange={handleChange}
                      placeholder="#LX-89102"
                      className="input-field font-semibold text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Your Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can our concierge assist you today? Please include any relevant questions or item codes..."
                    className="input-field resize-none font-medium text-slate-900"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full py-4 text-sm font-extrabold gap-2 shadow-lg shadow-indigo-600/20"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Dispatching to Concierge...
                    </span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Direct Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right: Contact Information Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {contactCards.map((card, idx) => {
                const Icon = card.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6 shadow-sm hover:border-indigo-200 transition-all group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-slate-50 group-hover:bg-indigo-50 text-slate-600 group-hover:text-indigo-600 flex items-center justify-center flex-shrink-0 transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-extrabold text-slate-900 mb-1">
                          {card.title}
                        </h3>
                        <p className="text-xs text-slate-700 leading-relaxed font-semibold">
                          {card.line1}
                        </p>
                        <p className="text-xs text-slate-500 leading-relaxed font-medium">
                          {card.line2}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Global Showrooms Box */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-lg border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400">
                  <Globe className="w-4 h-4 text-indigo-400" />
                  <span>Global Showrooms</span>
                </div>
                <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full font-bold">
                  Walk-ins Welcome
                </span>
              </div>

              {/* Showroom Tab Buttons */}
              <div className="grid grid-cols-3 gap-1 bg-slate-800/80 p-1 rounded-xl">
                {(['ny', 'london', 'tokyo'] as const).map((key) => (
                  <button
                    key={key}
                    onClick={() => setActiveShowroom(key)}
                    className={`py-1.5 text-xs font-bold rounded-lg capitalize transition-all ${
                      activeShowroom === key
                        ? 'bg-indigo-600 text-white shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {key === 'ny' ? 'New York' : key === 'london' ? 'London' : 'Tokyo'}
                  </button>
                ))}
              </div>

              {/* Showroom Details */}
              <div className="space-y-2 text-xs text-slate-300 pt-1">
                <div className="font-bold text-white text-sm">{showrooms[activeShowroom].city} Flagship</div>
                <div className="text-slate-400 font-medium">{showrooms[activeShowroom].address}</div>
                <div className="text-indigo-300 font-semibold">{showrooms[activeShowroom].phone}</div>
                <div className="text-slate-400 text-xxs">{showrooms[activeShowroom].hours}</div>
                <div className="text-slate-300 text-xxs font-medium bg-slate-800/50 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-indigo-300 font-bold">Highlights:</span> {showrooms[activeShowroom].services}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 pt-16 border-t border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2">
              <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
              <span>Got Questions?</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-500 text-sm mt-2">
              Quick answers to common questions regarding shipping, returns, warranty, and styling.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;

              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-indigo-600 transition-colors"
                  >
                    <span className="text-sm sm:text-base">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-indigo-600' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-sm text-slate-600 leading-relaxed border-t border-slate-50 animate-fade-in">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
