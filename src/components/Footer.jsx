import React from 'react'
import { Mail, MessageCircle, Globe, Shield, FileText, HelpCircle } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const links = [
    {
      title: 'Contact',
      items: [
        { label: 'Support', href: 'mailto:help@zoggybet.com', icon: Mail },
        { label: 'Telegram', href: 'https://t.me/zoggycasino', icon: MessageCircle },
        { label: 'Website', href: 'https://zoggybet.com', icon: Globe }
      ]
    },
    {
      title: 'Legal',
      items: [
        { label: 'Terms of Service', href: '#', icon: FileText },
        { label: 'Privacy Policy', href: '#', icon: Shield },
        { label: 'FAQ', href: '#', icon: HelpCircle }
      ]
    }
  ]

  return (
    <footer className="bg-gray-900 text-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="/logo.svg" 
                alt="Zoggy Logo" 
                className="w-12 h-12 filter brightness-0 invert"
              />
              <span className="text-3xl font-bold">Zoggy</span>
            </div>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              The ultimate platform for daily rewards and community-driven gaming. Join thousands of users earning real rewards every day.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://t.me/zoggycasino"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a 
                href="mailto:help@zoggybet.com"
                className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links Sections */}
          {links.map((section, index) => (
            <div key={index}>
              <h3 className="text-xl font-bold mb-6">{section.title}</h3>
              <ul className="space-y-4">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <a 
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors duration-200 group"
                    >
                      <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      <span>{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400">
              © {currentYear} Zoggy. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm">
              Join the waitlist and be among the first to experience daily rewards.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer