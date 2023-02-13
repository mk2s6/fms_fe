import React, { Fragment } from 'react';
// import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';

import './index.css';
import reportWebVitals from './reportWebVitals';
import { ThemeContextProvider } from './context/ThemeContext';
import { Body } from './Body';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <>
    <ThemeContextProvider>
      <Body
        sx={{
          p: 0,
          m: 0,
        }}
      />
    </ThemeContextProvider>
  </>,
);

reportWebVitals();
