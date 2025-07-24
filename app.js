// Datos de productos de ejemplo
const products = [
    {
        id: 1,
        name: "Smartphone Samsung Galaxy",
        category: "tecnologia",
        image: "/placeholder.svg?height=100&width=100",
        priceMain: "$299.900",
        priceSecondary: "$399.900",
        featured: true
    },
    {
        id: 2,
        name: "Smartwatch Apple Watch",
        category: "smartwatch",
        image: "/placeholder.svg?height=100&width=100",
        priceMain: "$199.900",
        priceSecondary: "$249.900",
        featured: true
    },
    {
        id: 3,
        name: "Aspiradora Robot",
        category: "hogar",
        image: "/placeholder.svg?height=100&width=100",
        priceMain: "$159.900",
        priceSecondary: "$199.900",
        featured: false
    },
    {
        id: 4,
        name: "Crema Facial Anti-edad",
        category: "belleza",
        image: "/placeholder.svg?height=100&width=100",
        priceMain: "$49.900",
        priceSecondary: "$69.900",
        featured: true
    },
    {
        id: 5,
        name: "Suplemento Vitamínico",
        category: "bienestar",
        image: "/placeholder.svg?height=100&width=100",
        priceMain: "$29.900",
        priceSecondary: "$39.900",
        featured: false
    },
    {
        id: 6,
        name: "Batidora de Cocina",
        category: "cocina",
        image: "/placeholder.svg?height=100&width=100",
        priceMain: "$89.900",
        priceSecondary: "$119.900",
        featured: false
    },
    {
        id: 7,
        name: "Taladro Inalámbrico",
        category: "herramientas",
        image: "/placeholder.svg?height=100&width=100",
        priceMain: "$79.900",
        priceSecondary: "$99.900",
        featured: false
    },
    {
        id: 8,
        name: "Cámara de Seguridad WiFi",
        category: "camaras",
        image: "/placeholder.svg?height=100&width=100",
        priceMain: "$69.900",
        priceSecondary: "$89.900",
        featured: true
    },
    {
        id: 9,
        name: "Juguete para Perros",
        category: "mascotas",
        image: "/placeholder.svg?height=100&width=100",
        priceMain: "$19.900",
        priceSecondary: "$24.900",
        featured: false
    },
    {
        id: 10,
        name: "Parlante Bluetooth",
        category: "parlantes",
        image: "/placeholder.svg?height=100&width=100",
        priceMain: "$59.900",
        priceSecondary: "$79.900",
        featured: true
    },
    {
        id: 11,
        name: "Muñeca Interactiva",
        category: "jugueteria",
        image: "/placeholder.svg?height=100&width=100",
        priceMain: "$39.900",
        priceSecondary: "$49.900",
        featured: false
    },
    {
        id: 12,
        name: "Organizador Multiuso",
        category: "otros",
        image: "/placeholder.svg?height=100&width=100",
        priceMain: "$24.900",
        priceSecondary: "$29.900",
        featured: false
    }
];

// Variables globales
let currentCategory = 'all';
let currentSort = 'categories';
let selectedTime = '';

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    startCountdown();
    renderProducts();
    setupBackToTop();
    setupSearch();
}

