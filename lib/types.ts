export interface SiteContent {
  slug: string;
  lang?: "en" | "nl";
  business_name: string;
  niche: string;
  theme: "bold";
  palette: string;
  tagline?: string;
  about?: string;
  hero: {
    headline: string;
    subheadline: string;
    cta_primary: string;
    cta_secondary: string;
    image_url: string;
  };
  services: Array<{
    title: string;
    text: string;
    icon: string;
  }>;
  gallery?: Array<{
    url: string;
    alt: string;
  }>;
  reviews: Array<{
    name: string;
    text: string;
    stars: number;
    date?: string;
  }>;
  awards?: string[];
  faq: Array<{
    question: string;
    answer: string;
  }>;
  contact: {
    phone: string;
    email?: string;
    city: string;
    address?: string;
    maps_url: string;
    booking_url?: string;
  };
  socials?: {
    facebook?: string;
    instagram?: string;
    tiktok?: string;
    pinterest?: string;
  };
  metadata: {
    generated_at: string;
    lead_id: string;
    version: number;
  };
}
