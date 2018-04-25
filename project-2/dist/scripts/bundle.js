(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
(function () {
  'use strict';

  function unwrapExports (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  /*!
   * Cross-Browser Split 1.1.1
   * Copyright 2007-2012 Steven Levithan <stevenlevithan.com>
   * Available under the MIT License
   * ECMAScript compliant, uniform cross-browser split method
   */

  /**
   * Splits a string into an array of strings using a regex or string separator. Matches of the
   * separator are not included in the result array. However, if `separator` is a regex that contains
   * capturing groups, backreferences are spliced into the result each time `separator` is matched.
   * Fixes browser bugs compared to the native `String.prototype.split` and can be used reliably
   * cross-browser.
   * @param {String} str String to split.
   * @param {RegExp|String} separator Regex or string to use for separating the string.
   * @param {Number} [limit] Maximum number of items to include in the result array.
   * @returns {Array} Array of substrings.
   * @example
   *
   * // Basic use
   * split('a b c d', ' ');
   * // -> ['a', 'b', 'c', 'd']
   *
   * // With limit
   * split('a b c d', ' ', 2);
   * // -> ['a', 'b']
   *
   * // Backreferences in result array
   * split('..word1 word2..', /([a-z]+)(\d+)/i);
   * // -> ['..', 'word', '1', ' ', 'word', '2', '..']
   */
  var browserSplit = (function split(undef) {

    var nativeSplit = String.prototype.split,
      compliantExecNpcg = /()??/.exec("")[1] === undef,
      // NPCG: nonparticipating capturing group
      self;

    self = function(str, separator, limit) {
      // If `separator` is not a regex, use `nativeSplit`
      if (Object.prototype.toString.call(separator) !== "[object RegExp]") {
        return nativeSplit.call(str, separator, limit);
      }
      var output = [],
        flags = (separator.ignoreCase ? "i" : "") + (separator.multiline ? "m" : "") + (separator.extended ? "x" : "") + // Proposed for ES6
        (separator.sticky ? "y" : ""),
        // Firefox 3+
        lastLastIndex = 0,
        // Make `global` and avoid `lastIndex` issues by working with a copy
        separator = new RegExp(separator.source, flags + "g"),
        separator2, match, lastIndex, lastLength;
      str += ""; // Type-convert
      if (!compliantExecNpcg) {
        // Doesn't need flags gy, but they don't hurt
        separator2 = new RegExp("^" + separator.source + "$(?!\\s)", flags);
      }
      /* Values for `limit`, per the spec:
       * If undefined: 4294967295 // Math.pow(2, 32) - 1
       * If 0, Infinity, or NaN: 0
       * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
       * If negative number: 4294967296 - Math.floor(Math.abs(limit))
       * If other: Type-convert, then use the above rules
       */
      limit = limit === undef ? -1 >>> 0 : // Math.pow(2, 32) - 1
      limit >>> 0; // ToUint32(limit)
      while (match = separator.exec(str)) {
        // `separator.lastIndex` is not reliable cross-browser
        lastIndex = match.index + match[0].length;
        if (lastIndex > lastLastIndex) {
          output.push(str.slice(lastLastIndex, match.index));
          // Fix browsers whose `exec` methods don't consistently return `undefined` for
          // nonparticipating capturing groups
          if (!compliantExecNpcg && match.length > 1) {
            match[0].replace(separator2, function() {
              for (var i = 1; i < arguments.length - 2; i++) {
                if (arguments[i] === undef) {
                  match[i] = undef;
                }
              }
            });
          }
          if (match.length > 1 && match.index < str.length) {
            Array.prototype.push.apply(output, match.slice(1));
          }
          lastLength = match[0].length;
          lastLastIndex = lastIndex;
          if (output.length >= limit) {
            break;
          }
        }
        if (separator.lastIndex === match.index) {
          separator.lastIndex++; // Avoid an infinite loop
        }
      }
      if (lastLastIndex === str.length) {
        if (lastLength || !separator.test("")) {
          output.push("");
        }
      } else {
        output.push(str.slice(lastLastIndex));
      }
      return output.length > limit ? output.slice(0, limit) : output;
    };

    return self;
  })();

  var indexOf = [].indexOf;

  var indexof = function(arr, obj){
    if (indexOf) return arr.indexOf(obj);
    for (var i = 0; i < arr.length; ++i) {
      if (arr[i] === obj) return i;
    }
    return -1;
  };

  // contains, add, remove, toggle


  var classList = ClassList;

  function ClassList(elem) {
      var cl = elem.classList;

      if (cl) {
          return cl
      }

      var classList = {
          add: add
          , remove: remove
          , contains: contains
          , toggle: toggle
          , toString: $toString
          , length: 0
          , item: item
      };

      return classList

      function add(token) {
          var list = getTokens();
          if (indexof(list, token) > -1) {
              return
          }
          list.push(token);
          setTokens(list);
      }

      function remove(token) {
          var list = getTokens()
              , index = indexof(list, token);

          if (index === -1) {
              return
          }

          list.splice(index, 1);
          setTokens(list);
      }

      function contains(token) {
          return indexof(getTokens(), token) > -1
      }

      function toggle(token) {
          if (contains(token)) {
              remove(token);
              return false
          } else {
              add(token);
              return true
          }
      }

      function $toString() {
          return elem.className
      }

      function item(index) {
          var tokens = getTokens();
          return tokens[index] || null
      }

      function getTokens() {
          var className = elem.className;

          return filter(className.split(" "), isTruthy)
      }

      function setTokens(list) {
          var length = list.length;

          elem.className = list.join(" ");
          classList.length = length;

          for (var i = 0; i < list.length; i++) {
              classList[i] = list[i];
          }

          delete list[length];
      }
  }

  function filter (arr, fn) {
      var ret = [];
      for (var i = 0; i < arr.length; i++) {
          if (fn(arr[i])) ret.push(arr[i]);
      }
      return ret
  }

  function isTruthy(value) {
      return !!value
  }

  var empty = {};

  var empty$1 = /*#__PURE__*/Object.freeze({
    default: empty
  });

  var require$$0 = ( empty$1 && empty ) || empty$1;

  var hyperscript = createCommonjsModule(function (module) {
  var w = typeof window === 'undefined' ? require$$0 : window;
  var document = w.document;
  var Text = w.Text;

  function context () {

    var cleanupFuncs = [];

    function h() {
      var args = [].slice.call(arguments), e = null;
      function item (l) {
        var r;
        function parseClass (string) {
          // Our minimal parser doesn’t understand escaping CSS special
          // characters like `#`. Don’t use them. More reading:
          // https://mathiasbynens.be/notes/css-escapes .

          var m = browserSplit(string, /([\.#]?[^\s#.]+)/);
          if(/^\.|#/.test(m[1]))
            e = document.createElement('div');
          forEach(m, function (v) {
            var s = v.substring(1,v.length);
            if(!v) return
            if(!e)
              e = document.createElement(v);
            else if (v[0] === '.')
              classList(e).add(s);
            else if (v[0] === '#')
              e.setAttribute('id', s);
          });
        }

        if(l == null)
          ;
        else if('string' === typeof l) {
          if(!e)
            parseClass(l);
          else
            e.appendChild(r = document.createTextNode(l));
        }
        else if('number' === typeof l
          || 'boolean' === typeof l
          || l instanceof Date
          || l instanceof RegExp ) {
            e.appendChild(r = document.createTextNode(l.toString()));
        }
        //there might be a better way to handle this...
        else if (isArray(l))
          forEach(l, item);
        else if(isNode(l))
          e.appendChild(r = l);
        else if(l instanceof Text)
          e.appendChild(r = l);
        else if ('object' === typeof l) {
          for (var k in l) {
            if('function' === typeof l[k]) {
              if(/^on\w+/.test(k)) {
                (function (k, l) { // capture k, l in the closure
                  if (e.addEventListener){
                    e.addEventListener(k.substring(2), l[k], false);
                    cleanupFuncs.push(function(){
                      e.removeEventListener(k.substring(2), l[k], false);
                    });
                  }else{
                    e.attachEvent(k, l[k]);
                    cleanupFuncs.push(function(){
                      e.detachEvent(k, l[k]);
                    });
                  }
                })(k, l);
              } else {
                // observable
                e[k] = l[k]();
                cleanupFuncs.push(l[k](function (v) {
                  e[k] = v;
                }));
              }
            }
            else if(k === 'style') {
              if('string' === typeof l[k]) {
                e.style.cssText = l[k];
              }else{
                for (var s in l[k]) (function(s, v) {
                  if('function' === typeof v) {
                    // observable
                    e.style.setProperty(s, v());
                    cleanupFuncs.push(v(function (val) {
                      e.style.setProperty(s, val);
                    }));
                  } else
                    var match = l[k][s].match(/(.*)\W+!important\W*$/);
                    if (match) {
                      e.style.setProperty(s, match[1], 'important');
                    } else {
                      e.style.setProperty(s, l[k][s]);
                    }
                })(s, l[k][s]);
              }
            } else if(k === 'attrs') {
              for (var v in l[k]) {
                e.setAttribute(v, l[k][v]);
              }
            }
            else if (k.substr(0, 5) === "data-") {
              e.setAttribute(k, l[k]);
            } else {
              e[k] = l[k];
            }
          }
        } else if ('function' === typeof l) {
          //assume it's an observable!
          var v = l();
          e.appendChild(r = isNode(v) ? v : document.createTextNode(v));

          cleanupFuncs.push(l(function (v) {
            if(isNode(v) && r.parentElement)
              r.parentElement.replaceChild(v, r), r = v;
            else
              r.textContent = v;
          }));
        }

        return r
      }
      while(args.length)
        item(args.shift());

      return e
    }

    h.cleanup = function () {
      for (var i = 0; i < cleanupFuncs.length; i++){
        cleanupFuncs[i]();
      }
      cleanupFuncs.length = 0;
    };

    return h
  }

  var h = module.exports = context();
  h.context = context;

  function isNode (el) {
    return el && el.nodeName && el.nodeType
  }

  function forEach (arr, fn) {
    if (arr.forEach) return arr.forEach(fn)
    for (var i = 0; i < arr.length; i++) fn(arr[i], i);
  }

  function isArray (arr) {
    return Object.prototype.toString.call(arr) == '[object Array]'
  }
  });

  var dist = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  var isValidString = function isValidString(param) {
    return typeof param === 'string' && param.length > 0;
  };

  var startsWith = function startsWith(string, start) {
    return string[0] === start;
  };

  var isSelector = function isSelector(param) {
    return isValidString(param) && (startsWith(param, '.') || startsWith(param, '#'));
  };

  var node = function node(h) {
    return function (tagName) {
      return function (first) {
        for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          rest[_key - 1] = arguments[_key];
        }

        if (isSelector(first)) {
          return h.apply(undefined, [tagName + first].concat(rest));
        } else if (typeof first === 'undefined') {
          return h(tagName);
        } else {
          return h.apply(undefined, [tagName, first].concat(rest));
        }
      };
    };
  };

  var TAG_NAMES = ['a', 'abbr', 'acronym', 'address', 'applet', 'area', 'article', 'aside', 'audio', 'b', 'base', 'basefont', 'bdi', 'bdo', 'bgsound', 'big', 'blink', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'center', 'cite', 'code', 'col', 'colgroup', 'command', 'content', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'dir', 'div', 'dl', 'dt', 'element', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'font', 'footer', 'form', 'frame', 'frameset', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'image', 'img', 'input', 'ins', 'isindex', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'listing', 'main', 'map', 'mark', 'marquee', 'math', 'menu', 'menuitem', 'meta', 'meter', 'multicol', 'nav', 'nextid', 'nobr', 'noembed', 'noframes', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'plaintext', 'pre', 'progress', 'q', 'rb', 'rbc', 'rp', 'rt', 'rtc', 'ruby', 's', 'samp', 'script', 'section', 'select', 'shadow', 'slot', 'small', 'source', 'spacer', 'span', 'strike', 'strong', 'style', 'sub', 'summary', 'sup', 'svg', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'tt', 'u', 'ul', 'var', 'video', 'wbr', 'xmp'];

  exports['default'] = function (h) {
    var createTag = node(h);
    var exported = { TAG_NAMES: TAG_NAMES, isSelector: isSelector, createTag: createTag };
    TAG_NAMES.forEach(function (n) {
      exported[n] = createTag(n);
    });
    return exported;
  };

  module.exports = exports['default'];
  });

  var hh = unwrapExports(dist);

  var principlesData = [{
    name: 'Clarity is job #1',
    body: 'Clarity is the first and most important job of any interface. To be effective using an interface you\'ve designed, people must be able to recognize what it is, care about why they would use it, understand what the interface is helping them interact with, predict what will happen when they use it, and then successfully interact with it. While there is room for mystery and delayed gratification in interfaces, there is no room for confusion. Clarity inspires confidence and leads to further use. One hundred clear screens is preferable to a single cluttered one.'
  }, {
    name: 'Interfaces exist to enable interaction',
    body: 'Interfaces exist to enable interaction between humans and our world. They can help clarify, illuminate, enable, show relationships, bring us together, pull us apart, manage our expectations, and give us access to services. The act of designing interfaces is not Art. Interfaces are not monuments unto themselves. Interfaces do a job and their effectiveness can be measured. They are not just utilitarian, however. The best interfaces can inspire, evoke, mystify, and intensify our relationship with the world.'
  }, {
    name: 'Conserve attention at all costs',
    body: 'We live in a world of interruption. It\'s hard to read in peace anymore without something trying to distract us and direct our attention elsewhere. Attention is precious. Don\'t litter the side of your applications with distractible material…remember why the screen exists in the first place. If someone is reading let them finish reading before showing that advertisement (if you must). Honor attention and not only will your readers be happier, your results will be better. When use is the primary goal, attention becomes the prerequisite. Conserve it at all costs.'
  }, {
    name: 'Keep users in control',
    body: 'Humans are most comfortable when they feel in control of themselves and their environment. Thoughtless software takes away that comfort by forcing people into unplanned interactions, confusing pathways, and surprising outcomes. Keep users in control by regularly surfacing system status, by describing causation (if you do this that will happen) and by giving insight into what to expect at every turn. Don\'t worry about stating the obvious…the obvious almost never is.'
  }, {
    name: 'Direct manipulation is best',
    body: 'The best interface is none at all, when we are able to directly manipulate the physical objects in our world. Since this is not always possible, and objects are increasingly informational, we create interfaces to help us interact with them. It is easy to add more layers than necessary to an interface, creating overly-wrought buttons, chrome, graphics, options, preferences, windows, attachments, and other cruft so that we end up manipulating UI elements instead of what\'s important. Instead, strive for that original goal of direct manipulation…design an interface with as little a footprint as possible, recognizing as much as possible natural human gestures. Ideally, the interface is so slight that the user has a feeling of direct manipulation with the object of their focus.'
  }, {
    name: 'One primary action per screen',
    body: 'Every screen we design should support a single action of real value to the person using it. This makes it easier to learn, easier to use, and easier to add to or build on when necessary. Screens that support two or more primary actions become confusing quickly. Like a written article should have a single, strong thesis, every screen we design should support a single, strong action that is its raison d\'etre.'
  }, {
    name: 'Keep secondary actions secondary',
    body: 'Screens with a single primary action can have multiple secondary actions but they need to be kept secondary! The reason why your article exists isn\'t so that people can share it on Twitter…it exists for people to read and understand it. Keep secondary actions secondary by making them lighter weight visually or shown after the primary action has been achieved.'
  }, {
    name: 'Provide a natural next step',
    body: 'Very few interactions are meant to be the last, so thoughtfully design a next step for each interaction a person has with your interface. Anticipate what the next interaction should be and design to support it. Just as we like in human conversation, provide an opening for further interaction. Don\'t leave a person hanging because they\'ve done what you want them to do…give them a natural next step that helps them further achieve their goals.'
  }, {
    name: 'Appearance follows behavior',
    body: 'Humans are most comfortable with things that behave the way we expect. Other people, animals, objects, software. When someone or something behaves consistently with our expectations we feel like we have a good relationship with it. To that end designed elements should look like how they behave. Form follows function. In practice this means that someone should be able to predict how an interface element will behave merely by looking at it. If it looks like a button it should act like a button. Don\'t get cute with the basics of interaction…keep your creativity for higher order concerns.'
  }, {
    name: 'Consistency matters',
    body: 'Following on the previous principle, screen elements should not appear consistent with each other unless they behave consistently with each other. Elements that behave the same should look the same. But it is just as important for unlike elements to appear unlike (be inconsistent) as it is for like elements to appear consistent. In an effort to be consistent novice designers often obscure important differences by using the same visual treatment (often to re-use code) when different visual treatment is appropriate.'
  }, {
    name: 'Strong visual hierarchies work best',
    body: 'A strong visual hierarchy is achieved when there is a clear viewing order to the visual elements on a screen. That is, when users view the same items in the same order every time. Weak visual hierarchies give little clue about where to rest one\'s gaze and end up feeling cluttered and confusing. In environments of great change it is hard to maintain a strong visual hierarchy because visual weight is relative: when everything is bold, nothing is bold. Should a single visually heavy element be added to a screen, the designer may need to reset the visual weight of all elements to once again achieve a strong hierarchy. Most people don\'t notice visual hierarchy but it is one of the easiest ways to strengthen (or weaken) a design.'
  }, {
    name: 'Smart organization reduces cognitive load',
    body: 'As John Maeda says in his book Simplicity, smart organization of screen elements can make the many appear as the few. This helps people understand your interface easier and more quickly, as you\'ve illustrated the inherent relationships of content in your design. Group together like elements, show natural relationships by placement and orientation. By smartly organizing your content you make it less of a cognitive load on the user…who doesn\'t have to think about how elements are related because you\'ve done it for them. Don\'t force the user to figure things out…show them by designing those relationships into your screens.'
  }, {
    name: 'Highlight, don\'t determine, with color',
    body: 'The color of physical things changes as light changes. In the full light of day we see a very different tree than one outlined against a sunset. As in the physical world, where color is a many-shaded thing, color should not determine much in an interface. It can help, be used for highlighting, be used to guide attention, but should not be the only differentiator of things. For long-reading or extended screen hours, use light or muted background colors, saving brighter hues for your accent colors. Of course there is a time for vibrant background colors as well, just be sure that it is appropriate for your audience.'
  }, {
    name: 'Progressive disclosure',
    body: 'Show only what is necessary on each screen. If people are making a choice, show enough information to allow them the choice, then dive into details on a subsequent screen. Avoid the tendency to over-explain or show everything all at once. When possible, defer decisions to subsequent screens by progressively disclosing information as necessary. This will keep your interactions more clear.'
  }, {
    name: 'Help people inline',
    body: 'In ideal interfaces, help is not necessary because the interface is learnable and usable. The step below this, reality, is one in which help is inline and contextual, available only when and where it is needed, hidden from view at all other times. Asking people to go to help and find an answer to their question puts the onus on them to know what they need. Instead build in help where it is needed…just make sure that it is out of the way of people who already know how to use your interface.'
  }, {
    name: 'A crucial moment: the zero state',
    body: 'The first time experience with an interface is crucial, yet often overlooked by designers. In order to best help our users get up to speed with our designs, it is best to design for the zero state, the state in which nothing has yet occurred. This state shouldn\'t be a blank canvas…it should provide direction and guidance for getting up to speed. Much of the friction of interaction is in that initial context…once people understand the rules they have a much higher likelihood of success.'
  }, {
    name: 'Great design is invisible',
    body: 'A curious property of great design is that it usually goes unnoticed by the people who use it. One reason for this is that if the design is successful the user can focus on their own goals and not the interface…when they complete their goal they are satisfied and do not need to reflect on the situation. As a designer this can be tough…as we receive less adulation when our designs are good. But great designers are content with a well-used design…and know that happy users are often silent.'
  }, {
    name: 'Build on other design disciplines',
    body: 'Visual and graphic design, typography, copywriting, information architecture and visualization…all of these disciplines are part of interface design. They can be touched upon or specialized in. Do not get into turf wars or look down on other disciplines: grab from them the aspects that help you do your work and push on. Pull in insights from seemingly unrelated disciplines as well…what can we learn from publishing, writing code, bookbinding, skateboarding, firefighting, karate?'
  }, {
    name: 'Interfaces exist to be used',
    body: 'As in most design disciplines, interface design is successful when people are using what you\'ve designed. Like a beautiful chair that is uncomfortable to sit in, design has failed when people choose not to use it. Therefore, interface design can be as much about creating an environment for use as it is creating an artifact worth using. It is not enough for an interface to satisfy the ego of its designer: it must be used!'
  }];

  var examplesData = [{
    username: 'Jamerrone',
    repoUrl: 'https://github.com/Jamerrone/web-design',
    thumbnail: './assets/images/james.png',
    principleID: 'clarity-is-job-1',
    principleName: 'Clarity is job #1',
    principleDescription: 'Normally I try to build clarity using icons, buttons or labels. However, this time I tried to explain my unusual interface using animations.',
    likes: Math.floor(Math.random() * 100) + 1,
    dislikes: Math.floor(Math.random() * 100) + 1
  }, {
    username: 'Jamerrone',
    repoUrl: 'https://github.com/Jamerrone/web-design',
    thumbnail: './assets/images/james.png',
    principleID: 'one-primary-action-per-screen',
    principleName: 'One primary action per screen',
    principleDescription: 'I mainly have two screens, each having there own primary action and multiple secondary actions. For example, on the homepage/overview page, users can see and scroll trough multiples images, when clicked they expose more information about themselves in a separated detail view.',
    likes: Math.floor(Math.random() * 100) + 1,
    dislikes: Math.floor(Math.random() * 100) + 1
  }, {
    username: 'Jamerrone',
    repoUrl: 'https://github.com/Jamerrone/web-design',
    thumbnail: './assets/images/james.png',
    principleID: 'strong-visual-hierarchies-work-best',
    principleName: 'Strong visual hierarchies work best',
    principleDescription: 'The main content of my concept are images witch by nature atracht way more attention to themselfs then text elements do. They are big, fun and full of colors. In the end, I chose to keep my main focal points on theimages themselfs while also tring to call attention to the headers.',
    likes: Math.floor(Math.random() * 100) + 1,
    dislikes: Math.floor(Math.random() * 100) + 1
  }, {
    username: 'Jajan20',
    repoUrl: 'https://github.com/jajan20/web-design',
    thumbnail: './assets/images/noimage.png',
    principleID: 'clarity-is-job-1',
    principleName: 'Clarity is job #1',
    principleDescription: 'By keeping my interface clean and simple users can find directly what they need. The logo is big, with a name whichs tells exactly what the interface is used for.',
    likes: Math.floor(Math.random() * 100) + 1,
    dislikes: Math.floor(Math.random() * 100) + 1
  }, {
    username: 'Jajan20',
    repoUrl: 'https://github.com/jajan20/web-design',
    thumbnail: './assets/images/noimage.png',
    principleID: 'one-primary-action-per-screen',
    principleName: 'One primary action per screen',
    principleDescription: 'By making the decesion making buttons big and stand out with color. They will attract the attention of the user.',
    likes: Math.floor(Math.random() * 100) + 1,
    dislikes: Math.floor(Math.random() * 100) + 1
  }, {
    username: 'Jajan20',
    repoUrl: 'https://github.com/jajan20/web-design',
    thumbnail: './assets/images/noimage.png',
    principleID: 'strong-visual-hierarchies-work-best',
    principleName: 'Strong visual hierarchies work best',
    principleDescription: 'Every page gives the user a choice, but just one choice. This way any significant actions are carefully taken.',
    likes: Math.floor(Math.random() * 100) + 1,
    dislikes: Math.floor(Math.random() * 100) + 1
  }, {
    username: 'RobinFrugte97',
    repoUrl: 'https://github.com/RobinFrugte97/web-design/',
    thumbnail: './assets/images/robin.png',
    principleID: 'one-primary-action-per-screen',
    principleName: 'One primary action per screen',
    principleDescription: 'I tried to seperate all features in my site as much as possible. I have a seperate state for the landing page, filtering, searching, and watching videos.',
    likes: Math.floor(Math.random() * 100) + 1,
    dislikes: Math.floor(Math.random() * 100) + 1
  }, {
    username: 'RobinFrugte97',
    repoUrl: 'https://github.com/RobinFrugte97/web-design/',
    thumbnail: './assets/images/robin.png',
    principleID: 'appearance-follows-behavior',
    principleName: 'Appearance follows behavior',
    principleDescription: 'I made every clickable element in my website appear as such by making it stand uit of the rest and making buttons look like real buttons, for example.',
    likes: Math.floor(Math.random() * 100) + 1,
    dislikes: Math.floor(Math.random() * 100) + 1
  }, {
    username: 'RobinFrugte97',
    repoUrl: 'https://github.com/RobinFrugte97/web-design/',
    thumbnail: './assets/images/robin.png',
    principleID: 'strong-visual-hierarchies-work-best',
    principleName: 'Strong visual hierarchies work best',
    principleDescription: 'I tried to play with the hierarchy of the site by making the main navigation of the site relatively big. It stands out from the rest.',
    likes: Math.floor(Math.random() * 100) + 1,
    dislikes: Math.floor(Math.random() * 100) + 1
  }, {
    username: 'Meesrutten',
    repoUrl: 'https://github.com/meesrutten/web-design/',
    thumbnail: './assets/images/noimage.png',
    principleID: 'interfaces-exist-to-enable-interaction',
    principleName: 'Interfaces exist to enable interaction',
    principleDescription: 'On first load, the zero state, the user will see an animation of a card to give awareness of it\'s interactiveness. If the user hovers over a card he will see it moving in depth, this effect should give the user a clue that there is more content behind or within the card. When scrolling the cards will change in depth for the same effect named above.',
    likes: Math.floor(Math.random() * 100) + 1,
    dislikes: Math.floor(Math.random() * 100) + 1
  }, {
    username: 'Meesrutten',
    repoUrl: 'https://github.com/meesrutten/web-design/',
    thumbnail: './assets/images/noimage.png',
    principleID: 'one-primary-action-per-screen',
    principleName: 'One primary action per screen',
    principleDescription: 'Every card and detailpage has only one primary button. Cards also have links to external page but all buttons are singular and primary.',
    likes: Math.floor(Math.random() * 100) + 1,
    dislikes: Math.floor(Math.random() * 100) + 1
  }, {
    username: 'Meesrutten',
    repoUrl: 'https://github.com/meesrutten/web-design/',
    thumbnail: './assets/images/noimage.png',
    principleID: 'progressive-disclosure',
    principleName: 'Progressive disclosure',
    principleDescription: 'When interacting with the primary action, the card will flip or fold and reveal it\'s contents.',
    likes: Math.floor(Math.random() * 100) + 1,
    dislikes: Math.floor(Math.random() * 100) + 1
  }, {
    username: 'Chanakarn',
    repoUrl: 'https://github.com/niyorn/web-design',
    thumbnail: './assets/images/noimage.png',
    principleID: 'clarity-is-job-1',
    principleName: 'Clarity is job #1',
    principleDescription: '',
    likes: Math.floor(Math.random() * 100) + 1,
    dislikes: Math.floor(Math.random() * 100) + 1
  }, {
    username: 'Chanakarn',
    repoUrl: 'https://github.com/niyorn/web-design',
    thumbnail: './assets/images/noimage.png',
    principleID: 'strong-visual-hierarchies-work-best',
    principleName: 'Strong visual hierarchies work best',
    principleDescription: '',
    likes: Math.floor(Math.random() * 100) + 1,
    dislikes: Math.floor(Math.random() * 100) + 1
  }, {
    username: 'Chanakarn',
    repoUrl: 'https://github.com/niyorn/web-design',
    thumbnail: './assets/images/noimage.png',
    principleID: 'smart-organization-reduces-cognitive-load',
    principleName: 'Smart organization reduces cognitive load',
    principleDescription: '',
    likes: Math.floor(Math.random() * 100) + 1,
    dislikes: Math.floor(Math.random() * 100) + 1
  }, {
    username: 'Sam Guliker',
    repoUrl: 'https://github.com/sam-guliker/web-design',
    thumbnail: './assets/images/sam.png',
    principleID: 'clarity-is-job-1',
    principleName: 'Clarity is job #1',
    principleDescription: 'It\'s important to let the design explain itself itself.',
    likes: Math.floor(Math.random() * 100) + 1,
    dislikes: Math.floor(Math.random() * 100) + 1
  }, {
    username: 'Sam Guliker',
    repoUrl: 'https://github.com/sam-guliker/web-design',
    thumbnail: './assets/images/sam.png',
    principleID: 'one-primary-action-per-screen',
    principleName: 'One primary action per screen',
    principleDescription: 'Everyscreen got a primary action, this way it is simple to understand what is going on.',
    likes: Math.floor(Math.random() * 100) + 1,
    dislikes: Math.floor(Math.random() * 100) + 1
  }, {
    username: 'Sam Guliker',
    repoUrl: 'https://github.com/sam-guliker/web-design',
    thumbnail: './assets/images/sam.png',
    principleID: 'consistency-matters',
    principleName: 'Consistency matters',
    principleDescription: 'I\'ts important to have a consistant page to help the user understand what is going on within the page.',
    likes: Math.floor(Math.random() * 100) + 1,
    dislikes: Math.floor(Math.random() * 100) + 1
  }, {
    username: 'Vriesm060',
    repoUrl: 'https://github.com/vriesm060/web-design',
    thumbnail: './assets/images/vriesm060.png',
    principleID: 'clarity-is-job-1',
    principleName: 'Clarity is job #1',
    principleDescription: '',
    likes: Math.floor(Math.random() * 100) + 1,
    dislikes: Math.floor(Math.random() * 100) + 1
  }, {
    username: 'Vriesm060',
    repoUrl: 'https://github.com/vriesm060/web-design',
    thumbnail: './assets/images/vriesm060.png',
    principleID: 'strong-visual-hierarchies-work-best',
    principleName: 'Strong visual hierarchies work best',
    principleDescription: '',
    likes: Math.floor(Math.random() * 100) + 1,
    dislikes: Math.floor(Math.random() * 100) + 1
  }, {
    username: 'Vriesm060',
    repoUrl: 'https://github.com/vriesm060/web-design',
    thumbnail: './assets/images/vriesm060.png',
    principleID: 'smart-organization-reduces-cognitive-load',
    principleName: 'Smart organization reduces cognitive load',
    principleDescription: '',
    likes: Math.floor(Math.random() * 100) + 1,
    dislikes: Math.floor(Math.random() * 100) + 1
  }, {
    username: 'NielsFS',
    repoUrl: 'https://github.com/NielsFS/web-design',
    thumbnail: './assets/images/niels.png',
    principleID: 'clarity-is-job-1',
    principleName: 'Clarity is job #1',
    principleDescription: 'A clean interface that focusses the user on the content. The page is designed to not be cluttered.',
    likes: Math.floor(Math.random() * 100) + 1,
    dislikes: Math.floor(Math.random() * 100) + 1
  }, {
    username: 'NielsFS',
    repoUrl: 'https://github.com/NielsFS/web-design',
    thumbnail: './assets/images/niels.png',
    principleID: 'consistency-matters',
    principleName: 'Consistency matters',
    principleDescription: 'Fully responsive page so that the content is always presented the same way. When opening menu\'s, the content scales and resizes.',
    likes: Math.floor(Math.random() * 100) + 1,
    dislikes: Math.floor(Math.random() * 100) + 1
  }, {
    username: 'NielsFS',
    repoUrl: 'https://github.com/NielsFS/web-design',
    thumbnail: './assets/images/niels.png',
    principleID: 'smart-organization-reduces-cognitive-load',
    principleName: 'Smart organization reduces cognitive load',
    principleDescription: 'The menu\'s are hidden to minimize the cognitive load while looking at the screen. However, on first entering the website the category filtering menu is open to show the user that the videos can be filtered. On scroll the menu will automatically close itself.',
    likes: Math.floor(Math.random() * 100) + 1,
    dislikes: Math.floor(Math.random() * 100) + 1
  }, {
    username: 'Dipsaus9',
    repoUrl: 'https://github.com/dipsaus9/web-design',
    thumbnail: './assets/images/noimage.png',
    principleID: 'clarity-is-job-1',
    principleName: 'Clarity is job #1',
    principleDescription: 'The purpose of the page should be clear at first view.',
    likes: Math.floor(Math.random() * 100) + 1,
    dislikes: Math.floor(Math.random() * 100) + 1
  }, {
    username: 'Dipsaus9',
    repoUrl: 'https://github.com/dipsaus9/web-design',
    thumbnail: './assets/images/noimage.png',
    principleID: 'consistency-matters',
    principleName: 'Consistency matters',
    principleDescription: 'Each state at the website has one primary function and one action only.',
    likes: Math.floor(Math.random() * 100) + 1,
    dislikes: Math.floor(Math.random() * 100) + 1
  }, {
    username: 'Dipsaus9',
    repoUrl: 'https://github.com/dipsaus9/web-design',
    thumbnail: './assets/images/noimage.png',
    principleID: 'provide-a-natural-next-step',
    principleName: 'Provide a natural next step',
    principleDescription: '',
    likes: Math.floor(Math.random() * 100) + 1,
    dislikes: Math.floor(Math.random() * 100) + 1
  }, {
    username: 'Yoeripasmans',
    repoUrl: 'https://github.com/yoeripasmans/web-design',
    thumbnail: './assets/images/yori.png',
    principleID: 'clarity-is-job-1',
    principleName: 'Clarity is job #1',
    principleDescription: 'Build clarity with using a clean interface with existing patterns of a gallery. Users recongize these patterns and easier understand the interface of the gallery.',
    likes: Math.floor(Math.random() * 100) + 1,
    dislikes: Math.floor(Math.random() * 100) + 1
  }, {
    username: 'Yoeripasmans',
    repoUrl: 'https://github.com/yoeripasmans/web-design',
    thumbnail: './assets/images/yori.png',
    principleID: 'strong-visual-hierarchies-work-best',
    principleName: 'Strong visual hierarchies work best',
    principleDescription: 'Using different font weights and colors with the usage of correct styling, I\'m trying to create a strong visual hierarchy.',
    likes: Math.floor(Math.random() * 100) + 1,
    dislikes: Math.floor(Math.random() * 100) + 1
  }, {
    username: 'Yoeripasmans',
    repoUrl: 'https://github.com/yoeripasmans/web-design',
    thumbnail: './assets/images/yori.png',
    principleID: 'progressive-disclosure',
    principleName: 'Progressive disclosure',
    principleDescription: 'By not showing all of the details of the images in the gallery, but only on the when the user hover on that image, the gallery don\'t gets cluttered and stays clean. Therefore the interaction with the gallery is also more clear.',
    likes: Math.floor(Math.random() * 100) + 1,
    dislikes: Math.floor(Math.random() * 100) + 1
  }, {
    username: 'Leoniesmits',
    repoUrl: 'https://github.com/leoniesmits/web-design/',
    thumbnail: './assets/images/noimage.png',
    principleID: 'keep-users-in-control',
    principleName: 'Keep users in control',
    principleDescription: 'Keep users in control. You don\'t want to overload them with information, but make the users feel like they are in complete control. The user can filter and sort everything, they can close and open all menus.',
    likes: Math.floor(Math.random() * 100) + 1,
    dislikes: Math.floor(Math.random() * 100) + 1
  }, {
    username: 'Leoniesmits',
    repoUrl: 'https://github.com/leoniesmits/web-design/',
    thumbnail: './assets/images/noimage.png',
    principleID: 'strong-visual-hierarchies-work-best',
    principleName: 'Strong visual hierarchies work best',
    principleDescription: 'Strong visual hierarchies work best. The buttons are below the main navigation, the content draws the attention since that is the main focus. The filter options descend from overall to more detailed options. The filter menu is obviously less important than the content.',
    likes: Math.floor(Math.random() * 100) + 1,
    dislikes: Math.floor(Math.random() * 100) + 1
  }, {
    username: 'Leoniesmits',
    repoUrl: 'https://github.com/leoniesmits/web-design/',
    thumbnail: './assets/images/noimage.png',
    principleID: 'progressive-disclosure',
    principleName: 'Progressive disclosure',
    principleDescription: 'Progressive Disclosure. The number of results is shown to the user, so that they know what content they can sort and filter. Give them enough information to make choices but don\'t overload them.',
    likes: Math.floor(Math.random() * 100) + 1,
    dislikes: Math.floor(Math.random() * 100) + 1
  }, {
    username: 'Japgroevemaker',
    repoUrl: 'https://github.com/japgroevemaker/web-design',
    thumbnail: './assets/images/noimage.png',
    principleID: 'one-primary-action-per-screen',
    principleName: 'One primary action per screen',
    principleDescription: 'As i was making the photogallery, there is one primary action per screen. You can look at the photos and when you click them you make them bigger.',
    likes: Math.floor(Math.random() * 100) + 1,
    dislikes: Math.floor(Math.random() * 100) + 1
  }, {
    username: 'Japgroevemaker',
    repoUrl: 'https://github.com/japgroevemaker/web-design',
    thumbnail: './assets/images/noimage.png',
    principleID: 'provide-a-natural-next-step',
    principleName: 'Provide a natural next step',
    principleDescription: 'When the user clicks on one of the buttons, the thing the user expects will happen.',
    likes: Math.floor(Math.random() * 100) + 1,
    dislikes: Math.floor(Math.random() * 100) + 1
  }, {
    username: 'Japgroevemaker',
    repoUrl: 'https://github.com/japgroevemaker/web-design',
    thumbnail: './assets/images/noimage.png',
    principleID: 'appearance-follows-behavior',
    principleName: 'Appearance follows behavior',
    principleDescription: 'When the user makes the photo bigger, it shows three buttons. One in the top left corner, one on the left of the photo and one on the right of the photo. These buttons don\'t really need explanation because they are patterns.',
    likes: Math.floor(Math.random() * 100) + 1,
    dislikes: Math.floor(Math.random() * 100) + 1
  }];

  var _hh = hh(hyperscript),
      a = _hh.a,
      article = _hh.article,
      button = _hh.button,
      div = _hh.div,
      h2 = _hh.h2,
      h3 = _hh.h3,
      img = _hh.img,
      li = _hh.li,
      ol = _hh.ol,
      p = _hh.p,
      span = _hh.span,
      strong = _hh.strong,
      ul = _hh.ul;

  var articles = [];
  var navItems = [];

  var previusScrollPosition = -1;
  var currentScrollPosition = 0;

  var sortExamplesByNew = function sortExamplesByNew(data) {
    generateExamples(data.reverse());
  };

  var sortExamplesByOld = function sortExamplesByOld(data) {
    generateExamples(data);
  };

  var sortExamplesByLikes = function sortExamplesByLikes(data) {
    generateExamples(data.sort(function (a, b) {
      return b.likes - a.likes;
    }));
  };

  var sortExamplesByDislikes = function sortExamplesByDislikes(data) {
    generateExamples(data.sort(function (a, b) {
      return b.dislikes - a.dislikes;
    }));
  };

  var sortExamplesByScore = function sortExamplesByScore(data) {
    generateExamples(data.sort(function (a, b) {
      return b.likes - b.dislikes - (a.likes - a.dislikes);
    }));
  };

  var stringToID = function stringToID(s) {
    return s.replace(/\s+/g, '-').replace(/[`~!@#$%^&*()|+\=?;:'",.<>\{\}\[\]\\\/]/gi, '').toLowerCase();
  };

  var generatePrinciplesList = function generatePrinciplesList(data) {
    var counter = 1;

    document.querySelector('main').appendChild(article({ id: 'introduction' }, [h2('Hello and Welcome 👋'), p('Students from the minor "Web Design" at Amsterdam\'s University of' + ' Applied Sciences were given the task to come up with intuitive ' + 'and pleasurable user interface solutions. The students were ' + 'given two days to create a demo version of their solutions. ' + 'These demos range from video players, to galleries, to booking ' + 'interfaces and much more. The demos are based on Joshua ' + 'Porter\'s "19 Principles of User Interface Design".'), a({
      'className': 'backToNavigation',
      'data-id': '#introduction',
      'href': '#'
    }, 'Back to navigation')]));

    articles.push(document.getElementById('introduction'));

    return data.forEach(function (principle) {
      var elem = article({
        id: stringToID(principle.name)
      }, [h2([span('' + counter), '' + principle.name]), p(principle.body), a({
        'className': 'backToNavigation',
        'data-id': '#' + stringToID(principle.name),
        'href': '#'
      }, 'Back to navigation'), div({ className: 'sortBy' }, [button({ className: 'sortByNew' }, 'Sort by New'), button({ className: 'sortByOld' }, 'Sort by Old'), button({ className: 'sortByLikes' }, 'Sort by Likes'), button({ className: 'sortByDislikes' }, 'Sort by Dislikes'), button({ className: 'sortByScore' }, 'Sort by Score')]), ol('.examples-list')]);

      document.querySelector('main').appendChild(elem);
      articles.push(elem);
      counter++;
    });
  };

  var generateMainNavigation = function generateMainNavigation(data) {
    var counter = 1;

    navItems.push(document.querySelector('[href="#introduction"]'));
    document.querySelector('[href="#introduction"]').focus();

    return data.forEach(function (principle) {
      var elem = li(a({
        href: '#' + stringToID(principle.name)
      }, [strong(counter), principle.name]));

      document.querySelector('#mainNavigation').appendChild(elem);
      navItems.push(elem.querySelector('a'));
      counter++;
    });
  };

  var generateExamples = function generateExamples(data) {
    document.querySelectorAll('.examples-list').forEach(function (elem) {
      elem.innerHTML = '';
    });
    data.forEach(function (example) {
      var elem = li([a({ href: '#detailsPage' }, img({ src: example.thumbnail })), button('❤️ Like'), span('\uD83C\uDFC6 ' + (example.likes - example.dislikes)), button('💔 Dislike')]);

      elem.querySelector('a').addEventListener('click', function (link) {
        generateDetailsPage(example.username, example.principleID, examplesData);
      });

      document.getElementById(example.principleID).querySelector('.examples-list').appendChild(elem);

      document.getElementById(example.principleID).querySelector('.sortBy').classList.add('show');
    });
  };

  var generateDetailsPage = function generateDetailsPage(user, parrentID, data) {
    var detailsPage = document.getElementById('detailsPage');

    var principles = data.reduce(function (accumulator, current) {
      if (current.username === user) {
        accumulator.push(current);
      }
      return accumulator;
    }, []);

    var mainContent = article([h2(user), p({ id: 'repoURL' }, [strong('RepoUrl:'), a({ href: principles[0].repoUrl, target: '_blanc' }, principles[0].repoUrl)]), ul({ id: 'principles' })]);

    detailsPage.innerHTML = '';
    detailsPage.appendChild(img({ src: principles[0].thumbnail }));
    detailsPage.appendChild(mainContent);
    detailsPage.appendChild(a({ href: '#' + parrentID, id: 'close' }, 'Close'));

    principles.forEach(function (principle) {
      var elem = li([h3(principle.principleName), p(principle.principleDescription || 'No description 😢')]);

      document.getElementById('principles').appendChild(elem);
    });
  };

  var calcVisibilityForElem = function calcVisibilityForElem(elem) {
    var windowHeight = window.innerHeight;
    var docScroll = window.pageYOffset || document.documentElement.scrollTop;
    var divPosition = elem.offsetTop;
    var divHeight = elem.offsetHeight;
    var hiddenBefore = docScroll - divPosition;
    var hiddenAfter = divPosition + divHeight - (docScroll + windowHeight);

    if (docScroll > divPosition + divHeight || divPosition > docScroll + windowHeight) {
      return 0;
    } else {
      var result = 100;

      if (hiddenBefore > 0) {
        result -= hiddenBefore * 100 / divHeight;
      }

      if (hiddenAfter > 0) {
        result -= hiddenAfter * 100 / divHeight;
      }

      return result;
    }
  };

  var animatePrincipleNrForAllArticles = function animatePrincipleNrForAllArticles() {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = articles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var item = _step.value;

        var top = calcVisibilityForElem(item);

        if (top >= 65) {
          if (!item.navItem) {
            item.navItem = document.querySelector('[href="#' + item.id + '"]');
          }

          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = navItems[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var navItem = _step2.value;

              navItem.classList.remove('highlight');
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }

          item.navItem.classList.add('highlight');
          item.navItem.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center'
          });
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  };

  var animationLoop = function animationLoop() {
    if (previusScrollPosition !== currentScrollPosition) {
      previusScrollPosition = currentScrollPosition;
      animatePrincipleNrForAllArticles();
    }

    requestAnimationFrame(animationLoop);
  };

  document.onscroll = function () {
    currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  };

  generateMainNavigation(principlesData);
  generatePrinciplesList(principlesData);
  requestAnimationFrame(animationLoop);
  sortExamplesByScore(examplesData);

  document.querySelectorAll('.sortByNew').forEach(function (btn) {
    btn.addEventListener('click', function () {
      sortExamplesByNew(examplesData);
    });
  });

  document.querySelectorAll('.sortByOld').forEach(function (btn) {
    btn.addEventListener('click', function () {
      sortExamplesByOld(examplesData);
    });
  });

  document.querySelectorAll('.sortByLikes').forEach(function (btn) {
    btn.addEventListener('click', function () {
      sortExamplesByLikes(examplesData);
    });
  });

  document.querySelectorAll('.sortByDislikes').forEach(function (btn) {
    btn.addEventListener('click', function () {
      sortExamplesByDislikes(examplesData);
    });
  });

  document.querySelectorAll('.sortByScore').forEach(function (btn) {
    btn.addEventListener('click', function () {
      sortExamplesByScore(examplesData);
    });
  });

  document.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('focus', function (link) {
      link.target.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center'
      });
    });
  });

  document.querySelectorAll('#introduction button').forEach(function (link) {
    link.addEventListener('focus', function (link) {
      link.target.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center'
      });
    });
  });

  document.querySelectorAll('.backToNavigation').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector('nav [href="' + link.dataset.id + '"]').focus();
    });
  });

}());
