const convertButton = document.querySelector(".convert-button")
//*const é utilizado p/ declarar variavel
const currencySelect = document.querySelector(".currency-select")

function convertValues () {
    const inputCurrencyValue = parseFloat(document.querySelector(".input-currency").value)
    //*inputCurrencyValue é uma variavel, o doc querySelector esta sendo utilizado para procurar no index onde está a variavel, trazendo somente o value(valor)(esta chamando a variavel)
    const currencyValueToConvert = document.querySelector(".currency-value-to-convert") //*valor em real
    const currencyValueConvert = document.querySelector(".currency-value")//*outras moedas
   //* currencyvalueconvert é o valor ja convertido
   //*currencyvaluetoconvert é o valorp/ converter 

   //* Verifica se foi digitado um número válido
   if (isNaN(inputCurrencyValue) || inputCurrencyValue <= 0) {
       alert("Por favor, digite um valor válido maior que zero.")
       return
   }

   //* Requisição HTTP para pegar o valor do arquivo default.html
   console.log("Valor digitado:", inputCurrencyValue)
   console.log("Moeda selecionada:", currencySelect.value)

   //* Atualiza o valor em real (valor original digitado)
   currencyValueToConvert.innerHTML = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
   }).format(inputCurrencyValue)

   //*Como testar a API no navegador: http://localhost:5016/conversao?valor=100&moeda=dolar
   //* para testar outras moedas é só trocar o final do http (euro,libra,bitcoin)
   //* a linha abaixo tem como objetivo enviar os parametros do front para a API (OS PARAMETROS SAO VALOR E MOEDA)
    fetch(`http://localhost:5016/conversao?valor=${inputCurrencyValue}&moeda=${currencySelect.value}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao buscar dados da API") //*Ela será executada se a resposta da API não for bem-sucedida, ou seja, se o response.ok for false
            }
            return response.text();
        })
        .then(data => {
            const convertedValue = parseFloat(data.trim()) //*parseFloat é uma função que converte uma string em um número decimal (ponto flutuante).

            let formattedValue = "" //*cria a variável primeiro vazia e depois atribui a ela um valor formatado, dependendo da moeda ou contexto.

            //* Formata o valor final com base na moeda
            if (currencySelect.value == "dolar") {
                formattedValue = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD"
                }).format(convertedValue)
            }

            if (currencySelect.value == "euro") {
                formattedValue = new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "EUR"
                }).format(convertedValue)
            }

            if (currencySelect.value == "libra") {
                formattedValue = new Intl.NumberFormat("en-GB", {
                    style: "currency",
                    currency: "GBP"
                }).format(convertedValue)
            }

            if (currencySelect.value == "bitcoin") {
                formattedValue = new Intl.NumberFormat("en-US", {
                    style: "decimal",
                    minimumFractionDigits: 6,
                    maximumFractionDigits: 6
                }).format(convertedValue) + " BTC"
            }

            currencyValueConvert.innerHTML = formattedValue // mostra valor convertido na tela
        })

        .catch(error => {
            console.error("Erro ao converter moeda:", error)
            alert("Erro ao converter moeda. Verifique se o backend está rodando.")
        });

    console.log(`Chamando API com: valor=${inputCurrencyValue}, moeda=${currencySelect.value}`)     //*Essa linha serve para mostrar no console os valores valor e moeda que estão sendo enviados na requisição HTTP, ajudando no teste e na depuração do código.

}

function changeCurrency(){
    const currencyName = document.getElementById("currency-name") //* o document.getElement ira buscar no index o id="currency-name"
    const currencyImage = document.querySelector(".currency-img") //* queryselector ira buscar no index a claase(quando for classe utilizar "." na frente da palavra)

    if (currencySelect.value == "dolar"){
        currencyName.innerHTML = "Dólar Americano"
        currencyImage.src = "./assets/dolar.png"//*se a imagem for "dolar", sera trocado o src para a img dolar(esse cod só troca a src)
    }
    if (currencySelect.value == "euro"){
        currencyName.innerHTML = "Euro"
        currencyImage.src = "./assets/euro.png"  
    }
    if (currencySelect.value == "libra"){
        currencyName.innerHTML = "Libra"
        currencyImage.src = "./assets/libra.png"  
    }
    if (currencySelect.value == "bitcoin"){
        currencyName.innerHTML = "Bitcoin"
        currencyImage.src = "./assets/bitcoin.png"  
    }

    //* explicacao da funcao: quando o trocar a moeda de convercao no select , ele ira chamar essa função, se o valor que for selecionado for: dolar, ira aparecer "dolar americano", caso for euro "Euro"

    convertValues()//*esta sendo chamada a funcao de converter valores(convertValues), onde ira ler toda a funcao "convertValues" novamente até chegar nesse ponto, por isso havera a troca de valores, quando selecionar a moeda
}   

currencySelect.addEventListener('change', changeCurrency)//* toda vez que trocar no selecionar a moeda, ira ativar essa função par mudar a moeda (de euro para dolar, de dolar p/ euro)
convertButton.addEventListener("click",convertValues)

//*addEventListener ele é utilizado para "ouvir"o botão.
//*Então quando o botão for clicado, sera chamada a função "convertValues"
