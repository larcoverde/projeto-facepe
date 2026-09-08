/* ===================== DADOS FICTÍCIOS (MVP) ===================== */
/* "Banco de dados" em memória, apenas para demonstração.              */
/* Ele é reiniciado sempre que a página é recarregada.                 */

const usuariosCadastrados = [
    {
        nome: "Fazenda Demo",
        email: "contato@fazendaboavista.com.br",
        usuario: "fazenda",
        senha: "123456",
    },
];

let lotesCadastrados = [];

async function carregarLotes() {

    if (exemploLotes) {
        exemploLotes.innerHTML = '<span class="spinner"></span> Carregando códigos de exemplo...';
    }

    try {

        const resposta = await fetch("data/lotes.json");

        if (!resposta.ok) {
            throw new Error("Resposta HTTP " + resposta.status);
        }

        lotesCadastrados = await resposta.json();

        if (inputCodigo) inputCodigo.disabled = false;
        if (btnConsultar) btnConsultar.disabled = false;

    } catch (erroCarregamento) {

        console.error("Não foi possível carregar data/lotes.json:", erroCarregamento);
        lotesCadastrados = [];

    }

    popularExemplosLotes();

}

function popularExemplosLotes() {

    if (!exemploLotes) return;

    if (!lotesCadastrados || lotesCadastrados.length === 0) {

        exemploLotes.innerHTML =
            '⚠️ Não foi possível carregar os lotes de demonstração.' +
            '<button type="button" class="btn-tentar-novamente" id="btnTentarNovamente">Tentar novamente</button>';

        const btnTentarNovamente = document.getElementById("btnTentarNovamente");

        if (btnTentarNovamente) {
            btnTentarNovamente.addEventListener("click", carregarLotes);
        }

        return;

    }

    const chipsHtml = lotesCadastrados.map(function (l) {
        return '<span class="chip-codigo" data-codigo="' + l.codigo + '">' + l.codigo + '</span>';
    }).join("");

    exemploLotes.innerHTML =
        '💡 Para testar, clique em um dos códigos abaixo ou digite-o na busca:' +
        '<div class="example-codigos">' + chipsHtml + '</div>';

    exemploLotes.querySelectorAll(".chip-codigo").forEach(function (chip) {

        chip.addEventListener("click", function () {
            inputCodigo.value = chip.dataset.codigo;
            fecharSugestoes();
            iniciarConsulta();
        });

    });

}
