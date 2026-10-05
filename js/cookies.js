/* ===================== COOKIES (UTILITÁRIO) ===================== */
/* Funções básicas de leitura/escrita de cookies, usadas por          */
/* tema.js, autenticacao.js e consentimento.js.                       */
/* Precisa ser o primeiro <script> carregado na página (os outros     */
/* dependem dele).                                                    */

function definirCookie(nome, valor, dias) {

    const expira = new Date();
    expira.setTime(expira.getTime() + dias * 24 * 60 * 60 * 1000);

    document.cookie =
        nome + "=" + encodeURIComponent(valor) +
        ";expires=" + expira.toUTCString() +
        ";path=/;SameSite=Lax";

}

function lerCookie(nome) {

    const partes = document.cookie.split("; ");

    for (let i = 0; i < partes.length; i++) {

        const separador = partes[i].indexOf("=");
        const chave = partes[i].substring(0, separador);

        if (chave === nome) {
            return decodeURIComponent(partes[i].substring(separador + 1));
        }

    }

    return null;

}

function removerCookie(nome) {
    document.cookie = nome + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;SameSite=Lax";
}
