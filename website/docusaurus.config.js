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
      },
    ],
    [
      "content-blog",
      {
        id: "newsletter",
        path: "newsletter",
        routeBasePath: "/newsletter",
        showReadingTime: true,
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "This Week In React",
        logo: {
          alt: "This Week In React Logo",
          src: "/img/TWIR_LOGO_SIMPLE.png",
        },
        items: [
          { to: "/articles", label: "Articles", position: "left" },
          { to: "/newsletter", label: "Newsletter", position: "left" },
          { to: "/advertise", label: "Advertise", position: "left" },
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
