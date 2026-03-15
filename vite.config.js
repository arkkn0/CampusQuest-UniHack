import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load all env variables (including GEMINI_API_KEY without VITE_ prefix)
  // Use empty string as prefix to load all env vars
  const env = loadEnv(mode, process.cwd(), '')
  
  // Get GEMINI_API_KEY from environment (unified name for both frontend and backend)
  // Fallback to VITE_GEMINI_API_KEY for backward compatibility
  const geminiApiKey = env.GEMINI_API_KEY || env.VITE_GEMINI_API_KEY || ''
  
  return {
    plugins: [react()],
    // Map GEMINI_API_KEY to VITE_GEMINI_API_KEY for client-side access
    // This allows using unified GEMINI_API_KEY in Vercel
    define: {
      'import.meta.env.VITE_GEMINI_API_KEY': JSON.stringify(geminiApiKey),
    },
  }
})
