import fs from "fs";
import path from "path";
import { SiteContent } from "./types";

const SITES_DIR = path.join(process.cwd(), "sites");

export function getAllSlugs(): string[] {
  if (!fs.existsSync(SITES_DIR)) return [];
  return fs
    .readdirSync(SITES_DIR)
    .filter((dir) => {
      if (dir.startsWith("_")) return false;
      const contentPath = path.join(SITES_DIR, dir, "content.json");
      return fs.existsSync(contentPath);
    });
}

export function getSiteContent(slug: string): SiteContent | null {
  const contentPath = path.join(SITES_DIR, slug, "content.json");
  if (!fs.existsSync(contentPath)) return null;
  const raw = fs.readFileSync(contentPath, "utf-8");
  return JSON.parse(raw) as SiteContent;
}
