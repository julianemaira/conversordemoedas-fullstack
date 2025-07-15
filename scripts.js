const convertButton = document.querySelector(".convert-button")
//*const é utilizado p/ declarar variavel
const currencySelect = document.querySelector(".currency-select")

function convertValues () {
    const inputCurrencyValue = document.querySelector(".input-currency").value
    //*inputCurrencyValue é uma variavel, o doc querySelector esta sendo utilizado para procurar no index onde está a variavel, trazendo somente o value(valor)(esta chamando a variavel)
    const currencyValueToConvert = document.querySelector(".currency-value-to-convert") //*valor em real
    const currencyValueConvert = document.querySelector(".currency-value")//*outras moedas
   //* currencyvalueconvert é o valor ja convertido
   //*currencyvaluetoconvert é o valorp/ converter 
  
   console.log(currencySelect.value)
    //* o .value é utilizado p/ trazer somente valor selecionado(euro ou dolar)
    //*console.log exibe a mensagem no navegador
    const dolarToday = 5.58
    const euroToday = 6.55
    const libraToday = 7.38
    const bitcoinToday = 642.239



    if (currencySelect.value == "dolar"){ //* se o select estiver selecionado o valor de dolar, ele ira rodar toda essa parte do if
        currencyValueConvert.innerHTML = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    }). format(inputCurrencyValue / dolarToday)
    //* inputcurrencyvalue é o valor digitado no input, dividido pelo dolar do dia
   
}

    if (currencySelect.value == "euro"){ //*se o select estiver selecionado o valor de euro, ele ira rodar toda essa parte do if
        currencyValueConvert.innerHTML = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR"
    }). format(inputCurrencyValue/euroToday)
    }

    if (currencySelect.value == "libra"){ //*se o select estiver selecionado o valor de libra, ele ira rodar toda essa parte do if
        currencyValueConvert.innerHTML = new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP"
    }). format(inputCurrencyValue/libraToday)
    }

     if (currencySelect.value == "bitcoin"){ //*se o select estiver selecionado o valor de libra, ele ira rodar toda essa parte do if
        currencyValueConvert.innerHTML = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "BTC"
    }). format(inputCurrencyValue/bitcoinToday)
    }
    
    currencyValueToConvert.innerHTML = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency:"BRL"
    // estilo currency=simbolo da moeda / moeda brasileira
    }). format(inputCurrencyValue)
    //*InnerHTML é uma propriedade que obtem ou define o conteudo HTML dentro do elemento(altera o texto)
    //o texto do "currencyValueToConvert" sera trocado pelo "inputCurrencyValue" (o valor digitado no input)
    
 //*ConvertValue ira aparecer o valor da conversão
    console.log (convertedValue)
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