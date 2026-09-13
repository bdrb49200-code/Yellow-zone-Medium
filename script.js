const form = document.getElementById("quoteForm");
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const msg = document.getElementById("formMsg");
    const data = Object.fromEntries(new FormData(form).entries());
    if (!window.sb) { msg.textContent = "أضف Publishable Key في supabase-config.js أولًا."; return; }
    const { error } = await sb.from("quote_requests").insert(data);
    msg.textContent = error ? "تعذر إرسال الطلب. حاول مرة ثانية." : "تم استلام طلبك. الإدارة بتتابعه من النظام.";
    if (!error) form.reset();
  });
}