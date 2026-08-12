/* ============================================================
   Психолог — Интерактивность
   - Открытие модалки по клику на grid-карточку (data-slide)
   - Переключение вкладок внутри модалки
   - Закрытие по overlay, кнопке "закрыть", Escape
   ============================================================ */

// ---------- Открытие модалки ----------

/**
 * Привязывает клик по grid-карточкам.
 * Каждая карточка имеет data-slide="N" — открывает слайд #N.
 */
function initGridCards() {
  const cards = document.querySelectorAll('.grid__card[data-slide]');
  const slider = document.getElementById('modal_slider');

  cards.forEach(function(card) {
    card.addEventListener('click', function() {
      var slideNum = card.dataset.slide;
      openSlide(slideNum);
    });
  });
}

/**
 * Открывает модалку и показывает нужный слайд.
 */
function openSlide(slideNum) {
  var slider = document.getElementById('modal_slider');
  if (!slider) return;

  // Показываем модалку
  slider.classList.add('is-open');
  document.body.style.overflow = 'hidden';

  // Скрываем все слайды
  var slides = slider.querySelectorAll('.slide');
  slides.forEach(function(slide) {
    slide.classList.remove('is-active');
  });

  // Показываем нужный слайд
  var targetSlide = slider.querySelector('.slide[data-slide="' + slideNum + '"]');
  if (targetSlide) {
    targetSlide.classList.add('is-active');
  }

  // Активируем нужную вкладку в этом слайде
  var tabs = targetSlide.querySelectorAll('.slide__tab');
  tabs.forEach(function(tab) {
    tab.classList.remove('active');
    if (tab.dataset.tab === slideNum) {
      tab.classList.add('active');
    }
  });
}

// ---------- Закрытие модалки ----------

/**
 * Закрывает модалку и разблокирует скролл.
 */
function closeSlider() {
  var slider = document.getElementById('modal_slider');
  if (!slider) return;

  slider.classList.remove('is-open');
  document.body.style.overflow = '';
}

/**
 * Привязывает закрытие по overlay и кнопке "закрыть".
 */
function initClose() {
  var slider = document.getElementById('modal_slider');
  if (!slider) return;

  // Overlay — клик закрывает
  var overlay = slider.querySelector('.modal_slider__overlay');
  if (overlay) {
    overlay.addEventListener('click', closeSlider);
  }

  // Кнопки "закрыть" в каждом слайде
  var closeBtns = slider.querySelectorAll('.slide__close');
  closeBtns.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      closeSlider();
    });
  });

  // Escape закрывает
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeSlider();
    }
  });
}

// ---------- Переключение вкладок ----------

/**
 * Привязывает клик по вкладкам внутри активного слайда.
 */
function initTabs() {
  var slider = document.getElementById('modal_slider');
  if (!slider) return;

  var allTabs = slider.querySelectorAll('.slide__tab');

  allTabs.forEach(function(tab) {
    tab.addEventListener('click', function(e) {
      e.preventDefault();

      var tabNum = tab.dataset.tab;

      // Сбрасываем active на всех вкладках текущего слайда
      var parentSlide = tab.closest('.slide');
      if (!parentSlide) return;

      var tabs = parentSlide.querySelectorAll('.slide__tab');
      tabs.forEach(function(t) {
        t.classList.remove('active');
      });
      tab.classList.add('active');

      // Переключаем на нужный слайд
      var targetSlide = slider.querySelector('.slide[data-slide="' + tabNum + '"]');
      if (!targetSlide) return;

      var slides = slider.querySelectorAll('.slide');
      slides.forEach(function(s) {
        s.classList.remove('is-active');
      });
      targetSlide.classList.add('is-active');
    });
  });
}

// ---------- Init ----------
document.addEventListener('DOMContentLoaded', function() {
  initGridCards();
  initClose();
  initTabs();
});
