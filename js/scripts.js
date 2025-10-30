document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. FUNÇÃO PARA CARREGAR EVENTOS (Home) ---
    const eventosContainer = document.getElementById('eventos-container');
    async function carregarEventos() {
        if (!eventosContainer) return; // Só executa na página certa
        try {
            const response = await fetch('js/home/eventos.json'); 
            if (!response.ok) throw new Error('Não foi possível carregar os eventos.');
            
            const eventos = await response.json();
            if (eventos.length === 0) {
                eventosContainer.innerHTML = '<p>Nenhum evento publicado no momento.</p>';
                return;
            }

            eventosContainer.innerHTML = '';
            eventos.forEach(evento => {
                const card = document.createElement('a');
                card.className = 'evento-card';
                card.href = evento.link;
                card.style.backgroundImage = `url(${evento.imagem})`;
                card.innerHTML = `
                    <div class="evento-card-content">
                        <span class="categoria">${evento.categoria}</span>
                        <h3 class="titulo">${evento.titulo}</h3>
                        <p class="descricao">${evento.descricao || ''}</p> 
                    </div>
                `;
                eventosContainer.appendChild(card);
            });
        } catch (error) {
            console.error('Erro ao carregar eventos:', error);
            eventosContainer.innerHTML = '<p>Ocorreu um erro ao carregar os eventos.</p>';
        }
    }

    
    // --- 2. FUNÇÃO PARA CARREGAR PROGRAMAS (Sobre Nós) ---
    const programasContainer = document.getElementById('programas-container');
    async function carregarProgramas() {
        if (!programasContainer) return; // Só executa na página certa
        try {
            const response = await fetch('js/sobre/programas.json');
            if (!response.ok) throw new Error('Não foi possível carregar os programas.');
            
            const programas = await response.json();
            if (programas.length === 0) {
                programasContainer.innerHTML = '<p>Nenhum programa encontrado.</p>';
                return;
            }

            programasContainer.innerHTML = ''; 
            programas.forEach(programa => {
                const card = document.createElement('div');
                card.className = 'programa-card';
                card.innerHTML = `
                    <h4>${programa.titulo}</h4>
                    <p>${programa.descricao}</p>
                `;
                programasContainer.appendChild(card);
            });
        } catch (error) {
            console.error('Erro ao carregar programas:', error);
            programasContainer.innerHTML = '<p>Erro ao carregar programas. Tente mais tarde.</p>';
        }
    }

    
    // --- 3. FUNÇÃO PARA CARREGAR GALERIA (Página Galeria) ---
    const galeriaContainer = document.getElementById('galeria-container');
    async function carregarGaleria() {
        if (!galeriaContainer) return; // Só executa na página certa
        try {
            const response = await fetch('js/galeria/galeria.json'); 
            if (!response.ok) throw new Error('Não foi possível carregar a galeria.');

            const items = await response.json();
            if (items.length === 0) {
                galeriaContainer.innerHTML = '<p>Nenhuma foto encontrada na galeria.</p>';
                return;
            }

            galeriaContainer.innerHTML = '';
            items.forEach(item => {
                const card = document.createElement('div');
                card.className = 'evento-card'; // Reutiliza estilo
                card.style.backgroundImage = `url('${item.imagem}')`;
                card.innerHTML = `
                    <div class="evento-card-content">
                        <h3 class="titulo">${item.titulo}</h3>
                    </div>
                `;
                
                card.addEventListener('click', () => {
                    const overlay = document.getElementById('lightbox-overlay');
                    const img = document.getElementById('lightbox-image');
                    if (overlay && img) {
                        img.src = item.imagem;
                        overlay.classList.add('visible');
                    }
                });
                galeriaContainer.appendChild(card);
            });
        } catch (error) {
            console.error('Erro ao carregar galeria:', error);
            galeriaContainer.innerHTML = '<p>Erro ao carregar a galeria.</p>';
        }
    }

    
    // --- 4. FUNÇÃO PARA CARREGAR PROJETOS (Página Projetos) ---
    const projetosContainer = document.getElementById('projetos-container');
    async function carregarProjetos() {
        if (!projetosContainer) return; // Só executa na página certa
        try {
            const response = await fetch('js/projetos/projetos.json');
            if (!response.ok) throw new Error('Não foi possível carregar os projetos.');
            
            const items = await response.json();
            if (items.length === 0) {
                projetosContainer.innerHTML = '<p>Nenhum projeto encontrado.</p>';
                return;
            }

            projetosContainer.innerHTML = '';
            items.forEach(item => {
                const card = document.createElement('div');
                card.className = 'evento-card projeto-card';
                card.style.backgroundImage = `url('${item.imagem}')`;
                card.innerHTML = `
                    <div class="evento-card-content">
                        <span class="categoria">${item.tipo_acesso}</span>
                        <div class="projeto-card-texto">
                            <h3 class="titulo">${item.nome}</h3>
                            <p class="projeto-publico">${item.publico_alvo}</p>
                            <p class="projeto-descricao">${item.descricao_breve}</p>
                        </div>
                    </div>
                `;

                card.addEventListener('click', () => {
                    const overlay = document.getElementById('projeto-modal-overlay');
                    if (overlay) {
                        document.getElementById('projeto-modal-image').src = item.imagem;
                        document.getElementById('projeto-modal-titulo').innerText = item.nome;
                        
                        const publicoEl = document.getElementById('projeto-modal-publico');
                        if (item.publico_alvo) {
                            publicoEl.innerText = item.publico_alvo;
                            publicoEl.style.display = 'block'; 
                        } else {
                            publicoEl.style.display = 'none'; 
                        }
                        
                        document.getElementById('projeto-modal-descricao').innerText = item.descricao_detalhada;
                        overlay.classList.add('visible');
                    }
                });
                projetosContainer.appendChild(card);
            });
        } catch (error) {
            console.error('Erro ao carregar projetos:', error);
            projetosContainer.innerHTML = '<p>Erro ao carregar os projetos.</p>';
        }
    }

    
    // --- 5. FUNÇÃO PARA CARREGAR NOTÍCIAS (Página Notícias) ---
    const noticiasContainer = document.getElementById('noticias-container');
    async function carregarNoticias() {
        if (!noticiasContainer) return; // Só executa na página certa
        try {
            const response = await fetch('js/noticias/noticias.json');
            if (!response.ok) throw new Error('Não foi possível carregar as notícias.');

            const items = await response.json();
            if (items.length === 0) {
                noticiasContainer.innerHTML = '<p>Nenhuma notícia encontrada.</p>';
                return;
            }

            noticiasContainer.innerHTML = '';
            items.forEach(item => {
                const card = document.createElement('div');
                card.className = 'noticia-card'; 
                card.innerHTML = `
                    <div class="noticia-card-imagem" style="background-image: url('${item.imagem}')"></div>
                    <div class="noticia-card-texto">
                        <h3 class="titulo">${item.titulo}</h3>
                        <span class="data">${item.data}</span>
                        <p class="descricao">${item.descricao_breve}</p>
                    </div>
                `;

                card.addEventListener('click', () => {
                    const overlay = document.getElementById('noticia-modal-overlay');
                    if (overlay) {
                        document.getElementById('noticia-modal-image').src = item.imagem;
                        document.getElementById('noticia-modal-titulo').innerText = item.titulo;
                        document.getElementById('noticia-modal-data').innerText = item.data;
                        document.getElementById('noticia-modal-descricao').innerText = item.descricao_detalhada;
                        overlay.classList.add('visible');
                    }
                });
                noticiasContainer.appendChild(card);
            });
        } catch (error) {
            console.error('Erro ao carregar notícias:', error);
            noticiasContainer.innerHTML = '<p>Erro ao carregar as notícias.</p>';
        }
    }
    

    // --- CHAMADA DE TODAS AS FUNÇÕES DE CARREGAMENTO ---
    carregarEventos();
    carregarProgramas();
    carregarGaleria();
    carregarProjetos();
    carregarNoticias();

    
    // --- LÓGICA PARA FECHAR MODAIS E LIGHTBOX ---
    
    // Lógica de FECHAR o Lightbox da GALERIA
    const lightboxOverlay = document.getElementById('lightbox-overlay');
    const lightboxCloseBtn = document.getElementById('lightbox-close');
    if (lightboxOverlay && lightboxCloseBtn) {
        const fecharLightbox = () => {
            lightboxOverlay.classList.remove('visible');
            document.getElementById('lightbox-image').src = "";
        };
        lightboxCloseBtn.addEventListener('click', fecharLightbox);
        lightboxOverlay.addEventListener('click', (e) => {
            if (e.target === lightboxOverlay) fecharLightbox();
        });
    }

    // Lógica de FECHAR o Modal de PROJETOS
    const projetoModalOverlay = document.getElementById('projeto-modal-overlay');
    const projetoModalCloseBtn = document.getElementById('projeto-modal-close');
    if (projetoModalOverlay && projetoModalCloseBtn) {
        const fecharProjetoModal = () => {
            projetoModalOverlay.classList.remove('visible');
        };
        projetoModalCloseBtn.addEventListener('click', fecharProjetoModal);
        projetoModalOverlay.addEventListener('click', (e) => {
            if (e.target === projetoModalOverlay) fecharProjetoModal();
        });
    }

    // Lógica de FECHAR o Modal de NOTÍCIAS
    const noticiaModalOverlay = document.getElementById('noticia-modal-overlay');
    const noticiaModalCloseBtn = document.getElementById('noticia-modal-close');
    if (noticiaModalOverlay && noticiaModalCloseBtn) {
        const fecharNoticiaModal = () => {
            noticiaModalOverlay.classList.remove('visible');
        };
        noticiaModalCloseBtn.addEventListener('click', fecharNoticiaModal);
        noticiaModalOverlay.addEventListener('click', (e) => {
            if (e.target === noticiaModalOverlay) fecharNoticiaModal();
        });
    }

    
    /*
    ========================================
    LÓGICA DO MENU HAMBURGER (MÓVEL)
    (Este é o local correto para este código)
    ========================================
    */
    const btnHamburger = document.getElementById('btn-hamburger');
    const cabecalho = document.querySelector('.cabecalho'); 
    
    if (btnHamburger && cabecalho) {
        btnHamburger.addEventListener('click', () => {
            // Alterna a classe .menu-aberto no <header>
            cabecalho.classList.toggle('menu-aberto');
            
            // Trava o scroll da página quando o menu está aberto
            document.body.classList.toggle('no-scroll');

            // Atualiza a acessibilidade (ARIA)
            const menuAberto = cabecalho.classList.contains('menu-aberto');
            btnHamburger.setAttribute('aria-expanded', menuAberto);
            btnHamburger.setAttribute('aria-label', menuAberto ? 'Fechar menu' : 'Abrir menu');
        });
    }

}); // <-- FIM DO document.addEventListener