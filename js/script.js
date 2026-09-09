// ===== Header: solid background after scrolling past hero top =====

const header = document.getElementById("siteHeader");

function handleHeaderScroll() {
  if (window.scrollY > 40) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", handleHeaderScroll);

handleHeaderScroll();

// ===== Mobile menu toggle =====

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  mainNav.classList.toggle("open");
});

// بستن منو بعد از کلیک روی لینک‌ها

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    mainNav.classList.remove("open");
  });
});

// ===== Booking widget: simple validation =====

const bookingSubmit = document.getElementById("bookingSubmit");

const checkin = document.getElementById("checkin");

const checkout = document.getElementById("checkout");

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

const today = new Date();

today.setHours(0, 0, 0, 0);

checkin.min = formatDate(today);

function updateCheckoutMinDate() {
  if (!checkin.value) {
    checkout.min = formatDate(today);
    return;
  }

  const selectedCheckin = new Date(`${checkin.value}T00:00:00`);

  selectedCheckin.setDate(selectedCheckin.getDate() + 1);

  checkout.min = formatDate(selectedCheckin);

  if (checkout.value && checkout.value <= checkin.value) {
    checkout.value = "";
  }
}

checkin.addEventListener("change", updateCheckoutMinDate);

bookingSubmit.addEventListener("click", () => {
  if (!checkin.value || !checkout.value) {
    alert("لطفاً تاریخ ورود و خروج را انتخاب کنید.");
    return;
  }

  if (checkout.value <= checkin.value) {
    alert("تاریخ خروج باید بعد از تاریخ ورود باشد.");
    return;
  }

  alert("در حال جستجوی اتاق‌های موجود...");
});