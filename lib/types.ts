export interface SiteContent {
  slug: string;
  business_name: string;
  niche: string;
  theme: "bold";
  palette: string;
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
  reviews: Array<{
    name: string;
    text: string;
    stars: number;
  }>;
  faq: Array<{
    question: string;
    answer: string;
  }>;
  contact: {
    phone: string;
    city: string;
    maps_url: string;
  };
  metadata: {
    generated_at: string;
    lead_id: string;
    version: number;
  };
}
