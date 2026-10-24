const SUPABASE_URL = "https://jfcylccddznxzmixwkwt.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_IwupgMM82sB6XxRXQvak2w_ePf8eO-h";

const { createClient } = window.supabase;

const supabaseClient = createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);