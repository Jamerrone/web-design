import '../styles/index.css';
import h from 'hyperscript';
import hh from 'hyperscript-helpers';
import principlesData from './modules/principles';
import examplesData from './modules/examples';

const {a, article, button, h2, h3, img, li, ol, ul, p, span, strong} = hh(h);
const articles = [];
const navItems = [];

let previusScrollPosition = -1;
let currentScrollPosition = 0;

const sortExamplesByNew = (data) => {
  generateExamples(data.reverse());
};

const sortExamplesByOld = (data) => {
  generateExamples(data);
};

const sortExamplesByLikes = (data) => {
  generateExamples(data.sort((a, b) => b.likes - a.likes));
};

const sortExamplesByDislikes = (data) => {
  generateExamples(data.sort((a, b) => b.dislikes - a.dislikes));
};

const sortExamplesByScore = (data) => {
  generateExamples(
    data.sort((a, b) => b.likes - b.dislikes - (a.likes - a.dislikes))
  );
};

const stringToID = (s) => {
  return s
    .replace(/\s+/g, '-')
    .replace(/[`~!@#$%^&*()|+\=?;:'",.<>\{\}\[\]\\\/]/gi, '')
    .toLowerCase();
};

const generatePrinciplesList = (data) => {
  let counter = 1;

  return data.forEach((principle) => {
    const elem = article(
      {
        id: stringToID(principle.name),
      },
      [
        h2([span(`${counter}`), `${principle.name}`]),
        p(principle.body),
        ol('.examples-list'),
      ]
    );

    document.querySelector('main').appendChild(elem);
    articles.push(elem);
    counter++;
  });
};

const generateMainNavigation = (data) => {
  let counter = 1;

  return data.forEach((principle) => {
    const elem = li(
      a(
        {
          href: `#${stringToID(principle.name)}`,
        },
        `${counter} ${principle.name}`
      )
    );

    elem.querySelector('a').addEventListener('focus', (link) => {
      link.target.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    });

    document.querySelector('#mainNavigation').appendChild(elem);
    navItems.push(elem.querySelector('a'));
    counter++;
  });
};

const generateExamples = (data) => {
  data.forEach((example) => {
    const elem = li([
      a({href: '#detailsPage'}, img({src: example.thumbnail})),
      button('❤️ Like'),
      span(`🏆 ${example.likes - example.dislikes}`),
      button('💔 Dislike'),
    ]);

    elem.querySelector('a').addEventListener('focus', (link) => {
      link.target.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    });

    elem.querySelector('a').addEventListener('click', (link) => {
      generateDetailsPage(example.username, example.principleID, examplesData);
    });

    document
      .getElementById(example.principleID)
      .querySelector('.examples-list')
      .appendChild(elem);
  });
};

const generateDetailsPage = (user, parrentID, data) => {
  const detailsPage = document.getElementById('detailsPage');

  let principles = data.reduce((accumulator, current) => {
    if (current.username === user) {
      accumulator.push(current);
    }
    return accumulator;
  }, []);

  let mainContent = article([
    h2(user),
    p({id: 'repoURL'}, [
      strong('RepoUrl:'),
      a(
        {href: principles[0].repoUrl, target: '_blanc'},
        principles[0].repoUrl
      ),
    ]),
    ul({id: 'principles'}),
  ]);

  detailsPage.innerHTML = '';
  detailsPage.appendChild(img({src: principles[0].thumbnail}));
  detailsPage.appendChild(mainContent);
  detailsPage.appendChild(a({href: `#${parrentID}`, id: 'close'}, 'Close'));

  principles.forEach((principle) => {
    const elem = li([
      h3(principle.principleName),
      p(principle.principleDescription || 'No description 😢'),
    ]);

    document.getElementById('principles').appendChild(elem);
  });
};

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

const animatePrincipleNrForAllArticles = () => {
  for (const item of articles) {
    const top = calcVisibilityForElem(item);

    if (top >= 65) {
      if (!item.navItem) {
        item.navItem = document.querySelector(`[href="#${item.id}"]`);
      }

      for (const navItem of navItems) {
        navItem.classList.remove('highlight');
      }

      item.navItem.classList.add('highlight');
      item.navItem.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }
  }
};

const animationLoop = () => {
  if (previusScrollPosition !== currentScrollPosition) {
    previusScrollPosition = currentScrollPosition;
    animatePrincipleNrForAllArticles();
  }

  requestAnimationFrame(animationLoop);
};

document.onscroll = () => {
  currentScrollPosition =
    window.pageYOffset || document.documentElement.scrollTop;
};

generateMainNavigation(principlesData);
generatePrinciplesList(principlesData);
requestAnimationFrame(animationLoop);
sortExamplesByNew(examplesData);
