interface ContentInput {
  businessName: string;
  niche: string;
  city: string;
  rating: number | null;
  reviewTexts: string[];
  description: string | null;
  category: string;
}

interface GeneratedContent {
  tagline: string;
  about: string;
  hero: {
    headline: string;
    subheadline: string;
    cta_primary: string;
    cta_secondary: string;
  };
  services: Array<{
    title: string;
    text: string;
    icon: string;
  }>;
  faq: Array<{
    question: string;
    answer: string;
  }>;
  trust_badges: string[];
}

function getOpenAIKey(): string {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error("OPENAI_API_KEY niet gevonden in environment");
  return key;
}

export async function generateContent(input: ContentInput, lang = "nl"): Promise<GeneratedContent> {
  console.log("✍️  Content genereren via OpenAI...");

  const reviewSample = input.reviewTexts.slice(0, 8).join("\n---\n");

  const langLabel = lang === "fr" ? "Frans" : lang === "nl" ? "Nederlands" : "Engels";

  const langExamples = lang === "fr"
    ? {
        headline: "Votre [niche] à [ville]",
        ctaPrimary: "Demander un devis",
        ctaSecondary: "Voir nos réalisations",
        badges: `"${input.rating || 4.5}★ Avis Google", "Devis gratuit", "Région ${input.city}"`,
        noReviews: "Pas d'avis disponibles",
        unknown: "inconnu",
        notAvailable: "non disponible",
      }
    : {
        headline: "Uw [niche] in [stad]",
        ctaPrimary: "Offerte aanvragen",
        ctaSecondary: "Bekijk projecten",
        badges: `"${input.rating || 4.5}★ Google Reviews", "Gratis offerte", "Regio ${input.city}"`,
        noReviews: "Geen reviews beschikbaar",
        unknown: "onbekend",
        notAvailable: "niet beschikbaar",
      };

  const prompt = `Je bent een copywriter voor een premium leadgeneratie website. Schrijf content voor het volgende bedrijf.

BEDRIJF: ${input.businessName}
NICHE: ${input.niche}
STAD: ${input.city}
CATEGORIE: ${input.category}
RATING: ${input.rating || langExamples.unknown}
BESCHRIJVING: ${input.description || langExamples.notAvailable}

ECHTE REVIEWS:
${reviewSample || langExamples.noReviews}

REGELS:
- Schrijf in het ${langLabel}${lang === "fr" ? ". Gebruik de u-vorm (vous), professioneel maar warm." : ""}
- Noem ALLEEN services die in de reviews of beschrijving voorkomen. Verzin NIETS.
- Tagline: max 4 woorden, krachtig
- About: 2-3 zinnen over het bedrijf, gebaseerd op wat de reviews zeggen
- Hero headline: "${langExamples.headline}" formaat
- Hero subheadline: 1 zin die de kernbelofte samenvat
- CTA primary: actiegericht (bijv. "${langExamples.ctaPrimary}")
- CTA secondary: laagdrempelig (bijv. "${langExamples.ctaSecondary}")
- Services: 3-4 items, elk met title, text (1-2 zinnen), en icon
- Icons MOETEN uit deze lijst komen: hammer, saw, ruler, drill, bricks, trowel, wall, tiles, level, bathroom, floor, kitchen, wrench, scissors, palette, sparkles
- FAQ: 4 vragen die een potentiële klant zou stellen, met concrete antwoorden
- Trust badges: 3 items, CONCREET met echte data. Formaat voorbeelden: ${langExamples.badges}. Gebruik de echte rating en stad.

Geef ALLEEN valid JSON terug in dit exacte formaat:
{
  "tagline": "...",
  "about": "...",
  "hero": { "headline": "...", "subheadline": "...", "cta_primary": "...", "cta_secondary": "..." },
  "services": [{ "title": "...", "text": "...", "icon": "..." }],
  "faq": [{ "question": "...", "answer": "..." }],
  "trust_badges": ["...", "...", "..."]
}`;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getOpenAIKey()}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 2000,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`OpenAI API fout (${res.status}): ${text}`);
  }

  const data = await res.json();
  const content = JSON.parse(data.choices[0].message.content);

  // Valideer dat alle velden aanwezig zijn
  if (!content.tagline || !content.hero || !content.services || !content.faq) {
    throw new Error("OpenAI response mist verplichte velden");
  }

  return content;
}
