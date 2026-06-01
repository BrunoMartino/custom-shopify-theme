import Typed from 'typed.js';

export function initTyped() {
  document.querySelectorAll('[data-typed]').forEach((element) => {
    if (element.dataset.typedInitialized === 'true') return;

    const strings = element.dataset.typedStrings
      ? element.dataset.typedStrings.split(',').map((value) => value.trim())
      : [];

    if (strings.length === 0) return;

    const options = element.dataset.typedOptions
      ? JSON.parse(element.dataset.typedOptions)
      : {};

    new Typed(element, {
      strings,
      typeSpeed: 50,
      backSpeed: 30,
      loop: true,
      ...options,
    });

    element.dataset.typedInitialized = 'true';
  });
}
