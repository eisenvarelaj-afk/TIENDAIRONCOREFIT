// Base de Datos Realista (12 Productos)
const CATALOGO = [
    // --- Suplementos ---
    { id: 1, nombre: 'Proteína Whey Isolate H.I.T.', precio: 185000, oldPrecio: null, categoria: 'Suplementos deportivos', img: 'https://images.unsplash.com/photo-1579722820308-d7cc05e2439a?auto=format&fit=crop&w=600&q=80', etiqueta: 'Destacado', desc: 'Aporta 25g de proteína limpia por servicio. Absorción ultrarrápida.' },
    { id: 2, nombre: 'Creatina Monohidratada Pura', precio: 95000, oldPrecio: 120000, categoria: 'Suplementos deportivos', img: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=600&q=80', etiqueta: '-20%', desc: 'Incrementa la producción de ATP, fuerza explosiva y volumen celular.' },
    { id: 3, nombre: 'Pre-Entreno Ignite Core', precio: 110000, oldPrecio: null, categoria: 'Suplementos deportivos', img: 'https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&w=600&q=80', etiqueta: 'Nuevo', desc: 'Fórmula avanzada con cafeína y citrulina para máxima concentración.' },
    { id: 4, nombre: 'BCAA + Glutamina Recovery', precio: 85000, oldPrecio: null, categoria: 'Suplementos deportivos', img: 'https://images.unsplash.com/photo-1511135232973-c3ee80040060?auto=format&fit=crop&w=600&q=80', etiqueta: '', desc: 'Evita el catabolismo muscular en sesiones de alta intensidad.' },
    
    // --- Pesas y Accesorios ---
    { id: 5, nombre: 'Mancuernas Ajustables Pro (30kg)', precio: 450000, oldPrecio: 520000, categoria: 'Pesas y accesorios', img: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=600&q=80', etiqueta: '-13%', desc: 'Sistema de ajuste por dial. Reemplaza 15 pares de mancuernas.' },
    { id: 6, nombre: 'Mancuernas Hexagonales Caucho', precio: 180000, oldPrecio: null, categoria: 'Pesas y accesorios', img: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=600&q=80', etiqueta: 'Destacado', desc: 'Diseño anti-rodadura. Núcleo de hierro fundido sólido.' },
    { id: 7, nombre: 'Barra Olímpica 20kg (Rodamientos)', precio: 350000, oldPrecio: null, categoria: 'Pesas y accesorios', img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=600&q=80', etiqueta: '', desc: 'Acero de alta tensión (190k PSI), ideal para powerlifting.' },
    { id: 8, nombre: 'Kit Bandas Elásticas PRO', precio: 65000, oldPrecio: null, categoria: 'Pesas y accesorios', img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80', etiqueta: '', desc: '5 niveles de resistencia progresiva con anclajes tácticos.' },
    
    // --- Máquinas y Equipamiento ---
    { id: 9, nombre: 'Máquina Polea Alta (Lat Pulldown)', precio: 1250000, oldPrecio: 1500000, categoria: 'Máquinas y equipamiento', img: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=600&q=80', etiqueta: '-16%', desc: 'Construye una espalda en V con control biomecánico total.' },
    { id: 10, nombre: 'Banco Ajustable Inclinable', precio: 320000, oldPrecio: null, categoria: 'Máquinas y equipamiento', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80', etiqueta: 'Básico', desc: 'Soporta hasta 300kg. Ángulos desde declinado hasta 90°.' },
    { id: 11, nombre: 'Prensa de Piernas 45° Pro', precio: 2400000, oldPrecio: null, categoria: 'Máquinas y equipamiento', img: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80', etiqueta: 'Premium', desc: 'Rieles de acero lineal para movimientos ultra fluidos con cargas masivas.' },
    { id: 12, nombre: 'Máquina Extensión de Cuádriceps', precio: 980000, oldPrecio: 1150000, categoria: 'Máquinas y equipamiento', img: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=600&q=80', etiqueta: '-14%', desc: 'Aislamiento total y definición extrema en la parte frontal del muslo.' }
];

// Estado de la App
const app = {
    carrito: JSON.parse(localStorage.getItem('ironcore_cart')) || [],
    
    init() {
        this.cacheDOM();
        this.bindEvents();
        this.renderCatalog(CATALOGO);
        this.renderPromotions();
        this.updateCartUI();
    },

    cacheDOM() {
        this.productContainer = document.getElementById('productContainer');
        this.promoContainer = document.getElementById('promoContainer');
        this.searchInput = document.getElementById('searchInput');
        this.categoryFilter = document.getElementById('categoryFilter');
        this.cartSidebar = document.getElementById('cartSidebar');
        this.cartOverlay = document.getElementById('cartOverlay');
        this.cartOpenBtn = document.getElementById('cartOpenBtn');
        this.cartCloseBtn = document.getElementById('cartCloseBtn');
        this.cartItemsContainer = document.getElementById('cartItemsContainer');
        this.cartBadge = document.getElementById('cartBadge');
        this.cartTotal = document.getElementById('cartTotal');
        this.contactForm = document.getElementById('contactForm');
    },

    bindEvents() {
        this.searchInput.addEventListener('input', () => this.filterProducts());
        this.categoryFilter.addEventListener('change', () => this.filterProducts());
        this.cartOpenBtn.addEventListener('click', () => this.toggleCart(true));
        this.cartCloseBtn.addEventListener('click', () => this.toggleCart(false));
        this.cartOverlay.addEventListener('click', () => this.toggleCart(false));
        
        this.contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Mensaje enviado (Simulación). Nos contactaremos pronto.');
            this.contactForm.reset();
        });
    },

    formatCOP(price) {
        return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(price);
    },

    createProductCard(prod, isPromo = false) {
        let badgeClass = prod.etiqueta.includes('%') ? 'discount' : '';
        let badgeHtml = prod.etiqueta ? `<span class="product-badge ${badgeClass}">${prod.etiqueta}</span>` : '';
        let priceHtml = prod.oldPrecio 
            ? `<div class="price-old">${this.formatCOP(prod.oldPrecio)}</div><div class="price-current">${this.formatCOP(prod.precio)}</div>`
            : `<div class="price-current">${this.formatCOP(prod.precio)}</div>`;

        return `
            <div class="product-card">
                ${badgeHtml}
                <div class="product-img">
                    <img src="${prod.img}" alt="${prod.nombre}" loading="lazy">
                </div>
                <div class="product-info">
                    <span class="product-category">${prod.categoria}</span>
                    <h3 class="product-title">${prod.nombre}</h3>
                    <p class="product-desc">${prod.desc}</p>
                    <div class="product-price-row">
                        <div>${priceHtml}</div>
                    </div>
                    <button class="btn btn-primary btn-block" onclick="app.addToCart(${prod.id})">
                        <i class="fas fa-cart-plus"></i> Añadir
                    </button>
                </div>
            </div>
        `;
    },

    renderCatalog(products) {
        if (products.length === 0) {
            this.productContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #999;">No se encontraron productos con esos criterios.</p>';
            return;
        }
        this.productContainer.innerHTML = products.map(p => this.createProductCard(p)).join('');
    },

    renderPromotions() {
        const promos = CATALOGO.filter(p => p.oldPrecio !== null).slice(0, 4);
        this.promoContainer.innerHTML = promos.map(p => this.createProductCard(p, true)).join('');
    },

    filterProducts() {
        const term = this.searchInput.value.toLowerCase();
        const cat = this.categoryFilter.value;

        const filtered = CATALOGO.filter(p => {
            const matchName = p.nombre.toLowerCase().includes(term) || p.desc.toLowerCase().includes(term);
            const matchCat = cat === 'Todos' || p.categoria === cat;
            return matchName && matchCat;
        });

        this.renderCatalog(filtered);
    },

    filterByCategory(categoryName) {
        this.categoryFilter.value = categoryName;
        this.searchInput.value = '';
        this.filterProducts();
        document.getElementById('catalogo').scrollIntoView({ behavior: 'smooth' });
    },

    // --- Lógica del Carrito ---
    toggleCart(state) {
        if (state) {
            this.cartSidebar.classList.add('open');
            this.cartOverlay.classList.add('active');
        } else {
            this.cartSidebar.classList.remove('open');
            this.cartOverlay.classList.remove('active');
        }
    },

    addToCart(id) {
        const prod = CATALOGO.find(p => p.id === id);
        const existing = this.carrito.find(item => item.id === id);

        if (existing) {
            existing.cant += 1;
        } else {
            this.carrito.push({ ...prod, cant: 1 });
        }

        this.saveAndRenderCart();
        this.toggleCart(true);
    },

    changeQty(id, delta) {
        const item = this.carrito.find(p => p.id === id);
        if (item) {
            item.cant += delta;
            if (item.cant <= 0) {
                this.removeFromCart(id);
                return;
            }
            this.saveAndRenderCart();
        }
    },

    removeFromCart(id) {
        this.carrito = this.carrito.filter(item => item.id !== id);
        this.saveAndRenderCart();
    },

    saveAndRenderCart() {
        localStorage.setItem('ironcore_cart', JSON.stringify(this.carrito));
        this.updateCartUI();
    },

    updateCartUI() {
        // Actualizar Badge
        const totalItems = this.carrito.reduce((sum, item) => sum + item.cant, 0);
        this.cartBadge.innerText = totalItems;

        // Renderizar Items
        if (this.carrito.length === 0) {
            this.cartItemsContainer.innerHTML = '<p class="cart-empty">El carrito está vacío. ¡Es hora de entrenar!</p>';
            this.cartTotal.innerText = '$0';
            return;
        }

        let totalAmount = 0;
        this.cartItemsContainer.innerHTML = this.carrito.map(item => {
            totalAmount += (item.precio * item.cant);
            return `
                <div class="cart-item">
                    <img src="${item.img}" alt="${item.nombre}">
                    <div class="cart-item-info">
                        <h4 class="cart-item-title">${item.nombre}</h4>
                        <div class="cart-item-price">${this.formatCOP(item.precio)}</div>
                        <div class="cart-controls">
                            <button class="qty-btn" onclick="app.changeQty(${item.id}, -1)">-</button>
                            <span>${item.cant}</span>
                            <button class="qty-btn" onclick="app.changeQty(${item.id}, 1)">+</button>
                            <button class="del-btn" onclick="app.removeFromCart(${item.id})"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        this.cartTotal.innerText = this.formatCOP(totalAmount);
    }
};

// Inicializar al cargar
document.addEventListener('DOMContentLoaded', () => app.init());
