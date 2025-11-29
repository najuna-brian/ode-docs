import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'ODE - Open Data Ensemble',
  tagline: 'A symphony of data instruments to support your data collection and analysis.',
  favicon: 'img/favicon.ico',

  url: 'https://docs.opendataensemble.org',
  baseUrl: '/',

  organizationName: 'opendataensemble',
  projectName: 'docs',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/opendataensemble/docs/tree/main/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
    [
      'redocusaurus',
      {
        specs: [
          {
            id: 'synkronus-api',
            spec: 'synkronus.yaml',
            route: '/api',
          },
        ],
        theme: {
          primaryColor: '#3f51b5',
        },
      },
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'ODE',
      logo: {
        alt: 'ODE Logo',
        src: 'img/ode-logo-clear.png',
      },
      hideOnScroll: false,
      items: [
        {
          type: 'doc',
          docId: 'ODE',
          position: 'right',
          label: 'Documentation',
        },
        {
          label: 'Product',
          position: 'right',
          items: [
            {
              type: 'doc',
              docId: 'documentation/synkronus/synkronus',
              label: 'Synkronus',
            },
            {
              type: 'doc',
              docId: 'documentation/formulus/formulus',
              label: 'Formulus',
            },
            {
              type: 'doc',
              docId: 'documentation/synkronus-cli/cli',
              label: 'Synkronus CLI',
            },
          ],
        },
        {
          label: 'Community',
          position: 'right',
          items: [
            {
              label: 'Forum',
              href: 'https://forum.opendataensemble.org',
            },
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/opendataensemble',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/opendataensemble',
            },
          ],
        },
        {
          label: 'About Us',
          position: 'right',
          items: [
            {
              type: 'doc',
              docId: 'ODE',
              label: 'Overview',
            },
            {
              type: 'doc',
              docId: 'quick-start/index',
              label: 'Quick Start',
            },
            {
              type: 'doc',
              docId: 'For-developers/docusaurus/intro',
              label: 'For Developers',
            },
          ],
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
              label: 'Documentation',
              to: '/docs/ODE',
            },
            {
              label: 'API Reference',
              to: '/api',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Forum (new!)',
              href: 'https://forum.opendataensemble.org',
            },
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/opendataensemble',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/opendataensemble',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Open Data Ensemble. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
