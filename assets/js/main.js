console.log("Main JS Loaded");

document.addEventListener("DOMContentLoaded", () => {
    setupNavbarScroll();
    setupHeroSlider();
    setupAccommodationFilters();
    setupTestimonialCarousel();
    setupMobileBottomNav();
});

// --- Navbar Scroll Effect ---
function setupNavbarScroll() {
    const header = document.querySelector(".navbar--base");
    if (header) {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                header.classList.add("navbar--scrolled");
                header.classList.remove("navbar--transparent");
            } else {
                header.classList.remove("navbar--scrolled");
                header.classList.add("navbar--transparent");
            }
        };
        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Init check
    }
}

// --- Hero Slider Logic ---
const heroTexts = [
    {
        title1: 'Experience the',
        title2: 'Magic',
        title3: 'of India',
        subtitle: 'Discover India’s breathtaking landscapes, vibrant cultures, ancient temples, and unforgettable travel experiences with Tours & Travels.',
    },
    {
        title1: 'Discover India’s',
        title2: 'Hidden',
        title3: 'Treasures',
        subtitle: 'From snowy Himalayas to tropical beaches and royal palaces, we craft journeys that reveal the best of India — your way.',
    },
    {
        title1: 'Create Your',
        title2: 'Story',
        title3: 'Across India',
        subtitle: 'Whether it’s a romantic escape, a family holiday, or an adventure with friends, Tours & Travels designs trips you’ll remember forever.',
    },
];

let currentHeroIndex = 0;
let heroInterval;

function setupHeroSlider() {
    if (!document.getElementById("hero-text-container")) return;
    startHeroInterval();
}

function startHeroInterval() {
    heroInterval = setInterval(() => {
        updateHero((currentHeroIndex + 1) % heroTexts.length);
    }, 5000);
}

function updateHero(index) {
    const container = document.getElementById("hero-text-container");
    const indicators = document.querySelectorAll("#hero-indicators span");

    if (!container) return;

    // Fade out
    container.style.opacity = '0';

    setTimeout(() => {
        currentHeroIndex = index;
        const text = heroTexts[index];

        const title1 = document.getElementById("hero-title-1");
        const title2 = document.getElementById("hero-title-2");
        const title3 = document.getElementById("hero-title-3");
        const subtitle = document.getElementById("hero-subtitle");

        if (title1) title1.textContent = text.title1;
        if (title2) title2.textContent = text.title2;
        if (title3) title3.textContent = text.title3;
        if (subtitle) subtitle.textContent = text.subtitle;

        // Update Indicators
        indicators.forEach((ind, i) => {
            if (i === index) {
                ind.className = "h-[10px] rounded-full transition-all duration-500 w-8 bg-primary cursor-pointer";
            } else {
                ind.className = "h-[10px] rounded-full transition-all duration-500 w-[10px] bg-[#A0A0A0] cursor-pointer";
            }
        });

        // Fade in
        container.style.opacity = '1';
    }, 500);

    // Reset interval if manually clicked
    clearInterval(heroInterval);
    startHeroInterval();
}

// Expose to window for onclick
window.updateHero = updateHero;


