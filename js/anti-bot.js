/* ===================== ANTI-BOT ===================== */
/* Duas camadas de proteção, usadas juntas nos formulários de         */
/* login, cadastro e recuperação de senha:                            */
/*                                                                     */
/* 1) Camada simples (sem serviço externo, sempre ativa):              */
/*    - Honeypot: um campo invisível que só um bot preencheria.        */
/*    - Tempo mínimo: um formulário enviado tempo demais rápido        */
/*      (menos de ~1s) é tratado como automatizado.                    */
/*                                                                     */
/* 2) Cloudflare Turnstile (opcional, precisa de uma site key real —   */
/*    ver TURNSTILE_SITE_KEY abaixo). Sem uma chave própria, usa a     */
/*    chave de teste pública da Cloudflare, que SEMPRE passa e NÃO     */
/*    oferece proteção real — serve só pra o widget aparecer e o       */
/*    fluxo funcionar em desenvolvimento.                              */

/* Troque pela sua site key real antes de publicar em produção:
   https://dash.cloudflare.com/?to=/:account/turnstile
   (chave de teste da própria Cloudflare — sempre aprova, não protege) */
const TURNSTILE_SITE_KEY = "1x00000000000000000000AA";

const relogiosFormulario = {};
const widgetsTurnstile = {};

/* ---------- Tempo mínimo de preenchimento ---------- */

function iniciarRelogioFormulario(nomeFormulario) {
    relogiosFormulario[nomeFormulario] = Date.now();
}

function preenchimentoRapidoDemais(nomeFormulario) {

    const inicio = relogiosFormulario[nomeFormulario];

    if (!inicio) return false;

    return (Date.now() - inicio) < 1000;

}

/* ---------- Honeypot ---------- */

function honeypotPreenchido(inputHoneypot) {
    return !!(inputHoneypot && inputHoneypot.value.trim() !== "");
}

/* ---------- Verificação combinada ---------- */
/* Retorna true se o envio "cheira" a bot (honeypot preenchido ou      */
/* enviado rápido demais). Não usa o Turnstile aqui — ele é checado    */
/* separadamente, porque tem sua própria mensagem de erro.             */

function pareceBot(nomeFormulario, inputHoneypot) {
    return honeypotPreenchido(inputHoneypot) || preenchimentoRapidoDemais(nomeFormulario);
}

/* ---------- Cloudflare Turnstile ---------- */

function renderizarTurnstile(idContainer) {

    if (!window.turnstile) return;
    if (widgetsTurnstile[idContainer]) return;

    const elemento = document.getElementById(idContainer);

    if (!elemento) return;

    widgetsTurnstile[idContainer] = window.turnstile.render(elemento, {
        sitekey: TURNSTILE_SITE_KEY,
        theme: "auto",
    });

}

function turnstileFoiResolvido(idContainer) {

    // Se o script do Turnstile não carregou (ex.: rede bloqueada), não
    // travamos o usuário por causa disso — a camada simples continua ativa.
    if (!window.turnstile) return true;

    const widgetId = widgetsTurnstile[idContainer];

    if (!widgetId) return false;

    return window.turnstile.getResponse(widgetId) !== "";

}

function resetarTurnstile(idContainer) {

    if (window.turnstile && widgetsTurnstile[idContainer]) {
        window.turnstile.reset(widgetsTurnstile[idContainer]);
    }

}

// Renderiza o widget da tela de login assim que o Turnstile terminar de
// carregar (a tela de login é a primeira visível ao abrir o app.html).
function onloadTurnstile() {
    renderizarTurnstile("turnstileLogin");
}
