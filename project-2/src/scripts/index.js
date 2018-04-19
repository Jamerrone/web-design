import '../styles/index.css';
import h from 'hyperscript';
import hh from 'hyperscript-helpers';
import principlesData from './modules/principles';
import examplesData from './modules/examples';

const {a, article, button, h2, h3, li, ol, p, span, img} = hh(h);

const stringToID = (s) => {
  return s
    .replace(/\s+/g, '-')
    .replace(/[`~!@#$%^&*()|+\=?;:'",.<>\{\}\[\]\\\/]/gi, '')
    .toLowerCase();
};

const generatePrinciplesList = (data) => {
  let counter = 1;
  return data.forEach((principle) => {
    const elem = article({id: stringToID(principle.name)}, [
      h2([span(`${counter}`), `${principle.name}`]),
      p(principle.body),
      ol('.examples-list'),
    ]);
    document.querySelector('main').appendChild(elem);
    counter++;
  });
};

const generateMainNavigation = (data) => {
  let counter = 1;
  return data.forEach((principle) => {
    const elem = li(
      a(
        {href: `#${stringToID(principle.name)}`},
        `${counter} ${principle.name}`
      )
    );
    document.querySelector('#mainNavigation').appendChild(elem);
    counter++;
  });
};

const generateExamples = (data) => {
  data.forEach((example) => {
    example.principles.forEach((principle) => {
      const test = li([
        a({href: example.repoUrl}, img({src: example.thumbnail})),
        button(`Likes: ${principle.likes}`),
        button(`Dislikes: ${principle.dislikes}`),
      ]);
      document
        .getElementById(principle.name)
        .querySelector('.examples-list')
        .appendChild(test);
    });
  });
};

generateMainNavigation(principlesData);
generatePrinciplesList(principlesData);
// generateExamples(examplesData);

const calcVisibilityForElem = (elem) => {
  const windowHeight = window.innerHeight;
  const docScroll = window.pageYOffset || document.documentElement.scrollTop;
  const divPosition = elem.offsetTop;
  const divHeight = elem.offsetHeight;
  const hiddenBefore = docScroll - divPosition;
  const hiddenAfter = divPosition + divHeight - (docScroll + windowHeight);

  if (
    docScroll > divPosition + divHeight ||
    divPosition > docScroll + windowHeight
  ) {
    return 0;
  } else {
    let result = 100;

    if (hiddenBefore > 0) {
      result -= hiddenBefore * 100 / divHeight;
    }

    if (hiddenAfter > 0) {
      result -= hiddenAfter * 100 / divHeight;
    }

    return result;
  }
};

const calcVisibilityForAllArticles = () => {
  document.querySelectorAll('article').forEach((item) => {
    const top = calcVisibilityForElem(item);
    if (top !== 0) {
      item.querySelector('span').style.transform = `translateY(${Math.floor(
        top * 1.5
      )}px)`;
    }
    if (top >= 80) {
      const navItem = document.querySelector(`[href="#${item.id}"]`);
      document.querySelectorAll('nav a').forEach((navItem) => {
        navItem.classList.remove('highlight');
      });
      navItem.classList.add('highlight');
      navItem.focus();
    }
  });
};

window.onload = () => {
  calcVisibilityForAllArticles();
};

document.onscroll = () => {
  calcVisibilityForAllArticles();
};
