import '../styles/index.css';

const DIALOG = document.getElementById('dialog');
const DIALOG_IMAGE = dialog.querySelector('img');
const ITEMS_LIST = document.querySelector('ul');

window.onload = () => {
  const LAST_ITEM = document.querySelector('.item:last-of-type');
  const FIRST_ITEM = document.querySelector('.item:first-of-type');
  const LOADER = document.getElementById('loader');
  LAST_ITEM.scrollIntoView();

  window.setTimeout(() => {
    LOADER.hidden = true;
    FIRST_ITEM.scrollIntoView();
  }, 1000);
};

document.querySelectorAll('.item').forEach((item) => {
  item.addEventListener('click', () => {
    const IMAGE_SRC = item.querySelector('img').src;
    DIALOG_IMAGE.src = IMAGE_SRC;
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
    case 37:
      console.log('Left');
      break;
    case 39:
      console.log('Right');
      break;
  }
};

document.onkeyup = keyPressed;
