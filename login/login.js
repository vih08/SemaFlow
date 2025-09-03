const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuario = usuarios.find(user => user.email === email && user.senha === senha);

    if (!usuario) {
        alert("Conta não encontrada! Cadastre-se primeiro.");
        return;
    }

    alert(`Bem-vindo(a), ${usuario.nome}!`);
    localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

    window.location.href = "Paginas/home.html";
});

document.getElementById("linkCadastro").addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "./cadastro/cadastro.html";
});
