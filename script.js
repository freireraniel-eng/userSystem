const form = document.querySelector('#formCadastro');
const  buscarCep = document.querySelector('#buscarCep');
const cep = document.querySelector('#cep');

function mensagem(texto, tipo = "sucesso") {
    Toastify({
        texto: texto,
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
            background: tipo === "sucesso"
            ? "#198754"
            : "#dc3545"
        }
    }).showToast();
}

//ouvir evento de click do buscarCep
buscarCep.addEventListener("click", async function() {
    //expressão regex
    const valor = cep.value.replace(/\D/g, "");
    if (valor.length !== 8) {
        alert("Digite um cep válido");
        return;
    } try {
        const resposta = await fetch(`https://viacep.com.br/ws/${valor}/json/`);
        const dados = await resposta.json();
        console.log(dados);
        if (!resposta.ok || dados.erro) 
            throw new Error("CEP não encontrado.");
        document.querySelector('#logradouro').value = dados.logradouro;
        document.querySelector('#bairro').value = dados.bairro;
        document.querySelector('#cidade').value = dados.localidade;
        document.querySelector('#estado').value = dados.uf;
        mensagem("Endereço encontrado!");
    } catch (erro) {
        mensagem(erro.message, "Cep não encontrado!");
    }
});

// ouvir evento de submit do formulário
form.addEventListener("submit", function(event){
    event.preventDefault();
    console.log(Object.fromEntries([...form.elements]
        .filter(element => element.id)
        .map(element => [element.id, element.value])
        ));
        form.reset();
});
