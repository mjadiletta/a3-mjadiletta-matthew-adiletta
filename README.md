---

## WPI Track and Field Diet Tracker

http://a3-mjadiletta.glitch.me 

#### Goal
This is an application designed for the WPI track and field team. My coach asked me to make an easy to use website for adding data so that he can track the basic food groups we are eating. This application accomplishes this goal and allows users to add data on a daily basis and have the info stored in a database. 

#### Challenges
I had quite a few challenges with this assignment. First, I had an incredibly difficult time implementing the express server. I could not figure out how to communicate between the front end and the back end for many hours. 
Then I struggled for at least 10 hours through user authentication. I finally managed to get url authentication, but later I realized I needed json authentication for POST data and so I redesigned for another 10 hours. 

#### Authentication Strategy
I chose the local method because the track team does not have GIT hub accounts, and we were told that GIT hub was the only account we were guaranteed to have from Prof. Roberts. Thus, I went with local because I can give each
of my teammates an account manually. 

#### Database Strategy
I chose to use my own database system. I wrote part of the database for last project, but I have since upgraded the system significantly. It is an incredibly detailed database structure that allows for lots of data to be stored
easily and efficiently. It was also the easiest to implement because I coded it.

#### CSS framework
I chose to use BULMA because it provides many cool features with flex. I liked bulma over other options because the formating is very clean and rounded - frendly for everyday users. It is also an easy import for html design. 

#### Express Packages
1. passport : passport is used for user authentication and was required for the project. 
2. morgan : morgan is a tool that logs html requrests and responses. It uses tokens, req, and res and displays them in the console. 
3. cookie-parser : this iterates over keys and checks for any signed cookies. If the key is signed, then it is taken from the request, and put in the response. 
4. feature-policy : this package is a part of the helmet package but I customized it so that I limit the types of attacks that can occur on my website.
5. referrer-policy : this package is also a part of the helmet package. I customized it by forcing all url requests and responses to be hidden. This increases privacy. 

## Technical Achievements
- **Enhanced JSON Database with Query Commands**: I created a method for storing and retreiving information for users using a JSON database. I setup the database by reading and writing to a JSON file. The file is only one
object, all the data residing in the database. I wrote commands that query the database and retreive the required information and returns the information to the user. This is enhanced from the previous project by adding 
functionality to only take certain objets to reduce the time querying. I also store much more infomation in a well defined user structure. 
- **Created a method for Exporting data**: I wrote some javascript to export the database. It sends a json file to your laptop to view in other types of json viewers. 
- **Created a graphing mechanism**: I Canvas.js to create interactive graphs of the data in the database. Unfortunately, there were some issues so I only got it half working, but there is notable technology to 
consider it an achievement I believe. 
- **Wrote lots of Java Script for User Interface**: I wrote a lot of javascript that accesses elements by ID, class ect. to have them show and hide at correct times. This allows the user to have a two page website
that has lots of builtin functionality - login.html to user.html.
- **Implemented Server logic for handling API endpoint requests**: Whenever a user requests data from the server, the front end sends a request for an API endpoint. Then the server does the correct action based on the 
requested endpoint. This allows for scalability for future additons to the project.

### Design Achievements
- **Two Page Website**: This design achievement is great because it means there is no url redirects, everything is on a single page and is hidden or shown based on the desired content. The website is very extendable this way
because there is one main content area that dynamically fits to the page for whatever content needs to be displayed.
- **Graphing Mechanism**: As mentioned before, there was an attempt at graphing the data in live on the website. This functionaly is not perfect so it is commented out in user.ejs but it has notable creativity that displays
a users information well.
- **ejs views**: this was a cool design feature becasue it allows a coder to script directly on the viewing page. It makes the webpage much more coding friendly. 
- **Fun pictures**: there are a bunch of fun pictures throughout the website that give the user a good visual while using the website.
- **Static Nav Bar inspired by Bulma**: This homebar is a cool feature of my website giving it a classy look that can actually be viewed on mobile devices. 
