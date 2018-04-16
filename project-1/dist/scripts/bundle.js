(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
(function () {
  'use strict';

  var data = {
    '/assets/images/image-1.png': {
      titel: 'Landscape of Northern Lights',
      body: 'Buy at Kit8.net'
    },
    '/assets/images/image-2.jpg': {
      titel: 'Team Two',
      body: 'An application project to create a campus learning team. Students can create or match groups through majors and courses.'
    },
    '/assets/images/image-3.gif': {
      titel: 'Crisscross Plane',
      body: 'Just a small flight into 3D world 😯'
    },
    '/assets/images/image-4.gif': {
      titel: 'Bring Cool In The Summer',
      body: 'When it comes to summer, the best thing is to go to the beach and go to the sea to feel the coolness of the sea. You can also enjoy the sun and see the beauty of the bikini. The most important thing is to learn to surf. Bold, don\'t be afraid of sharks, and never run into it, hahaha!'
    },
    '/assets/images/image-5.jpg': {
      titel: 'Slippy',
      body: 'Show & Go | 082'
    },
    '/assets/images/image-6.gif': {
      titel: 'Analytics Data',
      body: 'This is a project related to learning. If you like it maybe you can give me a "L" or follow me '
    },
    '/assets/images/image-7.jpg': {
      titel: 'Look Up',
      body: 'I just want to use this illustration to tell you to turn off the monitor, absorb the environment around you, and make full use of everything today. There is only one real connection, it can take everything to show your differences, where it can be made. You don\'t need to tell hundreds of people what you\'ve just done, because you want to share this moment. Everything you do in your life, as long as you pay attention to life and how happy you are, you didn\'t waste it, overlooking an invention.'
    },
    '/assets/images/image-8.gif': {
      titel: 'Hello Dribbble',
      body: 'Hello dribbblers！Lovely illustrations for lovely you. Hope you like my frist shot : )'
    },
    '/assets/images/image-9.png': {
      titel: 'Warrior Page',
      body: 'This is a picture of a group of leisure time Samurai shinsengumi illustration prototype for Saito Ichi'
    }
  };

  {
    var DIALOG = document.getElementById('dialog');
    var DIALOG_IMAGE = dialog.querySelector('img');
    var DIALOG_TITEL = dialog.querySelector('h2');
    var DIALOG_BODY = dialog.querySelector('p');
    var DIALOG_THUMBS = dialog.querySelector('aside');
    var ITEMS_LIST = document.querySelector('ul');

    window.onload = function () {
      var LAST_ITEM = document.querySelector('.item:last-of-type');
      var FIRST_ITEM = document.querySelector('.item:first-of-type');
      var LOADER = document.getElementById('loader');
      LAST_ITEM.scrollIntoView();

      window.setTimeout(function () {
        LOADER.hidden = true;
        FIRST_ITEM.scrollIntoView();
      }, 1000);
    };

    document.querySelectorAll('.item').forEach(function (item) {
      item.addEventListener('click', function () {
        var IMAGE_SRC = item.querySelector('img').src;
        var CURRENT_IMAGE = IMAGE_SRC.replace('http://localhost:3000', '');
        DIALOG_IMAGE.src = IMAGE_SRC;
        DIALOG_TITEL.innerHTML = data[CURRENT_IMAGE].titel;
        DIALOG_BODY.innerHTML = data[CURRENT_IMAGE].body;
      });
    });

    document.querySelectorAll('.thumb').forEach(function (item) {
      item.addEventListener('click', function () {
        var IMAGE_SRC = item.src;
        var CURRENT_IMAGE = IMAGE_SRC.replace('http://localhost:3000', '');
        DIALOG_IMAGE.classList.add('fadeIn');
        DIALOG_TITEL.classList.add('fadeIn');
        DIALOG_BODY.classList.add('fadeIn');
        DIALOG_IMAGE.src = IMAGE_SRC;
        DIALOG_TITEL.innerHTML = data[CURRENT_IMAGE].titel;
        DIALOG_BODY.innerHTML = data[CURRENT_IMAGE].body;
        window.setTimeout(function () {
          DIALOG_IMAGE.classList.remove('fadeIn');
          DIALOG_TITEL.classList.remove('fadeIn');
          DIALOG_BODY.classList.remove('fadeIn');
        }, 500);
      });
    });

    DIALOG_IMAGE.addEventListener('click', function () {
      DIALOG_IMAGE.classList.toggle('fullWidth');
    });

    document.addEventListener('click', function (e) {
      var TARGET_1 = DIALOG_IMAGE.contains(e.target);
      var TARGET_2 = ITEMS_LIST.contains(e.target);
      var TARGET_3 = DIALOG_THUMBS.contains(e.target);
      if (DIALOG.classList.contains('open') && !TARGET_1 && !TARGET_3) {
        return DIALOG.classList.remove('open');
      } else if (TARGET_2) {
        return DIALOG.classList.add('open');
      }
    });

    var keyPressed = function keyPressed(e) {
      switch (e.keyCode) {
        case 27:
          if (DIALOG.classList.contains('open')) {
            return DIALOG.classList.remove('open');
          }
      }
    };

    document.onkeyup = keyPressed;
  }

}());
