import type { LinkProps } from "next/link";

export type NextLinkHref = LinkProps<string>["href"];

export interface NavItem {
  title: string;
  href: NextLinkHref;
  description?: string;
}

export interface FooterItem {
  title: string;
  href: NextLinkHref;
  external?: boolean;
}

export interface FooterSection {
  title: string;
  items: FooterItem[];
}

export interface SiteConfig {
  name: string;
  description: string;
  links: {
    [key: string]: NextLinkHref;
  };
  nav: NavItem[];
  footer: {
    main: FooterSection[];
    social: FooterItem[];
  };
}
