// Espera todo o HTML carregar
document.addEventListener('DOMContentLoaded', function() {
    
    // --- FUNÇÃO PARA CARREGAR EVENTOS/NOTÍCIAS ---
    const eventosContainer = document.getElementById('eventos-container');

    async function carregarEventos() {
        if (!eventosContainer) {
            return;
        }
        try {
            const response = await fetch('js/home/eventos.json'); 
            if (!response.ok) {
                throw new Error('Não foi possível carregar as notícias.');
            }
            const eventos = await response.json();

            if (eventos.length === 0) {
                eventosContainer.innerHTML = '<p>Nenhuma notícia publicada no momento.</p>';
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
                        <p class="descricao">${evento.descricao}</p> 
                    </div>
                `;
                eventosContainer.appendChild(card);
            });

        } catch (error) {
            console.error('Erro ao carregar notícias:', error);
            eventosContainer.innerHTML = '<p>Ocorreu um erro ao carregar as notícias.</p>';
        }
    }

    
    // --- FUNÇÃO PARA CARREGAR PROGRAMAS (NA PÁG. SOBRE) ---
    const programasContainer = document.getElementById('programas-container');

    async function carregarProgramas() {
        if (!programasContainer) {
            return; 
        }

        try {
            // Caminho corrigido para o seu JSON de programas
            const response = await fetch('js/sobre/programas.json');
            
            if (!response.ok) {
                throw new Error('Não foi possível carregar os programas.');
            }
            
            const programas = await response.json();

            programasContainer.innerHTML = ''; 

            // ***** ESTA É A PARTE ATUALIZADA *****
            // Cria os novos cards (semelhantes aos de doação)
            programas.forEach(programa => {
                const card = document.createElement('div');
                card.className = 'programa-card'; // Usaremos esta classe para o estilo

                // Define o HTML interno do card
                card.innerHTML = `
                    <h4>${programa.titulo}</h4>
                    <p>${programa.descricao}</p>
                `;
                
                programasContainer.appendChild(card);
            });
            // ***** FIM DA PARTE ATUALIZADA *****

        } catch (error) {
            console.error('Erro ao carregar programas:', error);
            programasContainer.innerHTML = '<p>Erro ao carregar programas. Tente mais tarde.</p>';
        }
    }
    
    // --- CHAMAR AS FUNÇÕES ---
    carregarEventos();
    carregarProgramas();

});