# README—Robot Configuration Webpage</h1>
<img src="/images/example_rcw.png" alt="example screenshot of the robot configuration webpage" width="800">

## Try the Demo Here
<a href="https://rhysfaultless.github.io/robot-configuration-webpage/">https://rhysfaultless.github.io/robot-configuration-webpage/</a>



## Overview
This is a demonstration Build & Price tool for the Clearpath Robotics Dingo-O platform. 
Users get to configure a Dingo-O with differnt sensors and see their robot in real time. 
We are used to configuring products like cars, computers, and kitchen renovation using 3D Web build tools. 
These build tools allow you to imagine how you would use the product, and then make it your own. 
A Build & Price tool for robots will allow users to refine their application, get a quote quickly, and take ownership of the design.

An ideal Build & Price tool for robots would have these features: 
- Options for computers and sensors
- Choosing a sensor's location and orientation
- A live 3D model of the robot
- A price of the configuration
- A lead time of the configuration
- A PDF quote
- Able to download a 3D model of the configured robot (STEP214)
- Able to start a ROS simulation with the configured robot

We would also want to add features to help Sales, Marketing, and Manufacturing teams:
- PDF quote saved to server
- Email sent to Sales, with the client's information, and the PDF quote
- Integration with Salesforce, so the client is tracked as a lead
- Manufacturing forcast updated
- Manufacturing demand updated (if clients can purchase directly through our store)
- Generate build instrustions for the specific configuration (for our integrators, or for the client)



## How to set up the demontration webpage on a server
1. Download or clone this repository to a Linux or macOS computer. I have placed all my files on an Ubuntu 18.04 server in the location <em>/home/administrator/robot_configuration_webpage</em>
2. Install Apache HTTP server from <a href="https://httpd.apache.org/download.cgi">https://httpd.apache.org/download.cgi</a>
3. Set the Apache main webpage directory to the location from Step 1
4. Run <em>sudo chmod -R 747 /home/administrator/robot_configuration_webpage/</li>em></em> so the PHP file can write to the <em>/home/administrator/robot_configuration_webpage/quotes</em> directory
5. Start the Apache server with <em>sudo service apache2 start</em>
6. Optional—allow SSH connections to the server with <em>sudo ufw allow ssh</em>
7. Optional—set up the Screen application on the server <em>sudo apt-get install screen</em>



## How the demonstartion webpage was built
This demonstration Build and Price tool is running on a webserver (an Ubuntu 18.04 computer) on the Clearpath Robotics LAN.
You can access the tool by going to a brower, like Google Chrome, and going to the site <em>http://rcw01</em>. 
You will see different robot configuration options, price and lead time, a 3D model, fields for the client to enter their personal details, and a generate quote button.
I will describe how these frontend elements and the backend server work in the following sections:
1. Frontend - Icons, links
2. Frontend - Configuration options dropdowns
3. Frontend - Price
4. Frontend - Lead time
5. Frontend - 3D model
6. Frontend - User's personal details fields
7. Frontend - Generate PDF quote
8. Frontend - CSS style
9. Backend  - email and Save PDF quote
10. Backend  - Apache server
11. Backend  - email server ( Postfix SMTP )

### 1. Technical - Frontend Icons, links
There are 3 images on the page: Tab bar icon, top of page icon, and a rotate symbol. 
The top of page icon also has a embedded hyperlink to redirect the user to the main Clearpath Robotics webpage. 
These are all default HTML methods of adding images. 
Image locations are controlled  with the <em>style.CSS</em> file.
  
### 2. Technical - Frontend Configuration Options Dropdowns
The dropdowns are typical HTML Select elements. 
Each Select element has a unique ID. 
These ID tags are used in Javascript for pulling in user data. 
  
### 3. Technical - Frontend Price
There in an HTML element <em>price_on_page</em>.
This element starts by telling the user the price is loading. 
The price will change to a value once the main Javacript program runs the <em>htmlPriceTotalUpdate()</em> call. 
The price is a sum of all the User's selected robot options.
The prices are stored in the Javascript file <em>constants.js</em>. 

### 4. Technical - Frontend Lead Time
There in an HTML element <em>lead_time_on_page</em>. 
This element starts by telling the user the lead time is loading. 
The lead time will change to a value once the main Javacript program runs the <em>htmlLeadTimeUpdate()</em> call. 
The lead time is a single largest of all the User's selected robot options.
The prices are stored in the Javascript file <em>constants.js</em>.

