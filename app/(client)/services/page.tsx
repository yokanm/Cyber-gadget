"use client"
import { 
  Truck, 
  Shield, 
  Headphones, 
  RefreshCw, 
  Wrench, 
  Gift,
  CreditCard,
  Clock,
  CheckCircle,
  Star,
  Award,
  Package,
  Zap,
  Users,
  MessageCircle
} from 'lucide-react';

import Link from 'next/link';

export default function ServicesPage() {
  

  const mainServices = [
    {
      icon: Truck,
      title: 'Free Delivery',
      description: 'Free shipping on all orders over $140. Fast and reliable delivery to your doorstep.',
      features: ['Orders over $140', '2-7 business days', 'Track your order', 'Nationwide coverage'],
      color: 'from-blue-500 to-blue-600',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      icon: Shield,
      title: 'Warranty Protection',
      description: 'Comprehensive warranty coverage on all products. We stand behind our quality.',
      features: ['1-2 year warranty', 'Easy claims process', 'Extended protection', 'Accidental damage'],
      color: 'from-green-500 to-green-600',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      icon: Headphones,
      title: '24/7 Customer Support',
      description: 'Round-the-clock support via phone, email, or chat. Our team is always here to help.',
      features: ['Live chat support', 'Email support', 'Phone support', 'Knowledge base'],
      color: 'from-purple-500 to-purple-600',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600'
    },
    {
      icon: RefreshCw,
      title: 'Easy Returns',
      description: '30-day hassle-free returns. Not satisfied? Get your money back with no questions asked.',
      features: ['30-day returns', 'Free return shipping', 'Quick refunds', 'No restocking fee'],
      color: 'from-orange-500 to-orange-600',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600'
    },
    {
      icon: Wrench,
      title: 'Repair Services',
      description: 'Professional repair services for all gadgets. Quick turnaround time guaranteed.',
      features: ['Same-day repairs', 'Genuine parts', 'Expert technicians', '90-day guarantee'],
      color: 'from-red-500 to-red-600',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600'
    },
    {
      icon: Gift,
      title: 'Gift Services',
      description: 'Premium gift wrapping and personalized cards. Make every purchase special.',
      features: ['Gift wrapping', 'Custom messages', 'Gift receipts', 'Scheduled delivery'],
      color: 'from-pink-500 to-pink-600',
      iconBg: 'bg-pink-100',
      iconColor: 'text-pink-600'
    }
  ];

  const additionalServices = [
    {
      icon: CreditCard,
      title: 'Flexible Payment',
      description: 'Multiple payment options including installments and buy now, pay later.',
      badge: 'Popular'
    },
    {
      icon: Clock,
      title: 'Express Checkout',
      description: 'Save your preferences for lightning-fast checkout on future purchases.',
      badge: null
    },
    {
      icon: Package,
      title: 'Product Setup',
      description: 'Free setup assistance for complex devices. We help you get started.',
      badge: 'New'
    },
    {
      icon: Zap,
      title: 'Trade-In Program',
      description: 'Trade in your old devices for instant credit towards new purchases.',
      badge: 'Hot'
    },
    {
      icon: Users,
      title: 'Corporate Solutions',
      description: 'Bulk orders and custom solutions for businesses. Volume discounts available.',
      badge: null
    },
    {
      icon: MessageCircle,
      title: 'Product Consultation',
      description: 'Expert advice to help you choose the perfect product for your needs.',
      badge: null
    }
  ];

  const serviceProcess = [
    {
      step: '01',
      title: 'Choose Your Product',
      description: 'Browse our extensive catalog and select the perfect gadget for you.'
    },
    {
      step: '02',
      title: 'Place Your Order',
      description: 'Secure checkout with multiple payment options and instant confirmation.'
    },
    {
      step: '03',
      title: 'Fast Delivery',
      description: 'Track your order in real-time and receive it at your doorstep quickly.'
    },
    {
      step: '04',
      title: 'Enjoy & Support',
      description: 'Unbox your gadget and enjoy 24/7 support for any questions or issues.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Verified Customer',
      rating: 5,
      comment: 'Amazing customer service! They helped me set up my new phone and answered all my questions. Highly recommended!',
      avatar: 'SJ'
    },
    {
      name: 'Michael Chen',
      role: 'Business Client',
      rating: 5,
      comment: 'The corporate solutions team made bulk ordering so easy. Great prices and excellent support throughout.',
      avatar: 'MC'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Verified Customer',
      rating: 5,
      comment: 'Fast delivery, great warranty, and the return process was super simple. This is now my go-to electronics store!',
      avatar: 'ER'
    }
  ];

  const stats = [
    { icon: CheckCircle, value: '50K+', label: 'Happy Customers' },
    { icon: Star, value: '4.9/5', label: 'Customer Rating' },
    { icon: Award, value: '99%', label: 'Satisfaction Rate' },
    { icon: Truck, value: '24h', label: 'Avg. Delivery Time' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-600 to-black text-white px-4 xl:px-40 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
            ⚡ Premium Services for Premium Products
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            Experience Excellence in Every Service
          </h1>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto">
            From free delivery to 24/7 support, we provide comprehensive services to ensure your complete satisfaction.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/categories"
              className="px-8 py-4 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
            >
              Explore Products
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-all"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 xl:px-40 -mt-16 relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl p-8 lg:p-12 border border-gray-100">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <Icon className="w-10 h-10 mx-auto mb-4 text-gray-900" />
                  <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 text-sm lg:text-base">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="px-4 xl:px-40 py-20 lg:py-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Our Core Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need for a seamless shopping experience
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mainServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-gray-900 transition-all duration-300 hover:shadow-2xl"
              >
                <div className={`w-16 h-16 ${service.iconBg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-8 h-8 ${service.iconColor}`} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* Additional Services */}
      <section className="bg-gray-50 px-4 xl:px-40 py-20 lg:py-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Additional Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            More ways we make your shopping experience exceptional
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {additionalServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 hover:shadow-lg transition-all border border-gray-100 relative overflow-hidden group"
              >
                {service.badge && (
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      service.badge === 'New' ? 'bg-blue-100 text-blue-600' :
                      service.badge === 'Hot' ? 'bg-red-100 text-red-600' :
                      'bg-green-100 text-green-600'
                    }`}>
                      {service.badge}
                    </span>
                  </div>
                )}
                <Icon className="w-10 h-10 text-gray-900 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 xl:px-40 py-20 lg:py-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Simple steps to get your perfect gadget
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {serviceProcess.map((process, index) => (
            <div key={index} className="relative">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-900 to-gray-700 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg">
                  {process.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {process.title}
                </h3>
                <p className="text-gray-600">
                  {process.description}
                </p>
              </div>
              {index < serviceProcess.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-gray-300 to-transparent"></div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 px-4 xl:px-40 py-20 lg:py-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real experiences from real customers
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                &quot;{testimonial.comment}&quot;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-bold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 xl:px-40 py-20">
        <div className="bg-gradient-to-r from-gray-900 to-gray-600  rounded-3xl p-12 lg:p-20 text-center text-white">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Experience Premium Service?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Start shopping with Cyber Gadget today and enjoy all our exclusive services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/categories"
              className="px-10 py-5 bg-white text-gray-900 rounded-lg font-bold hover:bg-gray-100 transition-all text-lg shadow-xl hover:shadow-2xl"
            >
              Shop Now
            </Link>
            <Link
              href="/contact"
              className="px-10 py-5 border-2 border-white text-white rounded-lg font-bold hover:bg-white hover:text-gray-900 transition-all text-lg"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}