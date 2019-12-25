$(document).ready(function () {
  svg4everybody({});

});
$('.select').each(function () {
  const _this = $(this),
    selectOption = _this.find('option'),
    selectOptionLength = selectOption.length,
    duration = 150; // длительность анимации 

  _this.hide();
  _this.wrap('<div class="select"></div>');
  $('<div>', {
    class: 'new-select',
    text: _this.children('option:disabled').text()
  }).insertAfter(_this);

  const selectHead = _this.next('.new-select');
  $('<div>', {
    class: 'new-select__list'
  }).insertAfter(selectHead);

  const selectList = selectHead.next('.new-select__list');
  for (let i = 1; i < selectOptionLength; i++) {
    $('<div>', {
        class: 'new-select__item',
        html: $('<span>', {
          text: selectOption.eq(i).text()
        })
      })
      .attr('data-value', selectOption.eq(i).val())
      .appendTo(selectList);
  }

  const selectItem = selectList.find('.new-select__item');
  selectList.slideUp(0);
  selectHead.on('click', function () {
    if (!$(this).hasClass('on')) {
      $(this).addClass('on');
      selectList.slideDown(duration);

      selectItem.on('click', function () {
        let chooseItem = $(this).data('value');

        $('select').val(chooseItem).attr('selected', 'selected');
        selectHead.text($(this).find('span').text());

        selectList.slideUp(duration);
        selectHead.removeClass('on');
      });

    } else {
      $(this).removeClass('on');
      selectList.slideUp(duration);
    }
  });

});
$('#sel').find('option:last').remove();


// Полифилы

// forEach IE 11
if ("NodeList" in window && !NodeList.prototype.forEach) {
  console.info("polyfill for IE11");
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;
    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}

// closest IE 11
(function () {
  if (!Element.prototype.closest) {
    Element.prototype.closest = function (css) {
      var node = this;
      while (node) {
        if (node.matches(css)) return node;
        else node = node.parentElement;
      }
      return null;
    };
  }
})();

// matches IE 11
(function () {
  if (!Element.prototype.matches) {
    Element.prototype.matches =
      Element.prototype.matchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector;
  }
})();

//Array.form IE 11
if (!Array.from) {
  Array.from = function (object) {
    "use strict";
    return [].slice.call(object);
  };
}

$("[data-rating] .star").on("click", function () {
  var selectedCssClass = "selected";
  var $this = $(this);
  $this.siblings("." + selectedCssClass).removeClass(selectedCssClass);
  $this
    .addClass(selectedCssClass)
    .parent()
    .addClass("is-voted");
});

$(function () {
  $(window).scroll(function () {
    var winTop = $(window).scrollTop();
    if (winTop >= 30) {
      $("body").addClass("sticky-shrinknav-wrapper");
    } else {
      $("body").removeClass("sticky-shrinknav-wrapper");
    }
  });
});