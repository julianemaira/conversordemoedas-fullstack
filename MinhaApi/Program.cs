var builder = WebApplication.CreateBuilder(args); //*Cria um obejto "builder" q serve p/ configurar a aplicacao, servicos, logging//*
var app = builder.Build(); //*Aqui o builder constrói a aplicação web real (app) que será executada



// Rota GET que retorna o conteúdo do arquivo default.html
app.MapGet("/valor", async () =>
{
    var html = await File.ReadAllTextAsync("default.html");
    return Results.Content(html, "text/html");
});

app.Run();

//Esse trecho de código acima, é utilizado a MINIMAL API do .NET, que define uma rota Http(/valor) retornando o conteudo de um arqv HTML(defaul.html)
