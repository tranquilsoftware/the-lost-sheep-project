import { Instagram, Youtube, Mail as EmailIcon } from 'lucide-react';
import { menuItems } from '../types/navItems'
import { 
  // BRIEF_DESCRIPTION, 
  // CONTACT_EMAIL, 
  BRAND_NAME,
  // FACEBOOK_LINK, 
  // INSTAGRAM_LINK,
  // YOUTUBE_LINK,
  TRANQUILSOFTWARE_LINK, 
  // HREF_HOME_LINK, 
  LOGO,
  CONTACT_EMAIL,
  INSTAGRAM_LINK,
  YOUTUBE_LINK, 
  // COOL_PITCH,
} from '../globals';
import { Link } from 'react-router-dom';

interface FooterProps {
  className?: string;
}

export const Footer = ({ className = '' }: FooterProps) => {

  return (
    // <footer className="text-content-secondary bg-background border-t border-border">
    <footer id="footer" className={`relative bg-background-dark overflow-hidden ${className}`}>
      {/* Top Section with Logo and Mission */}
      <div className="container mx-auto px-6 py-16">
        {/* Large Centered Logo */}
        <div className="flex flex-col items-center mb-12">
          <Link to="/" className="flex flex-col items-center group">
            <div className="mb-6 transition-transform duration-300 group-hover:scale-105">
              <img 
                src={LOGO} 
                alt={BRAND_NAME}
                className="h-32 w-32 md:h-48 md:w-48 object-contain"
              />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
              {BRAND_NAME}
            </h2>
            {/* <p className="text-lg text-gray-300 text-center max-w-2xl mx-auto">
              {COOL_PITCH}
            </p> */}
          </Link>
        </div>

        {/* Contact and Social Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto mt-16">
          {/* Contact Information */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold text-white mb-6 uppercase tracking-wider">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center justify-center md:justify-start">
                <EmailIcon className="w-5 h-5 text-content-white mr-3 flex-shrink-0" />
                <a 
                  href={`mailto:${CONTACT_EMAIL}`} 
                  className="text-gray-300 hover:text-white transition-colors flex items-center"
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
              {/* <li className="flex items-center justify-center md:justify-start">
                <PhoneIcon className="w-5 h-5 text-content-white mr-3 flex-shrink-0" />
                <a 
                  href={`tel:${CONTACT_PHONE}`} 
                  className="text-gray-300 hover:text-white transition-colors flex items-center"
                >
                  {CONTACT_PHONE}
                </a>
              </li> */}

              {/* <li className="flex items-center justify-center md:justify-start">
                <Facebook className="w-5 h-5 text-content-white mr-3 flex-shrink-0" />
                <a 
                  href={FACEBOOK_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Facebook
                </a>
              </li>
              <li className="flex items-center justify-center md:justify-start">
                <Instagram className="w-5 h-5 text-content-white mr-3 flex-shrink-0" />
                <a 
                  href={INSTAGRAM_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Instagram
                </a>
              </li> */}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h3 className="text-xl font-semibold text-white mb-6 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-3">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <Link 
                    to={item.href} 
                    className="text-gray-300 hover:text-white transition-colors"
                    onClick={() => item.scrollToTop && window.scrollTo(0, 0)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div className="text-center md:text-right">
            <h3 className="text-xl font-semibold text-white mb-6 uppercase tracking-wider">Follow Us</h3>
            <div className="flex justify-center md:justify-end space-x-4">
              <a 
                href={INSTAGRAM_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-background-dark hover:bg-background-light/20 text-white rounded-full p-3 transition-colors duration-300 transform hover:scale-110"
                aria-label="Instagram"
                title="Follow us on Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href={YOUTUBE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-background-dark hover:bg-background-light/20 text-white rounded-full p-3 transition-colors duration-300 transform hover:scale-110"
                aria-label="YouTube"
                title="Subscribe to our YouTube channel"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              {/* <div className="text-center text-gray-400 text-sm">
                {BRAND_NAME}
              </div> */}
              <p className="text-gray-400 text-sm">
                Made by{' '}
                <a 
                  href={TRANQUILSOFTWARE_LINK} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-content-secondary hover:text-white transition-colors font-medium"
                >
                  Tranquil Software
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;