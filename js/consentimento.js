/* ===================== CONSENTIMENTO DE COOKIES ===================== */
/* Mostra um aviso simples sobre o uso de cookies (tema, sessão de      */
/* login etc.) até o usuário aceitar. Depois disso, não aparece mais    */
/* (a menos que o cookie de consentimento seja apagado).                */

function criarBannerConsentimento() {

    const banner = document.createElement("div");
    banner.className = "banner-cookies";
    banner.id = "bannerCookies";

    banner.innerHTML =
        '<p>' +
            '🍪 Usamos cookies para lembrar seu tema, sua sessão de login e outras preferências. ' +
            'Veja nossa <a href="privacidade.html">Política de Privacidade</a> e nossos ' +
            '<a href="termos.html">Termos e Condições</a>.' +
        '</p>' +
        '<button type="button" class="banner-cookies-botao" id="botaoAceitarCookies">Entendi</button>';

    document.body.appendChild(banner);

    const containerDeToasts = typeof toastContainer !== "undefined" ? toastContainer : null;

    function ajustarEspacoReservado() {
        document.body.style.paddingBottom = banner.offsetHeight + 24 + "px";
    }

    if (containerDeToasts) {
        containerDeToasts.classList.add("acima-do-banner-cookies");
    }

    document.getElementById("botaoAceitarCookies").addEventListener("click", function () {

        definirCookie("lactapp-cookies-aceitos", "sim", 365);

        banner.classList.remove("banner-cookies-visivel");
        document.body.style.paddingBottom = "";

        if (containerDeToasts) {
            containerDeToasts.classList.remove("acima-do-banner-cookies");
        }

        setTimeout(function () {
            banner.remove();
        }, 250);

    });

    requestAnimationFrame(function () {
        banner.classList.add("banner-cookies-visivel");
        // Reserva espaço só depois que o banner já tem seu tamanho final
        // (ele pode quebrar em 2+ linhas em telas estreitas).
        ajustarEspacoReservado();
    });

    window.addEventListener("resize", function () {
        if (document.body.contains(banner)) {
            ajustarEspacoReservado();
        }
    });

}

if (lerCookie("lactapp-cookies-aceitos") !== "sim") {
    criarBannerConsentimento();
}
