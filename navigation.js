import { createLocalizedPathnamesNavigation } from "next-intl/navigation";

export const locales = ["en", "sk", "cz", "de", "fr", "es", "ua", "pl", "hu"];
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
    ua: "/app",
    pl: "/aplikacja",
    hu: "/alkalmazas",
  },
  "/app/shoppingList/[id]": {
    en: "/app/shoppingList/[id]",
    sk: "/aplikacia/nakupnyZoznam/[id]]",
    cz: "/aplikace/nakupniSeznam/[id]",
    de: "/anmeldung/einkaufsliste/[id]",
    fr: "/application/listeDeCourses/[id]",
    es: "/aplicacion/listaDeCompras/[id]",
    ua: "/app/shoppingList/[id]",
    pl: "/aplikacja/listaZakupow/[id]",
    hu: "/alkalmazas/bevasarlolista/[id]",
  },
};

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createLocalizedPathnamesNavigation({ locales, localePrefix, pathnames });
