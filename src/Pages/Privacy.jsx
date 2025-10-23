import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const PrivacyPolicy = () => {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (sectionId) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const sections = [
    {
      id: 'information-collection',
      title: 'Information We Collect',
      content: `We collect minimal information necessary for business communications:

• Contact Information: Name, email address, phone number when you contact us via our website forms, email, or WhatsApp
• Business Information: Company details, order requirements, and other information you voluntarily provide when inquiring about our products
• Technical Data: Basic analytics about website usage (if applicable)`
    },
    {
      id: 'how-we-use',
      title: 'How We Use Your Information',
      content: `We use the information we collect solely for:

• Responding to your business inquiries and providing quotations
• Processing and fulfilling wholesale orders
• Business communication regarding our pashmina products
• Improving our services and customer experience`
    },
    {
      id: 'data-sharing',
      title: 'Data Sharing and Disclosure',
      content: `We do not sell, trade, or rent your personal information to third parties. We may share information only when necessary for:

• Shipping and logistics partners to fulfill your orders
• Legal compliance when required by law
• Professional advisors (accountants, lawyers) as needed for business operations`
    },
    {
      id: 'data-retention',
      title: 'Data Retention',
      content: `We retain your information only as long as necessary for:

• Ongoing business relationships and order fulfillment
• Legal and accounting requirements
• Historical reference for repeat customers

You may request deletion of your data at any time by contacting us.`
    },
    {
      id: 'your-rights',
      title: 'Your Rights',
      content: `You have the right to:

• Access the personal information we hold about you
• Correct inaccurate information
• Request deletion of your information
• Object to our use of your information
• Withdraw consent for communications

To exercise these rights, please contact us.`
    },
    {
      id: 'security',
      title: 'Data Security',
      content: `We implement appropriate security measures to protect your information, including:

• Secure communication channels for business discussions
• Limited access to personal information within our organization
• Regular review of our data protection practices`
    },
    {
      id: 'third-party-links',
      title: 'Third-Party Links',
      content: `Our website may contain links to other sites such as social media platforms. We are not responsible for the privacy practices of these external sites.`
    },
    {
      id: 'changes',
      title: 'Changes to This Policy',
      content: `We may update this privacy policy from time to time. We will notify you of any significant changes by posting the new policy on our website with an updated effective date.`
    },
    {
      id: 'contact',
      title: 'Contact Us',
      content: `If you have any questions about this Privacy Policy or our data practices, please contact us:

Email: privacy@pashminacrafts.com
WhatsApp: +1234567890
Business Hours: Sunday - Friday, 9:00 AM - 6:00 PM (Local Time)`
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
            Privacy Policy
          </h1>
          <p className="text-[#5d5d5d] text-lg font-light max-w-2xl mx-auto">
            How we handle and protect your information
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

        {/* Policy Sections */}
        <div className="space-y-4">
          {sections.map((section, index) => (
            <div
              key={section.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full px-6 py-6 text-left flex justify-between items-center hover:bg-[#faf9f7] transition-colors duration-200"
              >
                <span className="text-lg font-medium text-[#2a2a2a] pr-4">
                  {section.title}
                </span>
                <div className="flex-shrink-0">
                  {openSections[section.id] ? (
                    <ChevronUp size={20} className="text-[#5d5d5d]" />
                  ) : (
                    <ChevronDown size={20} className="text-[#5d5d5d]" />
                  )}
                </div>
              </button>
              
              <div
                className={`px-6 transition-all duration-300 ease-in-out ${
                  openSections[section.id] ? 'pb-6 max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                }`}
              >
                <div className="border-t border-[#e8e6e1] pt-4">
                  <p className="text-[#5d5d5d] leading-relaxed whitespace-pre-line">
                    {section.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Simple Version Notice */}
        <div className="mt-12 bg-[#f5f3f0] rounded-lg p-6 border border-[#e8e6e1]">
          <h3 className="text-xl font-medium text-[#2a2a2a] mb-3">Simple Summary</h3>
          <p className="text-[#5d5d5d] leading-relaxed">
            We only collect information you voluntarily provide when contacting us about our pashmina products. 
            We use it solely for business communication and order fulfillment. We don't use cookies, tracking, 
            or sell your data to third parties. Your privacy is important to us.
          </p>
        </div>
      </div>
{/* TODO: Add Footer */}
    </div>
  );
};

export default PrivacyPolicy;