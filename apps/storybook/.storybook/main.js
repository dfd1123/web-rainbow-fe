import path from 'path';
import {WebpackSvgComponentPlugin} from '@packages/rb-ui/modules';

/** @type { import('@storybook/nextjs').StorybookConfig } */
const config = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-themes',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-addon-react-docgen',
  ],
  framework: {
    name: '@storybook/nextjs'
  },
  docs: {
    autodocs: 'tag'
  },
  typescript: {
    check: true,
    checkOptions: {},
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      tsconfig: '../tsconfig.app.json',
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      propFilter: prop => {
        return prop.parent ? prop.parent.name !== 'DOMAttributes' && prop.parent.name !== 'HTMLAttributes' && prop.parent.name !== 'AriaAttributes' : true;
      }
    }
  },
  webpackFinal: async (config) => {
    if (!config?.resolve || !config?.module || !config?.plugins) return config;
    if (!config.module.rules) config.module.rules = [];

    const fileLoaderRule = config.module.rules.find(rule => rule.test && rule.test.test('.svg'));
    fileLoaderRule.exclude = /\.svg$/;

    config.module.rules.push({
      loader: '@svgr/webpack',
      options: {
        prettier: false,
        svgo: true,
        svgoConfig: {
          plugins: [
            {
              name: 'removeViewBox',
              active: false
            }
          ]
        },
        titleProp: true
      },
      test: /\.svg$/
    });

    config.plugins.push(new WebpackSvgComponentPlugin({
      svgFileDir: '../src/assets/svgs',
      outputDir: '../src/assets/svgs',
      useSvgr: true,
      typescript: true
    }))
    

    return config;
  },
  env: config => ({
    ...config,
    ...process.env
  })
};

export default config;
