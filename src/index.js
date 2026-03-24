import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { supabase } from './lib/supabaseClient';

const queryClient = new QueryClient();

async function init() {
  // HashRouter uses # for routing, so Supabase's OAuth callback (#access_token=...)
  // lands as a 404. Intercept it here before React mounts.
  if (window.location.hash.includes('access_token=')) {
    await supabase.auth.getSession(); // wait for Supabase to process + store the token
    window.history.replaceState(null, '', window.location.pathname + '#/');
  }

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </React.StrictMode>
  );
}

init();
reportWebVitals();
