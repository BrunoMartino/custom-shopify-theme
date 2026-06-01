import Swiper from 'swiper/bundle';

function getNavigation(root, prevSelector, nextSelector) {
  if (!root) return undefined;
  const prevEl = root.querySelector(prevSelector);
  const nextEl = root.querySelector(nextSelector);
  if (!prevEl || !nextEl) return undefined;
  return { prevEl, nextEl };
}

function getOptions(element) {
  const root = element.closest('[data-swiper-root]');

  if (element.classList.contains('main-swiper')) {
    return {
      loop: true,
      autoplay: {
        delay: 5000,
        pauseOnMouseEnter: true,
      },
      pagination: {
        el: element.querySelector('.swiper-pagination'),
        clickable: true,
      },
    };
  }

  if (element.classList.contains('category-carousel')) {
    return {
      loop: true,
      slidesPerView: 6,
      spaceBetween: 24,
      breakpoints: {
        1200: { slidesPerView: 5 },
        992: { slidesPerView: 4 },
        768: { slidesPerView: 3 },
        576: { slidesPerView: 2 },
      },
      navigation: getNavigation(
        root,
        '.category-carousel-prev',
        '.category-carousel-next'
      ),
    };
  }

  if (element.classList.contains('brand-carousel')) {
    return {
      loop: true,
      slidesPerView: 4,
      spaceBetween: 24,
      breakpoints: {
        992: { slidesPerView: 3 },
        768: { slidesPerView: 2 },
      },
      navigation: getNavigation(root, '.brand-carousel-prev', '.brand-carousel-next'),
    };
  }

  if (element.classList.contains('hero-swiper')) {
    return {
      loop: true,
      autoplay: {
        delay: 4000,
        pauseOnMouseEnter: true,
      },
    };
  }

  if (element.classList.contains('products-carousel')) {
    return {
      loop: true,
      slidesPerView: 5,
      spaceBetween: 24,
      breakpoints: {
        1200: { slidesPerView: 4 },
        992: { slidesPerView: 3 },
        768: { slidesPerView: 2 },
      },
      navigation: getNavigation(
        root,
        '.products-carousel-prev',
        '.products-carousel-next'
      ),
    };
  }

  return {
    loop: true,
    slidesPerView: 1,
  };
}

export function initSwiper() {
  const selectors =
    '.swiper.main-swiper, .swiper.category-carousel, .swiper.brand-carousel, .swiper.products-carousel, .swiper.hero-swiper';

  document.querySelectorAll(selectors).forEach((element) => {
    if (element.swiper) {
      element.swiper.destroy(true, true);
    }

    const options = getOptions(element);
    if (options.pagination?.el === null) {
      delete options.pagination;
    }

    new Swiper(element, options);
  });
}
