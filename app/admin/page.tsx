'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  Settings,
  DollarSign,
  TrendingUp,
  Plus,
  Edit2,
  Trash2,
  Search,
  Filter,
  ArrowUpRight,
  Check,
  X,
  Clock,
  Truck,
  AlertCircle,
  Eye,
  RefreshCw,
  ChevronDown,
  User,
  Mail,
  PlusCircle,
  ArrowLeft,
  ExternalLink,
  ShieldAlert,
  Sliders,
  CheckCircle2,
  PanelTop,
  PanelBottom,
  Sparkles,
  ShieldCheck,
  RotateCcw,
  Headphones,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  Github,
  Globe,
  Heart,
  CreditCard,
  Lock,
  Phone,
  MapPin,
  Tag,
  Menu,
  Building2,
  FileText,
  HelpCircle,
  MessageSquare,
  Award,
  Leaf,
  Layers,
  Zap,
  Target,
  Quote,
  Briefcase,
  Calendar,
  Home,
  Star,
} from 'lucide-react';
import { products as initialProducts, categories } from '@/data/products';
import { Product } from '@/types';

// Initial Mock Orders
interface Order {
  id: string;
  customerName: string;
  email: string;
  itemsCount: number;
  itemsSummary: string;
  total: number;
  date: string;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  address: string;
}

const initialOrders: Order[] = [
  {
    id: 'LX-89102',
    customerName: 'Sarah Jenkins',
    email: 'sarah.j@example.com',
    itemsCount: 2,
    itemsSummary: 'Classic Leather Jacket (Size M), Slim Fit Denim Jeans (Size 32)',
    total: 279.98,
    date: '2026-08-18',
    status: 'Processing',
    address: '128 Willow Ave, San Francisco, CA 94102',
  },
  {
    id: 'LX-89101',
    customerName: 'Marcus Chen',
    email: 'm.chen@example.com',
    itemsCount: 1,
    itemsSummary: 'Wireless Noise Cancelling Headphones',
    total: 299.99,
    date: '2026-08-18',
    status: 'Delivered',
    address: '452 Pine St, Apt 4B, Seattle, WA 98101',
  },
  {
    id: 'LX-89100',
    customerName: 'Elena Rostova',
    email: 'elena.rostova@example.com',
    itemsCount: 3,
    itemsSummary: 'Silk Slip Dress (Size S), Leather Crossbody Bag, Premium Wool Trench Coat (Size S)',
    total: 629.97,
    date: '2026-08-17',
    status: 'Shipped',
    address: '89 Broadway, Floor 12, New York, NY 10006',
  },
  {
    id: 'LX-89099',
    customerName: 'David Miller',
    email: 'd.miller@example.com',
    itemsCount: 1,
    itemsSummary: 'Minimalist Leather Watch',
    total: 149.99,
    date: '2026-08-16',
    status: 'Pending',
    address: '742 Evergreen Terrace, Springfield, OR 97477',
  },
  {
    id: 'LX-89098',
    customerName: 'Aisha Rahman',
    email: 'aisha.r@example.com',
    itemsCount: 2,
    itemsSummary: 'Ergonomic Office Chair, Ceramic Vase Set',
    total: 309.98,
    date: '2026-08-15',
    status: 'Delivered',
    address: '1024 Crescent Blvd, Chicago, IL 60611',
  },
  {
    id: 'LX-89097',
    customerName: 'Tom Higgins',
    email: 'tom.h@example.com',
    itemsCount: 1,
    itemsSummary: 'Cotton Crew Neck T-Shirt (Size L)',
    total: 29.99,
    date: '2026-08-15',
    status: 'Cancelled',
    address: '15 Maple Rd, Boston, MA 02108',
  },
];

// Initial Mock Customers
interface Customer {
  id: number;
  name: string;
  email: string;
  ordersCount: number;
  totalSpent: number;
  joinedDate: string;
  status: 'Active' | 'Inactive';
}

