import '../styles/index.css';
import h from 'hyperscript';
import hh from 'hyperscript-helpers';
import principlesData from './modules/principles';
import examplesData from './modules/examples';

const {a, article, button, h2, li, ol, p, span} = hh(h);

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
      h2(`${counter} ${principle.name}`),
      p(principle.body),
      ol('.examples-list'),
    ]);
    elem.addEventListener('mouseenter', () => {
      document.querySelectorAll('nav a').forEach((navItem) => {
        navItem.classList.remove('highlight');
      });
      document.querySelector(`[href="#${elem.id}"]`).classList.add('highlight');
    });
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

// // cache the navigation links
// let $navigationLinks = $('#navigation > ul > li > a');
// // cache (in reversed order) the sections
// let $sections = $(
//   $('.section')
//     .get()
//     .reverse()
// );

// // map each section id to their corresponding navigation link
// let sectionIdTonavigationLink = {};
// $sections.each(function() {
//   let id = $(this).attr('id');
//   sectionIdTonavigationLink[id] = $(
//     '#navigation > ul > li > a[href=#' + id + ']'
//   );
// });

// // throttle function, enforces a minimum time interval
// function throttle(fn, interval) {
//   let lastCall, timeoutId;
//   return function() {
//     let now = new Date().getTime();
//     if (lastCall && now < lastCall + interval) {
//       // if we are inside the interval we wait
//       clearTimeout(timeoutId);
//       timeoutId = setTimeout(function() {
//         lastCall = now;
//         fn.call();
//       }, interval - (now - lastCall));
//     } else {
//       // otherwise, we directly call the function
//       lastCall = now;
//       fn.call();
//     }
//   };
// }

// function highlightNavigation() {
//   // get the current vertical position of the scroll bar
//   let scrollPosition = $(window).scrollTop();

//   // iterate the sections
//   $sections.each(function() {
//     let currentSection = $(this);
//     // get the position of the section
//     let sectionTop = currentSection.offset().top;

//     // if the user has scrolled over the top of the section
//     if (scrollPosition >= sectionTop) {
//       // get the section id
//       let id = currentSection.attr('id');
//       // get the corresponding navigation link
//       let $navigationLink = sectionIdTonavigationLink[id];
//       // if the link is not active
//       if (!$navigationLink.hasClass('active')) {
//         // remove .active class from all the links
//         $navigationLinks.removeClass('active');
//         // add .active class to the current link
//         $navigationLink.addClass('active');
//       }
//       // we have found our section, so we return false to exit the each loop
//       return false;
//     }
//   });
// }

// $(window).scroll(throttle(highlightNavigation, 100));

// // if you don't want to throttle the function use this instead:
