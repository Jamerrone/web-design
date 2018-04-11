import '../styles/index.css';
import data from './data.js';

const DIALOG = document.getElementById('dialog');
const DIALOG_IMAGE = dialog.querySelector('img');
const DIALOG_TITEL = dialog.querySelector('h2');
const DIALOG_BODY = dialog.querySelector('p');
const ITEMS_LIST = document.querySelector('ul');

window.onload = () => {
  const LAST_ITEM = document.querySelector('.item:last-of-type');
  const FIRST_ITEM = document.querySelector('.item:first-of-type');
  const LOADER = document.getElementById('loader');
  LAST_ITEM.scrollIntoView();
  console.log(data);

  window.setTimeout(() => {
    LOADER.hidden = true;
    FIRST_ITEM.scrollIntoView();
  }, 1000);
};

document.querySelectorAll('.item').forEach((item) => {
  item.addEventListener('click', () => {
    const IMAGE_SRC = item.querySelector('img').src;
    const TITEL = IMAGE_SRC.replace('http://localhost:3000', '');
    DIALOG_IMAGE.src = IMAGE_SRC;
    DIALOG_TITEL.innerHTML = data[TITEL].titel;
    DIALOG_BODY.innerHTML = data[TITEL].body;
  });
});

DIALOG_IMAGE.addEventListener('click', () => {
  DIALOG_IMAGE.classList.toggle('fullWidth');
});

document.addEventListener('click', (e) => {
  const TARGET_1 = DIALOG_IMAGE.contains(e.target);
  const TARGET_2 = ITEMS_LIST.contains(e.target);
  if (DIALOG.classList.contains('open') && !TARGET_1) {
    return DIALOG.classList.remove('open');
  } else if (TARGET_2) {
    return DIALOG.classList.add('open');
  }
});

const keyPressed = (e) => {
  switch (e.keyCode) {
    case 27:
      if (DIALOG.classList.contains('open')) {
        return DIALOG.classList.remove('open');
      }
    case 37:
      console.log('Left');
      break;
    case 39:
      console.log('Right');
      break;
  }
};

document.onkeyup = keyPressed;
