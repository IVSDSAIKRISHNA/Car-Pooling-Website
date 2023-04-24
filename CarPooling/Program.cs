using Car_Pooling.Controllers;
using CarpoolingContracts;
using CarPooling_Services;
using Microsoft.OpenApi.Models;
using Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Swashbuckle.AspNetCore.Filters;

namespace Car_Pooling
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            var originPolicy = "allowallorigins";

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddControllersWithViews();
            builder.Services.AddSwaggerGen(options =>
            {
                options.AddSecurityDefinition("auth", new OpenApiSecurityScheme
                {
                    Description = "Standard  Authorization header using Bearer Scheme(\bearer {token}\")",
                    In = ParameterLocation.Header,
                    Name = "Authorization",
                    Type = SecuritySchemeType.ApiKey
                });

                options.OperationFilter<SecurityRequirementsOperationFilter>();
            }   );
            builder.Services.AddScoped<IRide,RideServices>();
            builder.Services.AddScoped<IUser, UserServices>();
            builder.Services.AddDbContext<DatabaseContext>();
            builder.Services.AddCors(options =>
            {
                options.AddPolicy(originPolicy, builder =>
                {
                    builder.AllowCredentials()
                    .AllowAnyHeader()
                    .AllowAnyMethod();
                });
            });

            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8
            .GetBytes(builder.Configuration.GetSection("AppSettings:Key").Value)),
            ValidateIssuer = false,
            ValidateAudience = false,
        };
    });


            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }



            app.UseCors(_=>_.AllowAnyMethod()
            .AllowAnyHeader()
            .SetIsOriginAllowed(origin=>true));

            app.UseHttpsRedirection();
            
            app.UseAuthentication();


            app.UseStaticFiles();

            app.UseRouting();
            app.UseAuthorization();
            app.MapControllerRoute(
                name: "default",
                pattern: "{controller}/{action=Index}/{id?}");

            app.MapFallbackToFile("index.html");
            app.Run();
        }
    }
}