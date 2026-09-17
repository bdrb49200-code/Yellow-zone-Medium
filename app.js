const products=[
{id:1,n:'زحليقة مضيئة – 3 فتحات، 3 أمتار',p:6000,u:'للقطعة',c:'large',img:'assets/product-slide.png'},
{id:2,n:'جدار التسلق الاحترافي',p:7000,u:'للقطعة',c:'large',img:'assets/product-climb.png'},
{id:3,n:'قطعة تلفريك كاملة',p:3500,u:'تشمل الواير والماكينة',c:'large',img:'assets/product-zipline.png'},
{id:4,n:'مكعب إسفنج 17 × 17 سم – أصفر',p:2.5,u:'للحبة',c:'safety',img:'assets/product-foam.png'},
{id:5,n:'قماش الترامبولين',p:350,u:'للمتر',c:'parts',img:'assets/product-trampoline.png'},
{id:6,n:'اللعبة الهوائية',p:19000,u:'للقطعة',c:'large',img:'assets/product-inflatable.png'},
{id:7,n:'ونش التسلق',p:12000,u:'للقطعة',c:'large',img:'assets/product-zipline.png'},
{id:8,n:'السُست مقاس 18 (الكبير)',p:9,u:'للحبة',c:'parts',img:'assets/product-trampoline.png'},
{id:9,n:'السُست مقاس 13',p:7,u:'للحبة',c:'parts',img:'assets/product-trampoline.png'},
{id:10,n:'أرضيات حماية – سماكة 2 سم',p:55,u:'للمتر',c:'safety',img:'assets/product-foam.png'},
{id:11,n:'زحليقة 3 فتحات – 5 أمتار',p:9500,u:'للقطعة',c:'large',img:'assets/product-slide.png'},
{id:12,n:'أحزمة التسلق',p:450,u:'للحزام',c:'safety',img:'assets/product-climb.png'},
{id:13,n:'عمود الفوم',p:50,u:'للحبة',c:'safety',img:'assets/product-foam.png'},
{id:14,n:'قطعة التسلق',p:18,u:'للحبة',c:'parts',img:'assets/product-climb.png'},
{id:15,n:'رمال طبية معالجة – 50 كجم',p:400,u:'للكيس',c:'safety',img:'assets/product-foam.png'},
{id:16,n:'طبق الدونات',p:420,u:'للقطعة',c:'parts',img:'assets/product-inflatable.png'}];
let cart=[],favs=new Set(),cat='all',query='';const $=s=>document.querySelector(s),grid=$('#productGrid');
const money=n=>new Intl.NumberFormat('ar-SA',{maximumFractionDigits:2}).format(n)+' ﷼';
function render(){const list=products.filter(x=>(cat==='all'||x.c===cat)&&x.n.includes(query));grid.innerHTML=list.map(x=>`<article class="product"><button class="wish ${favs.has(x.id)?'on':''}" data-fav="${x.id}" aria-label="المفضلة">${favs.has(x.id)?'♥':'♡'}</button><div class="pic"><img loading="lazy" src="${x.img}" alt="${x.n}"></div><div class="productInfo"><span class="tag">${x.c==='large'?'تجهيزات كبيرة':x.c==='parts'?'قطع غيار':'سلامة وحماية'}</span><h3>${x.n}</h3><div><span class="price">${money(x.p)}</span> <span class="unit">${x.u}</span></div><button class="add" data-add="${x.id}">أضف للسلة</button></div></article>`).join('');$('#empty').style.display=list.length?'none':'block'}
function updateCart(){const items=cart.map(id=>products.find(x=>x.id===id));$('#cartCount').textContent=items.length;$('#cartItems').innerHTML=items.length?items.map((x,i)=>`<div class="cartItem"><img src="${x.img}" alt=""><div><b>${x.n}</b><small>${money(x.p)}</small></div><button class="remove" data-remove="${i}">×</button></div>`).join(''):'<p style="text-align:center;color:#777;padding:50px 0">السلة فارغة حاليًا</p>';$('#total').textContent=money(items.reduce((s,x)=>s+x.p,0))}
function toast(t){const e=$('#toast');e.textContent=t;e.classList.add('show');setTimeout(()=>e.classList.remove('show'),2200)}
function closeAll(){document.querySelectorAll('.modal,.drawer').forEach(x=>x.classList.remove('show','open'));$('#overlay').classList.remove('show')}
function modal(id){closeAll();$(id).classList.add('show');$('#overlay').classList.add('show')}
grid.onclick=e=>{const a=e.target.closest('[data-add]'),f=e.target.closest('[data-fav]');if(a){cart.push(+a.dataset.add);updateCart();toast('تمت إضافة المنتج للسلة')}if(f){const id=+f.dataset.fav;favs.has(id)?favs.delete(id):favs.add(id);$('#favCount').textContent=favs.size;render()}};
document.querySelectorAll('[data-cat]').forEach(b=>b.onclick=()=>{document.querySelectorAll('[data-cat]').forEach(x=>x.classList.remove('active'));b.classList.add('active');cat=b.dataset.cat;render()});
$('#searchForm').onsubmit=e=>{e.preventDefault();query=$('#search').value.trim();render();location.hash='products'};$('#search').oninput=e=>{query=e.target.value.trim();render()};
$('#cartBtn').onclick=()=>{closeAll();$('#cartDrawer').classList.add('open');$('#overlay').classList.add('show')};$('#accountBtn').onclick=()=>modal('#authModal');$('#favBtn').onclick=()=>{query='';cat='all';render();location.hash='products';toast(favs.size?`لديك ${favs.size} منتج في المفضلة`:'المفضلة فارغة')};
$('#cartItems').onclick=e=>{const r=e.target.closest('[data-remove]');if(r){cart.splice(+r.dataset.remove,1);updateCart()}};$('#checkoutBtn').onclick=()=>cart.length?modal('#orderModal'):toast('أضف منتجًا للسلة أولًا');
$('#overlay').onclick=closeAll;document.querySelectorAll('.close').forEach(b=>b.onclick=closeAll);document.addEventListener('keydown',e=>e.key==='Escape'&&closeAll());
document.querySelectorAll('[data-auth]').forEach(b=>b.onclick=()=>{document.querySelectorAll('[data-auth]').forEach(x=>x.classList.remove('active'));b.classList.add('active');$('#authTitle').textContent=b.dataset.auth==='login'?'مرحبًا بعودتك':'أنشئ حساب مؤسستك'});
$('#authForm').onsubmit=e=>{e.preventDefault();closeAll();toast('تمت محاكاة الدخول بنجاح — بدون حفظ بيانات')};$('#orderForm').onsubmit=e=>{e.preventDefault();const code='SM-'+Math.floor(100000+Math.random()*900000);closeAll();cart=[];updateCart();toast('تم إنشاء الطلب التجريبي: '+code)};
render();updateCart();
