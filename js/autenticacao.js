/* ===================== NAVEGAÇÃO ENTRE TELAS DE AUTENTICAÇÃO ===================== */

function mostrarTelaAuth(tela) {

    const boxes = { login: loginBox, cadastro: cadastroBox, recuperar: recuperarBox };

    Object.keys(boxes).forEach(function (nome) {

        if (nome === tela) {
            exibirComFade(boxes[nome], "block");
        } else {
            esconderElemento(boxes[nome]);
        }

    });

    loginError.style.display = "none";
    cadastroError.style.display = "none";
    cadastroSucesso.style.display = "none";
    recuperarError.style.display = "none";
    recuperarSucesso.style.display = "none";

}

linkCriarConta.addEventListener("click", function () {
    mostrarTelaAuth("cadastro");
});

linkEsqueciSenha.addEventListener("click", function () {
    mostrarTelaAuth("recuperar");
});

linkVoltarLoginDeCadastro.addEventListener("click", function () {
    mostrarTelaAuth("login");
});

linkVoltarLoginDeRecuperar.addEventListener("click", function () {
    mostrarTelaAuth("login");
});


/* ===================== LOGIN ===================== */

function fazerLogin() {

    const usuario = inputUsuario.value.trim();
    const senha = inputSenha.value.trim();

    loginError.style.display = "none";

    const contaValida = usuariosCadastrados.find(function (conta) {
        return conta.usuario === usuario && conta.senha === senha;
    });

    if (contaValida) {

        esconderElemento(loginScreen);
        exibirComFade(appScreen, "block");

        mostrarToast("Login realizado com sucesso!", "sucesso");

    } else {

        loginError.textContent = "Usuário ou senha inválidos. Tente novamente.";
        loginError.style.display = "block";

    }

}

function fazerLogout() {

    esconderElemento(appScreen);

    exibirComFade(loginScreen, "flex");

    mostrarTelaAuth("login");

    inputUsuario.value = "";
    inputSenha.value = "";

    inputCodigo.value = "";
    esconderElemento(resultado);
    erro.style.display = "none";

    selecionarAba("consulta");

    mostrarToast("Você saiu da sua conta.", "info");

}

function iniciarLogin() {
    comCarregamento(btnEntrar, "Entrando...", 450, fazerLogin);
}

btnEntrar.addEventListener("click", iniciarLogin);
btnSair.addEventListener("click", fazerLogout);

[inputUsuario, inputSenha].forEach(function (campo) {

    campo.addEventListener("keypress", function (event) {

        if (event.key === "Enter") {
            iniciarLogin();
        }

    });

});


/* ===================== CRIAR CONTA ===================== */

function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function marcarCampo(input, hintEl, ok, mensagem) {

    input.classList.remove("valido", "invalido");

    if (input.value.trim() === "") {
        hintEl.textContent = "";
        hintEl.classList.remove("erro", "sucesso");
        return;
    }

    input.classList.add(ok ? "valido" : "invalido");
    hintEl.textContent = mensagem;
    hintEl.classList.toggle("erro", !ok);
    hintEl.classList.toggle("sucesso", ok);

}

cadEmail.addEventListener("input", function () {

    const email = cadEmail.value.trim();
    const ok = validarEmail(email);

    marcarCampo(cadEmail, cadEmailHint, ok, ok ? "✓ E-mail válido" : "E-mail em formato inválido");

});

cadUsuario.addEventListener("input", function () {

    const usuario = cadUsuario.value.trim();
    const emUso = usuariosCadastrados.some(function (c) { return c.usuario === usuario; });

    marcarCampo(
        cadUsuario,
        cadUsuarioHint,
        usuario.length >= 3 && !emUso,
        emUso ? "Esse usuário já está em uso" :
            usuario.length < 3 ? "Use pelo menos 3 caracteres" : "✓ Usuário disponível"
    );

});

cadSenha.addEventListener("input", function () {

    const senha = cadSenha.value;
    const ok = senha.length >= 6;

    marcarCampo(cadSenha, cadSenhaHint, ok, ok ? "✓ Senha com tamanho adequado" : "Faltam " + (6 - senha.length) + " caractere(s)");

    if (cadConfirmarSenha.value) {
        cadConfirmarSenha.dispatchEvent(new Event("input"));
    }

});

