import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const TermsAndPolicies = () => {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (sectionId) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const policies = [
    {
      id: 'introduction',
      title: '1. Introduction',
      content: `Welcome to Pashmina Crafts. These Terms and Conditions govern your use of our website and outline the nature of our business operations. By accessing and using this website, you accept and agree to be bound by these Terms and Conditions.`
    },
    {
      id: 'business-nature',
      title: '2. Business Nature',
      content: `Pashmina Crafts operates exclusively as a wholesale manufacturer and exporter of handcrafted pashmina products. We specialize in traditional handwoven pashminas made from premium materials. We do not engage in retail sales to individual consumers. All orders are subject to minimum quantity requirements, which vary by product.`
    },
    {
      id: 'ordering-process',
      title: '3. Ordering Process',
      content: `This website serves as a showcase of our products and manufacturing capabilities. All business transactions are conducted through direct communication. We do not process online payments. To place an order, please contact us via email, WhatsApp, or our social media channels to discuss your requirements, pricing, and delivery terms.`
    },
    {
      id: 'pricing-payment',
      title: '4. Pricing and Payment',
      content: `All prices shown are in US Dollars (USD) and are for reference only. Final pricing for bulk orders will be provided in formal quotations. We accept bank transfers and Letters of Credit (LC). Prices are exclusive of shipping costs, customs duties, and taxes, which are the responsibility of the buyer.`
    },
    {
      id: 'shipping-delivery',
      title: '5. Shipping and Delivery',
      content: `We export worldwide with reliable shipping partners. Delivery times vary based on order quantity, destination, and customization requirements. Lead times typically range from 4-8 weeks for bulk orders. Shipping costs and delivery timelines will be specified in your quotation.`
    },
    {
      id: 'quality-standards',
      title: '6. Quality Standards',
      content: `We maintain the highest quality standards in our handcrafted pashminas. Each piece is carefully inspected before shipment. Due to the handmade nature of our products, minor variations in texture and appearance may occur, which we consider part of the product's unique character.`
    },
    {
      id: 'intellectual-property',
      title: '7. Intellectual Property',
      content: `All content on this website, including product designs, photographs, text, and website layout, is the intellectual property of Pashmina Crafts. Unauthorized use, reproduction, or distribution of any content is strictly prohibited. Our traditional designs and manufacturing techniques are protected trade secrets.`
    },
    {
      id: 'privacy',
      title: '8. Privacy',
      content: `We collect only necessary business information required for processing inquiries and providing quotations. We implement reasonable security measures to protect your information but cannot guarantee absolute security in electronic communications. We do not share your information with third parties without your consent.`
    },
    {
      id: 'limitations-liability',
      title: '9. Limitations of Liability',
      content: `While we strive for accuracy, we do not guarantee that all product information is completely error-free. We are not liable for website temporary unavailability, technical glitches, or delays in communication due to technical issues. We reserve the right to correct any errors or omissions.`
    },
    {
      id: 'contact-information',
      title: '10. Contact Information',
      content: `For business inquiries, quotations, or questions regarding these Terms and Policies, please contact us:

Email: dimmibhattarai@gmail.com
WhatsApp: +977 9851096721
Business Hours: Sunday - Friday, 9:00 AM - 6:00 PM (Nepal Time)`
    }
  ];

  return (
    <div className="min-h-screen bg-[#faf9f7] py-8">

      <Navbar />

      <div className="h-[64px]"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-light text-[#2a2a2a] mb-4 tracking-wide">
            Terms and Policies
          </h1>
          <p className="text-[#5d5d5d] text-lg font-light max-w-2xl mx-auto">
            Understanding our business practices and policies for wholesale pashmina exports
          </p>
          <div className="w-24 h-0.5 bg-[#2a2a2a] mx-auto mt-6"></div>
        </div>

        {/* Last Updated */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8 text-center">
          <p className="text-[#5d5d5d] text-sm font-medium">
            Last updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        {/* Policies Accordion */}
        <div className="space-y-4">
          {policies.map((policy, index) => (
            <div
              key={policy.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              <button
                onClick={() => toggleSection(policy.id)}
                className="w-full px-6 py-6 text-left flex justify-between items-center hover:bg-[#faf9f7] transition-colors duration-200"
              >
                <span className="text-lg font-medium text-[#2a2a2a] pr-4">
                  {policy.title}
                </span>
                <div className="flex-shrink-0">
                  {openSections[policy.id] ? (
                    <ChevronUp size={20} className="text-[#5d5d5d]" />
                  ) : (
                    <ChevronDown size={20} className="text-[#5d5d5d]" />
                  )}
                </div>
              </button>
              
              <div
                className={`px-6 transition-all duration-300 ease-in-out ${
                  openSections[policy.id] ? 'pb-6 max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                }`}
              >
                <div className="border-t border-[#e8e6e1] pt-4">
                  <p className="text-[#5d5d5d] leading-relaxed whitespace-pre-line">
                    {policy.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Important Notice */}
        <div className="mt-12 bg-[#f5f3f0] rounded-lg p-6 border border-[#e8e6e1]">
          <h3 className="text-xl font-medium text-[#2a2a2a] mb-3">Important Notice</h3>
          <p className="text-[#5d5d5d] leading-relaxed">
            These terms are subject to change without prior notice. For the most current information 
            or to discuss specific business requirements, please contact us directly. By proceeding 
            with business communications, you acknowledge and accept these terms.
          </p>
        </div>

        {/* Quick Contact */}
        <div className="mt-8 text-center">
          <p className="text-[#5d5d5d] text-sm mb-4">
            Need clarification or ready to discuss your bulk order?
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="dimmibhattarai@gmail.com"
              className="inline-flex items-center px-6 py-3 bg-[#2a2a2a] text-white rounded-md hover:bg-[#1a1a1a] transition-colors duration-200 text-sm font-medium"
            >
              Email Us
            </a>
            <a
              href="https://wa.me/9779851096721"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 text-sm font-medium"
            >
              WhatsApp
            </a>
          </div>
          
        </div>
      </div>

{/* TODO: Add Footer */}
    </div>
  );
};

export default TermsAndPolicies;