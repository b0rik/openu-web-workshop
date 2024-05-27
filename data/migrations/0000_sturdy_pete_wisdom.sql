CREATE TABLE IF NOT EXISTS "patients" (
	"id" varchar(9) PRIMARY KEY NOT NULL,
	"first_name" varchar(50) NOT NULL,
	"last_name" varchar(50) NOT NULL,
	"date_of_birth" date NOT NULL,
	"unit_name" varchar NOT NULL,
	"room_number" varchar(50),
	CONSTRAINT "patients_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "roles" (
	"name" varchar(50) PRIMARY KEY NOT NULL,
	"can_manage_users" boolean NOT NULL,
	"can_manage_patients" boolean NOT NULL,
	"can_manage_units" boolean NOT NULL,
	"can_manage_task_settings" boolean NOT NULL,
	"can_manage_tasks" boolean NOT NULL,
	CONSTRAINT "roles_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "task_categories" (
	"name" varchar(50) PRIMARY KEY NOT NULL,
	CONSTRAINT "task_categories_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tasks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"category_name" varchar NOT NULL,
	"sub_category_name" varchar NOT NULL,
	"comments" text,
	"status" varchar NOT NULL,
	"assigned_to_user" varchar,
	"due_date" date,
	"is_urgent" boolean NOT NULL,
	"patient_id" varchar NOT NULL,
	CONSTRAINT "tasks_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "task_status" (
	"name" varchar(50) PRIMARY KEY NOT NULL,
	CONSTRAINT "task_status_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "task_sub_categories" (
	"name" varchar(50) PRIMARY KEY NOT NULL,
	"category_name" varchar NOT NULL,
	CONSTRAINT "task_sub_categories_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "units" (
	"name" varchar(50) PRIMARY KEY NOT NULL,
	CONSTRAINT "units_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_per_unit" (
	"user_username" varchar NOT NULL,
	"unit_name" varchar NOT NULL,
	CONSTRAINT "users_per_unit_user_username_unit_name_pk" PRIMARY KEY("user_username","unit_name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"username" varchar(50) PRIMARY KEY NOT NULL,
	"hashed_password" varchar(72) NOT NULL,
	"first_name" varchar(50) NOT NULL,
	"last_name" varchar(50) NOT NULL,
	"role" varchar NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "patients" ADD CONSTRAINT "patients_unit_name_units_name_fk" FOREIGN KEY ("unit_name") REFERENCES "units"("name") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tasks" ADD CONSTRAINT "tasks_category_name_task_categories_name_fk" FOREIGN KEY ("category_name") REFERENCES "task_categories"("name") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tasks" ADD CONSTRAINT "tasks_sub_category_name_task_sub_categories_name_fk" FOREIGN KEY ("sub_category_name") REFERENCES "task_sub_categories"("name") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tasks" ADD CONSTRAINT "tasks_status_task_status_name_fk" FOREIGN KEY ("status") REFERENCES "task_status"("name") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tasks" ADD CONSTRAINT "tasks_assigned_to_user_users_username_fk" FOREIGN KEY ("assigned_to_user") REFERENCES "users"("username") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tasks" ADD CONSTRAINT "tasks_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "task_sub_categories" ADD CONSTRAINT "task_sub_categories_category_name_task_categories_name_fk" FOREIGN KEY ("category_name") REFERENCES "task_categories"("name") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_per_unit" ADD CONSTRAINT "users_per_unit_user_username_users_username_fk" FOREIGN KEY ("user_username") REFERENCES "users"("username") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_per_unit" ADD CONSTRAINT "users_per_unit_unit_name_units_name_fk" FOREIGN KEY ("unit_name") REFERENCES "units"("name") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_role_roles_name_fk" FOREIGN KEY ("role") REFERENCES "roles"("name") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
