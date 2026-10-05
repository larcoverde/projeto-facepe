/* ===================== ELEMENTOS ===================== */
/* Referências ao DOM, capturadas uma única vez e                */
/* reutilizadas por todos os outros arquivos JS.                 */
/* Precisa ser o primeiro <script> carregado na página.          */

const loginScreen = document.getElementById("loginScreen");
const appScreen = document.getElementById("appScreen");

const loginBox = document.getElementById("loginBox");
const cadastroBox = document.getElementById("cadastroBox");
const recuperarBox = document.getElementById("recuperarBox");

const inputUsuario = document.getElementById("usuario");
const inputSenha = document.getElementById("senha");
const manterConectado = document.getElementById("manterConectado");
const honeypotLogin = document.getElementById("honeypotLogin");
const loginError = document.getElementById("loginError");

const cadNome = document.getElementById("cadNome");
const cadEmail = document.getElementById("cadEmail");
const cadUsuario = document.getElementById("cadUsuario");
const cadSenha = document.getElementById("cadSenha");
const cadConfirmarSenha = document.getElementById("cadConfirmarSenha");
const cadAceiteTermos = document.getElementById("cadAceiteTermos");
const honeypotCadastro = document.getElementById("honeypotCadastro");
const cadastroError = document.getElementById("cadastroError");
const cadastroSucesso = document.getElementById("cadastroSucesso");

const cadEmailHint = document.getElementById("cadEmailHint");
const cadUsuarioHint = document.getElementById("cadUsuarioHint");
const cadSenhaHint = document.getElementById("cadSenhaHint");
const cadConfirmarSenhaHint = document.getElementById("cadConfirmarSenhaHint");

const recEmail = document.getElementById("recEmail");
const recuperarError = document.getElementById("recuperarError");
const recuperarSucesso = document.getElementById("recuperarSucesso");
const recEmailHint = document.getElementById("recEmailHint");
const honeypotRecuperar = document.getElementById("honeypotRecuperar");

const btnEntrar = document.getElementById("btnEntrar");
const btnCriarConta = document.getElementById("btnCriarConta");
const btnRecuperar = document.getElementById("btnRecuperar");
const btnSair = document.getElementById("btnSair");
const btnConsultar = document.getElementById("btnConsultar");

const linkCriarConta = document.getElementById("linkCriarConta");
const linkEsqueciSenha = document.getElementById("linkEsqueciSenha");
const linkVoltarLoginDeCadastro = document.getElementById("linkVoltarLoginDeCadastro");
const linkVoltarLoginDeRecuperar = document.getElementById("linkVoltarLoginDeRecuperar");

const inputCodigo = document.getElementById("codigoLote");
const resultado = document.getElementById("resultado");
const erro = document.getElementById("erro");
const exemploLotes = document.getElementById("exemploLotes");
const sugestoesCodigo = document.getElementById("sugestoesCodigo");

const tabBtnConsulta = document.getElementById("tabBtnConsulta");
const tabBtnRota = document.getElementById("tabBtnRota");
const tabConsulta = document.getElementById("tabConsulta");
const tabRota = document.getElementById("tabRota");

const toastContainer = document.getElementById("toastContainer");
