document.addEventListener('DOMContentLoaded', function() {

    // Função principal que carrega e constrói o carrossel
    async function loadAndBuildCarousel() {
        const carouselSlide = document.querySelector('.carousel-slide');
        if (!carouselSlide) return; // Se não houver carrossel na página, para a execução

        try {
            // 1. Busca os dados dos banners no arquivo JSON
            const response = await fetch('js/home/banners.json');
            if (!response.ok) throw new Error('Não foi possível carregar os banners.');
            
            const banners = await response.json();

            // 2. Cria o HTML para cada banner
            const slidesHTML = banners.map(banner => `
                <div class="slide">
                    <div class="slide-background" style="background-image: url('${banner.imagem}');"></div>
                    <div class="slide-content">
                        <h2>${banner.titulo}</h2>
                        <p>${banner.descricao}</p>
                        <a href="${banner.link}" class="btn-saber-mais">${banner.textoBotao}</a>
                    </div>
                </div>
            `).join('');

            // 3. Insere o HTML gerado dentro do contêiner do carrossel
            carouselSlide.innerHTML = slidesHTML;
            
            // Ajusta a largura do 'trilho' com base na quantidade de slides
            carouselSlide.style.width = `${banners.length * 100}%`;

            // 4. Inicia a funcionalidade do carrossel (botões, dots, autoplay)
            initializeCarousel();

        } catch (error) {
            console.error('Erro ao montar o carrossel:', error);
            carouselSlide.innerHTML = '<p style="text-align: center; color: white; padding: 20px;">Ocorreu um erro ao carregar os destaques.</p>';
        }
    }

    // Função que contém toda a lógica de funcionamento do carrossel
    function initializeCarousel() {
        const carouselSlide = document.querySelector('.carousel-slide');
        const slides = document.querySelectorAll('.slide');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const dotsContainer = document.querySelector('.carousel-dots');
        
        if (slides.length <= 1) { // Se tiver 1 ou 0 slides, esconde a navegação
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
            dotsContainer.style.display = 'none';
            return;
        }

        let currentIndex = 0;
        const slideCount = slides.length;
        let autoPlayInterval;

        slides.forEach(slide => {
        slide.style.width = `${100 / slideCount}%`;
        });

        // Limpa e cria as bolinhas de navegação
        dotsContainer.innerHTML = '';
        for (let i = 0; i < slideCount; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            dot.addEventListener('click', () => {
                goToSlide(i);
                resetAutoPlay();
            });
            dotsContainer.appendChild(dot);
        }
        const dots = document.querySelectorAll('.dot');

        // Função principal para mover para um slide
        function goToSlide(index) {
            index = (index + slideCount) % slideCount; // Lógica para carrossel infinito
            carouselSlide.style.transform = `translateX(-${index * (100 / slideCount)}%)`;
            currentIndex = index;
            updateDots();
        }
        
        // Atualiza qual bolinha está ativa
        function updateDots() {
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }

        // Funções para os botões de seta
        const showNextSlide = () => goToSlide(currentIndex + 1);
        const showPrevSlide = () => goToSlide(currentIndex - 1);
        
        // Autoplay
        const startAutoPlay = () => autoPlayInterval = setInterval(showNextSlide, 5000);
        const resetAutoPlay = () => {
            clearInterval(autoPlayInterval);
            startAutoPlay();
        };

        // Event Listeners
        nextBtn.addEventListener('click', () => { showNextSlide(); resetAutoPlay(); });
        prevBtn.addEventListener('click', () => { showPrevSlide(); resetAutoPlay(); });

        // Inicia o carrossel
        goToSlide(0);
        startAutoPlay();
    }

    // Chama a função principal para iniciar todo o processo
    loadAndBuildCarousel();
});