const initialCustomers: Customer[] = [
  { id: 1, name: 'Sarah Jenkins', email: 'sarah.j@example.com', ordersCount: 8, totalSpent: 1245.50, joinedDate: '2025-04-12', status: 'Active' },
  { id: 2, name: 'Marcus Chen', email: 'm.chen@example.com', ordersCount: 4, totalSpent: 890.30, joinedDate: '2025-08-20', status: 'Active' },
  { id: 3, name: 'Elena Rostova', email: 'elena.rostova@example.com', ordersCount: 12, totalSpent: 2840.15, joinedDate: '2024-11-03', status: 'Active' },
  { id: 4, name: 'David Miller', email: 'd.miller@example.com', ordersCount: 1, totalSpent: 149.99, joinedDate: '2026-08-10', status: 'Active' },
  { id: 5, name: 'Aisha Rahman', email: 'aisha.r@example.com', ordersCount: 6, totalSpent: 1105.00, joinedDate: '2025-01-15', status: 'Active' },
  { id: 6, name: 'Tom Higgins', email: 'tom.h@example.com', ordersCount: 3, totalSpent: 154.50, joinedDate: '2025-10-30', status: 'Inactive' },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'products' | 'orders' | 'customers' | 'header-footer' | 'pages-builder' | 'settings'
  >('overview');

  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);

  // Filter & Search states
  const [productSearch, setProductSearch] = useState('');
  const [productCategory, setProductCategory] = useState('all');
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatus, setOrderStatus] = useState('all');
  const [customerSearch, setCustomerSearch] = useState('');

  // Modals state
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [selectedOrderDetail, setSelectedOrderDetail] = useState<Order | null>(null);

  // Product Form state
  const [formName, setFormName] = useState('');
  const [formPrice, setFormPrice] = useState('');
  const [formOriginalPrice, setFormOriginalPrice] = useState('');
  const [formCategory, setFormCategory] = useState(categories[0]?.name || "Men's Fashion");
  const [formSubcategory, setFormSubcategory] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formImage, setFormImage] = useState('');
  const [formBadge, setFormBadge] = useState('');
  const [formInStock, setFormInStock] = useState(true);
  const [formColors, setFormColors] = useState('');
  const [formSizes, setFormSizes] = useState('');
  const [formTags, setFormTags] = useState('');

  // General Settings state
  const [storeName, setStoreName] = useState('BDM-Ecommerce');
  const [storeCurrency, setStoreCurrency] = useState('USD ($)');
  const [freeShippingThreshold, setFreeShippingThreshold] = useState('50');
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  // ==================== HEADER & FOOTER CUSTOMIZER STATE ====================
  const [headerFooterSubTab, setHeaderFooterSubTab] = useState<'header' | 'footer'>('header');
  const [isHeaderFooterDropdownOpen, setIsHeaderFooterDropdownOpen] = useState(true);
  const [savedNotification, setSavedNotification] = useState(false);

  // Header State
  const [headerAnnouncementEnabled, setHeaderAnnouncementEnabled] = useState(true);
  const [headerAnnouncementText, setHeaderAnnouncementText] = useState(
    'Free shipping on orders over $50 | Use code BDM20 for 20% off'
  );
  const [headerAnnouncementCode, setHeaderAnnouncementCode] = useState('BDM20');
  const [headerBrandText, setHeaderBrandText] = useState('BDM');
  const [headerTaglineBadge, setHeaderTaglineBadge] = useState('Ecommerce');
  const [showSearchIcon, setShowSearchIcon] = useState(true);
  const [showWishlistIcon, setShowWishlistIcon] = useState(true);
  const [showAccountIcon, setShowAccountIcon] = useState(true);
  const [showCartIcon, setShowCartIcon] = useState(true);

  // Navigation Links Editor
  const [navItems, setNavItems] = useState([
    { id: 1, name: 'Home', href: '/', enabled: true },
    { id: 2, name: 'Products (MegaMenu)', href: '#', enabled: true },
    { id: 3, name: 'Shop', href: '/shop', enabled: true },
    { id: 4, name: 'About', href: '/about', enabled: true },
    { id: 5, name: 'Contact', href: '/contact', enabled: true },
  ]);

  // MegaMenu Promo Banner
  const [megaMenuHeadline, setMegaMenuHeadline] = useState('Seasonal Clearance');
  const [megaMenuSubtext, setMegaMenuSubtext] = useState(
    'Save up to 40% on curated luxury essentials. Limited time only.'
  );
  const [megaMenuCoupon, setMegaMenuCoupon] = useState('BDM20');

  // Footer State
  const [footerAboutText, setFooterAboutText] = useState(
    'Your premier destination for luxury fashion, modern electronics, and refined home essentials. Designed for those who value elegance, craftsmanship, and innovation.'
  );
  const [footerAddress, setFooterAddress] = useState('540 Madison Ave, New York, NY 10022');
  const [footerPhone, setFooterPhone] = useState('+1 (800) 555-BDM (236)');
  const [footerEmail, setFooterEmail] = useState('support@bdmecommerce.com');

  // Value Guarantees
  const [valueProps, setValueProps] = useState([
    { id: 1, title: 'Free Worldwide Shipping', desc: 'On all orders over $50 with live tracking' },
    { id: 2, title: '30-Day Free Returns', desc: 'Hassle-free refunds and easy exchanges' },
    { id: 3, title: '100% Secure Checkout', desc: '256-bit SSL encrypted transactions' },
    { id: 4, title: '24/7 Dedicated Support', desc: 'Always here to assist with any questions' },
  ]);

  // Quick Links Column
  const [quickLinks, setQuickLinks] = useState([
    { id: 1, name: 'Home', href: '/' },
    { id: 2, name: 'Shop All', href: '/shop' },
    { id: 3, name: 'Featured Products', href: '/shop?badge=Best+Seller' },
    { id: 4, name: 'New Arrivals', href: '/shop?badge=New' },
    { id: 5, name: 'About Us', href: '/about' },
    { id: 6, name: 'Contact Us', href: '/contact' },
    { id: 7, name: 'Admin Dashboard', href: '/admin' },
  ]);

  // Customer Service Links Column
  const [customerServiceLinks, setCustomerServiceLinks] = useState([
    { id: 1, name: 'Frequently Asked Questions', href: '/contact' },
    { id: 2, name: 'Shipping & Delivery', href: '/contact' },
    { id: 3, name: 'Returns & Exchanges', href: '/contact' },
    { id: 4, name: 'Size & Fit Guide', href: '/shop' },
    { id: 5, name: 'Track Your Order', href: '/account' },
    { id: 6, name: 'Privacy Policy', href: '/about' },
    { id: 7, name: 'Terms of Service', href: '/about' },
  ]);

  // Social Links
  const [socials, setSocials] = useState({
    instagram: { enabled: true, url: 'https://instagram.com' },
    twitter: { enabled: true, url: 'https://twitter.com' },
    facebook: { enabled: true, url: 'https://facebook.com' },
    youtube: { enabled: true, url: 'https://youtube.com' },
    github: { enabled: true, url: 'https://github.com' },
  });

  // Newsletter & Legal
  const [newsletterHeadline, setNewsletterHeadline] = useState('Join the Inner Circle');
  const [newsletterPromo, setNewsletterPromo] = useState(
    'Subscribe to get 15% off your first order, private sale invitations, and curated lifestyle drops.'
  );
  const [footerCopyright, setFooterCopyright] = useState('© 2026 BDM-Ecommerce, Inc. All rights reserved.');

  // Payment Badges
  const [payments, setPayments] = useState({
    visa: true,
    mastercard: true,
    amex: true,
    paypal: true,
    applePay: true,
    googlePay: true,
  });

  // ==================== PAGES BUILDER (HOME, ABOUT & CONTACT) STATE ====================
  const [pageBuilderSubTab, setPageBuilderSubTab] = useState<'home' | 'about' | 'contact'>('home');
  const [isPagesDropdownOpen, setIsPagesDropdownOpen] = useState(true);

  // 1. Home Page State
  const [homeHeroBadge, setHomeHeroBadge] = useState('✨ Spring / Summer 2026 Collection');
  const [homeHeroTitle, setHomeHeroTitle] = useState('Elegance Redefined for Modern Living');
  const [homeHeroSubtitle, setHomeHeroSubtitle] = useState(
    'Discover thoughtfully curated luxury apparel, intelligent electronics, and timeless home essentials crafted for the discerning individual.'
  );
  const [homeHeroPrimaryCta, setHomeHeroPrimaryCta] = useState('Explore Catalogue');
  const [homeHeroSecondaryCta, setHomeHeroSecondaryCta] = useState('Seasonal Lookbook');
  const [homeHeroImage, setHomeHeroImage] = useState(
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&h=800&fit=crop&auto=format'
  );

  // Home Promo Section
  const [homePromoHeadline, setHomePromoHeadline] = useState('Exclusive Atelier Member Access');
  const [homePromoSubtext, setHomePromoSubtext] = useState(
    'Unlock private seasonal curation and complimentary priority shipping worldwide.'
  );
  const [homePromoCode, setHomePromoCode] = useState('BDM35');
  const [homePromoDiscount, setHomePromoDiscount] = useState('35% OFF');

  // Home Testimonials
  const [homeTestimonials, setHomeTestimonials] = useState([
    {
      id: 1,
      name: 'Victoria Stirling',
      role: 'Fashion Editor, Milan',
      quote: 'BDM-Ecommerce delivers an unmatched standard of refined elegance and seamless concierge service.',
      rating: 5,
    },
    {
      id: 2,
      name: 'Jonathan Vance',
      role: 'Architect, New York',
      quote: 'The craftsmanship of the minimalist leather accessories is phenomenal. Uncompromising quality.',
      rating: 5,
    },
    {
      id: 3,
      name: 'Kenji Takahashi',
      role: 'Creative Director, Tokyo',
      quote: 'Every piece feels purposeful, timeless, and ethically made. Fast worldwide priority delivery.',
      rating: 5,
    },
  ]);

  // 2. About Page State
  const [aboutHeroTitle, setAboutHeroTitle] = useState('Redefining Modern Luxury Through Our Story');
  const [aboutHeroSubtitle, setAboutHeroSubtitle] = useState(
    'Founded on the belief that premium aesthetics and accessible elegance should go hand in hand. We bring you thoughtfully curated fashion, electronics, and home essentials.'
  );
  const [aboutHeroTagline, setAboutHeroTagline] = useState('Elevating Daily Living');
  const [aboutMissionHeading, setAboutMissionHeading] = useState(
    'Empowering your signature lifestyle with intentional design.'
  );
  const [aboutMissionBody1, setAboutMissionBody1] = useState(
    'At BDM-Ecommerce, we believe that true elegance lies in simplicity, endurance, and ethical creation. Born in 2021, BDM-Ecommerce set out to bridge the gap between unattainable haute couture and fast disposable commodities.'
  );

  // About Values State
  const [aboutValues, setAboutValues] = useState([
    {
      id: 1,
      title: 'Uncompromising Quality',
      desc: 'Every material, stitch, and finish is rigorously tested. We collaborate exclusively with master artisans.',
    },
    {
      id: 2,
      title: 'Mindful Sustainability',
      desc: 'We believe luxury should never cost the earth. 80%+ of our packaging is biodegradable.',
    },
    {
      id: 3,
      title: 'Global Community',
      desc: 'We design for modern tastemakers across the globe with bespoke seasonal releases.',
    },
  ]);

  // About Team Members State
  const [aboutTeam, setAboutTeam] = useState([
    {
      id: 1,
      name: 'Sarah Jenkins',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&auto=format',
      bio: 'Former luxury brand director with 15+ years revolutionizing modern digital retail.',
    },
    {
      id: 2,
      name: 'Marcus Chen',
      role: 'Head of Design',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&auto=format',
      bio: 'Award-winning designer obsessed with minimalism and ergonomic grace.',
    },
    {
      id: 3,
      name: 'Elena Rostova',
      role: 'VP of Merchandising',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&auto=format',
      bio: 'Curator of global high-fashion collections with an eye for timeless modern aesthetic.',
    },
  ]);

  // About Milestones State
  const [aboutMilestones, setAboutMilestones] = useState([
    { id: 1, year: '2021', title: 'The Inception', desc: 'Founded in New York with a mission to make luxury craftsmanship ethical.' },
    { id: 2, year: '2023', title: 'Global Flagships', desc: 'Expanded physical showrooms to London and Tokyo.' },
    { id: 3, year: '2026', title: 'Digital Atelier', desc: 'Launched cutting-edge digital styling and instant personalized shopping.' },
  ]);

  // 3. Contact Page State
  const [contactHeroTitle, setContactHeroTitle] = useState("We're Here to Assist You");
  const [contactHeroSubtitle, setContactHeroSubtitle] = useState(
    'Have questions about an order, styling assistance, or bespoke requests? Reach out to our dedicated concierge specialists.'
  );
  const [contactSlaBadge, setContactSlaBadge] = useState('Average response time: Under 20 minutes');

  // Contact Showrooms State
  const [contactShowrooms, setContactShowrooms] = useState([
    {
      id: 1,
      city: 'New York',
      address: '540 Madison Ave, New York, NY 10022',
      phone: '+1 (800) 555-5893',
      hours: 'Mon-Sat: 10am - 8pm | Sun: 11am - 6pm',
      services: 'Private Fitting Suites, Bespoke Fragrance Bar, VIP Lounge',
    },
    {
      id: 2,
      city: 'London',
      address: '28 Bond Street, Mayfair, London W1S 2AA',
      phone: '+44 20 7946 0912',
      hours: 'Mon-Sat: 10am - 7pm | Sun: 12pm - 5pm',
      services: 'Made-to-Measure Tailoring, Fine Jewelry Consultation',
    },
    {
      id: 3,
      city: 'Tokyo',
      address: '5-7-1 Ginza, Chuo-ku, Tokyo 104-0061',
      phone: '+81 3 5555 0143',
      hours: 'Mon-Sun: 11am - 8pm',
      services: 'Modern Tech Showcase, Japanese Artisan Capsule Drops',
    },
  ]);

  // Contact FAQs State
  const [contactFaqs, setContactFaqs] = useState([
    {
      id: 1,
      question: 'What are your shipping options and delivery times?',
      answer:
        'We offer Standard Shipping (4-6 business days, free on orders over $50 or $9.99), Express Shipping (2-3 business days, $15.00), and Next-Day Priority Delivery ($29.00).',
    },
    {
      id: 2,
      question: 'What is your return and refund policy?',
      answer:
        'We offer a 30-day hassle-free return window for all unused, unworn items in original packaging with tags attached.',
    },
    {
      id: 3,
      question: 'Are all products 100% authentic and covered by warranty?',
      answer:
        'Yes, unconditionally. Every product sold on LUXE is sourced directly from licensed designers and authorized brand partners.',
    },
  ]);

  // Modals for creating new elements
  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);
  const [newTestimonialName, setNewTestimonialName] = useState('');
  const [newTestimonialRole, setNewTestimonialRole] = useState('');
  const [newTestimonialQuote, setNewTestimonialQuote] = useState('');
  const [newTestimonialRating, setNewTestimonialRating] = useState('5');

  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamRole, setNewTeamRole] = useState('');
  const [newTeamImage, setNewTeamImage] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&auto=format');
  const [newTeamBio, setNewTeamBio] = useState('');

  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);
  const [newFaqQuestion, setNewFaqQuestion] = useState('');
  const [newFaqAnswer, setNewFaqAnswer] = useState('');

  const [isValueModalOpen, setIsValueModalOpen] = useState(false);
  const [newValueTitle, setNewValueTitle] = useState('');
  const [newValueDesc, setNewValueDesc] = useState('');

  const [isMilestoneModalOpen, setIsMilestoneModalOpen] = useState(false);
  const [newMilestoneYear, setNewMilestoneYear] = useState('');
  const [newMilestoneTitle, setNewMilestoneTitle] = useState('');
  const [newMilestoneDesc, setNewMilestoneDesc] = useState('');

  const [isShowroomModalOpen, setIsShowroomModalOpen] = useState(false);
  const [newShowroomCity, setNewShowroomCity] = useState('');
  const [newShowroomAddress, setNewShowroomAddress] = useState('');
  const [newShowroomPhone, setNewShowroomPhone] = useState('');
  const [newShowroomHours, setNewShowroomHours] = useState('');
  const [newShowroomServices, setNewShowroomServices] = useState('');

  // Modals for Header & Footer
  const [isNavModalOpen, setIsNavModalOpen] = useState(false);
  const [newNavName, setNewNavName] = useState('');
  const [newNavHref, setNewNavHref] = useState('');

  const [isQuickLinkModalOpen, setIsQuickLinkModalOpen] = useState(false);
  const [newQuickLinkName, setNewQuickLinkName] = useState('');
  const [newQuickLinkHref, setNewQuickLinkHref] = useState('');

  const [isServiceLinkModalOpen, setIsServiceLinkModalOpen] = useState(false);
  const [newServiceLinkName, setNewServiceLinkName] = useState('');
  const [newServiceLinkHref, setNewServiceLinkHref] = useState('');

  const [isGuaranteeModalOpen, setIsGuaranteeModalOpen] = useState(false);
  const [newGuaranteeTitle, setNewGuaranteeTitle] = useState('');
  const [newGuaranteeDesc, setNewGuaranteeDesc] = useState('');

  const handleSaveHeaderFooter = () => {
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 3000);
  };

  const handleSavePageContent = () => {
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 3000);
  };

  // Add Item Handlers
  const handleAddTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTestimonialName || !newTestimonialQuote) return;
    setHomeTestimonials((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: newTestimonialName,
        role: newTestimonialRole || 'Verified Client',
        quote: newTestimonialQuote,
        rating: parseInt(newTestimonialRating) || 5,
      },
    ]);
    setNewTestimonialName('');
    setNewTestimonialRole('');
    setNewTestimonialQuote('');
    setIsTestimonialModalOpen(false);
  };

  const handleAddNav = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNavName || !newNavHref) return;
    setNavItems((prev) => [
      ...prev,
      { id: Date.now(), name: newNavName, href: newNavHref, enabled: true },
    ]);
    setNewNavName('');
    setNewNavHref('');
    setIsNavModalOpen(false);
  };

  const handleAddQuickLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuickLinkName || !newQuickLinkHref) return;
    setQuickLinks((prev) => [
      ...prev,
      { id: Date.now(), name: newQuickLinkName, href: newQuickLinkHref },
    ]);
    setNewQuickLinkName('');
    setNewQuickLinkHref('');
    setIsQuickLinkModalOpen(false);
  };

  const handleAddServiceLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceLinkName || !newServiceLinkHref) return;
    setCustomerServiceLinks((prev) => [
      ...prev,
      { id: Date.now(), name: newServiceLinkName, href: newServiceLinkHref },
    ]);
    setNewServiceLinkName('');
    setNewServiceLinkHref('');
    setIsServiceLinkModalOpen(false);
  };

  const handleAddGuarantee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGuaranteeTitle || !newGuaranteeDesc) return;
    setValueProps((prev) => [
      ...prev,
      { id: Date.now(), title: newGuaranteeTitle, desc: newGuaranteeDesc },
    ]);
    setNewGuaranteeTitle('');
    setNewGuaranteeDesc('');
    setIsGuaranteeModalOpen(false);
  };

  const handleAddTeamMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeamName || !newTeamRole) return;
    setAboutTeam((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: newTeamName,
        role: newTeamRole,
        image: newTeamImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&auto=format',
        bio: newTeamBio,
      },
    ]);
    setNewTeamName('');
    setNewTeamRole('');
    setNewTeamBio('');
    setIsTeamModalOpen(false);
  };

  const handleAddFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFaqQuestion || !newFaqAnswer) return;
    setContactFaqs((prev) => [
      ...prev,
      {
        id: Date.now(),
        question: newFaqQuestion,
        answer: newFaqAnswer,
      },
    ]);
    setNewFaqQuestion('');
    setNewFaqAnswer('');
    setIsFaqModalOpen(false);
  };

  const handleAddValue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newValueTitle || !newValueDesc) return;
    setAboutValues((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: newValueTitle,
        desc: newValueDesc,
      },
    ]);
    setNewValueTitle('');
    setNewValueDesc('');
    setIsValueModalOpen(false);
  };

  const handleAddMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMilestoneYear || !newMilestoneTitle) return;
    setAboutMilestones((prev) => [
      ...prev,
      {
        id: Date.now(),
        year: newMilestoneYear,
        title: newMilestoneTitle,
        desc: newMilestoneDesc,
      },
    ]);
    setNewMilestoneYear('');
    setNewMilestoneTitle('');
    setNewMilestoneDesc('');
    setIsMilestoneModalOpen(false);
  };

  const handleAddShowroom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newShowroomCity || !newShowroomAddress) return;
    setContactShowrooms((prev) => [
      ...prev,
      {
        id: Date.now(),
        city: newShowroomCity,
        address: newShowroomAddress,
        phone: newShowroomPhone,
        hours: newShowroomHours,
        services: newShowroomServices,
      },
    ]);
    setNewShowroomCity('');
    setNewShowroomAddress('');
    setNewShowroomPhone('');
    setNewShowroomHours('');
    setNewShowroomServices('');
    setIsShowroomModalOpen(false);
  };

  // Product Modal Open
  const openAddProductModal = () => {
    setEditingProduct(null);
    setFormName('');
    setFormPrice('');
    setFormOriginalPrice('');
    setFormCategory(categories[0]?.name || "Men's Fashion");
    setFormSubcategory('');
    setFormDescription('');
    setFormImage('https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&h=700&fit=crop&auto=format');
    setFormBadge('');
    setFormInStock(true);
    setFormColors('Black, Blue, Grey');
    setFormSizes('S, M, L, XL');
    setFormTags('premium, outerwear');
    setIsProductModalOpen(true);
  };

  // Product Edit
  const openEditProductModal = (product: Product) => {
    setEditingProduct(product);
    setFormName(product.name);
    setFormPrice(product.price.toString());
    setFormOriginalPrice(product.originalPrice ? product.originalPrice.toString() : '');
    setFormCategory(product.category);
    setFormSubcategory(product.subcategory);
    setFormDescription(product.description);
    setFormImage(product.image);
    setFormBadge(product.badge || '');
    setFormInStock(product.inStock);
    setFormColors(product.colors ? product.colors.join(', ') : '');
    setFormSizes(product.sizes ? product.sizes.join(', ') : '');
    setFormTags(product.tags ? product.tags.join(', ') : '');
    setIsProductModalOpen(true);
  };

  // Save/Add Product Handler
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formPrice) return;

    const colorsArr = formColors.split(',').map((c) => c.trim()).filter((c) => c !== '');
    const sizesArr = formSizes.split(',').map((s) => s.trim()).filter((s) => s !== '');
    const tagsArr = formTags.split(',').map((t) => t.trim()).filter((t) => t !== '');

    const parsedPrice = parseFloat(formPrice);
    const parsedOriginalPrice = formOriginalPrice ? parseFloat(formOriginalPrice) : undefined;

    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                name: formName,
                price: parsedPrice,
                originalPrice: parsedOriginalPrice,
                category: formCategory,
                subcategory: formSubcategory,
                description: formDescription,
                image: formImage,
                badge: formBadge || undefined,
                inStock: formInStock,
                colors: colorsArr.length > 0 ? colorsArr : undefined,
                sizes: sizesArr.length > 0 ? sizesArr : undefined,
                tags: tagsArr,
              }
            : p
        )
      );
    } else {
      const newProduct: Product = {
        id: products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1,
        name: formName,
        price: parsedPrice,
        originalPrice: parsedOriginalPrice,
        image: formImage,
        images: [formImage],
        category: formCategory,
        subcategory: formSubcategory,
        description: formDescription,
        rating: 5.0,
        reviews: 0,
        inStock: formInStock,
        colors: colorsArr.length > 0 ? colorsArr : undefined,
        sizes: sizesArr.length > 0 ? sizesArr : undefined,
        tags: tagsArr,
        badge: formBadge || undefined,
      };
      setProducts((prev) => [newProduct, ...prev]);
    }
    setIsProductModalOpen(false);
  };

  const handleDeleteProduct = (productId: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts((prev) => prev.filter((p) => p.id !== productId));
    }
  };

  const handleToggleStock = (productId: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, inStock: !p.inStock } : p))
    );
  };

  const handleChangeOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    if (newStatus === 'Delivered') {
      const order = orders.find((o) => o.id === orderId);
      if (order) {
        setCustomers((prev) =>
          prev.map((c) =>
            c.name.toLowerCase() === order.customerName.toLowerCase()
              ? { ...c, ordersCount: c.ordersCount + 1, totalSpent: c.totalSpent + order.total }
              : c
          )
        );
      }
    }
  };

  const stats = useMemo(() => {
    const totalRev = orders
      .filter((o) => o.status === 'Delivered' || o.status === 'Shipped' || o.status === 'Processing')
      .reduce((sum, o) => sum + o.total, 0);
    const pendingOrdersCount = orders.filter((o) => o.status === 'Pending').length;
    const activeProductsCount = products.filter((p) => p.inStock).length;
    const activeCustCount = customers.filter((c) => c.status === 'Active').length;

    return {
      revenue: totalRev,
      pendingOrders: pendingOrdersCount,
      activeProducts: activeProductsCount,
      activeCustomers: activeCustCount,
    };
  }, [orders, products, customers]);

  const filteredProductsMemo = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
        p.subcategory.toLowerCase().includes(productSearch.toLowerCase()) ||
        p.description.toLowerCase().includes(productSearch.toLowerCase());
      const matchesCat = productCategory === 'all' || p.category.toLowerCase() === productCategory.toLowerCase();
      return matchesSearch && matchesCat;
    });
  }, [products, productSearch, productCategory]);

  const filteredOrdersMemo = useMemo(() => {
    return orders.filter((o) => {
      const matchesSearch =
        o.customerName.toLowerCase().includes(orderSearch.toLowerCase()) ||
        o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
        o.itemsSummary.toLowerCase().includes(orderSearch.toLowerCase());
      const matchesStatus = orderStatus === 'all' || o.status.toLowerCase() === orderStatus.toLowerCase();
      return matchesSearch && matchesStatus;
    });
  }, [orders, orderSearch, orderStatus]);

  const filteredCustomersMemo = useMemo(() => {
    return customers.filter((c) => {
      return (
        c.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
        c.email.toLowerCase().includes(customerSearch.toLowerCase())
      );
    });
  }, [customers, customerSearch]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans">
      {/* 1. Sidebar Navigation */}
      <aside className="w-full md:w-64 lg:w-72 bg-slate-900 text-slate-100 flex flex-col shrink-0 border-r border-slate-800">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-sm shadow-md shadow-indigo-600/30 select-none">
              BDM
            </div>
            <div>
              <h1 className="font-extrabold text-base leading-tight tracking-tight text-white">{storeName}</h1>
              <span className="text-[10px] text-indigo-400 font-bold tracking-wider uppercase">ADMIN PORTAL</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 ${
              activeTab === 'overview'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-5 h-5 shrink-0" />
            <span>Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 ${
              activeTab === 'products'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
            }`}
          >
            <Package className="w-5 h-5 shrink-0" />
            <span>Products</span>
            <span className="ml-auto bg-slate-800 text-slate-300 text-xs px-2.5 py-0.5 rounded-full font-bold">
              {products.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 ${
              activeTab === 'orders'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-5 h-5 shrink-0" />
            <span>Orders</span>
            <span className="ml-auto bg-indigo-500/20 text-indigo-300 text-xs px-2.5 py-0.5 rounded-full font-bold">
              {orders.filter((o) => o.status === 'Pending' || o.status === 'Processing').length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('customers')}
            className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 ${
              activeTab === 'customers'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
            }`}
          >
            <Users className="w-5 h-5 shrink-0" />
            <span>Customers</span>
          </button>

          {/* Header & Footer Collapsible Dropdown */}
          <div className="space-y-1">
            <button
              onClick={() => {
                setIsHeaderFooterDropdownOpen((prev) => !prev);
                if (activeTab !== 'header-footer') {
                  setActiveTab('header-footer');
                }
              }}
              className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                activeTab === 'header-footer'
                  ? 'bg-slate-800 text-white border border-slate-700/60'
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <PanelTop className="w-5 h-5 shrink-0 text-indigo-400" />
                <span>Header & Footer</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 text-slate-400 ${
                  isHeaderFooterDropdownOpen ? 'rotate-180 text-white' : ''
                }`}
              />
            </button>

            {/* Expanded Header & Footer Sub-Items */}
            {isHeaderFooterDropdownOpen && (
              <div className="pl-4 pr-1 py-1.5 space-y-1 bg-slate-950/50 rounded-xl border border-slate-800/70 ml-2 animate-slide-down">
                {/* 1. Header & Navigation */}
                <button
                  onClick={() => {
                    setActiveTab('header-footer');
                    setHeaderFooterSubTab('header');
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-150 text-left ${
                    activeTab === 'header-footer' && headerFooterSubTab === 'header'
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    activeTab === 'header-footer' && headerFooterSubTab === 'header' ? 'bg-white' : 'bg-indigo-400'
                  }`}></span>
                  <span>Header & Navigation</span>
                </button>

                {/* 2. Footer & Guarantees */}
                <button
                  onClick={() => {
                    setActiveTab('header-footer');
                    setHeaderFooterSubTab('footer');
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-150 text-left ${
                    activeTab === 'header-footer' && headerFooterSubTab === 'footer'
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    activeTab === 'header-footer' && headerFooterSubTab === 'footer' ? 'bg-white' : 'bg-indigo-400'
                  }`}></span>
                  <span>Footer & Guarantees</span>
                </button>
              </div>
            )}
          </div>

          {/* Pages Collapsible Dropdown (Home, About, Contact) */}
          <div className="space-y-1">
            <button
              onClick={() => {
                setIsPagesDropdownOpen((prev) => !prev);
                if (activeTab !== 'pages-builder') {
                  setActiveTab('pages-builder');
                }
              }}
              className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                activeTab === 'pages-builder'
                  ? 'bg-slate-800 text-white border border-slate-700/60'
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <FileText className="w-5 h-5 shrink-0 text-indigo-400" />
                <span>Pages</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 text-slate-400 ${
                  isPagesDropdownOpen ? 'rotate-180 text-white' : ''
                }`}
              />
            </button>

            {/* Expanded Pages Sub-Items */}
            {isPagesDropdownOpen && (
              <div className="pl-4 pr-1 py-1.5 space-y-1 bg-slate-950/50 rounded-xl border border-slate-800/70 ml-2 animate-slide-down">
                {/* 1. Home Page Option */}
                <button
                  onClick={() => {
                    setActiveTab('pages-builder');
                    setPageBuilderSubTab('home');
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-150 text-left ${
                    activeTab === 'pages-builder' && pageBuilderSubTab === 'home'
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    activeTab === 'pages-builder' && pageBuilderSubTab === 'home' ? 'bg-white' : 'bg-indigo-400'
                  }`}></span>
                  <span>Home Page</span>
                </button>

                {/* 2. About Us Page Option */}
                <button
                  onClick={() => {
                    setActiveTab('pages-builder');
                    setPageBuilderSubTab('about');
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-150 text-left ${
                    activeTab === 'pages-builder' && pageBuilderSubTab === 'about'
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    activeTab === 'pages-builder' && pageBuilderSubTab === 'about' ? 'bg-white' : 'bg-indigo-400'
                  }`}></span>
                  <span>About Us Page</span>
                </button>

                {/* 3. Contact Us Page Option */}
                <button
                  onClick={() => {
                    setActiveTab('pages-builder');
                    setPageBuilderSubTab('contact');
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-150 text-left ${
                    activeTab === 'pages-builder' && pageBuilderSubTab === 'contact'
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    activeTab === 'pages-builder' && pageBuilderSubTab === 'contact' ? 'bg-white' : 'bg-indigo-400'
                  }`}></span>
                  <span>Contact Us Page</span>
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 ${
              activeTab === 'settings'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
            }`}
          >
            <Settings className="w-5 h-5 shrink-0" />
            <span>Settings</span>
          </button>
        </nav>

        {/* Sidebar Footer Link */}
        <div className="p-4 border-t border-slate-800">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-bold text-slate-300 bg-slate-800/50 hover:bg-slate-800 hover:text-white transition-all duration-200 border border-slate-800"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Shop</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </Link>
        </div>
      </aside>

      {/* 2. Main Content Frame */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <h2 className="font-bold text-xl text-slate-900 capitalize tracking-tight">
              {activeTab === 'pages-builder'
                ? 'Page Content & Layout Builder'
                : activeTab === 'header-footer'
                ? 'Header & Footer Customizer'
                : `${activeTab} Panel`}
            </h2>
            {maintenanceMode && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-600 border border-rose-100">
                <ShieldAlert className="w-3.5 h-3.5" /> Maintenance Mode Active
              </span>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-semibold text-slate-800">Administrator</div>
              <div className="text-xs text-slate-500">Wednesday, Aug 19, 2026</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 text-white flex items-center justify-center font-bold shadow-md shadow-indigo-500/10">
              AD
            </div>
          </div>
        </header>

        {/* Workspace Body */}
        <div className="p-6 md:p-8 space-y-8 max-w-7xl w-full mx-auto">
          {/* ==================== TAB: OVERVIEW ==================== */}
          {activeTab === 'overview' && (
            <>
              {/* Stat Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow duration-200 group">
                  <div className="space-y-2">
                    <span className="text-sm font-semibold text-slate-400">Total Revenue</span>
                    <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                      ${stats.revenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </h3>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                      <TrendingUp className="w-3 h-3" /> +14.2% MoM
                    </span>
                  </div>
                  <div className="p-4 bg-emerald-50 rounded-2xl group-hover:bg-emerald-100/70 transition-colors duration-200">
                    <DollarSign className="w-6 h-6 text-emerald-600" />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow duration-200 group">
                  <div className="space-y-2">
                    <span className="text-sm font-semibold text-slate-400">Pending Orders</span>
                    <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                      {stats.pendingOrders}
                    </h3>
                    <span className="text-xs text-slate-500 font-medium">Requires fulfillment</span>
                  </div>
                  <div className="p-4 bg-amber-50 rounded-2xl group-hover:bg-amber-100/70 transition-colors duration-200">
                    <Clock className="w-6 h-6 text-amber-600" />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow duration-200 group">
                  <div className="space-y-2">
                    <span className="text-sm font-semibold text-slate-400">In-Stock Products</span>
                    <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                      {stats.activeProducts} <span className="text-slate-300 font-normal text-lg">/ {products.length}</span>
                    </h3>
                    <span className="text-xs text-slate-500 font-medium">Currently visible to shoppers</span>
                  </div>
                  <div className="p-4 bg-indigo-50 rounded-2xl group-hover:bg-indigo-100/70 transition-colors duration-200">
                    <Package className="w-6 h-6 text-indigo-600" />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow duration-200 group">
                  <div className="space-y-2">
                    <span className="text-sm font-semibold text-slate-400">Active Customers</span>
                    <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                      {stats.activeCustomers}
                    </h3>
                    <span className="text-xs text-slate-500 font-medium">Purchased within last 30 days</span>
                  </div>
                  <div className="p-4 bg-violet-50 rounded-2xl group-hover:bg-violet-100/70 transition-colors duration-200">
                    <Users className="w-6 h-6 text-violet-600" />
                  </div>
                </div>
              </div>

              {/* Graphical Insights */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm lg:col-span-2">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h4 className="font-bold text-slate-800">Monthly Revenue Stream</h4>
                      <p className="text-xs text-slate-400">Consolidated analytics for current calendar year</p>
                    </div>
                    <span className="text-xs font-semibold text-slate-500 border border-slate-100 rounded-lg px-2.5 py-1 bg-slate-50">USD ($)</span>
                  </div>
                  
                  <div className="h-64 flex items-end gap-3.5 pt-4">
                    {[
                      { month: 'Jan', val: 120, label: '$12k' },
                      { month: 'Feb', val: 150, label: '$15k' },
                      { month: 'Mar', val: 190, label: '$19k' },
                      { month: 'Apr', val: 240, label: '$24k' },
                      { month: 'May', val: 220, label: '$22k' },
                      { month: 'Jun', val: 310, label: '$31k' },
                      { month: 'Jul', val: 280, label: '$28k' },
                      { month: 'Aug', val: 340, label: '$34k' },
                    ].map((bar, idx) => (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer h-full justify-end">
                        <div className="w-full relative h-full flex items-end justify-center">
                          <div className="absolute bottom-full mb-1 opacity-0 group-hover:opacity-100 bg-slate-900 text-white text-xxs font-bold px-1.5 py-0.5 rounded transition-opacity duration-200 pointer-events-none whitespace-nowrap z-15 shadow">
                            {bar.label}
                          </div>
                          <div
                            style={{ height: `${(bar.val / 360) * 100}%` }}
                            className={`w-full rounded-t-lg transition-all duration-500 group-hover:scale-x-105 ${
                              idx === 7 ? 'bg-gradient-to-t from-indigo-600 to-violet-500' : 'bg-slate-200 group-hover:bg-slate-300'
                            }`}
                          ></div>
                        </div>
                        <span className="text-xs font-bold text-slate-400 group-hover:text-slate-700 transition-colors duration-150">{bar.month}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-slate-800">Sales by Category</h4>
                    <p className="text-xs text-slate-400">Unit breakdown percentage across inventory</p>
                  </div>

                  <div className="flex items-center justify-center py-4 relative">
                    <svg width="150" height="150" viewBox="0 0 42 42" className="transform -rotate-90">
                      <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#f1f5f9" strokeWidth="4.2"></circle>
                      <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#4f46e5" strokeWidth="4.2" strokeDasharray="40 60" strokeDashoffset="0"></circle>
                      <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#10b981" strokeWidth="4.2" strokeDasharray="35 65" strokeDashoffset="-40"></circle>
                      <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#8b5cf6" strokeWidth="4.2" strokeDasharray="15 85" strokeDashoffset="-75"></circle>
                      <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#f59e0b" strokeWidth="4.2" strokeDasharray="10 90" strokeDashoffset="-90"></circle>
                    </svg>
                    <div className="absolute text-center">
                      <span className="block text-2xl font-black text-slate-900 leading-none">1,412</span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Units Sold</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xxs font-bold text-slate-500 pt-2 border-t border-slate-50">
                    <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-indigo-600 rounded-sm inline-block"></span> Fashion (40%)</div>
                    <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-emerald-500 rounded-sm inline-block"></span> Electronics (35%)</div>
                    <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-violet-500 rounded-sm inline-block"></span> Accessories (15%)</div>
                    <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-amber-500 rounded-sm inline-block"></span> Other (10%)</div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ==================== TAB: PRODUCTS ==================== */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
                <div className="flex flex-wrap items-center gap-3 flex-1 max-w-xl">
                  <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4.5 h-4.5" />
                    <input
                      type="text"
                      placeholder="Search catalogue items..."
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-semibold text-slate-800"
                    />
                  </div>
                  <div className="relative">
                    <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <select
                      value={productCategory}
                      onChange={(e) => setProductCategory(e.target.value)}
                      className="pl-9 pr-8 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-semibold text-slate-700 appearance-none cursor-pointer"
                    >
                      <option value="all">All Categories</option>
                      {categories.map((c) => (
                        <option key={c.slug} value={c.name}>{c.name}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                  </div>
                </div>

                <button
                  onClick={openAddProductModal}
                  className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-2.5 rounded-xl text-sm shadow-md shadow-indigo-600/10 transition-all hover:scale-102"
                >
                  <Plus className="w-4.5 h-4.5" /> Add Product
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50/75 border-b border-slate-100 text-slate-400 text-xxs font-bold tracking-wider uppercase">
                        <th className="px-6 py-3.5">Product Details</th>
                        <th className="px-6 py-3.5">Category</th>
                        <th className="px-6 py-3.5 text-right">Price</th>
                        <th className="px-6 py-3.5 text-center">Fulfill Badge</th>
                        <th className="px-6 py-3.5 text-center">Visibility / Stock</th>
                        <th className="px-6 py-3.5 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-600">
                      {filteredProductsMemo.map((product) => (
                        <tr key={product.id} className="hover:bg-slate-50/40 transition-colors duration-150">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3.5">
                              <div className="w-12 h-14 relative bg-slate-100 rounded-lg overflow-hidden shrink-0">
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                              </div>
                              <div className="min-w-0">
                                <div className="font-bold text-slate-900 truncate" title={product.name}>{product.name}</div>
                                <div className="text-slate-400 text-xxs font-semibold mt-0.5">{product.subcategory} • Rating: {product.rating} ★ ({product.reviews})</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-slate-600 font-bold bg-slate-100 px-2.5 py-1 rounded-lg text-[10px]">
                              {product.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right font-bold text-slate-900">
                            ${product.price.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {product.badge ? (
                              <span className="inline-flex px-2 py-0.5 rounded-md text-[9px] font-bold uppercase bg-indigo-100 text-indigo-600">
                                {product.badge}
                              </span>
                            ) : (
                              <span className="text-slate-300">—</span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <button
                              onClick={() => handleToggleStock(product.id)}
                              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase ${
                                product.inStock ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'
                              }`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${product.inStock ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></span>
                              {product.inStock ? 'In Stock' : 'Out of Stock'}
                            </button>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              <button onClick={() => openEditProductModal(product)} className="p-1.5 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 text-slate-500 rounded-lg">
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button onClick={() => handleDeleteProduct(product.id)} className="p-1.5 bg-slate-50 hover:bg-rose-50 hover:text-rose-600 text-slate-500 rounded-lg">
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB: ORDERS ==================== */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
                <div className="flex flex-wrap items-center gap-3 flex-1 max-w-xl">
                  <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4.5 h-4.5" />
                    <input
                      type="text"
                      placeholder="Search orders, buyers..."
                      value={orderSearch}
                      onChange={(e) => setOrderSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-800"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50/75 border-b border-slate-100 text-slate-400 text-xxs font-bold tracking-wider uppercase">
                        <th className="px-6 py-3.5">Order ID</th>
                        <th className="px-6 py-3.5">Customer & Contact</th>
                        <th className="px-6 py-3.5">Purchased Date</th>
                        <th className="px-6 py-3.5 text-right">Order Price</th>
                        <th className="px-6 py-3.5 text-center">Fulfillment Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-600">
                      {filteredOrdersMemo.map((o) => (
                        <tr key={o.id} className="hover:bg-slate-50/40">
                          <td className="px-6 py-4 font-black text-slate-900">{o.id}</td>
                          <td className="px-6 py-4">
                            <div className="font-bold text-slate-800">{o.customerName}</div>
                            <div className="text-slate-400 font-medium text-xxs mt-0.5">{o.email}</div>
                          </td>
                          <td className="px-6 py-4 text-slate-400">{o.date}</td>
                          <td className="px-6 py-4 text-right font-black text-slate-900">${o.total.toFixed(2)}</td>
                          <td className="px-6 py-4 text-center">
                            <select
                              value={o.status}
                              onChange={(e) => handleChangeOrderStatus(o.id, e.target.value as Order['status'])}
                              className="py-1 px-3 rounded-full text-xxs font-bold uppercase bg-indigo-50 text-indigo-700 cursor-pointer"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Processing">Processing</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB: CUSTOMERS ==================== */}
          {activeTab === 'customers' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50/75 border-b border-slate-100 text-slate-400 text-xxs font-bold tracking-wider uppercase">
                        <th className="px-6 py-3.5">Customer Profiles</th>
                        <th className="px-6 py-3.5">Registration Date</th>
                        <th className="px-6 py-3.5 text-center">Orders Placed</th>
                        <th className="px-6 py-3.5 text-right">Total Expenditures</th>
                        <th className="px-6 py-3.5 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-600">
                      {filteredCustomersMemo.map((c) => (
                        <tr key={c.id} className="hover:bg-slate-50/40">
                          <td className="px-6 py-4 flex items-center gap-3.5">
                            <div className="w-9 h-9 rounded-xl bg-slate-100 text-indigo-600 flex items-center justify-center font-bold">
                              {c.name.split(' ').map((n) => n[0]).join('')}
                            </div>
                            <div>
                              <div className="font-bold text-slate-900">{c.name}</div>
                              <div className="text-slate-400 text-xxs font-medium">{c.email}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-slate-400">{c.joinedDate}</td>
                          <td className="px-6 py-4 text-center font-bold text-slate-800">{c.ordersCount}</td>
                          <td className="px-6 py-4 text-right font-black text-slate-900">${c.totalSpent.toFixed(2)}</td>
                          <td className="px-6 py-4 text-center">
                            <span className="px-2.5 py-1 rounded-full text-xxs font-bold uppercase bg-emerald-50 text-emerald-600">
                              {c.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB: HEADER & FOOTER OPTION ==================== */}
          {activeTab === 'header-footer' && (
            <div className="space-y-8">
              {/* Header / Footer Subtab Switcher */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl">
                  <button
                    onClick={() => setHeaderFooterSubTab('header')}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold transition-all ${
                      headerFooterSubTab === 'header' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <PanelTop className="w-4 h-4" />
                    Header & Navigation
                  </button>
                  <button
                    onClick={() => setHeaderFooterSubTab('footer')}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold transition-all ${
                      headerFooterSubTab === 'footer' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <PanelBottom className="w-4 h-4" />
                    Footer & Guarantees
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  {savedNotification && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200/60 animate-fade-in">
                      <CheckCircle2 className="w-4 h-4" /> Header & Footer Updated!
                    </span>
                  )}
                  <button
                    onClick={handleSaveHeaderFooter}
                    className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold px-6 py-2.5 rounded-xl shadow-md shadow-indigo-600/10 transition-all hover:scale-102"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Publish Changes
                  </button>
                </div>
              </div>

              {/* ==================== SUBTAB 1: HEADER CUSTOMIZER ==================== */}
              {headerFooterSubTab === 'header' && (
                <div className="space-y-6">
                  {/* Live Interactive Header Preview */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                        Interactive Real-Time Header Preview
                      </span>
                      <span className="text-xxs bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full">
                        Live Preview
                      </span>
                    </div>

                    <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-inner">
                      {/* Top ribbon preview */}
                      {headerAnnouncementEnabled && (
                        <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-600 text-white text-xs py-2 px-4 text-center font-medium flex items-center justify-center gap-2">
                          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                          <span>{headerAnnouncementText}</span>
                        </div>
                      )}

                      {/* Header bar preview */}
                      <div className="bg-white p-4 flex items-center justify-between border-b border-slate-100">
                        {/* Logo */}
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-black text-xs shadow-sm">
                            {headerBrandText}
                          </div>
                          <span className="text-base font-black text-slate-900 tracking-tight">
                            {storeName}
                          </span>
                        </div>

                        {/* Navigation Links */}
                        <div className="hidden md:flex items-center space-x-4 text-xs font-semibold text-slate-700">
                          {navItems.filter((i) => i.enabled).map((item) => (
                            <span key={item.id} className="hover:text-indigo-600 cursor-pointer">
                              {item.name}
                            </span>
                          ))}
                        </div>

                        {/* Icons */}
                        <div className="flex items-center gap-3 text-slate-600">
                          {showSearchIcon && <Search className="w-4 h-4" />}
                          {showAccountIcon && <User className="w-4 h-4" />}
                          {showWishlistIcon && (
                            <div className="relative">
                              <Heart className="w-4 h-4" />
                              <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-rose-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center">2</span>
                            </div>
                          )}
                          {showCartIcon && (
                            <div className="relative">
                              <ShoppingBag className="w-4 h-4" />
                              <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-indigo-600 text-white text-[8px] font-bold rounded-full flex items-center justify-center">3</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Announcement Ribbon Settings */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-indigo-600" /> Announcement Ribbon Settings
                        </h4>
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={headerAnnouncementEnabled}
                            onChange={(e) => setHeaderAnnouncementEnabled(e.target.checked)}
                            className="w-4 h-4 text-indigo-600 rounded"
                          />
                          Enabled
                        </label>
                      </div>
                      <div className="space-y-3 text-xs font-bold text-slate-600">
                        <div>
                          <label className="text-slate-500">Banner Announcement Text</label>
                          <input
                            type="text"
                            value={headerAnnouncementText}
                            onChange={(e) => setHeaderAnnouncementText(e.target.value)}
                            className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
                          />
                        </div>
                        <div>
                          <label className="text-slate-500">Coupon Voucher Code Tag</label>
                          <input
                            type="text"
                            value={headerAnnouncementCode}
                            onChange={(e) => setHeaderAnnouncementCode(e.target.value)}
                            className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Brand Logo & Tagline */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                      <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                        <ShoppingBag className="w-4 h-4 text-indigo-600" /> Brand Identity & Logo
                      </h4>
                      <div className="grid grid-cols-2 gap-3 text-xs font-bold text-slate-600">
                        <div>
                          <label className="text-slate-500">Store Brand Name</label>
                          <input
                            type="text"
                            value={headerBrandText}
                            onChange={(e) => setHeaderBrandText(e.target.value)}
                            className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
                          />
                        </div>
                        <div>
                          <label className="text-slate-500">Tagline Badge</label>
                          <input
                            type="text"
                            value={headerTaglineBadge}
                            onChange={(e) => setHeaderTaglineBadge(e.target.value)}
                            className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Action Icons Visibility */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                      <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                        <Sliders className="w-4 h-4 text-indigo-600" /> Header Action Icons
                      </h4>
                      <div className="grid grid-cols-2 gap-3 text-xs font-bold text-slate-700">
                        <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-100 bg-slate-50 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={showSearchIcon}
                            onChange={(e) => setShowSearchIcon(e.target.checked)}
                            className="w-4 h-4 text-indigo-600 rounded"
                          />
                          <span>Search Bar</span>
                        </label>
                        <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-100 bg-slate-50 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={showWishlistIcon}
                            onChange={(e) => setShowWishlistIcon(e.target.checked)}
                            className="w-4 h-4 text-indigo-600 rounded"
                          />
                          <span>Wishlist Counter</span>
                        </label>
                        <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-100 bg-slate-50 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={showAccountIcon}
                            onChange={(e) => setShowAccountIcon(e.target.checked)}
                            className="w-4 h-4 text-indigo-600 rounded"
                          />
                          <span>Account Link</span>
                        </label>
                        <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-100 bg-slate-50 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={showCartIcon}
                            onChange={(e) => setShowCartIcon(e.target.checked)}
                            className="w-4 h-4 text-indigo-600 rounded"
                          />
                          <span>Shopping Cart Badge</span>
                        </label>
                      </div>
                    </div>

                    {/* MegaMenu Promo Banner */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                      <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-indigo-600" /> MegaMenu Promotional Card
                      </h4>
                      <div className="space-y-3 text-xs font-bold text-slate-600">
                        <div>
                          <label className="text-slate-500">Promo Headline</label>
                          <input
                            type="text"
                            value={megaMenuHeadline}
                            onChange={(e) => setMegaMenuHeadline(e.target.value)}
                            className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
                          />
                        </div>
                        <div>
                          <label className="text-slate-500">Promo Description</label>
                          <input
                            type="text"
                            value={megaMenuSubtext}
                            onChange={(e) => setMegaMenuSubtext(e.target.value)}
                            className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
                          />
                        </div>
                        <div>
                          <label className="text-slate-500">Promo Voucher Tag</label>
                          <input
                            type="text"
                            value={megaMenuCoupon}
                            onChange={(e) => setMegaMenuCoupon(e.target.value)}
                            className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Main Navigation Menu Manager (Spans 2 columns) */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4 lg:col-span-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                            <Menu className="w-5 h-5 text-indigo-600" />
                            Main Navigation Menu Links ({navItems.length})
                          </h4>
                          <p className="text-xs text-slate-400 font-medium">Add, toggle visibility, edit URLs, or remove header navigation links</p>
                        </div>
                        <button
                          onClick={() => setIsNavModalOpen(true)}
                          className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-xl text-xs shadow"
                        >
                          <Plus className="w-4 h-4" /> Add Nav Item
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {navItems.map((item) => (
                          <div key={item.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between gap-3">
                            <div className="min-w-0">
                              <div className="font-bold text-slate-900 text-xs truncate">{item.name}</div>
                              <div className="text-slate-400 text-xxs truncate">{item.href}</div>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                onClick={() => {
                                  setNavItems((prev) =>
                                    prev.map((n) => (n.id === item.id ? { ...n, enabled: !n.enabled } : n))
                                  );
                                }}
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                  item.enabled ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-500'
                                }`}
                              >
                                {item.enabled ? 'Visible' : 'Hidden'}
                              </button>
                              <button
                                onClick={() => setNavItems((prev) => prev.filter((n) => n.id !== item.id))}
                                className="text-slate-400 hover:text-rose-600 p-1 transition-colors"
                                title="Delete link"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ==================== SUBTAB 2: FOOTER CUSTOMIZER ==================== */}
              {headerFooterSubTab === 'footer' && (
                <div className="space-y-6">
                  {/* Live Interactive Footer Preview */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                        Interactive Real-Time Footer Preview
                      </span>
                      <span className="text-xxs bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full">
                        Live Preview
                      </span>
                    </div>

                    <div className="border border-slate-800 rounded-2xl overflow-hidden shadow-inner bg-slate-900 text-slate-300">
                      {/* Top guarantees preview */}
                      <div className="bg-slate-950/60 p-4 border-b border-slate-800">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                          {valueProps.map((vp) => (
                            <div key={vp.id} className="space-y-1">
                              <div className="text-white text-xs font-bold">{vp.title}</div>
                              <div className="text-slate-400 text-xxs truncate">{vp.desc}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 4-column footer body preview */}
                      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs border-b border-slate-800">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-black text-xxs">
                              {headerBrandText}
                            </div>
                            <span className="text-sm font-black text-white">{storeName}</span>
                          </div>
                          <p className="text-slate-400 text-xxs line-clamp-3">{footerAboutText}</p>
                          <div className="text-xxs text-slate-400 space-y-1 pt-1">
                            <div>📍 {footerAddress}</div>
                            <div>📞 {footerPhone}</div>
                            <div>✉️ {footerEmail}</div>
                          </div>
                        </div>

                        <div>
                          <div className="text-white font-bold mb-2">Quick Links</div>
                          <ul className="space-y-1 text-slate-400 text-xxs">
                            {quickLinks.slice(0, 5).map((ql) => (
                              <li key={ql.id}>{ql.name}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <div className="text-white font-bold mb-2">Customer Service</div>
                          <ul className="space-y-1 text-slate-400 text-xxs">
                            {customerServiceLinks.slice(0, 5).map((csl) => (
                              <li key={csl.id}>{csl.name}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="space-y-2">
                          <div className="text-white font-bold">{newsletterHeadline}</div>
                          <p className="text-slate-400 text-xxs">{newsletterPromo}</p>
                          <div className="flex gap-1.5">
                            <input
                              type="text"
                              disabled
                              placeholder="Your email"
                              className="bg-slate-800 text-xxs px-2.5 py-1.5 rounded-lg border border-slate-700 flex-1 text-white"
                            />
                            <button className="bg-indigo-600 text-white text-xxs px-3 py-1.5 rounded-lg font-bold">
                              Join
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Bottom preview */}
                      <div className="p-4 flex flex-col sm:flex-row items-center justify-between text-xxs text-slate-400 gap-2">
                        <div>{footerCopyright}</div>
                        <div className="flex items-center gap-2 font-bold">
                          {payments.visa && <span>VISA</span>}
                          {payments.mastercard && <span>MC</span>}
                          {payments.amex && <span>AMEX</span>}
                          {payments.paypal && <span>PAYPAL</span>}
                          {payments.applePay && <span>APPLE PAY</span>}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Company Profile & Coordinates */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                      <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-indigo-600" /> Company & Support Coordinates
                      </h4>
                      <div className="space-y-3 text-xs font-bold text-slate-600">
                        <div>
                          <label className="text-slate-500">Footer Narrative Bio</label>
                          <textarea
                            rows={3}
                            value={footerAboutText}
                            onChange={(e) => setFooterAboutText(e.target.value)}
                            className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 resize-none"
                          />
                        </div>
                        <div>
                          <label className="text-slate-500">Physical Flagship Address</label>
                          <input
                            type="text"
                            value={footerAddress}
                            onChange={(e) => setFooterAddress(e.target.value)}
                            className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-slate-500">Support Phone</label>
                            <input
                              type="text"
                              value={footerPhone}
                              onChange={(e) => setFooterPhone(e.target.value)}
                              className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
                            />
                          </div>
                          <div>
                            <label className="text-slate-500">Support Email</label>
                            <input
                              type="email"
                              value={footerEmail}
                              onChange={(e) => setFooterEmail(e.target.value)}
                              className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Value Guarantees Customizer */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-indigo-600" /> Value Guarantees ({valueProps.length})
                        </h4>
                        <button
                          onClick={() => setIsGuaranteeModalOpen(true)}
                          className="inline-flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add
                        </button>
                      </div>
                      <div className="space-y-2 max-h-56 overflow-y-auto">
                        {valueProps.map((vp) => (
                          <div key={vp.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="font-bold text-slate-900 text-xs truncate">{vp.title}</div>
                              <div className="text-slate-500 text-xxs truncate">{vp.desc}</div>
                            </div>
                            <button
                              onClick={() => setValueProps((prev) => prev.filter((v) => v.id !== vp.id))}
                              className="text-slate-400 hover:text-rose-600 p-1"
                              title="Delete guarantee"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Quick Links Column Manager */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                          <Layers className="w-4 h-4 text-indigo-600" /> Quick Links (Column 2) ({quickLinks.length})
                        </h4>
                        <button
                          onClick={() => setIsQuickLinkModalOpen(true)}
                          className="inline-flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Link
                        </button>
                      </div>
                      <div className="space-y-2 max-h-52 overflow-y-auto">
                        {quickLinks.map((ql) => (
                          <div key={ql.id} className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between gap-3">
                            <div className="font-bold text-slate-900 text-xs">{ql.name}</div>
                            <div className="flex items-center gap-2">
                              <span className="text-slate-400 text-xxs">{ql.href}</span>
                              <button
                                onClick={() => setQuickLinks((prev) => prev.filter((l) => l.id !== ql.id))}
                                className="text-slate-400 hover:text-rose-600 p-1"
                                title="Remove link"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Customer Service Links Column Manager */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                          <HelpCircle className="w-4 h-4 text-indigo-600" /> Customer Service Links (Column 3) ({customerServiceLinks.length})
                        </h4>
                        <button
                          onClick={() => setIsServiceLinkModalOpen(true)}
                          className="inline-flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Link
                        </button>
                      </div>
                      <div className="space-y-2 max-h-52 overflow-y-auto">
                        {customerServiceLinks.map((csl) => (
                          <div key={csl.id} className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between gap-3">
                            <div className="font-bold text-slate-900 text-xs">{csl.name}</div>
                            <div className="flex items-center gap-2">
                              <span className="text-slate-400 text-xxs">{csl.href}</span>
                              <button
                                onClick={() => setCustomerServiceLinks((prev) => prev.filter((l) => l.id !== csl.id))}
                                className="text-slate-400 hover:text-rose-600 p-1"
                                title="Remove link"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Social Media Hub */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                      <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                        <Globe className="w-4 h-4 text-indigo-600" /> Social Media Channels
                      </h4>
                      <div className="space-y-2.5 text-xs font-bold text-slate-600">
                        {Object.entries(socials).map(([key, val]) => (
                          <div key={key} className="flex items-center gap-3 p-2 bg-slate-50 rounded-xl border border-slate-100">
                            <label className="capitalize text-slate-700 min-w-[70px] flex items-center gap-1.5">
                              <input
                                type="checkbox"
                                checked={val.enabled}
                                onChange={(e) => {
                                  const checked = e.target.checked;
                                  setSocials((prev) => ({
                                    ...prev,
                                    [key]: { ...val, enabled: checked },
                                  }));
                                }}
                                className="w-3.5 h-3.5 text-indigo-600 rounded"
                              />
                              {key}
                            </label>
                            <input
                              type="text"
                              value={val.url}
                              onChange={(e) => {
                                const url = e.target.value;
                                setSocials((prev) => ({
                                  ...prev,
                                  [key]: { ...val, url },
                                }));
                              }}
                              className="flex-1 px-3 py-1 bg-white border border-slate-200 rounded-lg text-xxs font-semibold text-slate-800"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Newsletter Callout Settings */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                      <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                        <Mail className="w-4 h-4 text-indigo-600" /> Newsletter Callout (Column 4)
                      </h4>
                      <div className="space-y-3 text-xs font-bold text-slate-600">
                        <div>
                          <label className="text-slate-500">Newsletter Headline</label>
                          <input
                            type="text"
                            value={newsletterHeadline}
                            onChange={(e) => setNewsletterHeadline(e.target.value)}
                            className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
                          />
                        </div>
                        <div>
                          <label className="text-slate-500">Incentive Promo Description</label>
                          <textarea
                            rows={2}
                            value={newsletterPromo}
                            onChange={(e) => setNewsletterPromo(e.target.value)}
                            className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 resize-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Copyright & Payment Badges (Spans 2 columns) */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4 lg:col-span-2">
                      <h4 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-indigo-600" />
                        Footer Legal Statement & Payment Badges
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold text-slate-600">
                        <div>
                          <label className="text-slate-500">Copyright Statement</label>
                          <input
                            type="text"
                            value={footerCopyright}
                            onChange={(e) => setFooterCopyright(e.target.value)}
                            className="w-full mt-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
                          />
                        </div>
                        <div>
                          <label className="text-slate-500 mb-2 block">Accepted Payment Badges</label>
                          <div className="grid grid-cols-3 gap-2">
                            {Object.entries(payments).map(([pKey, pVal]) => (
                              <label key={pKey} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg border border-slate-100 cursor-pointer capitalize text-xxs font-bold text-slate-700">
                                <input
                                  type="checkbox"
                                  checked={pVal}
                                  onChange={(e) => {
                                    const checked = e.target.checked;
                                    setPayments((prev) => ({ ...prev, [pKey]: checked }));
                                  }}
                                  className="w-3.5 h-3.5 text-indigo-600 rounded"
                                />
                                {pKey}
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ==================== TAB: PAGES BUILDER (HOME, ABOUT & CONTACT) ==================== */}
          {activeTab === 'pages-builder' && (
            <div className="space-y-8">
              {/* Sub-tab navigation (Home, About, Contact) */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex flex-wrap items-center gap-2 p-1 bg-slate-100 rounded-xl">
                  {/* 1. Home Page Tab */}
                  <button
                    onClick={() => setPageBuilderSubTab('home')}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold transition-all ${
                      pageBuilderSubTab === 'home' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Home className="w-4 h-4" />
                    Home Page Creator
                  </button>

                  {/* 2. About Us Tab */}
                  <button
                    onClick={() => setPageBuilderSubTab('about')}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold transition-all ${
                      pageBuilderSubTab === 'about' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <FileText className="w-4 h-4" />
                    About Us Page Creator
                  </button>

                  {/* 3. Contact Us Tab */}
                  <button
                    onClick={() => setPageBuilderSubTab('contact')}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold transition-all ${
                      pageBuilderSubTab === 'contact' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Mail className="w-4 h-4" />
                    Contact Us Page Creator
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  {savedNotification && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200/60 animate-fade-in">
                      <CheckCircle2 className="w-4 h-4" /> Page content updated!
                    </span>
                  )}
                  <button
                    onClick={handleSavePageContent}
                    className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold px-6 py-2.5 rounded-xl shadow-md shadow-indigo-600/10 transition-all hover:scale-102"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Save & Publish Page
                  </button>
                </div>
              </div>

              {/* ==================== 1. HOME PAGE CREATOR ==================== */}
              {pageBuilderSubTab === 'home' && (
                <div className="space-y-6">
                  {/* Live Interactive Home Preview Card */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                        Interactive Real-Time Home Page Preview
                      </span>
                      <div className="flex items-center gap-3">
                        <Link
                          href="/"
                          target="_blank"
                          className="text-xs font-bold text-indigo-600 hover:underline inline-flex items-center gap-1"
                        >
                          Preview live store <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                        <span className="text-xxs bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full">
                          Live Preview
                        </span>
                      </div>
                    </div>

                    <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-inner bg-slate-900 text-white relative">
                      <div
                        className="p-8 sm:p-12 relative overflow-hidden bg-cover bg-center min-h-[260px] flex flex-col justify-center"
                        style={{
                          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.85)), url(${homeHeroImage})`,
                        }}
                      >
                        <div className="max-w-xl space-y-3 relative z-10">
                          <span className="inline-block bg-indigo-500/30 text-indigo-300 border border-indigo-400/30 text-xxs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                            {homeHeroBadge}
                          </span>
                          <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-tight text-white">
                            {homeHeroTitle}
                          </h3>
                          <p className="text-slate-300 text-xs leading-relaxed line-clamp-2">
                            {homeHeroSubtitle}
                          </p>
                          <div className="flex flex-wrap gap-2.5 pt-2">
                            <span className="bg-indigo-600 text-white text-xs font-bold px-4 py-2 rounded-xl shadow">
                              {homeHeroPrimaryCta}
                            </span>
                            <span className="bg-white/10 backdrop-blur-md text-white text-xs font-bold px-4 py-2 rounded-xl border border-white/20">
                              {homeHeroSecondaryCta}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Promo Ribbon Preview */}
                      <div className="bg-indigo-600 p-3 flex items-center justify-between text-xs px-6">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-amber-300" />
                          <span className="font-bold">{homePromoHeadline}</span>
                          <span className="text-indigo-200 hidden sm:inline">— {homePromoSubtext}</span>
                        </div>
                        <span className="bg-white text-indigo-700 text-xxs font-black px-2 py-0.5 rounded uppercase">
                          Code: {homePromoCode} ({homePromoDiscount})
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Hero Banner Controls */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                      <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-indigo-600" />
                        Main Hero Banner Settings
                      </h4>
                      <div className="space-y-3 text-xs font-bold text-slate-600">
                        <div>
                          <label className="text-slate-500">Seasonal Tagline Badge</label>
                          <input
                            type="text"
                            value={homeHeroBadge}
                            onChange={(e) => setHomeHeroBadge(e.target.value)}
                            className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
                          />
                        </div>
                        <div>
                          <label className="text-slate-500">Hero Main Title Headline</label>
                          <input
                            type="text"
                            value={homeHeroTitle}
                            onChange={(e) => setHomeHeroTitle(e.target.value)}
                            className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
                          />
                        </div>
                        <div>
                          <label className="text-slate-500">Hero Subtitle Narrative</label>
                          <textarea
                            rows={2}
                            value={homeHeroSubtitle}
                            onChange={(e) => setHomeHeroSubtitle(e.target.value)}
                            className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 resize-none"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-slate-500">Primary Button Label</label>
                            <input
                              type="text"
                              value={homeHeroPrimaryCta}
                              onChange={(e) => setHomeHeroPrimaryCta(e.target.value)}
                              className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
                            />
                          </div>
                          <div>
                            <label className="text-slate-500">Secondary Button Label</label>
                            <input
                              type="text"
                              value={homeHeroSecondaryCta}
                              onChange={(e) => setHomeHeroSecondaryCta(e.target.value)}
                              className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-slate-500">Hero Background Image URL</label>
                          <input
                            type="text"
                            value={homeHeroImage}
                            onChange={(e) => setHomeHeroImage(e.target.value)}
                            className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Promotional Highlight Banner Controls */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                      <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                        <Tag className="w-4 h-4 text-indigo-600" />
                        Flash Sale & Promotional Highlight Card
                      </h4>
                      <div className="space-y-3 text-xs font-bold text-slate-600">
                        <div>
                          <label className="text-slate-500">Promotional Headline</label>
                          <input
                            type="text"
                            value={homePromoHeadline}
                            onChange={(e) => setHomePromoHeadline(e.target.value)}
                            className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
                          />
                        </div>
                        <div>
                          <label className="text-slate-500">Promotional Description</label>
                          <textarea
                            rows={2}
                            value={homePromoSubtext}
                            onChange={(e) => setHomePromoSubtext(e.target.value)}
                            className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 resize-none"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-slate-500">Coupon Voucher Tag</label>
                            <input
                              type="text"
                              value={homePromoCode}
                              onChange={(e) => setHomePromoCode(e.target.value)}
                              className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
                            />
                          </div>
                          <div>
                            <label className="text-slate-500">Discount Highlight Badge</label>
                            <input
                              type="text"
                              value={homePromoDiscount}
                              onChange={(e) => setHomePromoDiscount(e.target.value)}
                              className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Client Testimonials & Reviews Builder (Spans 2 columns) */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4 lg:col-span-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                            <Quote className="w-5 h-5 text-indigo-600" />
                            Client Testimonials & Press Reviews ({homeTestimonials.length})
                          </h4>
                          <p className="text-xs text-slate-400 font-medium">Add, customize, or remove curated customer feedback</p>
                        </div>
                        <button
                          onClick={() => setIsTestimonialModalOpen(true)}
                          className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-xl text-xs shadow"
                        >
                          <Plus className="w-4 h-4" /> Add Testimonial
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {homeTestimonials.map((t) => (
                          <div key={t.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2 relative">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1 text-amber-400">
                                {[...Array(t.rating)].map((_, i) => (
                                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                                ))}
                              </div>
                              <button
                                onClick={() => setHomeTestimonials((prev) => prev.filter((item) => item.id !== t.id))}
                                className="text-slate-400 hover:text-rose-600 p-1 transition-colors"
                                title="Remove testimonial"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <p className="text-slate-600 text-xs italic leading-relaxed">"{t.quote}"</p>
                            <div className="pt-1 border-t border-slate-200/60">
                              <div className="font-bold text-slate-900 text-xs">{t.name}</div>
                              <div className="text-indigo-600 text-xxs font-semibold">{t.role}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ==================== 2. ABOUT US CREATOR ==================== */}
              {pageBuilderSubTab === 'about' && (
                <div className="space-y-6">
                  {/* Hero & Story Section */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-indigo-600" />
                        About Page Header & Mission Story
                      </h4>
                      <Link
                        href="/about"
                        target="_blank"
                        className="text-xs font-bold text-indigo-600 hover:underline inline-flex items-center gap-1"
                      >
                        Preview /about in new tab <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold text-slate-600">
                      <div>
                        <label className="text-slate-500">Hero Section Heading</label>
                        <input
                          type="text"
                          value={aboutHeroTitle}
                          onChange={(e) => setAboutHeroTitle(e.target.value)}
                          className="w-full mt-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800"
                        />
                      </div>
                      <div>
                        <label className="text-slate-500">Top Tagline Badge</label>
                        <input
                          type="text"
                          value={aboutHeroTagline}
                          onChange={(e) => setAboutHeroTagline(e.target.value)}
                          className="w-full mt-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-slate-500">Hero Subtitle Narrative</label>
                        <textarea
                          rows={2}
                          value={aboutHeroSubtitle}
                          onChange={(e) => setAboutHeroSubtitle(e.target.value)}
                          className="w-full mt-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 resize-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Core Values Builder */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                          <Award className="w-5 h-5 text-amber-500" />
                          Core Values & Principles ({aboutValues.length})
                        </h4>
                        <p className="text-xs text-slate-400 font-medium">Add, customize, or remove core brand values</p>
                      </div>
                      <button
                        onClick={() => setIsValueModalOpen(true)}
                        className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-xl text-xs shadow transition-all"
                      >
                        <Plus className="w-4 h-4" /> Add New Value
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {aboutValues.map((val) => (
                        <div key={val.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 relative group space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-900 text-sm">{val.title}</span>
                            <button
                              onClick={() => setAboutValues((prev) => prev.filter((v) => v.id !== val.id))}
                              className="text-slate-400 hover:text-rose-600 p-1 transition-colors"
                              title="Delete value"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <p className="text-slate-500 text-xs leading-relaxed">{val.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Team Members Builder */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                          <Briefcase className="w-5 h-5 text-indigo-600" />
                          Leadership & Team Profiles ({aboutTeam.length})
                        </h4>
                        <p className="text-xs text-slate-400 font-medium">Manage founders, designers, and curators</p>
                      </div>
                      <button
                        onClick={() => setIsTeamModalOpen(true)}
                        className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-xl text-xs shadow transition-all"
                      >
                        <Plus className="w-4 h-4" /> Add Team Member
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {aboutTeam.map((member) => (
                        <div key={member.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-3.5 relative group">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-12 h-12 rounded-full object-cover border border-slate-200 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="font-bold text-slate-900 text-sm truncate">{member.name}</div>
                            <div className="text-indigo-600 font-semibold text-xxs mb-1">{member.role}</div>
                            <p className="text-slate-500 text-xxs line-clamp-2 leading-relaxed">{member.bio}</p>
                          </div>
                          <button
                            onClick={() => setAboutTeam((prev) => prev.filter((m) => m.id !== member.id))}
                            className="text-slate-400 hover:text-rose-600 p-1 transition-colors shrink-0"
                            title="Remove member"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Milestones Timeline Builder */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                          <Calendar className="w-5 h-5 text-indigo-600" />
                          Company Timeline & Evolution Milestones ({aboutMilestones.length})
                        </h4>
                        <p className="text-xs text-slate-400 font-medium">Add historical journey steps</p>
                      </div>
                      <button
                        onClick={() => setIsMilestoneModalOpen(true)}
                        className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-xl text-xs shadow transition-all"
                      >
                        <Plus className="w-4 h-4" /> Add Milestone
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {aboutMilestones.map((ms) => (
                        <div key={ms.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1 relative">
                          <div className="flex items-center justify-between">
                            <span className="text-indigo-600 font-black text-lg">{ms.year}</span>
                            <button
                              onClick={() => setAboutMilestones((prev) => prev.filter((m) => m.id !== ms.id))}
                              className="text-slate-400 hover:text-rose-600 p-1"
                              title="Delete milestone"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="font-bold text-slate-800 text-xs">{ms.title}</div>
                          <p className="text-slate-500 text-xxs leading-relaxed">{ms.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ==================== 3. CONTACT US CREATOR ==================== */}
              {pageBuilderSubTab === 'contact' && (
                <div className="space-y-6">
                  {/* Hero & SLA section */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-indigo-600" />
                        Contact Page Header & Support SLA
                      </h4>
                      <Link
                        href="/contact"
                        target="_blank"
                        className="text-xs font-bold text-indigo-600 hover:underline inline-flex items-center gap-1"
                      >
                        Preview /contact in new tab <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold text-slate-600">
                      <div>
                        <label className="text-slate-500">Contact Title</label>
                        <input
                          type="text"
                          value={contactHeroTitle}
                          onChange={(e) => setContactHeroTitle(e.target.value)}
                          className="w-full mt-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800"
                        />
                      </div>
                      <div>
                        <label className="text-slate-500">Live Support SLA Badge</label>
                        <input
                          type="text"
                          value={contactSlaBadge}
                          onChange={(e) => setContactSlaBadge(e.target.value)}
                          className="w-full mt-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-slate-500">Contact Subtitle Narrative</label>
                        <textarea
                          rows={2}
                          value={contactHeroSubtitle}
                          onChange={(e) => setContactHeroSubtitle(e.target.value)}
                          className="w-full mt-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 resize-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Showrooms Builder */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                          <Globe className="w-5 h-5 text-indigo-600" />
                          Global Showrooms & Flagships ({contactShowrooms.length})
                        </h4>
                        <p className="text-xs text-slate-400 font-medium">Add, configure, or remove store showroom locations</p>
                      </div>
                      <button
                        onClick={() => setIsShowroomModalOpen(true)}
                        className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-xl text-xs shadow transition-all"
                      >
                        <Plus className="w-4 h-4" /> Add Showroom
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {contactShowrooms.map((sr) => (
                        <div key={sr.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2 relative">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-900 text-sm">{sr.city} Flagship</span>
                            <button
                              onClick={() => setContactShowrooms((prev) => prev.filter((s) => s.id !== sr.id))}
                              className="text-slate-400 hover:text-rose-600 p-1"
                              title="Delete showroom"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="text-slate-600 text-xs font-semibold">{sr.address}</div>
                          <div className="text-indigo-600 text-xxs font-bold">{sr.phone}</div>
                          <div className="text-slate-400 text-xxs">{sr.hours}</div>
                          <div className="text-slate-600 text-xxs font-medium bg-white p-2 rounded-lg border border-slate-100">
                            <span className="font-bold text-indigo-600">Services:</span> {sr.services}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* FAQs Builder */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                          <HelpCircle className="w-5 h-5 text-indigo-600" />
                          Frequently Asked Questions (FAQs) ({contactFaqs.length})
                        </h4>
                        <p className="text-xs text-slate-400 font-medium">Add, customize, or delete support Q&As</p>
                      </div>
                      <button
                        onClick={() => setIsFaqModalOpen(true)}
                        className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-xl text-xs shadow transition-all"
                      >
                        <Plus className="w-4 h-4" /> Add New FAQ
                      </button>
                    </div>

                    <div className="space-y-3">
                      {contactFaqs.map((faq) => (
                        <div key={faq.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-start justify-between gap-4">
                          <div className="space-y-1">
                            <div className="font-bold text-slate-900 text-xs sm:text-sm">{faq.question}</div>
                            <p className="text-slate-600 text-xs leading-relaxed">{faq.answer}</p>
                          </div>
                          <button
                            onClick={() => setContactFaqs((prev) => prev.filter((f) => f.id !== faq.id))}
                            className="text-slate-400 hover:text-rose-600 p-1.5 shrink-0"
                            title="Remove FAQ"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ==================== TAB: SETTINGS ==================== */}
          {activeTab === 'settings' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm lg:col-span-2 space-y-6">
                <div>
                  <h4 className="font-black text-slate-900 text-lg">General Store Configuration</h4>
                  <p className="text-xs text-slate-400">Configure global metadata parameters, currency modes, and storefront states</p>
                </div>

                <form className="space-y-4 text-xs font-bold text-slate-500">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-slate-500">Storefront Display Name</label>
                      <input
                        type="text"
                        value={storeName}
                        onChange={(e) => setStoreName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-slate-500">Accounting Currency Base</label>
                      <select
                        value={storeCurrency}
                        onChange={(e) => setStoreCurrency(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 cursor-pointer"
                      >
                        <option value="USD ($)">USD ($) — United States Dollar</option>
                        <option value="EUR (€)">EUR (€) — Eurozone</option>
                        <option value="GBP (£)">GBP (£) — British Pound</option>
                        <option value="JPY (¥)">JPY (¥) — Japanese Yen</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-500">Free Shipping Trigger Threshold ($)</label>
                    <input
                      type="number"
                      value={freeShippingThreshold}
                      onChange={(e) => setFreeShippingThreshold(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800"
                    />
                  </div>

                  <div className="pt-4 border-t border-slate-50 flex justify-end">
                    <button
                      type="button"
                      onClick={() => alert('Settings successfully updated locally!')}
                      className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold px-6 py-2.5 rounded-xl text-xs shadow"
                    >
                      <CheckCircle2 className="w-4 h-4" /> Save Store Settings
                    </button>
                  </div>
                </form>
              </div>

              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                  <div className="flex items-center gap-2 text-slate-800 font-bold">
                    <ShieldAlert className="w-5 h-5 text-indigo-600" />
                    <span>Failsafe Maintenance Trigger</span>
                  </div>
                  <p className="text-slate-400 text-xxs font-medium leading-relaxed">
                    Enabling maintenance mode suspends user checkout actions.
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs font-bold text-slate-700">Maintenance Lockout</span>
                    <button
                      onClick={() => setMaintenanceMode(!maintenanceMode)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${
                        maintenanceMode ? 'bg-indigo-600' : 'bg-slate-200'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ${
                          maintenanceMode ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ==================== MODAL: ADD / EDIT PRODUCT ==================== */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                <Package className="w-5 h-5 text-indigo-600" />
                {editingProduct ? 'Edit Catalog Item' : 'Add New Catalog Item'}
              </h3>
              <button onClick={() => setIsProductModalOpen(false)} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="p-6 space-y-4 text-xs font-bold text-slate-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-slate-500">Item Name *</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800"
                    placeholder="Classic Suede Boots"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-500">Selling Price ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-500">Original Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formOriginalPrice}
                    onChange={(e) => setFormOriginalPrice(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-500">Product Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 cursor-pointer"
                  >
                    {categories.map((c) => (
                      <option key={c.slug} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-500">Subcategory</label>
                  <input
                    type="text"
                    value={formSubcategory}
                    onChange={(e) => setFormSubcategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800"
                  />
                </div>

                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-slate-500">Image URL</label>
                  <input
                    type="text"
                    value={formImage}
                    onChange={(e) => setFormImage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3.5">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-500 text-xs font-bold"
                >
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-extrabold text-xs">
                  {editingProduct ? 'Update Item' : 'Publish Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== MODAL: ADD TESTIMONIAL ==================== */}
      {isTestimonialModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black text-slate-900 text-base">Add Client Testimonial</h3>
              <button onClick={() => setIsTestimonialModalOpen(false)} className="p-1 rounded-lg text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddTestimonial} className="space-y-3 text-xs font-bold text-slate-600">
              <div>
                <label className="text-slate-500">Client Name *</label>
                <input
                  type="text"
                  required
                  value={newTestimonialName}
                  onChange={(e) => setNewTestimonialName(e.target.value)}
                  placeholder="e.g. Eleanor Rigby"
                  className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
                />
              </div>
              <div>
                <label className="text-slate-500">Title / Location</label>
                <input
                  type="text"
                  value={newTestimonialRole}
                  onChange={(e) => setNewTestimonialRole(e.target.value)}
                  placeholder="e.g. Interior Stylist, London"
                  className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
                />
              </div>
              <div>
                <label className="text-slate-500">Star Rating</label>
                <select
                  value={newTestimonialRating}
                  onChange={(e) => setNewTestimonialRating(e.target.value)}
                  className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 cursor-pointer"
                >
                  <option value="5">5 Stars ★★★★★</option>
                  <option value="4">4 Stars ★★★★☆</option>
                  <option value="3">3 Stars ★★★☆☆</option>
                </select>
              </div>
              <div>
                <label className="text-slate-500">Testimonial Quote *</label>
                <textarea
                  rows={3}
                  required
                  value={newTestimonialQuote}
                  onChange={(e) => setNewTestimonialQuote(e.target.value)}
                  placeholder="Client feedback and review statement..."
                  className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 resize-none"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsTestimonialModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-500"
                >
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-extrabold">
                  Add Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== MODAL: ADD NAV ITEM ==================== */}
      {isNavModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black text-slate-900 text-base">Add Header Navigation Link</h3>
              <button onClick={() => setIsNavModalOpen(false)} className="p-1 rounded-lg text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddNav} className="space-y-3 text-xs font-bold text-slate-600">
              <div>
                <label className="text-slate-500">Menu Item Name *</label>
                <input
                  type="text"
                  required
                  value={newNavName}
                  onChange={(e) => setNewNavName(e.target.value)}
                  placeholder="e.g. Lookbook"
                  className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
                />
              </div>
              <div>
                <label className="text-slate-500">Target URL / Route *</label>
                <input
                  type="text"
                  required
                  value={newNavHref}
                  onChange={(e) => setNewNavHref(e.target.value)}
                  placeholder="/shop?collection=lookbook"
                  className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsNavModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-500"
                >
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-extrabold">
                  Add Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== MODAL: ADD QUICK LINK ==================== */}
      {isQuickLinkModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black text-slate-900 text-base">Add Quick Link</h3>
              <button onClick={() => setIsQuickLinkModalOpen(false)} className="p-1 rounded-lg text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddQuickLink} className="space-y-3 text-xs font-bold text-slate-600">
              <div>
                <label className="text-slate-500">Link Label *</label>
                <input
                  type="text"
                  required
                  value={newQuickLinkName}
                  onChange={(e) => setNewQuickLinkName(e.target.value)}
                  placeholder="e.g. Gift Cards"
                  className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
                />
              </div>
              <div>
                <label className="text-slate-500">Link URL *</label>
                <input
                  type="text"
                  required
                  value={newQuickLinkHref}
                  onChange={(e) => setNewQuickLinkHref(e.target.value)}
                  placeholder="/shop"
                  className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsQuickLinkModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-500"
                >
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-extrabold">
                  Add Quick Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== MODAL: ADD SERVICE LINK ==================== */}
      {isServiceLinkModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black text-slate-900 text-base">Add Customer Service Link</h3>
              <button onClick={() => setIsServiceLinkModalOpen(false)} className="p-1 rounded-lg text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddServiceLink} className="space-y-3 text-xs font-bold text-slate-600">
              <div>
                <label className="text-slate-500">Service Label *</label>
                <input
                  type="text"
                  required
                  value={newServiceLinkName}
                  onChange={(e) => setNewServiceLinkName(e.target.value)}
                  placeholder="e.g. Warranty Claim"
                  className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
                />
              </div>
              <div>
                <label className="text-slate-500">Service URL *</label>
                <input
                  type="text"
                  required
                  value={newServiceLinkHref}
                  onChange={(e) => setNewServiceLinkHref(e.target.value)}
                  placeholder="/contact"
                  className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsServiceLinkModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-500"
                >
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-extrabold">
                  Add Service Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== MODAL: ADD GUARANTEE ==================== */}
      {isGuaranteeModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black text-slate-900 text-base">Add Value Guarantee</h3>
              <button onClick={() => setIsGuaranteeModalOpen(false)} className="p-1 rounded-lg text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddGuarantee} className="space-y-3 text-xs font-bold text-slate-600">
              <div>
                <label className="text-slate-500">Guarantee Title *</label>
                <input
                  type="text"
                  required
                  value={newGuaranteeTitle}
                  onChange={(e) => setNewGuaranteeTitle(e.target.value)}
                  placeholder="e.g. Lifetime Craftsmanship Warranty"
                  className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
                />
              </div>
              <div>
                <label className="text-slate-500">Description Summary *</label>
                <input
                  type="text"
                  required
                  value={newGuaranteeDesc}
                  onChange={(e) => setNewGuaranteeDesc(e.target.value)}
                  placeholder="Free repair services on all leather goods"
                  className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsGuaranteeModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-500"
                >
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-extrabold">
                  Add Guarantee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== MODAL: ADD TEAM MEMBER ==================== */}
      {isTeamModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-2xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black text-slate-900 text-base">Add New Leadership Team Profile</h3>
              <button onClick={() => setIsTeamModalOpen(false)} className="p-1 rounded-lg text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddTeamMember} className="space-y-3 text-xs font-bold text-slate-600">
              <div>
                <label className="text-slate-500">Full Name *</label>
                <input
                  type="text"
                  required
                  value={newTeamName}
                  onChange={(e) => setNewTeamName(e.target.value)}
                  placeholder="e.g. Julian Hayes"
                  className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
                />
              </div>
              <div>
                <label className="text-slate-500">Role / Job Title *</label>
                <input
                  type="text"
                  required
                  value={newTeamRole}
                  onChange={(e) => setNewTeamRole(e.target.value)}
                  placeholder="e.g. Creative Director"
                  className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
                />
              </div>
              <div>
                <label className="text-slate-500">Profile Photo URL</label>
                <input
                  type="text"
                  value={newTeamImage}
                  onChange={(e) => setNewTeamImage(e.target.value)}
                  className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
                />
              </div>
              <div>
                <label className="text-slate-500">Bio Narrative</label>
                <textarea
                  rows={2}
                  value={newTeamBio}
                  onChange={(e) => setNewTeamBio(e.target.value)}
                  placeholder="Short professional biography..."
                  className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 resize-none"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsTeamModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-500"
                >
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-extrabold">
                  Create Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== MODAL: ADD FAQ ==================== */}
      {isFaqModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-2xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black text-slate-900 text-base">Create New FAQ</h3>
              <button onClick={() => setIsFaqModalOpen(false)} className="p-1 rounded-lg text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddFaq} className="space-y-3 text-xs font-bold text-slate-600">
              <div>
                <label className="text-slate-500">Question Title *</label>
                <input
                  type="text"
                  required
                  value={newFaqQuestion}
                  onChange={(e) => setNewFaqQuestion(e.target.value)}
                  placeholder="e.g. Do you offer international warranty?"
                  className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
                />
              </div>
              <div>
                <label className="text-slate-500">Answer *</label>
                <textarea
                  rows={4}
                  required
                  value={newFaqAnswer}
                  onChange={(e) => setNewFaqAnswer(e.target.value)}
                  placeholder="Detailed answer explaining the policy or instruction..."
                  className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 resize-none"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsFaqModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-500"
                >
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-extrabold">
                  Create FAQ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== MODAL: ADD VALUE ==================== */}
      {isValueModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-2xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black text-slate-900 text-base">Add Brand Value</h3>
              <button onClick={() => setIsValueModalOpen(false)} className="p-1 rounded-lg text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddValue} className="space-y-3 text-xs font-bold text-slate-600">
              <div>
                <label className="text-slate-500">Value Title *</label>
                <input
                  type="text"
                  required
                  value={newValueTitle}
                  onChange={(e) => setNewValueTitle(e.target.value)}
                  placeholder="e.g. Masterful Craftsmanship"
                  className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
                />
              </div>
              <div>
                <label className="text-slate-500">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={newValueDesc}
                  onChange={(e) => setNewValueDesc(e.target.value)}
                  placeholder="Explain why this pillar drives the brand..."
                  className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 resize-none"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsValueModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-500"
                >
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-extrabold">
                  Add Value
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== MODAL: ADD MILESTONE ==================== */}
      {isMilestoneModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-2xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black text-slate-900 text-base">Add Journey Milestone</h3>
              <button onClick={() => setIsMilestoneModalOpen(false)} className="p-1 rounded-lg text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddMilestone} className="space-y-3 text-xs font-bold text-slate-600">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-500">Year *</label>
                  <input
                    type="text"
                    required
                    value={newMilestoneYear}
                    onChange={(e) => setNewMilestoneYear(e.target.value)}
                    placeholder="2027"
                    className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
                  />
                </div>
                <div>
                  <label className="text-slate-500">Milestone Title *</label>
                  <input
                    type="text"
                    required
                    value={newMilestoneTitle}
                    onChange={(e) => setNewMilestoneTitle(e.target.value)}
                    placeholder="Global AI Atelier"
                    className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
                  />
                </div>
              </div>
              <div>
                <label className="text-slate-500">Milestone Summary</label>
                <textarea
                  rows={2}
                  value={newMilestoneDesc}
                  onChange={(e) => setNewMilestoneDesc(e.target.value)}
                  placeholder="Summary of this milestone achievement..."
                  className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 resize-none"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsMilestoneModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-500"
                >
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-extrabold">
                  Add Milestone
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== MODAL: ADD SHOWROOM ==================== */}
      {isShowroomModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-2xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black text-slate-900 text-base">Add Showroom Location</h3>
              <button onClick={() => setIsShowroomModalOpen(false)} className="p-1 rounded-lg text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddShowroom} className="space-y-3 text-xs font-bold text-slate-600">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-500">City *</label>
                  <input
                    type="text"
                    required
                    value={newShowroomCity}
                    onChange={(e) => setNewShowroomCity(e.target.value)}
                    placeholder="e.g. Paris"
                    className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
                  />
                </div>
                <div>
                  <label className="text-slate-500">Phone</label>
                  <input
                    type="text"
                    value={newShowroomPhone}
                    onChange={(e) => setNewShowroomPhone(e.target.value)}
                    placeholder="+33 1 42 68 00 00"
                    className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
                  />
                </div>
              </div>
              <div>
                <label className="text-slate-500">Street Address *</label>
                <input
                  type="text"
                  required
                  value={newShowroomAddress}
                  onChange={(e) => setNewShowroomAddress(e.target.value)}
                  placeholder="12 Place Vendôme, 75001 Paris"
                  className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
                />
              </div>
              <div>
                <label className="text-slate-500">Hours</label>
                <input
                  type="text"
                  value={newShowroomHours}
                  onChange={(e) => setNewShowroomHours(e.target.value)}
                  placeholder="Mon-Sat: 10am - 7pm"
                  className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
                />
              </div>
              <div>
                <label className="text-slate-500">Services & Features</label>
                <input
                  type="text"
                  value={newShowroomServices}
                  onChange={(e) => setNewShowroomServices(e.target.value)}
                  placeholder="Haute Couture Fitting, VIP Champagne Lounge"
                  className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsShowroomModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-500"
                >
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-extrabold">
                  Add Showroom
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
