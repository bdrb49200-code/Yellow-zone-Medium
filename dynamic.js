const YZ_SUPABASE_URL='https://wmqjlbrgdjgfjwopekup.supabase.co';
const YZ_SUPABASE_KEY='sb_publishable_N3BSrFZfEidi-nN8hYbWFg_WbjMMsDn';
const YZ_WA='966554160210';
const yzEsc=v=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
const yzMoney=v=>Number(v||0).toLocaleString('ar-SA');
const yzSlug=o=>String(o.slug||o.name_en||o.name_ar||o.id).toLowerCase().trim().replace(/[^a-z0-9\u0600-\u06ff]+/g,'-').replace(/^-+|-+$/g,'')+'-'+o.id;
function yzBook(name,price){const t=`السلام عليكم، أبغى أحجز في Yellow Zone\nالخدمة: ${name}\nالسعر: ${price} ريال`;window.open(`https://wa.me/${YZ_WA}?text=${encodeURIComponent(t)}`,'_blank')}
function yzCard(o){const name=o.name_ar||o.name_en||'خدمة';const desc=o.description_ar||'';return `<article><small>${yzEsc(o.category==='subscriptions'?'اشتراكات':o.category==='birthdays'?'أعياد الميلاد':o.category==='trips'?'رحلات مدرسية':'دخول وألعاب')}</small><h3>${yzEsc(name)}</h3><strong>${yzMoney(o.price)} <i>ريال</i></strong><p>${yzEsc(desc)}</p><button type="button" data-yz-book="${yzEsc(name)}" data-yz-price="${o.price}">احجز</button></article>`}
async function yzLoad(){
 try{
  const r=await fetch(`${YZ_SUPABASE_URL}/rest/v1/offers?select=id,name_ar,name_en,description_ar,description_en,price,active,category,sort_order,slug&active=eq.true&order=sort_order.asc,id.asc`,{headers:{apikey:YZ_SUPABASE_KEY,Authorization:`Bearer ${YZ_SUPABASE_KEY}`}});
  if(!r.ok) throw Error('offers'); const offers=await r.json();
  const general=offers.filter(o=>o.category==='general'); const birthdays=offers.filter(o=>o.category==='birthdays'); const trips=offers.filter(o=>o.category==='trips'); const subs=offers.filter(o=>o.category==='subscriptions');
  const gp=document.getElementById('generalDynamicPrices'); if(gp) gp.innerHTML=general.map(yzCard).join('')||'<div class="dynamic-empty">لا توجد أسعار متاحة حالياً.</div>';
  const bp=document.getElementById('birthdayDynamicPrices'); if(bp) bp.innerHTML=birthdays.map(yzCard).join('')||'<div class="dynamic-empty">لا توجد باقات أعياد ميلاد متاحة حالياً.</div>';
  const tp=document.getElementById('tripDynamicPrice'); if(tp){const o=trips[0];tp.innerHTML=o?`${yzMoney(o.price)} <small>ريال للطفل</small>`:'60 <small>ريال للطفل</small>';}
  const sp=document.getElementById('subscriptionDynamic'); if(sp) sp.innerHTML=subs.map(yzCard).join('')||'<div class="dynamic-empty">لا توجد اشتراكات متاحة حالياً.</div>';
  document.querySelectorAll('[data-yz-book]').forEach(b=>{b.onclick=()=>yzBook(b.dataset.yzBook,b.dataset.yzPrice)});
  const sel=document.getElementById('service'); if(sel){subs.forEach(o=>{const opt=document.createElement('option');opt.value=o.name_ar||o.name_en;opt.textContent=`${o.name_ar||o.name_en} - ${yzMoney(o.price)} ريال`;sel.appendChild(opt)});}
 }catch(e){console.error(e)}
 try{
  const r=await fetch(`${YZ_SUPABASE_URL}/rest/v1/ads?select=id,title,title_ar,title_en,text,body_ar,body_en,image_url,active,bookable,price&active=eq.true&order=sort_order.asc,created_at.desc`,{headers:{apikey:YZ_SUPABASE_KEY,Authorization:`Bearer ${YZ_SUPABASE_KEY}`}});
  if(!r.ok) throw Error('ads'); const ads=await r.json(); const box=document.getElementById('dynamicAds'); if(box){box.innerHTML=ads.map(a=>{const title=a.title_ar||a.title||'Yellow Zone';const body=a.body_ar||a.text||'';return `<article class="yz-ad-card">${a.image_url?`<img src="${yzEsc(a.image_url)}" alt="${yzEsc(title)}">`:''}<div><small>Yellow Zone</small><h3>${yzEsc(title)}</h3><p>${yzEsc(body)}</p>${a.bookable?`<strong>${yzMoney(a.price)} ريال</strong><button type="button" data-yz-book="${yzEsc(title)}" data-yz-price="${a.price}">احجز</button>`:''}</div></article>`}).join('')||'<div class="dynamic-empty">لا توجد إعلانات أو فعاليات حالياً.</div>';document.querySelectorAll('[data-yz-book]').forEach(b=>{b.onclick=()=>yzBook(b.dataset.yzBook,b.dataset.yzPrice)});}}
 }catch(e){console.error(e)}
}
document.addEventListener('DOMContentLoaded',yzLoad);
