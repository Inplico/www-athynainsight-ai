"use client";

import Link from "next/link";
import Image from "next/image";
import { navigation } from "@/lib/constants";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect, useRef } from "react";
import type { NextLinkHref } from "@/lib/types";

// Define interface for navigation items with optional children
interface NavItemWithChildren {
  name: string;
  href: string | NextLinkHref;
  children?: Array<{ name: string; href: string | NextLinkHref }>;
}

// External link icon component
const ExternalLinkIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-3.5 w-3.5 ml-1 inline"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
    />
  </svg>
);

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // Prevent scrolling when mobile menu is open
  useEffect((): (() => void) => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Handle clicks outside of dropdown
  useEffect((): (() => void) => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (activeDropdown) {
        const activeRef = dropdownRefs.current.get(activeDropdown);
        if (activeRef && !activeRef.contains(event.target as Node)) {
          setActiveDropdown(null);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeDropdown]);

  const toggleDropdown = (itemHref: string, e: React.MouseEvent): void => {
    e.stopPropagation(); // Prevent event from bubbling up
    setActiveDropdown(activeDropdown === itemHref ? null : itemHref);
  };

  // Set ref for dropdown container
  const setDropdownRef = (
    el: HTMLDivElement | null,
    itemHref: string,
  ): void => {
    if (el) {
      dropdownRefs.current.set(itemHref, el);
    } else {
      dropdownRefs.current.delete(itemHref);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/images/brand/athyna-logo.png"
                alt="Athyna Insight"
                width={40}
                height={40}
                className="h-10 w-10"
                priority
              />
              <span className="hidden font-bold sm:inline-block">
                Athyna Insight
              </span>
            </Link>
            <nav className="ml-6 hidden md:block">
              <ul className="flex space-x-4">
                {navigation.main.map((item: NavItemWithChildren) => {
                  const isExternal =
                    typeof item.href === "string" &&
                    item.href.startsWith("http");
                  const hasChildren = item.children && item.children.length > 0;
                  const itemKey = String(item.href);

                  return (
                    <li key={itemKey} className="relative">
                      {hasChildren ? (
                        <div
                          ref={(el) => setDropdownRef(el, itemKey)}
                          className="relative"
                        >
                          <button
                            onClick={(e) => toggleDropdown(itemKey, e)}
                            className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary px-1 py-1"
                            aria-expanded={activeDropdown === itemKey}
                            aria-haspopup="true"
                          >
                            {item.name}
                            <svg
                              className="ml-1 h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d={
                                  activeDropdown === itemKey
                                    ? "M5 15l7-7 7 7"
                                    : "M19 9l-7 7-7-7"
                                }
                              />
                            </svg>
                          </button>

                          {/* Dropdown menu */}
                          {activeDropdown === itemKey && (
                            <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50">
                              <div
                                className="py-1"
                                role="menu"
                                aria-orientation="vertical"
                              >
                                {/* Parent link */}
                                {isExternal ? (
                                  <a
                                    href={item.href as string}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    role="menuitem"
                                  >
                                    {item.name} <ExternalLinkIcon />
                                  </a>
                                ) : (
                                  <Link
                                    href={item.href as NextLinkHref}
                                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    role="menuitem"
                                    onClick={() => setActiveDropdown(null)}
                                  >
                                    {item.name}
                                  </Link>
                                )}

                                {/* Divider */}
                                <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>

                                {/* Children links */}
                                {item.children?.map((child) => {
                                  const isChildExternal =
                                    typeof child.href === "string" &&
                                    child.href.startsWith("http");

                                  return isChildExternal ? (
                                    <a
                                      key={String(child.href)}
                                      href={child.href as string}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                      role="menuitem"
                                      onClick={() => setActiveDropdown(null)}
                                    >
                                      {child.name} <ExternalLinkIcon />
                                    </a>
                                  ) : (
                                    <Link
                                      key={String(child.href)}
                                      href={child.href as NextLinkHref}
                                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                      role="menuitem"
                                      onClick={() => setActiveDropdown(null)}
                                    >
                                      {child.name}
                                    </Link>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      ) : isExternal ? (
                        <a
                          href={item.href as string}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary px-1 py-1 flex items-center"
                        >
                          {item.name}
                        </a>
                      ) : (
                        <Link
                          href={item.href as NextLinkHref}
                          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary px-1 py-1"
                        >
                          {item.name}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button asChild variant="default" className="hidden md:inline-flex">
              <Link href="/contact">Contact Us</Link>
            </Button>

            {/* Mobile menu button */}
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-gray-100 hover:text-primary md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state */}
        <div
          className={`fixed inset-0 z-50 md:hidden bg-background/90 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 border-t border-gray-200 dark:border-gray-800 shadow-lg transition-all duration-300 ease-in-out ${
            mobileMenuOpen
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-full pointer-events-none"
          }`}
          style={{ top: "64px", height: "calc(100vh - 64px)" }}
        >
          <div className="flex flex-col h-full overflow-y-auto">
            <div className="divide-y divide-gray-200/10">
              <div className="space-y-1 py-3 px-4">
                {navigation.main.map((item: NavItemWithChildren) => {
                  const isExternal =
                    typeof item.href === "string" &&
                    item.href.startsWith("http");
                  const hasChildren = item.children && item.children.length > 0;

                  return (
                    <div key={String(item.href)} className="py-1">
                      {/* Main item */}
                      {isExternal ? (
                        <a
                          href={item.href as string}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block rounded-lg px-3 py-2 text-base font-medium text-foreground hover:bg-gray-100/20 hover:text-primary flex items-center"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </a>
                      ) : (
                        <Link
                          href={item.href as NextLinkHref}
                          className="block rounded-lg px-3 py-2 text-base font-medium text-foreground hover:bg-gray-100/20 hover:text-primary"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      )}

                      {/* Children */}
                      {hasChildren && (
                        <div className="ml-4 mt-1 space-y-0.5">
                          {item.children?.map((child) => {
                            const isChildExternal =
                              typeof child.href === "string" &&
                              child.href.startsWith("http");

                            return isChildExternal ? (
                              <a
                                key={String(child.href)}
                                href={child.href as string}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground hover:bg-gray-100/20 hover:text-primary flex items-center"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {child.name} <ExternalLinkIcon />
                              </a>
                            ) : (
                              <Link
                                key={String(child.href)}
                                href={child.href as NextLinkHref}
                                className="block rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground hover:bg-gray-100/20 hover:text-primary"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {child.name}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="py-3 px-4">
                <Link
                  href="/contact"
                  className="block rounded-lg px-3 py-2 text-base font-semibold text-primary hover:bg-primary/20"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="h-safe-area-bottom bg-gradient-to-t from-background to-transparent opacity-40 pointer-events-none"></div>
          </div>
        </div>
      </Container>
    </header>
  );
};
