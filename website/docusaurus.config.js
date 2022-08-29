// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "This Week In React",
  tagline: "Stay up-to-date now!",
  url: "https://thisweekinreact.com",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "/favicon/favicon.ico",

  i18n: {
    defaultLocale: "en",
    locales: ["en", "fr"],
    localeConfigs: {
      en: {
        label: "English 🇬🇧",
      },
      fr: {
        label: "Français 🇫🇷",
      },
    },
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  plugins: [
    [
      "content-blog",
      {
        id: "articles",
        path: "articles",
        showReadingTime: true,
        routeBasePath: "/articles",
        blogSidebarTitle: "All posts",
        blogSidebarCount: "ALL",
      },
    ],
    [
      "content-blog",
      {
        id: "newsletter",
        path: "newsletter",
        routeBasePath: "/newsletter",
        showReadingTime: true,
        blogSidebarTitle: "All posts",
        blogSidebarCount: "ALL",
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      announcementBar: {
        id: "subscribe-now-v1",
        content: "NOOP - to swizzle",
        backgroundColor: "#fafbfc",
        textColor: "#091E42",
        isCloseable: true,
      },
      navbar: {
        title: "This Week In React",
        logo: {
          alt: "This Week In React Logo",
          src: "/img/TWIR_LOGO_SIMPLE_NOBG.png",
          width: 32,
          height: 32,
        },
        items: [
          { to: "/articles", label: "Articles", position: "left" },
          { to: "/newsletter", label: "Newsletter", position: "left" },
          { to: "/advertise", label: "Advertise", position: "left" },
          { type: "localeDropdown", position: "right" },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "This Week In React",
            items: [
              {
                label: "Articles",
                to: "/articles",
              },
              {
                label: "Newsletter",
                to: "/newsletter",
              },
              {
                label: "Advertise",
                href: "/advertise",
              },
              {
                label: "Discord",
                href: "https://thisweekinreact.com/discord",
              },
            ],
          },
          {
            title: "Sébastien Lorber",
            items: [
              {
                label: "Twitter",
                href: "https://twitter.com/sebastienlorber",
              },
              {
                label: "Website",
                href: "https://sebastienlorber.com",
              },
              {
                label: "GitHub",
                href: "https://github.com/slorber",
              },
              {
                label: "Dev",
                href: "https://dev.to/sebastienlorber",
              },
              {
                label: "Hashnode",
                href: "https://hashnode.com/@sebastienlorber",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Sébastien Lorber. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
