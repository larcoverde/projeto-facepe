/* ===================== NAVEGAÇÃO POR ABAS ===================== */

function selecionarAba(aba) {

    const isConsulta = aba === "consulta";

    if (isConsulta) {
        esconderElemento(tabRota);
        exibirComFade(tabConsulta, "block");
    } else {
        esconderElemento(tabConsulta);
        exibirComFade(tabRota, "block");
    }

    tabBtnConsulta.classList.toggle("active", isConsulta);
    tabBtnRota.classList.toggle("active", !isConsulta);

}

tabBtnConsulta.addEventListener("click", function () {
    selecionarAba("consulta");
});

tabBtnRota.addEventListener("click", function () {
    selecionarAba("rota");
});
