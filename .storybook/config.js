import { configure } from '@storybook/react';
// import '../src/theme/basic.scss';
import '!style-loader!css-loader!sass-loader!../src/theme/basic.scss';

// automatically import all files ending in *.stories.js
configure(require.context('../src', true, /\.story\.js$/), module);
