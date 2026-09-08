/* ===================== UTILITÁRIOS DE UX ===================== */

function mostrarToast(mensagem, tipo) {

    tipo = tipo || "info";

    const toast = document.createElement("div");
    toast.className = "toast " + tipo;
    toast.textContent = mensagem;

    toastContainer.appendChild(toast);

    void toast.offsetWidth;

    toast.classList.add("mostrar");

    setTimeout(function () {

        toast.classList.remove("mostrar");

        setTimeout(function () {
            toast.remove();
        }, 300);

    }, 3200);

}

function exibirComFade(elemento, tipoDisplay) {

    elemento.style.display = tipoDisplay || "block";
    elemento.classList.remove("tela-visivel");

    void elemento.offsetWidth;

    requestAnimationFrame(function () {
        elemento.classList.add("tela-visivel");
    });

}

function esconderElemento(elemento) {
    elemento.classList.remove("tela-visivel");
    elemento.style.display = "none";
}

function comCarregamento(botao, textoCarregando, atraso, callback) {

    if (botao.disabled) return;

    const textoOriginal = botao.textContent;

    botao.disabled = true;
    botao.innerHTML = '<span class="btn-spinner"></span>' + textoCarregando;

    setTimeout(function () {

        callback();

        botao.disabled = false;
        botao.textContent = textoOriginal;

    }, atraso);

}

document.querySelectorAll(".toggle-senha").forEach(function (botao) {

    botao.addEventListener("click", function () {

        const campo = document.getElementById(botao.dataset.target);

        if (campo.type === "password") {
            campo.type = "text";
            botao.textContent = "🙈";
            botao.setAttribute("aria-label", "Ocultar senha");
        } else {
            campo.type = "password";
            botao.textContent = "👁";
            botao.setAttribute("aria-label", "Mostrar senha");
        }

    });

});