### 5. Technical - Frontend 3D model
The model is being rendered and controlled with the <em>Three.js</em> library. <br>
About: <a href="https://threejs.org/" target="_blank">https://threejs.org/</a><br>
Github: <a href="https://github.com/mrdoob/three.js/" target="_blank">https://github.com/mrdoob/three.js/</a> <br>
Demo: <a href="https://github.com/home" target="_blank">https://github.com/home</a> <br>
Here is a quick overview how Three.js is used in the Robot Configuration Webpage demonstration: 
  1. Set up global varaiables, like model origin.
  2. Call the <em>init()</em> and <em>animate()</em> functions to be decribed later.
  3. Create the init() function:
    - Set up the scene including background colour.
    - Set up the <em>OrbitControls</em>, the settings allowing the User to zoom and rotate the model.
    - set up the <em>STLLoader</em>. STL surface models are not typical for Three.js, but are ideal for getting models from SolidWorks.
    - Add robot component STLs to the scene, and select the component's colour. 
      These STLs can be removed and replaced as the User changes components in the Select dropdowns. 
      This section also calls <em>htmlPriceTotalUpdate()</em> and <em>htmlLeadTimeUpdate()</em> as the User changes the Select dropdowns.
    - Set up the lights, directional and ambient.
    - Call <em>htmlPriceTotalUpdate()</em> and <em>htmlLeadTimeUpdate()</em> as the User changes the Select dropdowns of items that are not relevant to the 3D model ( internal components ).
    - <em>window.addEventListener( 'resize', onWindowResize )</em> to rerender elements when the User changes the web browser's size.
  4. Create the <em>animate()</em> function:
    - Updates the <em>OrbitControls</em>
    - Calls <em>renderer.render( scene, camera )</em> from the Three.js library.

### 6. Technical - Frontend User's personal details fields
There are Input and Select fields in the HTML for User details:
- First name
- Last name
- email
- Company
- Country
- State or Province

These details will be used on the Backend, for notifying our Sales team and entering information in Salesforce. 
There is nothing preventing Users from entering false or unstructured information. 
This should be noted as a risk if we intend to automatically enter information into Salesforce. 
Salesforce charges based on number of leads, and number of sales staff. 
The lack of structure may cause Users to unintentionally make false or duplicate leads, for example:
- Company: clearpath
- Company: claerpath
- Company: clearpath robotics
- Company: Clearpath Robotics
- Company: OTTO Motors

### 7. Technical - Frontend Generate PDF quote</h4>
The quote is generated on the User's computer using the Javascript library jsPDF. <br>
About: <a href="http://raw.githack.com/MrRio/jsPDF/master/docs/" target="_blank">http://raw.githack.com/MrRio/jsPDF/master/docs/</a> <br>
Github: <a href="https://github.com/MrRio/jsPDF" target="_blank">https://github.com/MrRio/jsPDF</a> <br>
Demo: <a href="http://raw.githack.com/MrRio/jsPDF/master/" target="_blank">http://raw.githack.com/MrRio/jsPDF/master/</a> <br>
There is a button element in the HTML <em>Generate PDF quote</em>. 
The User cannot select this button until they have added contact information. 
The function <em>enableButtonPress()</em> is run every time the user changes a value in a Input or Select field. 
The function looks if all the Input and Select fields are complete, and will enable the button if they are. 
<em>enableButtonPress()</em> is described in <em>main.js</em>

The function <em>printPDF()</em> is called when the User clicks the button <em>Generate PDF quote</em>. 
The function <em>printPDF()</em> is described in <em>main.js</em> . 
<em>printPDF</em> is making a structured PDF, where each text element, line, and image has a size and location described in millimetres.
This function takes the Select data the User configured earlier, and then locates what Clearpath Robotics wants the user to see on the quote related to that selection.
For example, <em>printPDF</em> will look at what panel colour the User selected, and add the relevant colour details to the PDF.<br>
<em>doc.text(40, 103, constants.text_colour[ userSelectedColour.value ][0]);</em>
- place this line of text at X position 40 mm
- place this line of text at Y position 103 mm
- look for data in <em>constants.js</em>, dictionary entry <em>text_colour</em>, element/line <em>0</em>
- dictionary entry <em>text_colour</em> has multiple entries, like 'yellow' and 'red'. Use the entry that matches <em>userSelectedColour.value</em> as chosen by the HTML select element <em>colour_selection</em>. Note that the HTML Select element is pulled into <em>main.js</em> with line <em>let userSelectedColour = document.getElementById('colour_selection');</em>

Everything is configured inside an object <em>const doc = new jsPDF();</em> with things being added to the object using <em>doc.xxxxxx</em>. 
Once <em>doc</em> has been configured, a PDF is generated on the User's computer with <em>doc.save(quote_name);</em>. 
Since this is all performed with Javascript, it is all run on the User's computer, and can be run without an internet connection if all the files are cached in the User's browser. 
This is an important note for any Backend work to be done, related to internet connection issues and security.

### 8. Technical - CSS style
The page is separated into three sections:
- header
- div for left column
- div for right column

