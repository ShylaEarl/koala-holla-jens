CREATE TABLE "koala" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (50) NOT NULL,
	"gender" VARCHAR (1) NOT NULL,
	"age" INTEGER,
	"ready_to_transer" VARCHAR (5) NOT NULL,
	"notes" VARCHAR (250) NOT NULL
);

INSERT INTO "koala" ("name", "age", "gender", "ready_to_transer", "notes")

VALUES
	('Scotty', '4', 'M', 'True', 'Born in Guatemala'),
	('Jean', '5', 'F', 'True', 'Allergic to lots of lava'),
	('Ororo', '7', 'F', 'False', 'Loves listening to Paula (Abdul)'),
	('Logan', '15', 'M', 'False', 'Loves the sauna'),
	('Charlie', '9', 'M', 'True', 'Favorite band is Nirvana'),
	('Betsy', '4', 'F', 'True', 'Has a pet iguana');
	
SELECT * FROM "koala";