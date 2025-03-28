function modificador(event) {
    var inputElement = event.target; // Pega o input que disparou o evento
    var atributo = Number(inputElement.value);
    var modificadorInput = inputElement.nextElementSibling; // O próximo input na estrutura

    if (!isNaN(atributo) && inputElement.value !== "") {
        modificadorInput.value = Math.floor((atributo - 10) / 2);
    } else {
        modificadorInput.value = "";
    }
}

// Adiciona o evento a todos os inputs da classe "atributo"
document.querySelectorAll(".atributo").forEach(input => {
    input.addEventListener("input", modificador);
});