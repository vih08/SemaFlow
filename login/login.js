// Captura o formulário de login
const loginForm = document.getElementById("loginForm");

// Quando o usuário tentar fazer login
loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Pega os valores dos campos
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();

    // Busca os usuários cadastrados no LocalStorage
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Procura o usuário pelo email e senha
    const usuario = usuarios.find(user => user.email === email && user.senha === senha);

    // Se o usuário não existir, avisa e bloqueia o login
    if (!usuario) {
        alert("Conta não encontrada! Cadastre-se primeiro.");
        return;
    }

    // Se encontrou o usuário, faz login
    alert(`Bem-vindo(a), ${usuario.nome}!`);
    localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

    // Redireciona para a página principal
    window.location.href = "Paginas/home.html";
});

// Botão para ir para a tela de cadastro
document.getElementById("linkCadastro").addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "./cadastro/cadastro.html";
});
