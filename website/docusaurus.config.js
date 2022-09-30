// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

const TwitterSvg =
  '<svg style="fill: #1DA1F2; vertical-align: middle; margin-left: 3px;" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path></svg>';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "This Week In React",
  tagline: "Stay up-to-date now!",
  url: "https://thisweekinreact.com",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "/favicon/favicon.ico",

  themes: ["@docusaurus/theme-live-codeblock"],

  i18n: {
    defaultLocale: "en",
    locales: ["en", "fr"],
    localeConfigs: {
      en: {
        label: "🇬🇧 English",
      },
      fr: {
        label: "🇫🇷 Français",
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
        blogTitle: "Articles",
        blogDescription: "Articles published on the This Week In React blog",
        blogSidebarTitle: "Articles",
        blogSidebarCount: "ALL",
        postsPerPage: 10,
        feedOptions: {
          title: "This Week In React - Articles",
          description: "Articles published on the This Week In React blog",
        },
      },
    ],
    [
      "content-blog",
      {
        id: "newsletter",
        path: "newsletter",
        routeBasePath: "/newsletter",
        showReadingTime: false, // TODO fix issue due to MDX imports
        blogTitle: "Newsletter",
        blogDescription:
          "Weekly issues of the This Week In React curation newsletter",
        blogSidebarTitle: "Issues",
        blogSidebarCount: "ALL",
        postsPerPage: 10,
        feedOptions: {
          title: "This Week In React - Newsletter",
          description:
            "Weekly issues of the This Week In React curation newsletter",
        },
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: "/img/TWIR_POST.png",
      /*
      announcementBar: {
        id: "subscribe-now-v1",
        content: "NOOP - to swizzle",
        backgroundColor: "#fafbfc",
        textColor: "#091E42",
        isCloseable: true,
      },
       */
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
          { to: "https://slo.im/thread", label: "Thread", position: "left" },
          /*{
            type: "custom-twitterThread",
            to: "https://slo.im/thread",
            label: "Thread",
            position: "left",
          },
           */
          { to: "/sponsor", label: "Sponsor", position: "left" },
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
                label: "📜 Articles",
                to: "/articles",
              },
              {
                label: "📨 Newsletter",
                to: "/newsletter",
              },
              {
                label: "🐦 Thread", // TODO custom footer item for Twitter svg?
                to: "https://slo.im/thread",
              },
              {
                label: "💸 Sponsor",
                href: "/sponsor",
              },
              {
                label: "👥 Discord",
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
