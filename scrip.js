function calculoModificador(atributo){
    valorModificador =  Math.floor((atributo - 10) / 2)
    return valorModificador
}


function modificador(event) {
    var inputElement = event.target // Pega o input que disparou o evento
    var atributo = Number(inputElement.value);
    var modificadorInput = inputElement.nextElementSibling; // O próximo input na estrutura

    //verifica e calcula os parametros para os modificadores
    if (!isNaN(atributo) && inputElement.value !== "") {
        var valorModificador = calculoModificador(atributo);
        modificadorInput.value = valorModificador
    } else {
        modificadorInput.value = ""
    }

    // Chamar a função resistencia()
    resistencia();
}

function resistencia() {
    let checkResistencia = document.querySelectorAll(".proficiencia")
    var bonusProficiencia = document.getElementsByName("bonus_proficiencia")


    var atributos = document.querySelectorAll(".atributo"); // Todos os atributos
    var resistencias = document.querySelectorAll(".rs"); // Todos os inputs de resistência
    var valorbonus = Number(bonusProficiencia[0].value);

    atributos.forEach((input, index) => {
        var atributoValor = Number(input.value);
       
        if (!isNaN(atributoValor) && input.value !== "") {
            resistencias[index].value = calculoModificador(atributoValor)

            if(!isNaN(atributoValor) && input.value !== "" && checkResistencia[index].checked){
                 resistencias[index].value = calculoModificador(atributoValor) + valorbonus

            }
        } 
        else {
            resistencias[index].value = "";
        }
    });
}


// Adiciona os eventos de input
document.querySelectorAll(".atributo").forEach(input => {
    input.addEventListener("input", modificador);
});

document.querySelectorAll(".proficiencia").forEach(input =>
{ input.addEventListener("input", resistencia)}
)
