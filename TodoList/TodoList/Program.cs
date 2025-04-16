using Microsoft.EntityFrameworkCore;
using TodoList.Context;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// variable para la cadena de conexion
var connectionString = builder.Configuration.GetConnectionString("Connection");
// servicio para la conexion
builder.Services.AddDbContext<TodoListDbContext>(Options => Options.UseSqlServer(connectionString));


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Acceso al font de react y evitar erroes de CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", builder =>
    {
        builder.WithOrigins("http://localhost:3000")
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors("AllowFrontend");
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
