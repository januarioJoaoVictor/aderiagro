// Envelopamos toda a lógica JS para só rodar quando a estrutura do site (HTML) estiver pronta
document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. ANIMAÇÕES DE ELITE (ScrollReveal)
    // ==========================================
    const sr = ScrollReveal({ origin: 'top', distance: '50px', duration: 2000, delay: 200, reset: false });
    sr.reveal('.hero-conteudo', { origin: 'left' }); 
    sr.reveal('.card-pilar', { interval: 200 }); 
    sr.reveal('.sobre-imagem-wrapper', { origin: 'bottom' }); 
    sr.reveal('.sobre-conteudo', { origin: 'bottom', delay: 400 }); 
    sr.reveal('.card-oval', { interval: 200 }); 

    // ==========================================
    // 2. WHATSAPP FLUTUANTE (Atenção de Vendas)
    // ==========================================
    setTimeout(() => {
        const btnZap = document.getElementById('btn-zap');
        if(btnZap) {
            btnZap.classList.add('animar-zap');
            setTimeout(() => { btnZap.classList.remove('animar-zap'); }, 2000);
        }
    }, 5000);

    // ==========================================
    // 3. SCROLL SUAVE (Navegação Âncora)
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if(targetId === '#') return; // Evita erro se o href for apenas "#"
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault(); 
                window.scrollTo({
                    top: targetElement.offsetTop - 80, 
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==========================================
    // 4. MENU MOBILE (A Porteira Responsiva)
    // ==========================================
    const btnMenu = document.getElementById('btn-menu');
    const menuNav = document.querySelector('.menu-navegacao');

    if(btnMenu && menuNav) {
        btnMenu.addEventListener('click', () => {
            menuNav.classList.toggle('ativo');
            if(menuNav.classList.contains('ativo')) {
                btnMenu.classList.replace('ph-list', 'ph-x');
            } else {
                btnMenu.classList.replace('ph-x', 'ph-list');
            }
        });

        // Inteligência Comercial: Fecha o menu sozinho quando o cliente clica em um link
        document.querySelectorAll('.menu-navegacao a').forEach(link => {
            link.addEventListener('click', () => {
                menuNav.classList.remove('ativo');
                btnMenu.classList.replace('ph-x', 'ph-list');
            });
        });
    }

    // ==========================================
    // 5. MÓDULO FINANCEIRO (Consumo de API - Dólar)
    // ==========================================
    async function buscarPrecoDolar() {
        try {
            const resposta = await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL');
            const dados = await resposta.json();
            const precoDolar = dados.USDBRL.bid;
            const precoFormatado = Number(precoDolar).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

            // A mágica agora manda pro card dentro do slide 2
            const cardDolar = document.getElementById('card-dolar');
            if (cardDolar) {
                cardDolar.textContent = precoFormatado;
            }
        } catch (erro) {
            console.error("Erro na busca da cotação:", erro);
            const cardDolar = document.getElementById('card-dolar');
            if (cardDolar) {
                cardDolar.textContent = "Indisponível";
            }
        }
    }
    buscarPrecoDolar();

});

// ==========================================
    // CARROSSEL HERO (Swiper.js)
    // ==========================================
    const swiper = new Swiper(".myHeroSwiper", {
        loop: true, // Fica girando infinito
        autoplay: {
            delay: 6000, // Gira sozinho a cada 6 segundos
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });