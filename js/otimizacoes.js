/**
 * OTIMIZAÇÕES PARA O SITE VIDANÇA
 * Implementações práticas para melhorar performance
 * Mantém 100% de compatibilidade com JSON
 */

// ============================================
// 1. LAZY LOADING PARA IMAGENS
// ============================================
function initLazyLoading() {
    const imageSelector = 'img[loading="lazy"]';
    const images = document.querySelectorAll(imageSelector);
    
    // Se o navegador não suporta IntersectionObserver, carrega tudo
    if (!('IntersectionObserver' in window)) {
        console.warn('IntersectionObserver não suportado. Carregando todas as imagens.');
        images.forEach(img => {
            if (img.dataset.src) img.src = img.dataset.src;
        });
        return;
    }
    
    // Observador para lazy loading
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                if (img.dataset.srcset) {
                    img.srcset = img.dataset.srcset;
                    img.removeAttribute('data-srcset');
                }
                img.removeAttribute('loading');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px' // Começa a carregar 50px antes de aparecer
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ============================================
// 2. SUBSTITUIÇÃO DE FONT AWESOME POR SVG
// ============================================
const socialIcons = {
    instagram: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.338 3.608 1.313.975.975 1.251 2.242 1.313 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.338 2.633-1.313 3.608-.975.975-2.242 1.251-3.608 1.313-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.338-3.608-1.313-.975-.975-1.251-2.242-1.313-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.338-2.633 1.313-3.608.975-.975 2.242-1.251 3.608-1.313 1.266-.058 1.646-.07 4.85-.07m0-2.163c-3.259 0-3.667.014-4.947.072-1.275.058-2.455.343-3.388 1.276-.933.933-1.218 2.113-1.276 3.388-.058 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.058 1.275.343 2.455 1.276 3.388.933.933 2.113 1.218 3.388 1.276 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c1.275-.058 2.455-.343 3.388-1.276.933-.933 1.218-2.113 1.276-3.388.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.058-1.275-.343-2.455-1.276-3.388-.933-.933-2.113-1.218-3.388-1.276-1.28-.058-1.688-.072-4.947-.072z"></path>
        <circle cx="12" cy="12" r="3.2"></circle>
        <circle cx="17.5" cy="6.5" r="1.5"></circle>
    </svg>`,
    
    facebook: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
    </svg>`,
    
    youtube: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path>
    </svg>`,
    
    mapa: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path>
    </svg>`
};

function renderSocialIcons() {
    const socialLinks = document.querySelectorAll('.social a');
    
    socialLinks.forEach(link => {
        const iconClass = link.querySelector('i')?.className || '';
        const ariaLabel = link.getAttribute('aria-label')?.toLowerCase() || '';
        const href = link.getAttribute('href')?.toLowerCase() || '';
        
        let iconKey = null;
        
        if (iconClass.includes('instagram') || ariaLabel.includes('instagram') || href.includes('instagram')) iconKey = 'instagram';
        else if (iconClass.includes('facebook') || ariaLabel.includes('facebook') || href.includes('facebook')) iconKey = 'facebook';
        else if (iconClass.includes('youtube') || ariaLabel.includes('youtube') || href.includes('youtube')) iconKey = 'youtube';
        else if (iconClass.includes('map') || ariaLabel.includes('mapa') || href.includes('mapacultural')) iconKey = 'mapa';
        
        if (iconKey && socialIcons[iconKey]) {
            link.innerHTML = socialIcons[iconKey];
        }
    });
}

// ============================================
// 3. MINIFICAÇÃO SIMPLES DE CSS (cacheable)
// ============================================
function inlineOptimizedCSS() {
    // Removido: usando CSS externo minificado é melhor
    // Esta função é apenas exemplo
}

// ============================================
// 4. MELHORAR CARREGAMENTO DE IMAGENS BACKGROUND
// ============================================
function optimizeBackgroundImages() {
    const slides = document.querySelectorAll('[style*="background-image"]');
    
    slides.forEach(slide => {
        // Adiciona loading otimizado
        slide.style.backgroundSize = 'cover';
        slide.style.backgroundPosition = 'center';
        slide.style.backgroundAttachment = 'local'; // Evita parallax pesado
    });
}

// ============================================
// 5. CACHE DE REQUISIÇÕES JSON
// ============================================
const jsonCache = new Map();

async function fetchJSON(url) {
    if (jsonCache.has(url)) {
        return jsonCache.get(url);
    }
    
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const data = await response.json();
        jsonCache.set(url, data);
        
        return data;
    } catch (error) {
        console.error(`Erro ao carregar ${url}:`, error);
        throw error;
    }
}

// ============================================
// 6. DETECÇÃO DE SUPORTE A WEBP
// ============================================
function supportsWebP() {
    const canvas = document.createElement('canvas');
    if (!canvas.getContext) return false;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.createImageData(1, 1);
    return canvas.toDataURL('image/webp').indexOf('webp') === 5;
}

// Adicionar classe ao body se suportar WebP
document.addEventListener('DOMContentLoaded', function() {
    if (supportsWebP()) {
        document.body.classList.add('webp-supported');
    }
});

// ============================================
// 7. PRELOAD DE RECURSOS CRÍTICOS
// ============================================
function addResourceHints() {
    // Adicionar preconnect para Google Fonts (se usar)
    const preconnect = document.createElement('link');
    preconnect.rel = 'preconnect';
    preconnect.href = 'https://fonts.googleapis.com';
    document.head.appendChild(preconnect);
    
    // DNS prefetch para externos
    const dnsPrefetch = document.createElement('link');
    dnsPrefetch.rel = 'dns-prefetch';
    dnsPrefetch.href = 'https://cdnjs.cloudflare.com';
    document.head.appendChild(dnsPrefetch);
}

// ============================================
// 8. INICIALIZAR TODAS AS OTIMIZAÇÕES
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Renderizar ícones SVG (remover Font Awesome)
    renderSocialIcons();
    
    // Ativar lazy loading
    initLazyLoading();
    
    // Otimizar imagens background
    optimizeBackgroundImages();
    
    // Preload de recursos
    addResourceHints();
    
    console.log('✅ Otimizações carregadas com sucesso!');
});

// ============================================
// EXEMPLO DE USO NOS SCRIPTS EXISTENTES
// ============================================

/*
// Em scripts.js, ao criar cards de eventos:
evento.forEach(evento => {
    const card = document.createElement('a');
    card.className = 'evento-card';
    card.href = evento.link;
    
    // EM VEZ DE:
    // card.style.backgroundImage = `url(${evento.imagem})`;
    
    // USE:
    if (supportsWebP() && evento.imagemWebp) {
        card.style.backgroundImage = `url(${evento.imagemWebp})`;
    } else {
        card.style.backgroundImage = `url(${evento.imagem})`;
    }
    
    card.innerHTML = `...`;
    container.appendChild(card);
});

// Para imagens <img> com lazy loading:
// <img src="placeholder.jpg" data-src="images/real.jpg" loading="lazy" alt="...">
*/

