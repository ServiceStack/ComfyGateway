using ServiceStack.OrmLite;

namespace MyApp.Migrations;

public class Migration1007 : MigrationBase
{
    public override void Up()
    {
        // -- Update the reactions count for the affected Artifact(s)
        Db.ExecuteNonQuery(
            """
            CREATE OR REPLACE FUNCTION update_artifact_reactions()
            RETURNS TRIGGER AS $$
            BEGIN
                UPDATE "Artifact" 
                SET "Reactions" = (
                    SELECT COALESCE(
                        jsonb_object_agg(chr("Reaction"), count), 
                        '{}'::jsonb
                    )
                    FROM (
                        SELECT 
                            "Reaction", 
                            COUNT(*)::int as count
                        FROM "ArtifactReaction" 
                        WHERE "ArtifactId" = COALESCE(NEW."ArtifactId", OLD."ArtifactId")
                        GROUP BY "Reaction"
                    ) counts
                ),
                "ReactionsCount" = (
                    SELECT COUNT(*)::int
                    FROM "ArtifactReaction" 
                    WHERE "ArtifactId" = COALESCE(NEW."ArtifactId", OLD."ArtifactId")
                )
                WHERE "Id" = COALESCE(NEW."ArtifactId", OLD."ArtifactId");
                
                RETURN COALESCE(NEW, OLD);
            END;
            $$ LANGUAGE plpgsql;            
            """);
        Db.ExecuteNonQuery(
            """
            CREATE OR REPLACE TRIGGER artifact_reactions_trigger
            AFTER INSERT OR UPDATE OR DELETE ON "ArtifactReaction"
            FOR EACH ROW
            EXECUTE PROCEDURE update_artifact_reactions();
            """);
        
        // -- Update the reactions count for the affected Thread(s)
        Db.ExecuteNonQuery(
            """
            CREATE OR REPLACE FUNCTION update_thread_reactions()
            RETURNS TRIGGER AS $$
            BEGIN
                UPDATE "Thread" 
                SET "Reactions" = (
                    SELECT COALESCE(
                        jsonb_object_agg(chr("Reaction"), count), 
                        '{}'::jsonb
                    )
                    FROM (
                        SELECT 
                            "Reaction", 
                            COUNT(*)::int as count
                        FROM "ThreadReaction" 
                        WHERE "ThreadId" = COALESCE(NEW."ThreadId", OLD."ThreadId")
                        GROUP BY "Reaction"
                    ) counts
                ),
                "ReactionsCount" = (
                    SELECT COUNT(*)::int
                    FROM "ThreadReaction" 
                    WHERE "ThreadId" = COALESCE(NEW."ThreadId", OLD."ThreadId")
                )
                WHERE "Id" = COALESCE(NEW."ThreadId", OLD."ThreadId");
                
                RETURN COALESCE(NEW, OLD);
            END;
            $$ LANGUAGE plpgsql;            
            """);
        Db.ExecuteNonQuery(
            """
            CREATE OR REPLACE TRIGGER thread_reactions_trigger
            AFTER INSERT OR UPDATE OR DELETE ON "ThreadReaction"
            FOR EACH ROW
            EXECUTE PROCEDURE update_thread_reactions();
            """);
        
        // -- Update the reactions count for the affected Comment(s)
        Db.ExecuteNonQuery(
            """
            CREATE OR REPLACE FUNCTION update_comment_reactions()
            RETURNS TRIGGER AS $$
            BEGIN
                UPDATE "Comment" 
                SET "Reactions" = (
                    SELECT COALESCE(
                        jsonb_object_agg(chr("Reaction"), count), 
                        '{}'::jsonb
                    )
                    FROM (
                        SELECT 
                            "Reaction", 
                            COUNT(*)::int as count
                        FROM "CommentReaction" 
                        WHERE "CommentId" = COALESCE(NEW."CommentId", OLD."CommentId")
                        GROUP BY "Reaction"
                    ) counts
                ),
                "ReactionsCount" = (
                    SELECT COUNT(*)::int
                    FROM "CommentReaction" 
                    WHERE "CommentId" = COALESCE(NEW."CommentId", OLD."CommentId")
                )
                WHERE "Id" = COALESCE(NEW."CommentId", OLD."CommentId");
                
                RETURN COALESCE(NEW, OLD);
            END;
            $$ LANGUAGE plpgsql;            
            """);
        Db.ExecuteNonQuery(
            """
            CREATE OR REPLACE TRIGGER comment_reactions_trigger
            AFTER INSERT OR UPDATE OR DELETE ON "CommentReaction"
            FOR EACH ROW
            EXECUTE PROCEDURE update_comment_reactions();
            """);
    }

    public override void Down()
    {
        Db.ExecuteNonQuery("DROP TRIGGER IF EXISTS artifact_reactions_trigger ON \"ArtifactReaction\";");
        Db.ExecuteNonQuery("DROP FUNCTION IF EXISTS update_artifact_reactions;");
        
        Db.ExecuteNonQuery("DROP TRIGGER IF EXISTS thread_reactions_trigger ON \"ThreadReaction\";");
        Db.ExecuteNonQuery("DROP FUNCTION IF EXISTS update_thread_reactions;");
        
        Db.ExecuteNonQuery("DROP TRIGGER IF EXISTS comment_reactions_trigger ON \"CommentReaction\";");
        Db.ExecuteNonQuery("DROP FUNCTION IF EXISTS update_comment_reactions;");
    }
}
