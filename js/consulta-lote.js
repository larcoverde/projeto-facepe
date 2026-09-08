/* ===================== AUTOCOMPLETE ===================== */

function fecharSugestoes() {

    if (!sugestoesCodigo) return;

    sugestoesCodigo.classList.remove("aberto");
    sugestoesCodigo.innerHTML = "";

}

function mostrarSugestoes(filtro) {

    if (!sugestoesCodigo) return;

    if (!filtro) {
        fecharSugestoes();
        return;
    }

    const correspondencias = lotesCadastrados.filter(function (l) {
        return l.codigo.toUpperCase().includes(filtro);
    }).slice(0, 5);

    if (correspondencias.length === 0) {
        fecharSugestoes();
        return;
    }

    sugestoesCodigo.innerHTML = correspondencias.map(function (l) {
        return '<div class="sugestao-item" data-codigo="' + l.codigo + '">' +
                    '<div class="sugestao-codigo">' + l.codigo + '</div>' +
                    '<div class="sugestao-produto">' + l.produto + '</div>' +
               '</div>';
    }).join("");

    sugestoesCodigo.classList.add("aberto");

    sugestoesCodigo.querySelectorAll(".sugestao-item").forEach(function (item) {

        item.addEventListener("click", function () {
            inputCodigo.value = item.dataset.codigo;
            fecharSugestoes();
            iniciarConsulta();
        });

    });

}


/* ===================== INDICADORES DE QUALIDADE ===================== */

const TEXTO_STATUS = {
    adequado: "✓ Adequado",
    atencao: "⚠ Atenção",
    critico: "⛔ Fora do padrão",
};

const TEXTO_STATUS_GERAL = {
    adequado: "✓ Dentro dos padrões",
    atencao: "⚠ Atenção necessária",
    critico: "⛔ Fora dos padrões",
};

const PESO_STATUS = { adequado: 0, atencao: 1, critico: 2 };

function aplicarIndicador(prefixo, dado) {

    const status = (dado && dado.status) || "adequado";

    document.getElementById("qual" + prefixo).textContent = dado ? dado.valor : "";

    const item = document.getElementById("item" + prefixo);
    const selo = document.getElementById("status" + prefixo);

    item.classList.remove("atencao", "critico");
    selo.classList.remove("atencao", "critico");

    if (status !== "adequado") {
        item.classList.add(status);
        selo.classList.add(status);
    }

    selo.textContent = TEXTO_STATUS[status] || TEXTO_STATUS.adequado;

    return status;

}


/* ===================== CONSULTA DE LOTE ===================== */

function consultarLote() {

    const input = inputCodigo.value.trim().toUpperCase();

    fecharSugestoes();

    resultado.style.display = "none";
    erro.style.display = "none";

    const lote = lotesCadastrados.find(function (l) {
        return l.codigo === input;
    });

    if (lote) {

        document.getElementById("produto").textContent = lote.produto;
        document.getElementById("lote").textContent = lote.codigo;
        document.getElementById("dataProducao").textContent = lote.dataProducao;
        document.getElementById("quantidade").textContent = lote.quantidade;
        document.getElementById("produtor").textContent = lote.produtor;
        document.getElementById("fazenda").textContent = lote.fazenda;
        document.getElementById("municipio").textContent = lote.municipio;
        document.getElementById("animal").textContent = lote.animal;
        document.getElementById("raca").textContent = lote.raca;
        document.getElementById("producaoAnimal").textContent = lote.producaoAnimal;
        document.getElementById("ordenha").textContent = lote.ordenha;
        document.getElementById("volume").textContent = lote.volume;
        document.getElementById("temperatura").textContent = lote.temperatura;

        const qualidade = lote.qualidade || {};

        const statusIndicadores = [
            aplicarIndicador("Gordura", qualidade.gordura),
            aplicarIndicador("Proteina", qualidade.proteina),
            aplicarIndicador("Ph", qualidade.ph),
            aplicarIndicador("Temperatura", qualidade.temperatura),
        ];

        const statusGeral = statusIndicadores.reduce(function (pior, atual) {
            return PESO_STATUS[atual] > PESO_STATUS[pior] ? atual : pior;
        }, "adequado");

        const badgeGeral = document.getElementById("statusGeral");

        badgeGeral.classList.remove("atencao", "critico");

        if (statusGeral !== "adequado") {
            badgeGeral.classList.add(statusGeral);
        }

        badgeGeral.textContent = TEXTO_STATUS_GERAL[statusGeral];

        exibirComFade(resultado, "block");

        resultado.scrollIntoView({ behavior: "smooth" });

    } else {

        erro.style.display = "block";

    }

}

function iniciarConsulta() {
    comCarregamento(btnConsultar, "Consultando...", 300, consultarLote);
}

btnConsultar.addEventListener("click", iniciarConsulta);

inputCodigo.addEventListener("input", function () {
    mostrarSugestoes(inputCodigo.value.trim().toUpperCase());
});

inputCodigo.addEventListener("focus", function () {
    if (inputCodigo.value.trim()) {
        mostrarSugestoes(inputCodigo.value.trim().toUpperCase());
    }
});

inputCodigo.addEventListener("keypress", function (event) {

    if (event.key === "Enter") {
        iniciarConsulta();
    }

});

document.addEventListener("click", function (event) {

    if (!event.target.closest(".input-wrapper")) {
        fecharSugestoes();
    }

});
