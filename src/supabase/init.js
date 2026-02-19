import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Debug: Check if env vars are loaded
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase environment variables are not loaded!");
  console.log("URL:", supabaseUrl);
  console.log("Key:", supabaseAnonKey ? "Present" : "Missing");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
