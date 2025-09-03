const form = document.getElementById("cadastroForm");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("emailCadastro").value.trim();
    const senha = document.getElementById("senhaCadastro").value.trim();

    if (!nome || !email || !senha) {
        alert("Preencha todos os campos!");
        return;
    }

    // Busca os usuários salvos ou cria um novo array
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Verifica se o e-mail já está cadastrado
    const usuarioExistente = usuarios.find(user => user.email === email);
    if (usuarioExistente) {
        alert("Este e-mail já está cadastrado!");
        return;
    }

    // Salva o novo usuário
    usuarios.push({ nome, email, senha });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Cadastro realizado com sucesso! Faça login agora.");

    // Redireciona para o login
    window.location.href = "../index.html";
});
