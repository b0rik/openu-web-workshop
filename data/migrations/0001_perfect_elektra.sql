CREATE TABLE IF NOT EXISTS "task_to_sub_categories" (
	"task_id" uuid NOT NULL,
	"sub_category_name" varchar(50) NOT NULL,
	CONSTRAINT "task_to_sub_categories_task_id_sub_category_name_pk" PRIMARY KEY("task_id","sub_category_name")
);
--> statement-breakpoint
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_sub_category_name_task_sub_categories_name_fk";
--> statement-breakpoint
ALTER TABLE "tasks" DROP COLUMN IF EXISTS "sub_category_name";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "task_to_sub_categories" ADD CONSTRAINT "task_to_sub_categories_task_id_tasks_id_fk" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "task_to_sub_categories" ADD CONSTRAINT "task_to_sub_categories_sub_category_name_task_sub_categories_name_fk" FOREIGN KEY ("sub_category_name") REFERENCES "task_sub_categories"("name") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
