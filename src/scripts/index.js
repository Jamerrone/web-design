import '../styles/index.css';

const DIALOG = document.getElementById('dialog');
const DIALOG_IMAGE = dialog.querySelector('img');

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
  const TARGET = DIALOG_IMAGE.contains(e.target);
  if (DIALOG.classList.contains('open') && !TARGET) {
    return DIALOG.classList.remove('open');
  } else {
    return DIALOG.classList.add('open');
  }
});