// Event Listeners
function setupEventListeners() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const sidebar = document.querySelector('.sidebar');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
        });
    }

    // Category filters
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all items
            categoryItems.forEach(cat => cat.classList.remove('active'));
            
            // Add active class to clicked item
            item.classList.add('active');
            
            // Update current category
            currentCategory = item.dataset.category;
            
            // Re-render products
            renderProducts();
        });
    });

    // Sort options
    const sortItems = document.querySelectorAll('.sort-item');
    sortItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all items
            sortItems.forEach(sort => sort.classList.remove('active'));
            
            // Add active class to clicked item
            item.classList.add('active');
            
            // Update current sort
            currentSort = item.dataset.sort;
            
            // Re-render products
            renderProducts();
        });
    });

    // Shop Now button
    const shopNowBtn = document.getElementById('shopNowBtn');
    if (shopNowBtn) {
        shopNowBtn.addEventListener('click', () => {
            const productsSection = document.getElementById('products');
            if (productsSection) {
                productsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Modal functionality
    setupModals();
}

// Countdown Timer
function startCountdown() {
    // Set target date (7 days from now for demo)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7);
    targetDate.setHours(23, 59, 59, 999);

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate.getTime() - now;

        if (distance < 0) {
            // Timer expired
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }

    // Update immediately and then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Product rendering
function renderProducts() {
    const productsList = document.getElementById('productsList');
    if (!productsList) return;

    // Filter products
    let filteredProducts = products;
    
    if (currentCategory !== 'all') {
        if (currentCategory === 'highlights') {
            filteredProducts = products.filter(product => product.featured);
        } else {
            filteredProducts = products.filter(product => product.category === currentCategory);
        }
    }

    // Sort products
    filteredProducts = sortProducts(filteredProducts);

    // Clear current products
    productsList.innerHTML = '';

    // Render filtered products
    filteredProducts.forEach(product => {
        const productElement = createProductElement(product);
        productsList.appendChild(productElement);
    });

    // Add loading animation
    const productItems = productsList.querySelectorAll('.product-item');
    productItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
}

function sortProducts(products) {
    switch (currentSort) {
        case 'price-low':
            return products.sort((a, b) => {
                const priceA = parseFloat(a.priceMain.replace(/[$.,]/g, ''));
                const priceB = parseFloat(b.priceMain.replace(/[$.,]/g, ''));
                return priceA - priceB;
            });
        case 'price-high':
            return products.sort((a, b) => {
                const priceA = parseFloat(a.priceMain.replace(/[$.,]/g, ''));
                const priceB = parseFloat(b.priceMain.replace(/[$.,]/g, ''));
                return priceB - priceA;
            });
        case 'a-z':
            return products.sort((a, b) => a.name.localeCompare(b.name));
        case 'z-a':
            return products.sort((a, b) => b.name.localeCompare(a.name));
        default:
            return products;
    }
}

function createProductElement(product) {
    const productDiv = document.createElement('div');
    productDiv.className = 'product-item';
    
    productDiv.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
        <div class="product-info">
            <h3 class="product-name">
                ${product.name}
                <span class="product-star">★</span>
            </h3>
            <p class="product-category">${getCategoryName(product.category)}</p>
            <div class="product-prices">
                <span class="product-price-main">${product.priceMain}</span>
                <span class="product-price-secondary">${product.priceSecondary}</span>
            </div>
        </div>
        <div class="product-actions">
            <button class="action-btn" onclick="openDirections()">Cómo llegar</button>
            <button class="action-btn" onclick="openLocationModal()">¿Dónde es?</button>
            <button class="action-btn" onclick="openTimeModal()">¿A qué hora es?</button>
            <button class="action-btn" onclick="addToCalendar('${product.name}')">Añadir al calendario</button>
        </div>
    `;
    
    return productDiv;
}

function getCategoryName(category) {
    const categoryNames = {
        'tecnologia': 'Tecnología',
        'smartwatch': 'Smartwatch',
        'hogar': 'Hogar',
        'belleza': 'Belleza',
        'bienestar': 'Bienestar',
        'cocina': 'Cocina',
        'herramientas': 'Herramientas',
        'camaras': 'Cámaras de seguridad',
        'mascotas': 'Mascotas',
        'parlantes': 'Parlantes',
        'jugueteria': 'Juguetería',
        'otros': 'Otros'
    };
    return categoryNames[category] || category;
}

// Product action functions
function openDirections() {
    const address = "Calle 123 #45-67, Bogotá, Colombia";
    const encodedAddress = encodeURIComponent(address);
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
    window.open(url, '_blank', 'noopener,noreferrer');
}

function openLocationModal() {
    const modal = document.getElementById('locationModal');
    if (modal) {
        modal.classList.add('active');
    }
}

function openTimeModal() {
    const modal = document.getElementById('timeModal');
    if (modal) {
        modal.classList.add('active');
    }
}

function addToCalendar(productName) {
    if (!selectedTime) {
        alert('Por favor, selecciona una hora primero usando el botón "¿A qué hora es?"');
        return;
    }

    const now = new Date();
    const eventDate = new Date(now);
    eventDate.setDate(eventDate.getDate() + 1); // Tomorrow
    
    const [hours, minutes] = selectedTime.split(':');
    eventDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    
    const endDate = new Date(eventDate);
    endDate.setHours(endDate.getHours() + 1); // 1 hour duration

    const title = encodeURIComponent(`Evento: ${productName}`);
    const details = encodeURIComponent(`Evento relacionado con ${productName} en DISTRISHOP RML SAS`);
    const location = encodeURIComponent('Calle 123 #45-67, Bogotá, Colombia');
    
    const startTime = eventDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const endTime = endDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startTime}/${endTime}&details=${details}&location=${location}`;
    
    window.open(googleCalendarUrl, '_blank', 'noopener,noreferrer');
}

// Modal functionality
function setupModals() {
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.modal-close');
    const confirmTimeBtn = document.getElementById('confirmTimeBtn');

    // Close modal when clicking close button
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            if (modal) {
                modal.classList.remove('active');
            }
        });
    });

    // Close modal when clicking outside
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });

    // Confirm time selection
    if (confirmTimeBtn) {
        confirmTimeBtn.addEventListener('click', () => {
            const timeInput = document.getElementById('timeInput');
            if (timeInput && timeInput.value) {
                selectedTime = timeInput.value;
                const modal = document.getElementById('timeModal');
                if (modal) {
                    modal.classList.remove('active');
                }
                alert(`Hora seleccionada: ${selectedTime}. Ahora puedes añadir eventos al calendario.`);
            } else {
                alert('Por favor, selecciona una hora válida.');
            }
        });
    }

    // Close modals with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                modal.classList.remove('active');
            });
        }
    });
}

