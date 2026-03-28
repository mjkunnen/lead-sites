export type IconName =
  | "hammer" | "saw" | "ruler" | "drill" | "bricks" | "trowel" | "wall"
  | "tiles" | "level" | "bathroom" | "floor" | "kitchen" | "wrench"
  | "scissors" | "palette" | "sparkles" | "heart" | "default";

export interface SiteContent {
  slug: string;
  lang?: "en" | "nl";
  business_name: string;
  niche: string;
  theme: "bold";
  palette: string;
  tagline?: string;
  about?: string;
  trust_badges?: string[];
  stats?: {
    years?: number;
    projects?: number;
    reviews_count?: number;
  };
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
  before_after?: Array<{
    before_url: string;
    after_url: string;
    label: string;
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
    phone?: string;
    email?: string;
    city: string;
    address?: string;
    maps_url: string;
    booking_url?: string;
  };
  working_hours?: Record<string, string>;
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
