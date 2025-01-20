CREATE TABLE "Media" (
	"uuid7" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"type" varchar(255),
	"size" bigserial NOT NULL,
	"lastModiiedDate" date
);
