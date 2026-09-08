/* ===================== INICIALIZAÇÃO ===================== */
/* Chamado por último, depois que todos os outros arquivos JS  */
/* já foram carregados e todos os elementos do DOM já foram    */
/* capturados — evita referenciar variáveis ainda não          */
/* declaradas.                                                 */

carregarLotes();

// Se o usuário chegou pela landing page com a intenção de criar conta
// (?tela=cadastro), já abre o formulário de cadastro automaticamente.
const parametrosUrl = new URLSearchParams(window.location.search);

if (parametrosUrl.get("tela") === "cadastro") {
    mostrarTelaAuth("cadastro");
}
