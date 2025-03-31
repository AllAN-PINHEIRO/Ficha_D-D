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
    let checkResistencia = document.querySelectorAll(".proficiencia");
    var bonusProficiencia = document.getElementsByName("bonus_proficiencia");
    
    var atributos = document.querySelectorAll(".atributo"); // Todos os atributos
    var resistencias = document.querySelectorAll(".rs"); // Todos os inputs de resistência
    var valorbonus = Number(bonusProficiencia[0].value) || 0;

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
    let periciaForc = document.querySelectorAll(".rs#forc");
    let periciaDest = document.querySelectorAll(".rs#dest");
    let periciaInt = document.querySelectorAll(".rs#int");
    let periciaSab = document.querySelectorAll(".rs#sab");
    let periciaCar = document.querySelectorAll(".rs#car");

    atributos.forEach((input, index) => {
        let valor = calculoModificador(Number(input.value) || 0);
        let checproficiencia = document.querySelectorAll(".proficiencia")
        var bonusProficiencia = document.getElementsByName("bonus_proficiencia")
        let valorbonus = Number(bonusProficiencia.value)

        
        switch (index) {
            case 0: // Força
                periciaForc.forEach((pericia, i) => {
                    pericia.value = valor;
                    if (checproficiencia[i]?.checked) {
                        pericia.value = valor + valorbonus;
                    }
                });
                
                break;
            case 1: // Destreza
                periciaDest.forEach(pericia => pericia.value = valor);
                break;
            case 3: // Inteligência
                periciaInt.forEach(pericia => pericia.value = valor);
                break;
            case 4: // Sabedoria
                periciaSab.forEach(pericia => pericia.value = valor);
                break;
            case 5: // Carisma
                periciaCar.forEach(pericia => pericia.value = valor);
                break;
        }
    });
}


// Adiciona eventos de input para atualizar os modificadores e resistências
document.querySelectorAll(".atributo").forEach(input => {
    input.addEventListener("input", modificador);
});

// Adiciona eventos para os checkboxes de proficiência
document.querySelectorAll(".proficiencia").forEach(input => {
    input.addEventListener("change", resistencia);
});

// Inicializa as perícias corretamente
pericias();
