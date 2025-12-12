"use client"

import { useToast } from '@/contexts/ToastContext';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const { success, error } = useToast();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    {
      icon: Phone,
      title: 'Call us',
      details: ['+1-940-394-2948', '+1-389-385-3807'],
      color: 'text-white'
    },
    {
      icon: Mail,
      title: 'Email us',
      details: ['support@cybergadget.io', 'contact@cybergadget.io'],
      color: 'text-white'
    },
    {
      icon: MapPin,
      title: 'Visit us',
      details: ['34 Madison Street,', 'NY, USA 10005'],
      color: 'text-white'
    }
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      error('Please fill in all required fields correctly');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      success('Message sent successfully! We will get back to you soon.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      setErrors({});
    } catch  {
      error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="px-4 xl:px-40 py-16 lg:py-24 text-center bg-gradient-to-br from-gray-900 via-gray-200 to-black">
        <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
          Contact us
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
          Have a question or need assistance? We&apos;re here to help! 
          Reach out to us and we&apos;ll get back to you as soon as possible.
        </p>
      </section>

      {/* Contact Info Cards */}
      <section className="px-4 xl:px-40 pb-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-8 text-center hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-black hover:bg-gray-800 rounded-full mb-6 transition-colors">
                  <Icon className={`w-8 h-8 ${info.color}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {info.title}
                </h3>
                <div className="space-y-1">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-600">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Contact Form */}
      <section className="px-4 xl:px-40 pb-20">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 lg:p-12 border border-gray-100">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Send us a message
            </h2>
            <p className="text-gray-600">
              Fill out the form below and we&apos;ll get back to you within 24 hours.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name & Email Row */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                  First & Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="i.e. John Doe"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-colors`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <span>⚠</span> {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="i.e. john@email.com"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-colors`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <span>⚠</span> {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Phone & Subject Row */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="i.e. +1-234-567-7890"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-colors`}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <span>⚠</span> {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-gray-900 mb-2">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="i.e. I need help"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.subject ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-colors`}
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <span>⚠</span> {errors.subject}
                  </p>
                )}
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Type your message here..."
                rows={6}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.message ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-colors resize-none`}
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <span>⚠</span> {errors.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto px-12 py-4 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="px-4 xl:px-40 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 lg:p-12 text-white">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-4">
                  Need immediate assistance?
                </h3>
                <p className="text-gray-300 mb-6">
                  Our customer support team is available 24/7 to help you with any questions or concerns.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="tel:+19403942948"
                    className="px-6 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center"
                  >
                    Call Now
                  </a>
                  <a
                    href="mailto:support@cybergadget.io"
                    className="px-6 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors text-center"
                  >
                    Email Us
                  </a>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Phone Support</h4>
                    <p className="text-gray-300 text-sm">Available Mon-Fri, 9AM-6PM EST</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Email Support</h4>
                    <p className="text-gray-300 text-sm">Response within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Visit Our Store</h4>
                    <p className="text-gray-300 text-sm">Walk-ins welcome, Mon-Sat</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}