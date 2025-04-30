const display = document.getElementById("display");

let expressao = "";
const LIMITE_CARACTERES = 15;


document.querySelectorAll(".numero, .operador").forEach(botao => {
    botao.addEventListener("click", () => {
        const valor = botao.textContent;

        if (valor === "=") {
            calcular();
        } else if (valor === "⌫") {
            apagarUltimo();
        } else {
            adicionarAoDisplay(valor);
        }
    });
});


function adicionarAoDisplay(valor) {
    if (expressao.length >= LIMITE_CARACTERES) {
        display.textContent = "Limite excedido, Apague alguns numeros.";
        return; 
    }

    if (valor === "x") valor = "*";
    if (valor === "÷") valor = "/";

    if (expressao.length >= LIMITE_CARACTERES) return ;

    const operadores = ["+", "-", "*", "/"];
    const ultimo = expressao.slice(-1);
    if (operadores.includes(ultimo) && operadores.includes(valor)) return;

    expressao += valor;
    display.textContent = expressao.replace(/\*/g, "x").replace(/\//g, "÷");
}

function apagarUltimo() {
    expressao = expressao.slice(0, -1);
    display.textContent = expressao.replace(/\*/g, "x").replace(/\//g, "÷");
}

function calcular() {
    try {
        if (expressao.includes("/0")) {
            const partes = expressao.split("/");
            const divisor = partes[partes.length - 1];
            if (parseFloat(divisor) === 0) {
                display.textContent = "Erro: divisão por zero";
                expressao = "";
                return;
            }
        }

        let resultado = eval(expressao);
        if (!isFinite(resultado) || isNaN(resultado)) {
            display.textContent = "Erro";
            expressao = "";
            return;
        }

        if (resultado.toString().length > 10) {
            resultado = resultado.toExponential(4);
        }

        display.textContent = resultado;
        expressao = resultado.toString();
    } catch (e) {
        display.textContent = "Erro";
        expressao = "";
    }
}
