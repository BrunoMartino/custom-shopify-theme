import AOS from 'aos';

export function initAOS() {
  if (window.__aosInitialized) return;

  AOS.init({
    duration: 700,
    once: true,
    offset: 80,
  });

  window.__aosInitialized = true;
}
