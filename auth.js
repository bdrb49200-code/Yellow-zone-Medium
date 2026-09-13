async function requireClient() {
  if (!window.sb) throw new Error("Supabase غير مضبوط. أضف Publishable Key.");
}
const loginForm = document.getElementById("loginForm");
if (loginForm) loginForm.addEventListener("submit", async e => {
  e.preventDefault(); const msg = document.getElementById("loginMsg");
  try { await requireClient(); const {error}=await sb.auth.signInWithPassword({email:email.value,password:password.value});
    if(error) throw error; location.href="account.html";
  } catch(err) { msg.textContent=err.message || "تعذر تسجيل الدخول."; }
});
const signupForm = document.getElementById("signupForm");
if (signupForm) signupForm.addEventListener("submit", async e => {
  e.preventDefault(); const msg = document.getElementById("signupMsg");
  try { await requireClient(); const {data,error}=await sb.auth.signUp({email:email.value,password:password.value,options:{data:{full_name:name.value}}});
    if(error) throw error; msg.textContent = data.session ? "تم إنشاء الحساب." : "تم إنشاء الحساب. تحقق من بريدك إذا كان التحقق مفعلًا.";
  } catch(err) { msg.textContent=err.message || "تعذر إنشاء الحساب."; }
});