var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Rota GET que retorna o número 70-colocar no navegador: http://localhost:5016/valor
app.MapGet("/valor", () => Results.Ok(70));

app.Run();