import '../styles/index.css';
import h from 'hyperscript';
import hh from 'hyperscript-helpers';
import principlesData from './modules/principles';
import examplesData from './modules/examples';

const {article, h2, p, li, a, ol, button, span} = hh(h);

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
      h2([span(counter), principle.name]),
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
        a({href: example.repoUrl}, example.name),
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
generateExamples(examplesData);
