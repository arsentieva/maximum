CREATE TABLE "stories" (
  "id" SERIAL PRIMARY KEY,
  "title" varchar,
  "byline" varchar,
  "body" text,
  "image" varchar,
  "createdAt" timestamp,
  "updatedAt" timestamp,
  "userId" integer
);

CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar,
  "bio" text,
  "image" varchar,
  "email" varchar,
  "createdAt" timestamp,
  "updatedAt" timestamp,
  "password" password
);

CREATE TABLE "comments" (
  "id" SERIAL PRIMARY KEY,
  "body" text,
  "createdAt" timestamp,
  "updatedAt" timestamp,
  "storyId" integer,
  "userId" integer
);

CREATE TABLE "follows" (
  "id" SERIAL PRIMARY KEY,
  "followerId" integer,
  "followedId" integer
);

CREATE TABLE "storyClaps" (
  "id" SERIAL PRIMARY KEY,
  "storyId" integer,
  "userId" integer
);

CREATE TABLE "commentClaps" (
  "id" SERIAL PRIMARY KEY,
  "commentId" integer,
  "userId" integer
);

ALTER TABLE "stories" ADD FOREIGN KEY ("userId") REFERENCES "users" ("id");

ALTER TABLE "comments" ADD FOREIGN KEY ("storyId") REFERENCES "stories" ("id");

ALTER TABLE "comments" ADD FOREIGN KEY ("userId") REFERENCES "users" ("id");

ALTER TABLE "follows" ADD FOREIGN KEY ("followerId") REFERENCES "users" ("id");

ALTER TABLE "follows" ADD FOREIGN KEY ("followedId") REFERENCES "users" ("id");

ALTER TABLE "storyClaps" ADD FOREIGN KEY ("userId") REFERENCES "users" ("id");

ALTER TABLE "storyClaps" ADD FOREIGN KEY ("storyId") REFERENCES "stories" ("id");

ALTER TABLE "commentClaps" ADD FOREIGN KEY ("userId") REFERENCES "users" ("id");

ALTER TABLE "commentClaps" ADD FOREIGN KEY ("commentId") REFERENCES "comments" ("id");
