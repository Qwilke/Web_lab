
function loadBody() {
  $(document).ready(function () {
    $.getJSON("BBB.json", function (adObjects) {
      main(adObjects);
    });
  });
}

function organizeByTags(adObjects) {
  var tags = {};

  adObjects.forEach(function (ad) {
    ad.tags.forEach(function (tag) {
      if (tags[tag]) {
        tags[tag].push(ad.description);
      } else {
        tags[tag] = [ad.description];
      }
    });
  });

  return tags;
}




var main = function (adObjects) {
  "use strict";

  var ads = adObjects;
  $(".tabs a span").toArray().forEach(function (element) {
    $(element).on("click", function () {
      var $element = $(element);
      $(".tabs a span").removeClass("active");
      $element.addClass("active");
      var $content;
      if($element.parent().is(":nth-child(1)")){
        $content = $("<ul>");
        for (var i = ads.length - 1; i >= 0; i--) {
          $content.append($("<li>").text(ads[i].category));
          $content.append($("<li>").text(ads[i].title));
          try{
            $content.append($(`<li><img src=${ads[i].image}></li>`));
          }
          catch{
            continue
          }
          $content.append($("<p>").text(ads[i].description));
          $content.append($("<p '>").text(ads[i].location));
          $content.append($("<li>").text(ads[i].price));
          $content.append($("<hr>"));
        }
      }
      else if($element.parent().is(":nth-child(2)")){
        $content = $("<ul>");
        ads.forEach(function(ad){
          $content.append($("<li>").text(ad.category));
          $content.append($("<li>").text(ad.title));
          $content.append($(`<img src=${ad.image}>`));
          $content.append($("<li>").text(ad.description));
          $content.append($("<li>").text(ad.location));
          $content.append($("<li>").text(ad.price));
          $content.append($("<hr>"));
        });
      }
      else if ($element.parent().is(":nth-child(3)")) {
        var tags = organizeByTags(ads);
        $content = $("<div>");
        Object.keys(tags).forEach(function (tag) {
          var $tagName = $("<h3>").text(tag),
              $tagContent = $("<ul>");
          
          tags[tag].forEach(function (description) {
            $tagContent.append($("<li>").text(description));
          });

          $content.append($tagName).append($tagContent);
        });
      }
      else if($element.parent().is(":nth-child(4)")){
        $content = $("<form></form>");
        $content.append($("<label for='title'>").text('Заголовок'));
        $content.append($("<input type='text' name='title'>"));

        $content.append($("<label for='category'>").text('Категория'));
        $content.append($("<input type='textarea' name='category'>"));

        $content.append($("<label for='description'>").text('Описание'));
        $content.append($("<input type='text' name='description'>"));

        $content.append($("<label for='price'>").text('Цена'));
        $content.append($("<input type='text' name='price'>"));

        $content.append($("<label for='location'>").text('Местоположение'));
        $content.append($("<input type='text' name='location'>"));

        $content.append($("<label for='tags'>").text('Тэги'));
        $content.append($("<input type='text' name='tags'>"));

        $content.append($("<label for='image'>").text('Фотография'));
        $content.append($("<input type='text' name='image'>"));

        $content.append($("<button type='submit'>").text('Добавить объявление'));
        
        $content.on("submit", function(event) {
          event.preventDefault();
          
          var newAd = {
            title: $("[name='title']").val(),
            category: $("[name='category']").val(),
            description: $("[name='description']").val(),
            location: $("[name='location']").val(),
            price: $("[name='price']").val(),
            image: $("[name='image']").val(),
            tags: $("[name='tags']").val().split(",").map(function(tag) { return tag.trim(); })
          };
          ads.push(newAd);
          
          //ads = organizeByTags(result);
          $("main .tabcontent").empty();
          $(".tabs a span").removeClass("active");
          $(".tabs a:first-child span").trigger("click");
          /*$.ajax({
          type: "POST",
          url: "ads.json",
          data: JSON.stringify(newAd),
          dataType: "json",
          contentType: "application/json",
          success: function(data) {
            ads.push(newAd);
            $("main .tabcontent").empty();
            $(".tabs a span").removeClass("active");
            $(".tabs a:first-child span").trigger("click");
          },
          error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
          }
        });
        
        return false;*/
        });
      }
      $("main .tabcontent").empty().append($content);
      return false;
    });
  });
};
