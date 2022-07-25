$(function () {
  //Slider
  let slider = $('.slider');
  let sliderWidth = 0;
  slider.children().each(function () {
    sliderWidth += $(this).outerWidth();
  });
  slider.css('width', sliderWidth);

  $('.slider__nav li').on('click', function () {
    let slideId = $(this).data('slide-item');
    let offset = 0;

    $('.slider__nav li.active').removeClass('active');
    $('.slider__item.active').removeClass('active');
    $(this).addClass('active');
    $('.slider__item').eq(slideId).addClass('active');

    for (let i = 0; i < slideId; i++) {
      offset += $('.slider__item').eq(i).outerWidth();
    }
    $('.slider').css('transform', `translate3d(${0 - offset}px, 0px, 0px)`);
  });

  $('.select:not(.select_full-width)').on('click', function () {
    $(this).toggleClass('open');
    $(this)
      .children('.select__options')
      .css('width', $(this).outerWidth())
      .css('left', $(this).position().left);
  });

  $('.select_full-width').on('click', function () {
    $(this).toggleClass('open');
  });

  $('.select__option').on('click', function () {
    $(this).siblings('.select__option.selected').removeClass('selected');
    $(this)
      .parent()
      .siblings('.select__title')
      .children('.select__value')
      .text($(this).text());
    $(this)
      .parent()
      .siblings('.select__title')
      .children('.select__value')
      .attr('data-value', $(this).text());
    $(this)
      .parent()
      .siblings('.select__title')
      .children('.select__value')
      .attr('data-selected', true);
    $(this).addClass('selected');
  });

  // Modal
  $('a[href^="#modal-"]').on('click', function (e) {
    e.preventDefault();
    let modalId = $(this).attr('href');
    $(modalId).fadeIn(300);
    $(modalId).addClass('open');
  });
  $('.modal').on('click', function (e) {
    if (e.target != this) {
      return;
    } else {
      $(this).removeClass('open');
      $(this).fadeOut(300);
    }
  });
  $('.modal__close').on('click', function () {
    let modal = $(this).closest('.modal');
    $(modal).removeClass('open');
    $(modal).fadeOut(300);
  });
});
