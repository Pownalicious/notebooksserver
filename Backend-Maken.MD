create git
create repository
push git

- npm init -y
- npm install all packages: pg, exress, sequelize, sequelize-cli
- check packages.json of alles klopt en zet je script erin:

```
"start": "node index.js"
```

```
initialize sql=> npx sequelize-cli init
```

create database on elephant and copy the config url
connect to the database using config.js

```
{
"development": {
"url": "postgres://drawfnfn:woqEBn_bj_l4GLqOctJ1ui1ygsoP5FHz@ella.db.elephantsql.com/drawfnfn",
"dialect": "postgres",
"operatorsAliases": "0"
},
```

change line 15 in index.js

```
sequelize = new Sequelize(config.url, config);
```

create the models

### User

vergeet niet de tabel naam aan te passen als je copy paste
npx sequelize-cli model:generate --name user --attributes name:string,email:string,password:string

| Key      | Data type | required | Notes                           |
| -------- | --------- | -------- | ------------------------------- |
| id       | Integer   | Yes      | Already added by model:generate |
| name     | String    | Yes      |                                 |
| email    | string    | Yes      | Unique: true                    |
| password | string    | Yes      |                                 |

### Team => hasMany players

vergeet niet de tabel naam aan te passen als je copy paste
npx sequelize-cli model:generate --name team --attributes name:string,country:string,titles:integer

| Key     | Data type | required | Notes                           |
| ------- | --------- | -------- | ------------------------------- |
| id      | Integer   | Yes      | Already added by model:generate |
| name    | String    | Yes      |                                 |
| country | string    | Yes      |                                 |
| titles  | Integer   | Yes      |                                 |

- One Team has several players (One to Many)

### Player => belongsTo team => has one team

vergeet niet de tabel naam aan te passen als je copy paste
npx sequelize-cli model:generate --name player --attributes name:string,age:integer

| Key    | Data type | required | Notes                                 |
| ------ | --------- | -------- | ------------------------------------- |
| id     | Integer   | Yes      | Already added by model:generate       |
| teamId | integer   | Yes      | zegt bij welke team deze speler hoort |
| name   | String    | Yes      |                                       |
| age    | Integer   | Yes      |                                       |

maak de tabllen in de database:
npx sequelize-cli db:migrate

leg de relaties:
npx sequelize-cli migration:generate --name setupRelation

maak de link tussen de tabellen
Alle tabellen hebben een s achteraan maar alleen de tabel namen
voorbeeld van de reader pas deze hier aan en zet hem erin vergeet niet het hele ding te kopieren

---

"use strict";

module.exports = {
up: async (queryInterface, Sequelize) => {
await queryInterface.addColumn("players", "teamId", {
type: Sequelize.INTEGER,
references: {
model: "teams",
key: "id",
},
onUpdate: "CASCADE",
onDelete: "SET NULL",
});
},
down: async (queryInterface, Sequelize) => {
await queryInterface.removeColumn("players", "teamId");
},
};

---

zet de relations goed

One Team has several players (One to Many)

npx sequelize-cli db:migrate

seed

webserver opzetten met index.js
http://localhost:4000

link naar database query voorbeelden in reader
https://reader.codaisseur.com/courses/backend-bootcamp/01-databases/querying

async function getAllUsers() {
try {
// This is how we can use a query method to get all the users from the database
// Selects all rows. Resolves with a (possibly empty) array
const allTeams = await team.findAll();
return allTeams.map(team => team.toJSON());
} catch (e) {
console.log(e);
}
}

- maak je API's

- GET localhost:4000/teams/ => geeft terug alle teams
- GET localhost:4000/team/:id => geeft een team met id <:id> en dan ook all its players

- POST localhost:4000/player => maakt een nieuwe player aan in de players table en geef terug OK of ERROR

- PUT localhost:4000/team/:id => update titles of a specifik team

{
"title": "74748"
}

We moeten ook deze code code gebruiken om authentication te doen op een of andere manier

[here](https://github.com/Codaisseur/course-content-exercises/blob/master/week-5/imageboard-server/auth/middleware.js)

learning point:

- what is a route? dat zijn die /players urls.
- wat is een repository? dat is je git map

database query = een vraag aan de database. Werkt zo:

select \* from <tabel> where <kolom> = "waarde"

ik wil alle teams waar de naam van de team arsenal is
select \* from <teams> where <name> = "arsenal"

ik wil alle players die bij team 2 horen
select \* from <players> where <teamID> = "2"

database query in javascript

async function getAllUsers() {
try {
// This is how we can use a query method to get all the users from the database
// Selects all rows. Resolves with a (possibly empty) array
const allTeams = await team.findAll();
return allTeams.map(team => team.toJSON());
} catch (e) {
console.log(e);
}
}

Ednpoint-> functions of anders genoemd logica -> database layer

"Endpoint" aka "API" aka "route" aka "url" aka "uri"

- pakt wat er binnenkomt
- zet het in een object {"whatever": "value"}
- paast hem door naar logica layer
  Voorbeeld

POST localhost:4000/player => maakt een nieuwe player aan in de players table en geef terug OK of ERROR
De POST heeft een body
De body ziet er zo uit:

{
"id": "3",
"teamID": "2",
"name": "luk",
"titles": 100
}

In de endpoint staat:

- luister op route localhost:4000/player voor een POST met de body die lijkt op hierboven
- als de bovenstaande binnen komt pak het user object zet hem in een variabele, en roep een functie aan. die functie die krijgt het user object die ziet er zo uit

function addPlayer(player){
Hier kun je de query doen naar de database die hoort bij je route, in dit geval. maak deze player in de database
return de return geeft een ok terug weer aan je endpoint

}

de function is niet meer in je endpoint. hij zit ergens anders

Logica layer:
-dit is gewoon je programma heeft niks meer te maken met het opvanagen van een request of het terugsturen van een antwoord dat wordt al gedaan in je endpoint
-hier zeg je wat je wilt doen met de object die doorgepaast hebt gekregen van je endpoint

```

```
