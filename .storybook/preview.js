// /** @type { import('@storybook/react').Preview } */
// const preview = {
//   parameters: {
//     actions: { argTypesRegex: "^on[A-Z].*" },
//     controls: {
//       matchers: {
//         color: /(background|color)$/i,
//         date: /Date$/i,
//       },
//     },
//   },
// };

// export default preview;

// .storybook/preview.js
import React from 'react';
import { Provider } from 'react-redux';
import store from "../src/store"


// Wrap stories with Redux Provider
export const decorators = [
  (Story) => (
    <Provider store={store}>
      <Story />
    </Provider>
  ),
];

// Set up action decorators
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};

