!function(){"use strict";var e={"/assets/images/image-1.png":{titel:"Landscape of Northern Lights",body:"Buy at Kit8.net"},"/assets/images/image-2.jpg":{titel:"Team Two",body:"An application project to create a campus learning team. Students can create or match groups through majors and courses."},"/assets/images/image-3.gif":{titel:"Crisscross Plane",body:"Just a small flight into 3D world 😯"},"/assets/images/image-4.gif":{titel:"Bring Cool In The Summer",body:"When it comes to summer, the best thing is to go to the beach and go to the sea to feel the coolness of the sea. You can also enjoy the sun and see the beauty of the bikini. The most important thing is to learn to surf. Bold, don't be afraid of sharks, and never run into it, hahaha!"},"/assets/images/image-5.jpg":{titel:"Slippy",body:"Show & Go | 082"},"/assets/images/image-6.gif":{titel:"Analytics Data",body:'This is a project related to learning. If you like it maybe you can give me a "L" or follow me '},"/assets/images/image-7.jpg":{titel:"Look Up",body:"I just want to use this illustration to tell you to turn off the monitor, absorb the environment around you, and make full use of everything today. There is only one real connection, it can take everything to show your differences, where it can be made. You don't need to tell hundreds of people what you've just done, because you want to share this moment. Everything you do in your life, as long as you pay attention to life and how happy you are, you didn't waste it, overlooking an invention."},"/assets/images/image-8.gif":{titel:"Hello Dribbble",body:"Hello dribbblers！Lovely illustrations for lovely you. Hope you like my frist shot : )"},"/assets/images/image-9.png":{titel:"Warrior Page",body:"This is a picture of a group of leisure time Samurai shinsengumi illustration prototype for Saito Ichi"}},t=document.getElementById("dialog"),o=dialog.querySelector("img"),i=dialog.querySelector("h2"),a=dialog.querySelector("p"),s=dialog.querySelector("aside"),n=document.querySelector("ul");window.onload=function(){var e=document.querySelector(".item:last-of-type"),t=document.querySelector(".item:first-of-type"),o=document.getElementById("loader");e.scrollIntoView(),window.setTimeout(function(){o.hidden=!0,t.scrollIntoView()},1e3)},document.querySelectorAll(".item").forEach(function(t){t.addEventListener("click",function(){var s=t.querySelector("img").src,n=s.replace("http://localhost:3000","");o.src=s,i.innerHTML=e[n].titel,a.innerHTML=e[n].body})}),document.querySelectorAll(".thumb").forEach(function(t){t.addEventListener("click",function(){var s=t.src,n=s.replace("http://localhost:3000","");o.classList.add("fadeIn"),i.classList.add("fadeIn"),a.classList.add("fadeIn"),o.src=s,i.innerHTML=e[n].titel,a.innerHTML=e[n].body,window.setTimeout(function(){o.classList.remove("fadeIn"),i.classList.remove("fadeIn"),a.classList.remove("fadeIn")},500)})}),o.addEventListener("click",function(){o.classList.toggle("fullWidth")}),document.addEventListener("click",function(e){var i=o.contains(e.target),a=n.contains(e.target),r=s.contains(e.target);return!t.classList.contains("open")||i||r?a?t.classList.add("open"):void 0:t.classList.remove("open")});document.onkeyup=function(e){switch(e.keyCode){case 27:if(t.classList.contains("open"))return t.classList.remove("open")}}}();