cadConfirmarSenha.addEventListener("input", function () {

    const ok = cadConfirmarSenha.value === cadSenha.value && cadConfirmarSenha.value !== "";

    marcarCampo(cadConfirmarSenha, cadConfirmarSenhaHint, ok, ok ? "✓ As senhas coincidem" : "As senhas não coincidem");

});

function fazerCadastro() {

    const nome = cadNome.value.trim();
    const email = cadEmail.value.trim().toLowerCase();
    const usuario = cadUsuario.value.trim();
    const senha = cadSenha.value.trim();
    const confirmarSenha = cadConfirmarSenha.value.trim();

    cadastroError.style.display = "none";
    cadastroSucesso.style.display = "none";

    function mostrarErro(mensagem) {
        cadastroError.textContent = mensagem;
        cadastroError.style.display = "block";
    }

    if (!nome || !email || !usuario || !senha || !confirmarSenha) {
        mostrarErro("Preencha todos os campos para continuar.");
        return;
    }

    if (!validarEmail(email)) {
        mostrarErro("Informe um e-mail válido — ele será usado para recuperar a conta.");
        return;
    }

    if (senha.length < 6) {
        mostrarErro("A senha deve ter pelo menos 6 caracteres.");
        return;
    }

    if (senha !== confirmarSenha) {
        mostrarErro("As senhas não coincidem.");
        return;
    }

    const usuarioExiste = usuariosCadastrados.some(function (conta) {
        return conta.usuario === usuario;
    });

    if (usuarioExiste) {
        mostrarErro("Esse nome de usuário já está em uso. Escolha outro.");
        return;
    }

    const emailExiste = usuariosCadastrados.some(function (conta) {
        return conta.email === email;
    });

    if (emailExiste) {
        mostrarErro("Já existe uma conta cadastrada com esse e-mail.");
        return;
    }

    usuariosCadastrados.push({ nome: nome, email: email, usuario: usuario, senha: senha });

    cadastroSucesso.textContent =
        "Conta criada com sucesso! Agora você já pode entrar com seu usuário e senha.";
    cadastroSucesso.style.display = "block";

    mostrarToast("Conta criada com sucesso!", "sucesso");

    cadNome.value = "";
    cadEmail.value = "";
    cadUsuario.value = "";
    cadSenha.value = "";
    cadConfirmarSenha.value = "";

    [cadEmail, cadUsuario, cadSenha, cadConfirmarSenha].forEach(function (campo) {
        campo.classList.remove("valido", "invalido");
    });

    [cadEmailHint, cadUsuarioHint, cadSenhaHint, cadConfirmarSenhaHint].forEach(function (hint) {
        hint.textContent = "";
        hint.classList.remove("erro", "sucesso");
    });

    setTimeout(function () {
        mostrarTelaAuth("login");
        inputUsuario.value = usuario;
    }, 1400);

}

function iniciarCadastro() {
    comCarregamento(btnCriarConta, "Criando conta...", 600, fazerCadastro);
}

btnCriarConta.addEventListener("click", iniciarCadastro);


/* ===================== RECUPERAR SENHA ===================== */

recEmail.addEventListener("input", function () {

    const ok = validarEmail(recEmail.value.trim());

    marcarCampo(recEmail, recEmailHint, ok, ok ? "✓ E-mail válido" : "E-mail em formato inválido");

});

function fazerRecuperacao() {

    const email = recEmail.value.trim().toLowerCase();

    recuperarError.style.display = "none";
    recuperarSucesso.style.display = "none";

    if (!email || !validarEmail(email)) {
        recuperarError.textContent = "Informe um e-mail válido.";
        recuperarError.style.display = "block";
        return;
    }

    // Por segurança, a mensagem de sucesso não revela se o e-mail existe ou não.
    recuperarSucesso.textContent =
        "Se esse e-mail estiver cadastrado, enviamos as instruções de redefinição de senha para ele. (Demonstração — nenhum e-mail real é enviado.)";
    recuperarSucesso.style.display = "block";

    mostrarToast("Instruções enviadas (demonstração).", "info");

    recEmail.value = "";
    recEmail.classList.remove("valido", "invalido");
    recEmailHint.textContent = "";
    recEmailHint.classList.remove("erro", "sucesso");

}

function iniciarRecuperacao() {
    comCarregamento(btnRecuperar, "Enviando...", 600, fazerRecuperacao);
}

btnRecuperar.addEventListener("click", iniciarRecuperacao);
