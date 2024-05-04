ALTER TABLE "tasks" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "tasks" ALTER COLUMN "status" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "tasks" ALTER COLUMN "is_urgent" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "task_sub_categories" ADD COLUMN "category_name" varchar NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "task_sub_categories" ADD CONSTRAINT "task_sub_categories_category_name_task_categories_name_fk" FOREIGN KEY ("category_name") REFERENCES "task_categories"("name") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "task_status" DROP COLUMN IF EXISTS "description";