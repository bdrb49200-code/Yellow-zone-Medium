const fallback = [
 {name:"سوفت بلاي",category:"لعب حركي",short_description:"تسلق وزحاليق وكرات في مساحة مليانة حركة.",price_from:35,image_url:"https://cdn.cobone.com/deals/sau/207611/1.webp?v=31"},
 {name:"ترامبولين",category:"نشاط",short_description:"اقفز وتحرك وخلي الطاقة تأخذ راحتها.",price_from:39,image_url:"https://kidsplayspace.org/api/media/file/what-to-consider-when-selecting-indoor-playground-trampoline-equipment.webp"},
 {name:"منطقة الصغار",category:"صغار",short_description:"تجربة لعب هادئة ومناسبة للأطفال الصغار.",price_from:29,image_url:"https://aldeadidactica.cl/cdn/shop/files/ni-os-jugando-con-plazas-blandas_2048x.png?v=1762108167"}
];
function card(p){return `<article class="product-card"><img src="${p.image_url||fallback[0].image_url}" alt="${p.name}"><div><span>${p.category||"تجربة"}</span><h3>${p.name}</h3><p>${p.short_description||""}</p><div class="product-bottom"><b>${p.price_from ? `من ${p.price_from} ر.س` : "حسب الطلب"}</b><a href="login.html">احجز</a></div></div></article>`}
(async()=>{
 const grid=document.getElementById("productGrid");
 if(window.sb){const {data,error}=await sb.from("products").select("*").eq("active",true).order("created_at",{ascending:false}); if(!error&&data?.length){grid.innerHTML=data.map(card).join("");return;}}
 grid.innerHTML=fallback.map(card).join("");
})();