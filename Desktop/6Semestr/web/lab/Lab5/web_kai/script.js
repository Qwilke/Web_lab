var main = function () {
  "use strict";
  var ads = [
    "Сальвадор Дали",
    "Винсент Ван Гог",
    "Клод Моне",
  ];
  $(".tabs a span").toArray().forEach(function (element) {
    $(element).on("click", function () {
      var $element = $(element);
      $(".tabs a span").removeClass("active");
      $element.addClass("active");
      var $content;
      if($element.parent().is(":nth-child(1)")){
        $content = $("<ul>");
        for (var i = ads.length - 1; i >= 0; i--) {
          $content.append($("<li>").text(ads[i]));
        }
      }
      else if($element.parent().is(":nth-child(2)")){
        $content = $("<ul>");
        ads.forEach(function(ad){
          $content.append($("<li>").text(ad));
        });
      }
      else if($element.parent().is(":nth-child(3)")){
        $content = $("<form>");
        $content.append($("<label for='title'>").text('Заголовок'));
        $content.append($("<input type='text' name='title'>"));
        $content.append($("<button type='submit'>").text('Добавить художника'));
        $content.on("submit", function(event) {
          event.preventDefault();
          var title = $content.find("input[name='title']").val();
          ads.push(title);
          $("main .tabcontent").empty();
          $(".tabs a span").removeClass("active");
          $(".tabs a:first-child span").trigger("click");
        });
      }
      $("main .tabcontent").empty().append($content);
      return false;
    });
  });
};
$(document).ready(main);



/*
<form>
          <label for="title">Заголовок:</label>
          <input type="text" id="title" name="title"><br>
          <label for="description">Описание:</label>
          <textarea id="description" name="description"></textarea><br>
          <button type="submit">Добавить объявление</button>
        </form>
*/