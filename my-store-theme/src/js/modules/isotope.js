import Isotope from 'isotope-layout';

export function initIsotope() {
  document.querySelectorAll('[data-isotope]').forEach((element) => {
    if (element.dataset.isotopeInitialized === 'true') return;

    const options = element.dataset.isotopeOptions
      ? JSON.parse(element.dataset.isotopeOptions)
      : {
          itemSelector: '[data-isotope-item]',
          layoutMode: 'fitRows',
        };

    const isotope = new Isotope(element, options);
    element.dataset.isotopeInitialized = 'true';

    const filterRoot =
      element.closest('[data-isotope-section]') ||
      element.closest('[data-isotope-filters]') ||
      document;
    filterRoot.querySelectorAll('[data-isotope-filter]').forEach((button) => {
      button.addEventListener('click', () => {
        const filterValue = button.dataset.isotopeFilter || '*';
        isotope.arrange({ filter: filterValue });

        filterRoot.querySelectorAll('[data-isotope-filter]').forEach((item) => {
          item.classList.toggle('active', item === button);
        });
      });
    });
  });
}
