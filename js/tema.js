/* ===================== TEMA CLARO / ESCURO / SISTEMA ===================== */
/* A leitura inicial do tema salvo é feita por um script inline no      */
/* <head> de cada página (evita o "flash" do tema errado ao carregar).  */
/* Este arquivo cuida da troca via botão, de manter os ícones           */
/* sincronizados e de reagir a mudanças do tema do sistema operacional. */

const CICLO_TEMA = ["claro", "escuro", "sistema"];

const ICONE_TEMA = {
    claro: "☀️",
    escuro: "🌙",
    sistema: "🖥️",
};

const ROTULO_TEMA = {
    claro: "Tema: Claro (clique para alternar)",
    escuro: "Tema: Escuro (clique para alternar)",
    sistema: "Tema: Automático, segue o sistema (clique para alternar)",
};

function sistemaPrefereEscuro() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function obterPreferenciaTema() {
    return lerCookie("lactapp-tema") || "claro";
}

function aplicarTemaNoDocumento(preferencia) {

    const efetivo = preferencia === "sistema"
        ? (sistemaPrefereEscuro() ? "escuro" : "claro")
        : preferencia;

    if (efetivo === "escuro") {
        document.documentElement.setAttribute("data-theme", "escuro");
    } else {
        document.documentElement.removeAttribute("data-theme");
    }

}

function atualizarBotoesTema() {

    const preferencia = obterPreferenciaTema();

    document.querySelectorAll(".botao-tema").forEach(function (botao) {
        botao.textContent = ICONE_TEMA[preferencia];
        botao.setAttribute("aria-label", ROTULO_TEMA[preferencia]);
        botao.title = ROTULO_TEMA[preferencia];
    });

}

function alternarTema() {

    const atual = obterPreferenciaTema();
    const proximo = CICLO_TEMA[(CICLO_TEMA.indexOf(atual) + 1) % CICLO_TEMA.length];

    definirCookie("lactapp-tema", proximo, 365);

    aplicarTemaNoDocumento(proximo);
    atualizarBotoesTema();

}

document.querySelectorAll(".botao-tema").forEach(function (botao) {
    botao.addEventListener("click", alternarTema);
});

// Se a preferência for "sistema" e o SO mudar de claro pra escuro (ou
// vice-versa) com a página já aberta, acompanha a mudança em tempo real.
if (window.matchMedia) {

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function () {

        if (obterPreferenciaTema() === "sistema") {
            aplicarTemaNoDocumento("sistema");
        }

    });

}

atualizarBotoesTema();
