import { 
    // HREF_CONTACT,
    HREF_ABOUT,
    HREF_BLOG } from '../globals';

export const menuItems = [
    { name: 'Home',           href: '/',              scrollToTop: true },
    { name: 'About',          href: HREF_ABOUT,        scrollToTop: true },
    { name: 'Blog',           href: HREF_BLOG,   scrollToTop: true },
  
    // { name: 'Contact',        href: HREF_CONTACT,     scrollToTop: true },
  ] as const;
  