import Alpine from 'alpinejs';

export function initAlpine() {
  if (window.Alpine) return;

  window.Alpine = Alpine;
  Alpine.start();
}
