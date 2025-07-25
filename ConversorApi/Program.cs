var builder = WebApplication.CreateBuilder(args); //*Cria um obejto "builder" q serve p/ configurar a aplicacao, servicos, logging//*
//*  Ativa o CORS para permitir que o frontend (JavaScript) acesse a API mesmo que esteja em outra origem (localhost:5500, por exemplo).
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy
            .AllowAnyOrigin() //*permite requisições de qualquer lugar.
            .AllowAnyMethod()//* permite todos os métodos HTTP (GET, POST, etc).
            .AllowAnyHeader();//*permite todos os cabeçalhos HTTP.
    });
});

var app = builder.Build(); //*Aqui o builder constrói a aplicação web real (app) que será executada
app.UseCors("AllowAll");//*Aplica a política de CORS chamada "AllowAll" para todas as rotas da API.


// app.MapGet: Rota GET que retorna o conteúdo do arquivo default.html
//* Endpoint=conversao, Endpoint é uma porta de entrada da API "ConversorApi"

//Esse trecho de código abaixo, é utilizado a MINIMAL API do .NET, que define uma rota Http(/conversao) retornando o conteudo de um arqv HTML(defaul.html)

//*rota GET chamada /conversao que espera dois parâmetros da URL: valor e moeda

//*para buscar no navegador é http://localhost:5016/conversao?valor=100&moeda=bitcoin

app.MapGet("/conversao", (int valor, string moeda) =>
{
    Console.WriteLine($"Valor recebido: {valor}");
    Console.WriteLine($"Moeda recebida: {moeda}");

    decimal resultado;//* utilizando decimal, pois é mais preciso. (colocar m na frente dos numeros)

    switch (moeda.ToLower())
    {
        case "dolar":
            resultado = valor / 5.58m;
            break;
        case "euro":
            resultado = valor / 6.55m;
            break;
        case "libra":
            resultado = valor / 7.38m;
            break;
        case "bitcoin":
            resultado = valor / 642239.00m;
            break;
        default:
            return Results.BadRequest("Moeda não suportada.");
    }

    return Results.Ok(resultado);
});

app.Run();

