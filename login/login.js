// Captura o formulário
const form = document.getElementById("loginForm");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    if (email === "" || senha === "") {
        alert("Por favor, preencha todos os campos.");
    } else {
        alert(`Bem-vindo(a), ${email}!`);
    }
});

// --- REDIRECIONAMENTOS CORRETOS ---

// Esqueceu a senha → redefinir.html
document.getElementById("linkEsqueceu").addEventListener("click", () => {
    window.location.href = "adicionais/redefinir.html"; 
});

// Não possui conta → cadastro.html
document.getElementById("linkCadastro").addEventListener("click", () => {
    window.location.href = "    cadastro/cadastro.html"; 
});

// Central de ajuda → ajuda.html
document.getElementById("linkAjuda").addEventListener("click", () => {
    window.location.href = "adicionais/ajuda.html"; 
});

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Impede o envio padrão do formulário

        // Aqui você poderia colocar validações de login futuramente
        // Por enquanto, vamos só redirecionar:
        window.location.href = "Paginas/home.html"; // Caminho do novo index
    });
});
