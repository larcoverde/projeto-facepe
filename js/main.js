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

// Se existe uma sessão salva (cookie "Manter conectado" de uma visita
// anterior) e o usuário ainda existe nesta sessão do navegador, entra
// automaticamente sem passar pela tela de login.
const usuarioComSessaoSalva = lerCookie("lactapp-sessao");

if (usuarioComSessaoSalva) {

    const contaSalva = usuariosCadastrados.find(function (conta) {
        return conta.usuario === usuarioComSessaoSalva;
    });

    if (contaSalva) {

        esconderElemento(loginScreen);
        exibirComFade(appScreen, "block");

        mostrarToast("Bem-vindo(a) de volta, " + contaSalva.nome.split(" ")[0] + "!", "sucesso");

    } else {

        // Conta não existe mais nesta sessão (o "banco de dados" deste
        // protótipo é reiniciado a cada recarregamento da página) —
        // remove o cookie desatualizado em vez de deixar o usuário preso.
        removerCookie("lactapp-sessao");

    }

}
