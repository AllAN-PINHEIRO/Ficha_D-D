function calculoModificador(atributo) {
    return Math.floor((atributo - 10) / 2);
}

function modificador(event) {
    var inputElement = event.target; // Pega o input que disparou o evento
    var atributo = Number(inputElement.value);
    var modificadorInput = inputElement.nextElementSibling; // O próximo input na estrutura

    // Verifica e calcula os parâmetros para os modificadores
    if (!isNaN(atributo) && inputElement.value !== "") {
        var valorModificador = calculoModificador(atributo);
        modificadorInput.value = valorModificador;
    } else {
        modificadorInput.value = "";
    }

    // Atualizar resistências e perícias
    resistencia();
    pericias();
}

function resistencia() {
    let checkResistencia = document.querySelectorAll("#teste_resistencia .proficiencia");
    var bonusProficiencia = document.querySelectorAll(".bonus")
    
    var atributos = document.querySelectorAll(".atributo"); // Todos os atributos
    var resistencias = document.querySelectorAll(".rs"); // Todos os inputs de resistência
    let valorbonus = Number(bonusProficiencia[1]?.value) || 0;

    atributos.forEach((input, index) => {
        var atributoValor = Number(input.value);
       
        if (!isNaN(atributoValor) && input.value !== "") {
            resistencias[index].value = calculoModificador(atributoValor);

            if (checkResistencia[index].checked) {
                resistencias[index].value = calculoModificador(atributoValor) + valorbonus;
            }
        } else {
            resistencias[index].value = "";
        }
    });
}

function pericias() {
    let atributos = document.querySelectorAll(".atributo"); // Todos os atributos principais
    let bonusProficiencia = document.querySelectorAll(".bonus")[1];
    let valorbonus = Number(bonusProficiencia?.value) || 0; // Garante que não seja NaN

    let periciasMap = {
        "forc": document.querySelectorAll(".periciaforc"),
        "dest": document.querySelectorAll(".periciadest"),
        "int": document.querySelectorAll(".periciaint"),
        "sab": document.querySelectorAll(".periciasab"),
        "car": document.querySelectorAll(".periciacar")
    };

    let checproficiencia = document.querySelectorAll("#pericias .proficiencia");

    atributos.forEach((input, index) => {
        let valor = calculoModificador(Number(input.value) || 0);
        let idAtributo = ["forc", "dest", "const", "int", "sab", "car"][index];

        if (periciasMap[idAtributo]) {
            periciasMap[idAtributo].forEach((pericia) => {
                let checkbox = pericia.closest("tr")?.querySelector(".proficiencia"); // Pega o checkbox na mesma linha

                if (checkbox?.checked) {
                    pericia.value = valor + valorbonus;
                } else {
                    pericia.value = valor;
                }

                // Para garantir que o valor seja atualizado no input
                pericia.dispatchEvent(new Event('input'));
            });
        }
    });
}




//* Adiciona eventos de input para atualizar os modificadores e resistências
document.querySelectorAll(".atributo").forEach(input => {
    input.addEventListener("input", modificador);
});

// Adiciona eventos para os checkboxes de proficiência
document.querySelectorAll(".proficiencia").forEach(input => {
    input.addEventListener("change", resistencia);
});

// Inicializa as perícias corretamente



pericias();