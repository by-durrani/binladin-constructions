import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { navigation, site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", ...navigation.map((link) => link.href)];
  return [
    ...pages.map((path) => ({ url: new URL(path, site.url).toString() })),
    ...projects.map((project) => ({
      url: new URL(`/projects/${project.slug}`, site.url).toString(),
    })),
  ];
}
