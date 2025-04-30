
// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'TokenArena Documentation',
  tagline: 'Learn how to use TokenArena',
  favicon: '/images/logo.png',
  url: 'https://tokenarenedocs.com',
  baseUrl: '/docs/',
  organizationName: 'TokenArena',
  projectName: 'tokenarenedocs',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/tokenerinedocs/edit/main/website/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'TokenArena Docs',
        logo: {
          alt: 'TokenArena Logo',
          src: '/images/logo.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Docs',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Overview',
                to: '/docs/overview',
              },
              {
                label: 'Get Started',
                to: '/docs/get-started',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/tokenarendocs',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/tokenarendocs',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} TokenArena. Built with Docusaurus.`,
      },
    }),
};

module.exports = config;
