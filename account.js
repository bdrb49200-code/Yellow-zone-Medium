(async()=>{
 if(!window.sb){location.href="login.html";return;}
 const {data}=await sb.auth.getUser();
 if(!data.user){location.href="login.html";return;}
 document.getElementById("userEmail").textContent=data.user.email||"";
 document.getElementById("userName").textContent=data.user.user_metadata?.full_name||"بك";
 document.getElementById("logoutBtn").onclick=async()=>{await sb.auth.signOut();location.href="index.html";}
})();