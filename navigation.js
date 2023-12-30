import { createLocalizedPathnamesNavigation } from "next-intl/navigation";

export const locales = ["en", "sk", "cz", "de", "fr", "es", "ua"];
export const localePrefix = "always"; // Default

// The `pathnames` object holds pairs of internal
// and external paths, separated by locale.
export const pathnames = {
  "/": "/",

  "/app": {
    en: "/app",
    sk: "/aplikacia",
    cz: "/aplikace",
    de: "/anmeldung",
    fr: "/application",
    es: "/aplicacion",
    ua: "/app"
  },
  "/app/shoppigList": {
    en: "/app",
    sk: "/aplikacia",
    cz: "/aplikace",
    de: "/anmeldung",
    fr: "/application",
    es: "/aplicacion",
    ua: "/app"
  },
};

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createLocalizedPathnamesNavigation({ locales, localePrefix, pathnames });
