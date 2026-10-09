import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { supabase, supabaseUrl } from './lib/supabaseClient';
import './lib/posthog';

// Warm up the connection to the Storage/PostgREST origin as early as possible
// (same value the client is configured with — nothing hardcoded in the HTML).
if (supabaseUrl) {
  const preconnect = document.createElement('link');
  preconnect.rel = 'preconnect';
  preconnect.href = supabaseUrl;
  document.head.appendChild(preconnect);
}

const queryClient = new QueryClient();

async function init() {
  // Supabase's OAuth callback arrives as /#access_token=... — a hash fragment,
  // so it never hits GitHub Pages' 404 handler and React Router ignores it.
  // Intercept before React mounts: let Supabase store the session, then strip it.
  if (window.location.hash.includes('access_token=')) {
    await supabase.auth.getSession(); // wait for Supabase to process + store the token
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
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
