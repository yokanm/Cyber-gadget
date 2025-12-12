'use client';

import { Package, Users, Award, TrendingUp, ShieldCheck, Zap, Mail, Linkedin, Twitter } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
  const stats = [
    { icon: Users, value: '10.5k', label: 'Happy customers' },
    { icon: Package, value: '33k', label: 'Products sold last year' },
    { icon: Award, value: '45.5k', label: 'Customer reviews' },
    { icon: TrendingUp, value: '25k', label: 'Active monthly users' },
  ];

  const team = [
    {
      name: 'Alex Johnson',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
      social: { linkedin: '#', twitter: '#' }
    },
    {
      name: 'Sarah Mitchell',
      role: 'Chief Operations Officer',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800',
      social: { linkedin: '#', twitter: '#' }
    },
    {
      name: 'Michael Chen',
      role: 'Chief Technology Officer',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800',
      social: { linkedin: '#', twitter: '#' }
    },
    {
      name: 'Emily Rodriguez',
      role: 'Marketing Director',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800',
      social: { linkedin: '#', twitter: '#' }
    },
    {
      name: 'David Park',
      role: 'Lead Product Designer',
      image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=800',
      social: { linkedin: '#', twitter: '#' }
    },
    {
      name: 'Jessica Williams',
      role: 'Customer Success Manager',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800',
      social: { linkedin: '#', twitter: '#' }
    },
  ];

  const values = [
    {
      icon: ShieldCheck,
      title: 'FREE AND FAST DELIVERY',
      description: 'Free delivery for all orders over $140'
    },
    {
      icon: Users,
      title: '24/7 CUSTOMER SERVICE',
      description: 'Friendly 24/7 customer support'
    },
    {
      icon: Zap,
      title: 'MONEY BACK GUARANTEE',
      description: 'We return money within 30 days'
    }
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* ====================== HERO SECTION (Our Story) ====================== */}
      <section className="px-4 xl:px-40 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <div>
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Our Story
            </h1>

            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Launched in 2015, Cyber Gadget is South Asia&apos;s premier online shopping marketplace,
                serving millions of customers across the region with a diverse range of products.
              </p>
              <p>
                With over 300 brands, 10,500 sellers, and more than a million products,
                we are committed to delivering exceptional service, quality products,
                and a seamless shopping experience.
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative h-[400px] lg:h-[500px] rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200"
              alt="Shopping experience"
              fill
              className="object-cover"
            />
          </div>

        </div>
      </section>

      {/* ====================== STATS ====================== */}
      <section className="px-4 xl:px-40 py-16 bg-gray-50">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const isHighlight = index === 1;

            return (
              <div
                key={index}
                className={`text-center p-8 rounded-lg transition-all hover:shadow-lg ${
                  isHighlight ? 'bg-red-500 text-white' : 'bg-white border-2 border-gray-200'
                }`}
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  isHighlight ? 'bg-white/20' : 'bg-gray-900'
                }`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                <div className={`text-3xl font-bold mb-2`}>
                  {stat.value}
                </div>

                <div className={`text-sm ${isHighlight ? 'text-white/90' : 'text-gray-600'}`}>
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ====================== TEAM ====================== */}
      <section className="px-4 xl:px-40 py-16 lg:py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Meet our team
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            A passionate team of creators, innovators, and problem-solvers driving the future of ecommerce.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {team.map((member, index) => (
            <div key={index} className="group text-center">
              
              {/* IMAGE */}
              <div className="relative mb-6 overflow-hidden rounded-xl aspect-square">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* NAME + ROLE */}
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {member.name}
              </h3>
              <p className="text-gray-600 mb-4">{member.role}</p>

              {/* SOCIALS */}
              <div className="flex justify-center gap-3">
                <a className="p-2 hover:bg-gray-100 rounded-full transition">
                  <Twitter className="w-5 h-5 text-gray-600" />
                </a>
                <a className="p-2 hover:bg-gray-100 rounded-full transition">
                  <Linkedin className="w-5 h-5 text-gray-600" />
                </a>
                <a className="p-2 hover:bg-gray-100 rounded-full transition">
                  <Mail className="w-5 h-5 text-gray-600" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-8 text-center max-w-md mx-auto mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Interested in joining our team?
          </h3>
          <button className="mt-4 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition font-medium">
            Apply Now →
          </button>
        </div>
      </section>

      {/* ====================== OUR MISSION ====================== */}
      <section className="px-4 xl:px-40 py-16 lg:py-24 bg-gray-50">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">

          {/* LEFT */}
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              We’re here to help customers succeed.
            </h2>
          </div>

          {/* RIGHT */}
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              We follow industry-leading strategies to ensure customers maximize value with every purchase.
            </p>
            <p>
              Our platform is built with flexibility and usability in mind, so you can navigate, shop, and enjoy seamless convenience.
            </p>
          </div>

        </div>

        {/* IMAGE */}
        <div className="rounded-2xl overflow-hidden mb-20 h-[400px] relative">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200"
            alt="Team collaboration"
            fill
            className="object-cover"
          />
        </div>

        {/* SKILLED EXPERTS */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* GRID IMAGE BLOCK */}
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800"
              alt=""
              width={500}
              height={500}
              className="rounded-lg object-cover h-64"
            />

            <Image
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800"
              alt=""
              width={500}
              height={500}
              className="rounded-lg object-cover h-64 mt-8"
            />

            <Image
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800"
              alt=""
              width={500}
              height={500}
              className="rounded-lg object-cover h-64 -mt-8"
            />

            <Image
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800"
              alt=""
              width={500}
              height={500}
              className="rounded-lg object-cover h-64"
            />
          </div>

          {/* TEXT */}
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              High-skilled experts from around the world
            </h2>

            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Our global team brings together exceptional skills, diverse perspectives, and dedication to quality.
              </p>
              <p>
                We create seamless digital experiences that help customers shop smarter, faster, and better.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ====================== VALUES ====================== */}
      <section className="px-4 xl:px-40 py-16 lg:py-20">
        <div className="grid md:grid-cols-3 gap-12">
          {values.map((value, index) => {
            const Icon = value.icon;

            return (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon className="w-10 h-10 text-white" />
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide">
                  {value.title}
                </h3>

                <p className="text-gray-600 text-sm">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