// --- Accommodation Filters ---
function setupAccommodationFilters() {
    window.filterAccommodations = (tab) => {
        const buttons = document.querySelectorAll(".tab-btn");
        const items = document.querySelectorAll(".accommodation-item");

        // Update buttons
        buttons.forEach(btn => {
            if (btn.dataset.tab === tab) {
                btn.className = "tab-btn rounded-full text-sm font-medium transition-all duration-300 border-0 py-2 px-5 bg-card text-foreground shadow-[0_8px_20px_rgba(15,23,42,0.07)]";
            } else {
                btn.className = "tab-btn rounded-full text-sm font-medium transition-all duration-300 border-0 py-2 px-5 bg-secondary text-muted-foreground hover:bg-muted";
            }
        });

        // Filter items
        items.forEach(item => {
            if (tab === 'All' || item.dataset.type === tab) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    }
}


// --- Testimonial Carousel ---
let currentSlide = 0;
const totalSlides = 2; // Hardcoded for 2 items in HTML

function setupTestimonialCarousel() {
    window.goToSlide = (index) => {
        const track = document.getElementById("testimonial-track");
        if (!track) return;

        currentSlide = index;
        track.style.transform = `translateX(-${index * 100}%)`;
        updateCarouselIndicators();
    };

    window.nextSlide = () => {
        if (typeof window.goToSlide === 'function') {
            window.goToSlide((currentSlide + 1) % totalSlides);
        }
    };

    window.prevSlide = () => {
        if (typeof window.goToSlide === 'function') {
            window.goToSlide((currentSlide - 1 + totalSlides) % totalSlides);
        }
    };
}

function updateCarouselIndicators() {
    const carousel = document.getElementById("testimonial-carousel");
    if (!carousel) return;

    // Find the indicators container - assuming it's the next element sibling
    const dotContainer = carousel.nextElementSibling ? carousel.nextElementSibling.firstElementChild : null;

    if (dotContainer && dotContainer.children) {
        const dots = dotContainer.children;
        for (let i = 0; i < dots.length; i++) {
            if (i === currentSlide) {
                dots[i].className = "h-2 rounded-full transition-all duration-300 w-6 bg-primary";
            } else {
                dots[i].className = "h-2 rounded-full transition-all duration-300 w-2 bg-gray-300";
            }
        }
    }
}


// --- Modal Logic ---
function openBookingModal() {
    const modal = document.getElementById("booking-modal");
    if (modal) {
        modal.classList.remove("hidden");
        modal.classList.add("flex");
        document.body.style.overflow = "hidden"; // Prevent scrolling
    }
}

function closeBookingModal() {
    const modal = document.getElementById("booking-modal");
    if (modal) {
        modal.classList.add("hidden");
        modal.classList.remove("flex");
        document.body.style.overflow = "";
    }
}

// Attach to window for onclick attributes
window.openBookingModal = openBookingModal;
window.closeBookingModal = closeBookingModal;


// --- Accordion Logic ---
function toggleAccordion(id) {
    const content = document.getElementById(`content-${id}`);
    const icon = document.getElementById(`icon-${id}`);

    if (content) {
        if (content.classList.contains("hidden")) {
            content.classList.remove("hidden");
            if (icon) icon.style.transform = "rotate(180deg)";
        } else {
            content.classList.add("hidden");
            if (icon) icon.style.transform = "rotate(0deg)";
        }
    }
}
window.toggleAccordion = toggleAccordion;


// --- Mobile Bottom Nav ---
function setupMobileBottomNav() {
    // Only show on mobile (managed by CSS classes md:hidden)
    const navItems = [
        { href: 'index.html', icon: 'home', label: 'Home' },
        { href: 'hotels.html', icon: 'bed-double', label: 'Hotels' },
        { href: 'tours.html', icon: 'globe', label: 'Tours' },
        { href: 'about.html', icon: 'info', label: 'About' },
        { href: 'contact.html', icon: 'users', label: 'Contact' }
    ];

    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    const navContainer = document.createElement('div');
    navContainer.className = "md:hidden fixed bottom-4 left-4 right-4 w-auto flex justify-center z-50 pointer-events-none";
    navContainer.style.paddingBottom = "env(safe-area-inset-bottom)";

    const innerDiv = document.createElement('div');
    innerDiv.className = "w-full max-w-sm px-2 pointer-events-auto";

    const menuBar = document.createElement('div');
    // Using a flex container for the pill shape
    menuBar.className = "flex items-center justify-between rounded-full bg-black p-2 shadow-lg shadow-black/20";

    navItems.forEach(item => {
        // Handle root path or index.html
        const isHome = (currentPath === 'index.html' || currentPath === '');
        const itemIsHome = (item.href === 'index.html');

        let isActive = false;
        if (itemIsHome && isHome) isActive = true;
        else if (currentPath === item.href) isActive = true;
        // Logic for detail pages to highlight parent category
        else if (item.href === 'hotels.html' && currentPath.includes('hotel-detail')) isActive = true;
        else if (item.href === 'tours.html' && currentPath.includes('tour-detail')) isActive = true;

        const link = document.createElement('a');
        link.href = item.href;
        link.className = `flex flex-col items-center justify-center rounded-full text-white transition-all duration-300 ease-in-out flex-1 py-2 gap-1 ${isActive ? 'bg-gray-800' : 'hover:bg-gray-800'}`;

        link.innerHTML = `
            <i data-lucide="${item.icon}" class="h-5 w-5"></i>
            <span class="text-xs font-medium ${isActive ? 'text-white' : 'text-gray-400'}">${item.label}</span>
        `;
        menuBar.appendChild(link);
    });

    innerDiv.appendChild(menuBar);
    navContainer.appendChild(innerDiv);
    document.body.appendChild(navContainer);

    // Refresh icons since we added new ones
    if (window.lucide) {
        window.lucide.createIcons();
    }
}
