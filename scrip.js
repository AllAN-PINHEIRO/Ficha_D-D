function modificador(event) {
    var inputElement = event.target; // Pega o input que disparou o evento
    var atributo = Number(inputElement.value);
    var modificadorInput = inputElement.nextElementSibling; // O próximo input na estrutura

    //verifica e calcula os parametros para os modificadores
    if (!isNaN(atributo) && inputElement.value !== "") {
        var valorModificador = Math.floor((atributo - 10) / 2);
        modificadorInput.value = valorModificador;
    } else {
        modificadorInput.value = "";
    }

    // Chamar a função resistencia()
    resistencia();
}

function resistencia() {
    var atributos = document.querySelectorAll(".atributo"); // Todos os atributos
    var resistencias = document.querySelectorAll(".rs"); // Todos os inputs de resistência

    atributos.forEach((input, index) => {
        var atributoValor = Number(input.value);
        if (!isNaN(atributoValor) && input.value !== "") {
            resistencias[index].value = Math.floor((atributoValor - 10) / 2);
        } else {
            resistencias[index].value = "";
        }
    });
}

// Adiciona os eventos de input
document.querySelectorAll(".atributo").forEach(input => {
    input.addEventListener("input", modificador);
});
