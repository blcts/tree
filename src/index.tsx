import React from 'react';
import { createRoot } from 'react-dom/client';
import 'bulma/css/bulma.css';
import { App } from './App';

const Root = () => ( <App /> );

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(<Root />);
