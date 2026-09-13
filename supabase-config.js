// ضع هنا Publishable Key من مشروع Supabase.
// لا تضع service_role key هنا أبدًا.
// Project URL: https://jtyivmllqivsnuimeujx.supabase.co
window.SUPABASE_URL = "https://jtyivmllqivsnuimeujx.supabase.co";
window.SUPABASE_PUBLISHABLE_KEY = "ضع_publishable_key_هنا";
window.sb = null;
if (window.supabase && !window.SUPABASE_PUBLISHABLE_KEY.includes("ضع_")) {
  window.sb = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_PUBLISHABLE_KEY);
}