create database db;
use db;

create table highscores(
  `name` varchar(45) NOT NULL,
  `mov` int(10) NOT NULL,
  `sec` int(10) NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY
)