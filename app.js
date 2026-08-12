/* ============================================================
   РИЦА — Психолог. Интерактивность
   - Открытие/закрытие модалок из grid-карточек
   - Переключение вкладок внутри модалки
   - Закрытие по overlay и Escape
   ============================================================ */

// ---------- Modal system ----------

/**
 * Находит все модальные окна и привязывает события.
 * Каждая grid-карточка имеет data-modal="N" — открывает #modal-N.
 */
function initModals() {
  const cards = document.querySelectorAll('.grid__card[data-modal]');
  const modals = document.querySelectorAll('.modal');
  const closeButtons = document.querySelectorAll('.modal__close');
  const overlays = document.querySelectorAll('.modal__overlay');

  // Открытие модалки из карточки
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      const modalIndex = card.dataset.modal;
      openModal(modalIndex);
    });
  });

  // Закрытие по кнопке
  closeButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      closeModal();
    });
  });

  // Закрытие по overlay
  overlays.forEach((overlay) => {
    overlay.addEventListener('click', () => {
      closeModal();
    });
  });

  // Закрытие по Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
}

/**
 * Открывает модальное окно по индексу.
 */
function openModal(index) {
  const modal = document.getElementById(`modal-${index}`);
  if (!modal) return;

  modal.classList.add('is-open');
  document.body.style.overflow = 'hidden'; // блокируем скролл фона

  // Сбрасываем на первую вкладку
  const tabs = modal.querySelectorAll('.modal__tab');
  const slides = modal.querySelectorAll('.modal__slide');

  tabs.forEach((tab) => tab.classList.remove('active'));
  slides.forEach((slide) => slide.classList.remove('active'));

  // Активируем нужную вкладку
  const activeTab = modal.querySelector(`.modal__tab[data-target="${index}"]`);
  if (activeTab) activeTab.classList.add('active');

  const activeSlide = modal.querySelector(`.modal__slide[data-slide="${index}"]`);
  if (activeSlide) activeSlide.classList.add('active');
}

/**
 * Закрывает все модальные окна.
 */
function closeModal() {
  const modals = document.querySelectorAll('.modal.is-open');

  modals.forEach((modal) => {
    modal.classList.remove('is-open');
  });

  document.body.style.overflow = ''; // разблокируем скролл
}

// ---------- Tab switching inside modals ----------

/**
 * Привязывает переключение вкладок внутри каждой модалки.
 */
function initTabs() {
  const modals = document.querySelectorAll('.modal');

  modals.forEach((modal) => {
    const tabs = modal.querySelectorAll('.modal__tab');

    tabs.forEach((tab) => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();

        const target = tab.dataset.target;

        // Переключаем активную вкладку
        tabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');

        // Переключаем слайды
        const slides = modal.querySelectorAll('.modal__slide');
        slides.forEach((slide) => slide.classList.remove('active'));

        const activeSlide = modal.querySelector(`.modal__slide[data-slide="${target}"]`);
        if (activeSlide) {
          activeSlide.classList.add('active');
        }
      });
    });
  });
}

// ---------- Init on DOM ready ----------
document.addEventListener('DOMContentLoaded', () => {
  initModals();
  initTabs();
});