// Back to Top functionality
function setupBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (!backToTopBtn) return;

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    // Smooth scroll to top
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Search functionality
function setupSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');

    if (!searchInput) return;

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            renderProducts();
            return;
        }

        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            getCategoryName(product.category).toLowerCase().includes(searchTerm)
        );

        renderSearchResults(filteredProducts, searchTerm);
    }

    // Search on Enter key
    searchInput.addEventListenerTerm);
    }

    // Search on Enter key
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Search on button click
    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }

    // Real-time search (optional)
    searchInput.addEventListener('input', debounce(performSearch, 300));
}

function renderSearchResults(filteredProducts, searchTerm) {
    const productsList = document.getElementById('productsList');
    if (!productsList) return;

    // Clear current products
    productsList.innerHTML = '';

    if (filteredProducts.length === 0) {
        productsList.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: var(--text-gray);">
                <p>No se encontraron productos para "${searchTerm}"</p>
                <button onclick="clearSearch()" class="action-btn" style="margin-top: 1rem;">Ver todos los productos</button>
            </div>
        `;
        return;
    }

    // Sort filtered products
    const sortedProducts = sortProducts(filteredProducts);

    // Render filtered products
    sortedProducts.forEach(product => {
        const productElement = createProductElement(product);
        productsList.appendChild(productElement);
    });

    // Add search results header
    const resultsHeader = document.createElement('div');
    resultsHeader.style.cssText = 'margin-bottom: 1rem; padding: 1rem; background: var(--bg-light); border-radius: var(--border-radius);';
    resultsHeader.innerHTML = `
        <p style="margin: 0; color: var(--text-dark);">
            Se encontraron ${filteredProducts.length} producto(s) para "${searchTerm}"
            <button onclick="clearSearch()" style="margin-left: 1rem; background: none; border: none; color: var(--primary-red); cursor: pointer; text-decoration: underline;">
                Limpiar búsqueda
            </button>
        </p>
    `;
    productsList.insertBefore(resultsHeader, productsList.firstChild);
}

function clearSearch() {
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.value = '';
    }
    renderProducts();
}

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Lazy loading for images
function setupLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Performance optimization
function optimizePerformance() {
    // Preload critical resources
    const criticalImages = [
        '/placeholder.svg?height=100&width=100',
        '/placeholder.svg?height=100&width=100'
    ];

    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Accessibility enhancements
function enhanceAccessibility() {
    // Add ARIA labels dynamically
    const buttons = document.querySelectorAll('button:not([aria-label])');
    buttons.forEach(button => {
        if (!button.getAttribute('aria-label')) {
            const text = button.textContent.trim();
            if (text) {
                button.setAttribute('aria-label', text);
            }
        }
    });

    // Keyboard navigation for modals
    document.addEventListener('keydown', (e) => {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal && e.key === 'Tab') {
            trapFocus(e, activeModal);
        }
    });
}

function trapFocus(e, container) {
    const focusableElements = container.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
        if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
        }
    } else {
        if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
        }
    }
}

// Error handling
function handleErrors() {
    window.addEventListener('error', (e) => {
        console.error('Error occurred:', e.error);
        // Could send error to analytics service
    });

    window.addEventListener('unhandledrejection', (e) => {
        console.error('Unhandled promise rejection:', e.reason);
        e.preventDefault();
    });
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    optimizePerformance();
    enhanceAccessibility();
    handleErrors();
    
    // Setup lazy loading after initial render
    setTimeout(setupLazyLoading, 100);
});

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Analytics tracking (placeholder)
function trackEvent(eventName, eventData) {
    // Placeholder for analytics tracking
    console.log('Event tracked:', eventName, eventData);
    
    // Example: Google Analytics 4
    // gtag('event', eventName, eventData);
    
    // Example: Facebook Pixel
    // fbq('track', eventName, eventData);
}

// Track user interactions
document.addEventListener('click', (e) => {
    if (e.target.matches('.action-btn')) {
        trackEvent('button_click', {
            button_text: e.target.textContent.trim(),
            button_type: 'product_action'
        });
    }
    
    if (e.target.matches('.shop-now-btn')) {
        trackEvent('shop_now_click', {
            section: 'banner'
        });
    }
});