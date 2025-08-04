using ServiceStack.DataAnnotations;
using ServiceStack.OrmLite;

namespace MyApp.Migrations;

public class Migration1008 : MigrationBase
{
    public class Document
    {
        [AutoIncrement] 
        public int Id { get; set; }
        public string Type { get; set; }
        [PgSqlJsonB] 
        public string Content { get; set; }
        [PgSqlJsonB] 
        public Dictionary<string,object?>? Args { get; set; }
        public long? RefId { get; set; }
        public string RefIdStr { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
    }

    public override void Up()
    {
        Db.CreateTable<Document>();
    }

    public override void Down()
    {
        Db.DropTable<Document>();
    }
}
