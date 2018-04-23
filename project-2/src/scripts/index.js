import '../styles/index.css';
import h from 'hyperscript';
import hh from 'hyperscript-helpers';
import principlesData from './modules/principles';
import examplesData from './modules/examples';

const {
  a,
  article,
  button,
  div,
  h2,
  h3,
  img,
  li,
  ol,
  p,
  span,
  strong,
  ul,
} = hh(h);
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

  document
    .querySelector('main')
    .appendChild(
      article({id: 'introduction'}, [
        h2('Hello and Welcome 👋'),
        p(
          'Students from the minor "Web Design" at Amsterdam\'s University of' +
            ' Applied Sciences were given the task to come up with intuitive ' +
            'and pleasurable user interface solutions. The students were ' +
            'given two days to create a demo version of their solutions. ' +
            'These demos range from video players, to galleries, to booking ' +
            'interfaces and much more. The demos are based on Joshua ' +
            'Porter\'s "19 Principles of User Interface Design".'
        ),
        div([
          button({id: 'sortByNew'}, 'Sort by New'),
          button({id: 'sortByOld'}, 'Sort by Old'),
          button({id: 'sortByLikes'}, 'Sort by Likes'),
          button({id: 'sortByDislikes'}, 'Sort by Dislikes'),
          button({id: 'sortByScore'}, 'Sort by Score'),
        ]),
      ])
    );

  articles.push(document.getElementById('introduction'));

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

  navItems.push(document.querySelector('[href="#introduction"]'));
  document.querySelector('[href="#introduction"]').focus();

  return data.forEach((principle) => {
    const elem = li(
      a(
        {
          href: `#${stringToID(principle.name)}`,
        },
        [strong(counter), principle.name]
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
  document.querySelectorAll('.examples-list').forEach((elem) => {
    elem.innerHTML = '';
  });
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
sortExamplesByScore(examplesData);

document.getElementById('sortByNew').addEventListener('click', () => {
  window.location.hash = '#clarity-is-job-1';
  sortExamplesByNew(examplesData);
});

document.getElementById('sortByOld').addEventListener('click', () => {
  window.location.hash = '#clarity-is-job-1';
  sortExamplesByOld(examplesData);
});

document.getElementById('sortByLikes').addEventListener('click', () => {
  window.location.hash = '#clarity-is-job-1';
  sortExamplesByLikes(examplesData);
});

document.getElementById('sortByDislikes').addEventListener('click', () => {
  window.location.hash = '#clarity-is-job-1';
  sortExamplesByDislikes(examplesData);
});

document.getElementById('sortByScore').addEventListener('click', () => {
  window.location.hash = '#clarity-is-job-1';
  sortExamplesByScore(examplesData);
});
