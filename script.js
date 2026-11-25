
const $ = id => document.getElementById(id);

const translations = {
ru: {
home:"Главная",services:"Услуги",about:"О нас",contacts:"Контакты",booking:"Запись",
heroText:"Профессиональное обслуживание автомобилей. Качество, которому доверяют.",
heroButton:"Наши услуги",servicesTitle:"Наши услуги",servicesText:"Комплексное обслуживание вашего автомобиля",
diagnostics:"Компьютерная диагностика",diagnosticsShort:"Проверка электронных систем автомобиля",
engine:"Ремонт двигателя",engineShort:"Профессиональное обслуживание двигателя",
maintenance:"Техническое обслуживание",maintenanceShort:"Регулярное ТО и замена расходников",
bodywork:"Кузовной ремонт",bodyworkShort:"Восстановление кузова и покраска",
suspension:"Ремонт подвески",suspensionShort:"Проверка и ремонт ходовой части",
detailing:"Детейлинг",detailingShort:"Уход за кузовом и салоном",
details:"Подробнее",aboutTitle:"Профессионализм в каждой детали",
aboutText:"Мы стремимся обеспечить качественное обслуживание и внимательное отношение к каждому автомобилю.",
contactsTitle:"Свяжитесь с нами",address:"Москва, Россия",
bookingTitle:"Запись на обслуживание",bookingText:"Оставьте заявку, и мы свяжемся с вами.",
chooseService:"Выберите услугу",submit:"Отправить заявку",detailBooking:"Записаться"
},
en: {
home:"Home",services:"Services",about:"About",contacts:"Contacts",booking:"Booking",
heroText:"Professional car service. Quality you can trust.",
heroButton:"Our services",servicesTitle:"Our services",servicesText:"Complete care for your vehicle",
diagnostics:"Computer diagnostics",diagnosticsShort:"Vehicle electronic system inspection",
engine:"Engine repair",engineShort:"Professional engine service",
maintenance:"Technical maintenance",maintenanceShort:"Regular maintenance and replacements",
bodywork:"Body repair",bodyworkShort:"Body restoration and painting",
suspension:"Suspension repair",suspensionShort:"Suspension inspection and repair",
detailing:"Detailing",detailingShort:"Interior and exterior car care",
details:"Learn more",aboutTitle:"Professionalism in every detail",
aboutText:"We aim to provide quality service and careful attention to every vehicle.",
contactsTitle:"Contact us",address:"Moscow, Russia",
bookingTitle:"Book a service",bookingText:"Leave a request and we will contact you.",
chooseService:"Choose a service",submit:"Send request",detailBooking:"Book now"
},
uz: {
home:"Bosh sahifa",services:"Xizmatlar",about:"Biz haqimizda",contacts:"Aloqa",booking:"Yozilish",
heroText:"Professional avtomobil xizmati. Ishonchli sifat.",
heroButton:"Xizmatlarimiz",servicesTitle:"Bizning xizmatlarimiz",servicesText:"Avtomobilingiz uchun to‘liq xizmat",
diagnostics:"Kompyuter diagnostikasi",diagnosticsShort:"Avtomobil elektron tizimlarini tekshirish",
engine:"Dvigatel ta'miri",engineShort:"Dvigatelga professional xizmat",
maintenance:"Texnik xizmat",maintenanceShort:"Rejali texnik xizmat va ehtiyot qismlar",
bodywork:"Kuzov ta'miri",bodyworkShort:"Kuzovni tiklash va bo‘yash",
suspension:"Osma ta'miri",suspensionShort:"Yurish qismini tekshirish va ta'mirlash",
detailing:"Deteyling",detailingShort:"Salon va kuzov parvarishi",
details:"Batafsil",aboutTitle:"Har bir detalda professionallik",
aboutText:"Biz har bir avtomobilga sifatli xizmat va e'tibor ko‘rsatishga intilamiz.",
contactsTitle:"Biz bilan bog‘laning",address:"Moskva, Rossiya",
bookingTitle:"Xizmatga yozilish",bookingText:"So‘rov qoldiring, biz siz bilan bog‘lanamiz.",
chooseService:"Xizmatni tanlang",submit:"So‘rov yuborish",detailBooking:"Yozilish"
}
};

const serviceData = {
diagnostics:{price:1500,description:"Комплексная компьютерная проверка электронных систем автомобиля."},
engine:{price:5000,description:"Проверка состояния двигателя и профессиональный ремонт."},
maintenance:{price:3000,description:"Плановое техническое обслуживание автомобиля."},
bodywork:{price:7000,description:"Восстановление кузова, подготовка и покраска."},
suspension:{price:4000,description:"Проверка и ремонт элементов подвески."},
detailing:{price:2500,description:"Комплексный уход за внешним видом и салоном автомобиля."}
};

const serviceNames = {
diagnostics:"Диагностика",
engine:"Ремонт двигателя",
maintenance:"Техническое обслуживание",
bodywork:"Кузовной ремонт",
suspension:"Ремонт подвески",
detailing:"Детейлинг"
};

function applyLanguage(lang) {
    const dict = translations[lang] || translations.ru;
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(element => {
        const key = element.dataset.i18n;
        if (dict[key]) element.textContent = dict[key];
    });
    $("language").value = lang;
    localStorage.setItem("redline_language",lang);
}

$("language").addEventListener("change",e => applyLanguage(e.target.value));
applyLanguage(localStorage.getItem("redline_language") || "ru");

function setTheme(theme) {
    document.body.classList.toggle("light",theme==="light");
    $("themeToggle").textContent = theme==="light" ? "☾" : "☀";
    localStorage.setItem("redline_theme",theme);
}
setTheme(localStorage.getItem("redline_theme") || "dark");
$("themeToggle").addEventListener("click",()=>{
    setTheme(document.body.classList.contains("light")?"dark":"light");
});

$("currentYear").textContent = new Date().getFullYear();

/* Service details */

document.querySelectorAll(".details-btn").forEach(button => {
    button.addEventListener("click",()=>{
        const key = button.dataset.service;
        const service = getServices().find(item=>item.key===key);
        const data = serviceData[key];
        const lang = $("language").value;
        $("detailTitle").textContent = translations[lang][key] || serviceNames[key];
        $("detailDescription").textContent = data.description;
        $("detailPrice").textContent = "От " + service.price.toLocaleString("ru-RU") + " ₽";
        $("serviceModal").classList.add("active");
    });
});
$("closeServiceModal").addEventListener("click",()=>$("serviceModal").classList.remove("active"));
$("serviceModal").addEventListener("click",e=>{
    if(e.target.id==="serviceModal") $("serviceModal").classList.remove("active");
});
$("detailBooking").addEventListener("click",()=>{
    $("serviceModal").classList.remove("active");
    $("booking").scrollIntoView({behavior:"smooth"});
});

/* Storage */

const REQUEST_KEY = "redline_requests";
const SERVICE_KEY = "redline_services";

function read(key,fallback) {
    try {
        const data=localStorage.getItem(key);
        return data?JSON.parse(data):fallback;
    } catch { return fallback; }
}
function getRequests(){return read(REQUEST_KEY,[]);}
function saveRequests(data){localStorage.setItem(REQUEST_KEY,JSON.stringify(data));}
function getServices(){
    const saved=read(SERVICE_KEY,null);
    return saved || Object.keys(serviceData).map(key=>({
        key,name:serviceNames[key],price:serviceData[key].price
    }));
}
function saveServices(data){localStorage.setItem(SERVICE_KEY,JSON.stringify(data));}
function escapeHTML(value){
    return String(value??"").replace(/[&<>"']/g,c=>({
        "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
    })[c]);
}

/* Booking form */

$("bookingDate").min = new Date().toISOString().split("T")[0];

$("bookingForm").addEventListener("submit",event=>{
    event.preventDefault();
    const name=$("customerName").value.trim();
    const phone=$("customerPhone").value.trim();
    const service=$("serviceType").value;
    const date=$("bookingDate").value;
    const message=$("customerMessage").value.trim();

    if(!name||!phone||!service||!date) return;

    const requests=getRequests();
    requests.unshift({
        id:Date.now(),name,phone,service,date,message,
        status:"Новая",
        createdAt:new Date().toLocaleString("ru-RU")
    });
    saveRequests(requests);

    $("bookingMessage").textContent =
        "Заявка сохранена! Мы свяжемся с вами.";
    $("bookingForm").reset();
    renderAdmin();
});

/* Admin */

$("openAdmin").addEventListener("click",()=>{
    $("adminModal").classList.add("active");
    renderAdmin();
});
$("closeAdmin").addEventListener("click",()=>$("adminModal").classList.remove("active"));

document.querySelectorAll(".admin-tab").forEach(button=>{
    button.addEventListener("click",()=>{
        document.querySelectorAll(".admin-tab").forEach(b=>b.classList.remove("active"));
        button.classList.add("active");
        $("requestsTab").hidden=button.dataset.tab!=="requests";
        $("servicesTab").hidden=button.dataset.tab!=="services";
        renderAdmin();
    });
});

function renderAdmin(){
    const requests=getRequests();
    $("totalRequests").textContent=requests.length;
    $("newRequests").textContent=requests.filter(r=>r.status==="Новая").length;
    renderRequests();
    renderServices();
}

function renderRequests(){
    const box=$("adminRequests");
    const requests=getRequests();
    if(!requests.length){box.innerHTML="<p>Пока заявок нет.</p>";return;}

    box.innerHTML=requests.map(r=>`
        <div class="request-card">
            <h3>${escapeHTML(r.name)}</h3>
            <p>Телефон: ${escapeHTML(r.phone)}</p>
            <p>Услуга: ${escapeHTML(r.service)}</p>
            <p>Дата: ${escapeHTML(r.date)}</p>
            <p>Комментарий: ${escapeHTML(r.message||"Нет")}</p>
            <p>Создана: ${escapeHTML(r.createdAt)}</p>
            <p>Статус: ${escapeHTML(r.status)}</p>
            <div class="admin-actions">
                <select data-status="${r.id}">
                    ${["Новая","В обработке","Подтверждена","Завершена"].map(s=>
                        `<option ${r.status===s?"selected":""}>${s}</option>`
                    ).join("")}
                </select>
                <button data-delete="${r.id}">Удалить</button>
            </div>
        </div>`).join("");

    box.querySelectorAll("[data-status]").forEach(select=>{
        select.addEventListener("change",()=>{
            const list=getRequests();
            const item=list.find(r=>r.id===Number(select.dataset.status));
            if(item){item.status=select.value;saveRequests(list);renderAdmin();}
        });
    });
    box.querySelectorAll("[data-delete]").forEach(button=>{
        button.addEventListener("click",()=>{
            if(!confirm("Удалить заявку?"))return;
            saveRequests(getRequests().filter(r=>r.id!==Number(button.dataset.delete)));
            renderAdmin();
        });
    });
}

function renderServices(){
    const box=$("adminServices");
    box.innerHTML=getServices().map((s,i)=>`
        <div class="admin-service-card">
            <label>Название услуги</label>
            <input data-name="${i}" value="${escapeHTML(s.name)}">
            <label>Цена в рублях</label>
            <input data-price="${i}" type="number" min="0" value="${s.price}">
            <button data-save="${i}">Сохранить</button>
        </div>`).join("");

    box.querySelectorAll("[data-save]").forEach(button=>{
        button.addEventListener("click",()=>{
            const i=Number(button.dataset.save);
            const list=getServices();
            const name=box.querySelector(`[data-name="${i}"]`).value.trim();
            const price=Number(box.querySelector(`[data-price="${i}"]`).value);
            if(!name||!Number.isFinite(price)||price<0){
                alert("Проверьте название и цену.");return;
            }
            list[i].name=name;
            list[i].price=price;
            saveServices(list);
            renderServices();
            alert("Изменения сохранены.");
        });
    });
}

renderAdmin();
