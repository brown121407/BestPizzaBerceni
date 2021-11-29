using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using BestPizzaBerceni.Data;
using BestPizzaBerceni.Data.Models;
using BestPizzaBerceni.Models;
using BestPizzaBerceni.Repositories;
using BestPizzaBerceni.Repositories.UserRepository;
using BestPizzaBerceni.Services.UserService;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

namespace BestPizzaBerceni
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "BestPizzaBerceni", Version = "v1" });
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
                {
                    Name = "Authorization",
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer",
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header,
                    Description = "JWT Authorization header using the Bearer scheme. \r\n\r\n Enter 'Bearer' [space] and then your token in the text input below.\r\n\r\nExample: \"Bearer 1safsfsdfdfd\"",
                });
                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        },
                        Array.Empty<string>()
                    }
                }); 
            });

            services.AddDbContext<AppDbContext>(options =>
                options.UseNpgsql(Configuration.GetConnectionString("BestPizzaBerceni")));
            services.AddIdentity<User, Role>()
                .AddEntityFrameworkStores<AppDbContext>()
                .AddDefaultTokenProviders();

            services.AddAuthentication(options =>
                {
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(options =>
                {
                    options.SaveToken = true;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        ValidateLifetime = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration.GetSection("Jwt:Secret").Value)),
                        ValidateIssuerSigningKey = true
                    };
                });

            services.AddScoped<IRepository<Ingredient, int>, Repository<Ingredient, int>>();
            services.AddScoped<IRepository<Product, int>, Repository<Product, int>>();
            services.AddScoped<IRepository<ProductVariant, int>, Repository<ProductVariant, int>>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IRepository<Token, string>, Repository<Token, string>>();
            services.AddScoped<IRepository<Address, int>, Repository<Address, int>>();
            
            services.AddScoped<IUserService, UserService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "BestPizzaBerceni v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });

            CreateRoles(app.ApplicationServices);
        }

        private void CreateRoles(IServiceProvider serviceProvider)
        {
            using var scope = serviceProvider.CreateScope();
            var roleManager = scope.ServiceProvider.GetService<RoleManager<Role>>();
            if (roleManager is null)
            {
                throw new Exception("Role manager not configured.");
            }

            var roles = Configuration.GetSection("Identity:DefaultRoles").Get<List<string>>();

            foreach (var role in roles)
            {
                if (roleManager.RoleExistsAsync(role).Result) continue;
                    
                var result = roleManager.CreateAsync(new Role { Name = role }).Result;
                if (!result.Succeeded)
                {
                    throw new Exception(string.Join('\n', result.Errors));
                }
            }
        }
    }
}