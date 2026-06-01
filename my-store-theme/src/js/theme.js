import '../css/theme.css';

import Collapse from 'bootstrap/js/dist/collapse';
import Dropdown from 'bootstrap/js/dist/dropdown';
import Modal from 'bootstrap/js/dist/modal';
import Offcanvas from 'bootstrap/js/dist/offcanvas';

import { initAOS } from './modules/aos.js';
import { initAlpine } from './modules/alpine.js';
import { initIsotope } from './modules/isotope.js';
import { initSwiper } from './modules/swiper.js';
import { initTyped } from './modules/typed.js';

window.bootstrap = {
  Collapse,
  Dropdown,
  Modal,
  Offcanvas,
};

function initTheme() {
  initAlpine();
  initAOS();
  initSwiper();
  initTyped();
  initIsotope();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTheme);
} else {
  initTheme();
}

document.addEventListener('shopify:section:load', initTheme);
