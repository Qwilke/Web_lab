var express = require("express"),
http = require("http"),
/*mongoose = require("mongoose"),*/
app = express(),
toDos =
[
    {
      
      "description": "Жак Фреско",
      
      "tags": ["Реализм", "Художники", "Спорт", "Фан"]
    },
    {
      
        "description": "Клод Моне",     
      "tags": ["Реализм", "Фан", "Год", "победа"]
    },
    {
      
        "description": "Руслан Валиев",      
      "tags": ["Реализм", "художники", "победа", "vintage", "история"]
    },
    {
     
        "description": "Сальвадор Дали",      
      "tags": ["Реализм", "искусство", "красота", "спорт", "чувтсва"]
    },
    {
      
        "description": "Дима",      
      "tags": ["Реализм", "спорт", "Год", "победа", "история"]
    },
    {
     
        "description": "Самыч",     
      "tags": ["Реализм", "художники", "красота", "Фан", "vintage"]
    }
  ];


app.use(express.static(__dirname + "/client"));
http.createServer(app).listen(3000);

app.get("/todos.json", function (req, res) {
  res.json(toDos);
});

app.use(express.static(__dirname + "/client"));
app.use(express.urlencoded({ extended: true }));
/*mongoose.connect('mongodb://localhost/web_kai');*/
app.post("/todos", function (req, res) { // сейчас объект сохраняется в req.body
  var newToDo = req.body;
  console.log(newToDo);
  toDos.push(newToDo);

  res.json({"message":"Вы размещаетесь на сервере!"}); // отправляем простой объект
});