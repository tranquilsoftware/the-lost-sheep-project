import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from "./ui/Button"
import { useLocation, useNavigate } from 'react-router-dom'
import { HREF_HOME_LINK, BRAND_NAME, SMALL_LOGO } from '../globals'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const [isScrollingUp, setIsScrollingUp] = useState(true)
  const [isIOS, setIsIOS] = useState(false)
  
  // Header dimensions and styles based on scroll direction
  const headerHeight = isScrollingUp ? 72 : 56; // Slightly larger initial height for better visibility
  const headerFontSize = isScrollingUp ? '1.5rem' : '1.25rem';
  const logoSize = isScrollingUp ? '2.5rem' : '2rem';
  const paddingY = isScrollingUp ? '1rem' : '0.75rem'; // Adjust padding for the height change

  const menuItems = [
    // { name: 'Gallery', href: '#gallery' }, 
    { name: 'Reserve', href: '#reserve' },
    { name: 'FAQ', href: '#faq' },
    { name: 'About', href: '/about' },
  ]

  const isActive = (href: string) => {
    if (href.startsWith('#')) {
      return location.hash === href
    }
    if (href.startsWith('/')) {
      return location.pathname === href
    }
    return false
  }

  const handleNavigation = (href: string) => {
    if (href.startsWith('http')) {
      // For external URLs, open in a new tab
      window.open(href, '_blank', 'noopener,noreferrer');
    } else if (href.startsWith('#')) {
      // If we're not on the home page and trying to access an anchor
      if (location.pathname !== '/') {
        navigate('/' + href)
      } else {
        document.getElementById(href.substring(1))?.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      // For regular routes (like /team), navigate and scroll to top
      navigate(href)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    // Detect if the device is iOS
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    setIsIOS(/(iPad|iPhone|iPod)/gi.test(userAgent));

    // Function to handle scroll events with throttling
    let lastScrollTop = 0;
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
          
          // Detect scroll direction (with a small threshold to prevent jitter)
          if (Math.abs(currentScroll - lastScrollTop) > 5) {
            setIsScrollingUp(currentScroll < lastScrollTop);
            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial scroll position
    handleScroll();
    
    // Clean up
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
  <header 
    className={`fixed top-0 left-0 right-0 z-50 bg-background-dark/90 backdrop-blur-md ${isIOS ? 'ios-safe-area' : ''}`}
    style={{
      height: `${headerHeight}px`,
      minHeight: '56px',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
    }}
  >
      <div 
        className="container mx-auto px-4 h-full flex items-center"
        style={{
          paddingTop: paddingY,
          paddingBottom: paddingY,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <img 
              src={SMALL_LOGO} 
              alt="Dill Pickle Club Logo"
              className={`transition-transform hover:scale-110`}
              style={{
                width: `${logoSize}rem`,
                height: `${logoSize}rem`,
                transition: 'all 0.3s ease-out'
              }}
            />
            <a 
              href={HREF_HOME_LINK}
              className="flex items-center"
            >
              <span 
                className="text-content-primary font-bold ml-4"
                style={{ 
                  fontFamily: 'Bellefair',
                  fontSize: headerFontSize,
                  lineHeight: '1',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                {BRAND_NAME}
              </span>
            </a>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.href)}
                className={`text-gray-300 hover:text-white transition-colors relative py-2
                  ${isActive(item.href) ? 'text-white' : ''}
                  after:content-[''] after:absolute after:bottom-0 after:left-0 
                  after:w-full after:h-0.5 after:bg-gradient-to-r 
                  after:from-primary after:to-accent
                  after:scale-x-0 after:origin-left after:transition-transform
                  ${isActive(item.href) ? 'after:scale-x-100' : 'hover:after:scale-x-100'}
                `}
              >
                {item.name}
              </button>
            ))}
          </nav>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white"
          >
            {isOpen ? <X /> : <Menu />}
          </Button>
        </div>
        {isOpen && (
          <nav className="md:hidden py-4 space-y-4">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  handleNavigation(item.href)
                  setIsOpen(false)
                }}
                className={`block text-gray-300 hover:text-white transition-colors w-full text-left
                  ${isActive(item.href) ? 'text-white border-l-2 border-primary pl-2' : ''}
                `}
              >
                {item.name}
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}