### 9. Technical - Backend email and save PDF quote
The User's computer runs <em>doc.save(quote_name);</em> to save a PDF to the local computer, 
but it also runs an Javascript AJAX call to the Backend program <em>php/main.php</em> <br>
AJAX about: <a href="https://developer.mozilla.org/en-US/docs/Web/Guide/AJAX/Getting_Started" target="_blank">https://developer.mozilla.org/en-US/docs/Web/Guide/AJAX/Getting_Started</a> <br>
AJAX documentation: <a href="https://www.w3schools.com/js/js_ajax_intro.asp" target="_blank">https://www.w3schools.com/js/js_ajax_intro.asp</a> <br>
The AJAX call sends this information to the PHP program <em>php/main.php</em>:
- User's contact information.
- A copy of the PDF quote in base64 format, using <em>btoa()</em>.
- The filename of the PDF quote.
- The quoted price.
- The quoted lead time.

The PHP program then does two things with this information:
  1. Save the PDF to a folder in the Backend server.
  2. Email the Clearpath Robotics sales team. This is currently configured to my email address, <em>rfaultless@clearpathrobotics.com</em>. 
      Further if/else statements could be added to direct the email to the correct sales person, based on country and state/province. 
      This email section may be changed, to instead upload this information to Salesforce using Pardot.

### 10. Technical - Backend Apache server
The demonstration webpage is running on a Ubuntu 18.04 desktop computer at 97 Randall.
The computer's hostname is <em>rcw01</em>.
It is running an Apache server, that is configured so you land on the <em>index.html</em> page when entering <em>rcw01</em> into a web browser. 
I followed this guide to install Apache, and configure SSH on the computer: <a href="https://medium.com/swlh/how-to-install-and-configure-apache-as-a-web-server-on-ubuntu-16-04-77fa7f57dea2" target="_blank">https://medium.com/swlh/how-to-install-and-configure-apache-as-a-web-server-on-ubuntu-16-04-77fa7f57dea2</a>.
The Apache server's root directory, which holds index.html and all the site's files, is at the location <em>/home/administrator/robot_configuration_webpage</em>. <br>
About: <a href="https://httpd.apache.org/" target="_blank">https://httpd.apache.org/</a> <br>
Note 2: The Apache server will be replaced with whatever Backend we plan to use for deployment with <a href="https://clearpathrobotics.com/">clearpathrobotics.com</a>.

### 11. Technical - Backend email server (Postfix SMTP)
Note 1: This section is only relevant if we want to send notifications to our Sales team. 
This may be replaced with Pardot and Salesforce. <br>
Note 2: If this is wanted, we will be using the SMTP email server provided by the website hosting company, or a service like MailChimp, rather than Postfix.

The main PHP program calls <em>$retval = mail($sendEmailToAddress,$subject,$txt,$fromEmailAddress);</em>. 
The function <em>mail</em> is a standard PHP function that requests the SMTP email server send a message. 
I configured the mail server on the desktop computer using this guide <a href="https://www.howtoforge.com/tutorial/configure-postfix-to-use-gmail-as-a-mail-relay/" target="_blank">https://www.howtoforge.com/tutorial/configure-postfix-to-use-gmail-as-a-mail-relay/</a>. 
I used my personal email address since I needed to conigure Gmail to allow less sequre applications, and did not want my work email to have these less secure permissions. 
As mentioned earlier, the desktop computer is encryped since my personal email sign-in details are in the Postfix configuration files.



## To Do tasks before deploying
- Consider rewriting the site with React
- Use npm or yarn for packages, rather than importing Three.js and jsPDF folders
- Add a placeholder image or loading bar for the 3D model, while the User's computer is loading the surface models
- Reducing the file size of the 3D surcafe models to improve loading speed
- Adding correct prices and lead-times
- Consider the Wepbage architeture, so we can deploy this for other robots
- Matching styling of <a href="https://clearpathrobotics.com/">clearpathrobotics.com</a> and consider using <a href="https://ant.design/">https://ant.design/</a>
- Move from an in-house server running Apache to the deployment backend on AWS or similar
- Consider methods to maintain and update the webpage: 
  - How to update component prices
  - How to update component-lead times
  - Updating sensor and robot surface models
- Integrating the webpage with Salesforce, possibly using a tool like Pardot's iFrame
- Adding links to-and-from <a href="https://clearpathrobotics.com/">clearpathrobotics.com</a>
- Testing:
  - Frontend on the 4 major web browsers
  - Frontend with different screen sizes
  - Frontend with response updates when changing window size
  - Time to load the webpage
  - Issues related to browser cache, like out-of-date sensor prices
  - Salesforce integration, and routings to our sales team



## Long term ideas
- Adding a <em>download STEP214 model</em> button
- Adding a <em>launch ROS simulation</em> button
- Integrating this web tool with the Clearpath Robotics URDF configuration tool
- Adding intelligence for dependency issues, like requiring a GPU to use a Stereo Camera
