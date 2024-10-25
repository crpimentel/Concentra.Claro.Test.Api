using ConcentraClaroTestApi.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Leer la configuraci�n de CORS desde appsettings.json
var corsSettings = builder.Configuration.GetSection("Cors");
var allowedOrigins = corsSettings.GetSection("AllowedOrigins").Get<string[]>();
// Agregar CORS con or�genes permitidos desde la configuraci�n
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins",
        builder => builder.WithOrigins(allowedOrigins)
                          .AllowAnyHeader()
                          .AllowAnyMethod());
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IBookService, BookService>();
builder.Services.AddHttpClient();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
// Usar la pol�tica de CORS definida
app.UseCors("AllowSpecificOrigins");

app.UseAuthorization();

app.MapControllers();

app.Run();
