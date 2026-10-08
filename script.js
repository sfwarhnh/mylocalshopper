const PHONE_NUMBER = "60123456789"; 

// --- Mobile Navigation Toggle (ASAL KEKAL) ---
const menuBtn = document.getElementById('mobile-menu-btn');
const navMenu = document.getElementById('nav-menu');

if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
}

// --- Carousel Auto Slide Logic (ASAL KEKAL) ---
const track = document.getElementById('track');
const dots = document.querySelectorAll('.dot');
const totalSlides = 3;
let currentIndex = 0;
let autoSlideInterval;

function updateCarousel() {
  if (!track) return;
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentIndex);
  });
}

function moveSlide(direction) {
  currentIndex = (currentIndex + direction + totalSlides) % totalSlides;
  updateCarousel();
  resetTimer();
}

function currentSlide(index) {
  currentIndex = index;
  updateCarousel();
  resetTimer();
}

function startAutoSlide() {
  autoSlideInterval = setInterval(() => { moveSlide(1); }, 4000);
}

function resetTimer() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

// Mulakan auto-slide
startAutoSlide();

// --- Single Page Application Routing ---
function showPage(pageId) {
  // Jika klik 'home-section' atau 'home', tunjukkan section pertama (contoh: products-page)
  if (pageId === 'home-section' || pageId === 'home') {
    pageId = 'products-page';
  }

  const pages = document.querySelectorAll('.page-section');
  pages.forEach(page => {
    page.classList.remove('active-page');
  });

  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.classList.add('active-page');
  }

  if (navMenu) {
    navMenu.classList.remove('active');
  }

  // Auto-scroll ke bahagian atas apabila tukar tab
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function setCategoryFromNav(categoryName) {
  showPage('products-page');
  const targetBtn = document.getElementById(`btn-cat-${categoryName}`);
  if (targetBtn) {
    setCategory(categoryName, targetBtn);
  } else {
    setCategory('all', document.getElementById('btn-cat-all'));
  }
}

// --- Quantity Stepper ---
function changeQty(elementId, change) {
  const qtyValElem = document.getElementById(elementId);
  if (!qtyValElem) return;

  let currentQty = parseInt(qtyValElem.innerText, 10) || 1;
  currentQty += change;

  if (currentQty < 1) currentQty = 1;
  qtyValElem.innerText = currentQty;
}

// --- Filter & Search Products ---
let selectedCategory = 'all';

function setCategory(category, buttonElem) {
  selectedCategory = category;

  const buttons = document.querySelectorAll('.cat-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  
  if (buttonElem) {
    buttonElem.classList.add('active');
  }

  filterProducts();
}

function filterProducts() {
  const searchInput = document.getElementById('searchInput');
  const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
  const products = document.querySelectorAll('.product-card');
  let visibleCount = 0;

  products.forEach(card => {
    const cardCategory = card.getAttribute('data-category');
    const cardTitle = card.getAttribute('data-title') || '';

    const matchesCategory = (selectedCategory === 'all') || (cardCategory === selectedCategory);
    const matchesSearch = cardTitle.includes(query);

    if (matchesCategory && matchesSearch) {
      card.style.display = 'flex';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  const noResultsElem = document.getElementById('noResults');
  if (noResultsElem) {
    noResultsElem.style.display = (visibleCount === 0) ? 'block' : 'none';
  }
}

// --- WhatsApp Direct Order ---
function orderProduct(productName, qtyElementId) {
  const qtyValElem = document.getElementById(qtyElementId);
  const quantity = qtyValElem ? qtyValElem.innerText : '1';

  const message = `Hi MYLocalShopper, I would like to order:\n- ${productName} (Qty: ${quantity})\n\nPlease provide shipping and payment details. Thank you!`;
  const encodedMessage = encodeURIComponent(message);
  
  window.open(`https://wa.me/${PHONE_NUMBER}?text=${encodedMessage}`, '_blank');
}

function openGeneralWhatsApp() {
  const message = "Hi MYLocalShopper, I have an inquiry regarding your products and shipping.";
  const encodedMessage = encodeURIComponent(message);
  
  window.open(`https://wa.me/${PHONE_NUMBER}?text=${encodedMessage}`, '_blank');
}

function openCustomRequestWhatsApp() {
    const message = "Hi MYLocalShopper, I would like to make a custom request. I am looking for a Malaysian product that is not currently listed on your website.";
    const encodedMessage = encodeURIComponent(message);

    window.open(`https://wa.me/${PHONE_NUMBER}?text=${encodedMessage}`, '_blank');
}