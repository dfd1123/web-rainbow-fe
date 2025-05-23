// import '@/styles/theme.scss';
// import '@/styles/base/_reset.scss';
// import '@/styles/global.scss';
import { useEffect, useState } from 'react'
import '../styles/storybook.scss';
import { RainbowUiProvider } from '@packages/rb-ui/provider';
import { DocsContainer } from '@storybook/addon-docs/blocks';
import { themes } from '@storybook/theming';
import { withThemes } from '@storybook/addon-themes';

const preview = {
  parameters: {
    actions: { argTypesRegex: '^(on|handle)(?!Icon)[A-Z].*' },
    themes: {
      default: 'light',
      list: [
        { name: 'light', class: 'theme-light', color: '#ffffff', default: true },
        { name: 'dark', class: 'theme-dark', color: '#000000' },
      ],
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#141415',
        }
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    },
     docs: {
      theme: themes.dark,
      container: ({ context, children }) => {
        return (
          <RainbowUiProvider theme={context.store.globals.globals.backgrounds?.value === '#141415' ? 'dark' : 'light'}>
            <DocsContainer context={context}>
                {children}
            </DocsContainer>
          </RainbowUiProvider>
        
        )
      },
    },
  },
  decorators: [
    (Story, context) => {
      const backgrounds = context.globals?.backgrounds?.value;

      const [theme, setTheme] = useState('light');

      useEffect(() => {
        setTheme(backgrounds === '#141415' ? 'dark' : 'light');
      }, [backgrounds]);

      return (
        <div className={`storybook-font`}>
            <RainbowUiProvider theme={theme}>
              {/* Story의 내용이 WemixplayUIProvider의 컨텍스트를 사용합니다. */}
              <Story />
            </RainbowUiProvider>
     
        </div>
      )
    }
  ]
};

export default preview;
