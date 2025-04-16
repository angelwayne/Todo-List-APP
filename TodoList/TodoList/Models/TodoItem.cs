namespace TodoList.Models
{
    public class TodoItem
    {
        public int Id { get; set; }

        public required String Name { get; set; }

        public required String Description { get; set; }

        public Boolean Complete { get; set; }
    }
}
