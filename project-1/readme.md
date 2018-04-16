# Web Design: The Pill

The latest working demo can be found [here](https://jamerrone.github.io/web-design/project-1/dist/index.html).

<!-- TOC -->

* [Web Design: The Pill](#web-design-the-pill)
  * [Assignment Information](#assignment-information)
    * [Clarity is job #1](#clarity-is-job-1)
    * [One primary action per screen](#one-primary-action-per-screen)
    * [Strong visual hierarchies work best](#strong-visual-hierarchies-work-best)
  * [Testers Feedback](#testers-feedback)
    * [Implemented feedback](#implemented-feedback)
  * [Future Plans](#future-plans)
  * [F.A.Q](#faq)
  * [Image Source](#image-source)

<!-- /TOC -->

**WARNING:** _This prototype was built and tested on FireFox Only, issues and bugs are to be expected, especially while using other browsers. For a better viewing experience please consider using FireFox. Feel free to create an issue and/or pull request if you run into anything out of the ordinary._

<p align="center">
  <img src="/project-1/cover.gif"/>
</p>

## Assignment Information

For this assignment, I had to build a prototype in two days using three different design principles from this [article](http://bokardo.com/principles-of-user-interface-design/) of my own choice. In my case I chose:

* Clarity is job #1
* One primary action per screen
* Strong visual hierarchies work best

Each design principle brought its own set of challenges and lessons with it. The prototype I built is a simple image gallery.

### Clarity is job #1

This was a hard one, especially because of my unique UI and shapes. Normally I try to build clarity using icons, buttons or labels. If something is new or different most users will be able to use those elements to get started. However, for this assignment, I tried something different. I always try to use animations and transitions inside my designs, normally their sole goal is entertainment and aesthetics, but not this time! Using different animations I tried to explain my unusual interface to my users. Based on the feedback data I gathered during my testing sessions I think this worked quite well, not a single tester experienced difficulties while navigating my image gallery.

### One primary action per screen

This went quite easy, I mainly have two screens, each having there own primary action and multiple secondary actions. For example, on the homepage/overview page, users can see and scroll trough multiples images, when clicked they expose more information about themselves in a separated detail view. The primary action of this page is the information itself, however, users are still able to navigate through the other images or zoom-in into the image itself.

### Strong visual hierarchies work best

At first I founded it quite hard to balance my hierarchie, especially around text elemtns. The main content of my concept are images witch by nature atracht way more attention to themselfs then text elements do. They are big, fun and full of colors. In the end, I chose to keep my main focal points on the images themselfs while also tring to call attention to the headers.

## Testers Feedback

I have tested my prototype with 3 different people, two student developers like myself and a random girl. Most of the given feedback was implemented, however some feedback where either out of scope for this project or I simply didn't have enough time to work on them. Some of the not implemented feedback can be found under "Future Plans".

### Implemented feedback

Most testers were very pleased with my overview page, especially with its animations, unique shape, and colorful images. The only feedback I received for this page was the boring and low contrast white background. Especially when I had an odd number of images, the shape should be almost invisible because the low contrast border and box-shadow could not be seen on most non Mac monitors. Another feedback point was that I didn't have any hover or focus states for the clickable images, users were not really sure whether they were clickable or not. The only feedback was the cursor turning into a minifying glass. This is also fixed by now.

![Feedback 1](/project-1/feedback1.png)

The details page, however, had multiple problems. First of all, there was no visual hierarchy on the page. The titles were way too small for the large and impactful images. To create a better focal point and balance I decided to increased the font size by a lot. The next issue was the fact that most images dint have a lot of text-based information as seen below. The full viewport space was way too much so I decided to split it into two different sections, not knowing what to do with the new space, I decided to ask for more feedback. In the end, I decided to show the entire gallery again so that users could swap between images with fluid and fast motions. I could, for example, display the newest images or the most popular images on this section, but for now, I will just show every item.

![Feedback 2](/project-1/feedback2.png)

## Future Plans

* Create a simple logo and intro text
* Add more information and content to the homepage
* Fix multiple known browser bugs
* Hide the current image from the details page
* Fetch dynamic data from a database, dataset or API
* ???

## F.A.Q

1.  **Why the name/shape: The Pill?**

* While designing this prototype I wanted to add a subtle `border-radius` of `0.25em`, thanks to a typo my border-radius ended up being `25em`. Later on I increased it even further to `30em` for a more dramatic effect.

## Image Source

Every image used for this prototype can be found on Dribbble, the original source of each image can be found below.

* [Image 1: Landscape of Northern Lights](https://dribbble.com/shots/4445673-Landscape-of-Northern-Lights)
* [Image 2: Team Two](https://dribbble.com/shots/4448926-Team-two)
* [Image 3: Crisscross Plane](https://dribbble.com/shots/4447459-Crisscross-Plane)
* [Image 4: Bring Cool in the Summer](https://dribbble.com/shots/4448757-Bring-cool-in-the-summer)
* [Image 5: Slippy](https://dribbble.com/shots/4447193-Slippy)
* [Image 6: Analytics Data](https://dribbble.com/shots/4449252-Analytics-Data)
* [Image 7: Look Up](https://dribbble.com/shots/4448800-Look-up)
* [Image 8: Hello Dribbble](https://dribbble.com/shots/4448351-Hello-Dribbble)
* [Image 8: Warrior Page](https://dribbble.com/shots/4448623-Warrior-Page)
