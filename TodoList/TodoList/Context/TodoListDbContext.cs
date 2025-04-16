using Microsoft.EntityFrameworkCore;
using TodoList.Models;

namespace TodoList.Context
{
    public class TodoListDbContext: DbContext
    {
        // constructor 
        public TodoListDbContext(DbContextOptions<TodoListDbContext> options): base(options) 
        {

        }

        public DbSet<TodoItem> todoItems { get; set; }
    }
}
