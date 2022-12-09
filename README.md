# option-select-overlay
Track and display your greatest moments in Melee with the Option Select Overlay

## Original Scope

The original intent of this project was for an overlay that uses slp-realtime in order to cast information to a stream, but CORS makes that difficult so would be better suited for a fork with electron.

## Current Scope

Upload your .slp files to a searchable compendium using the site or its integrated API. 


### **Search Functionality**
Look up display names, connect codes, and individual games associated with them to analyze combos, conversions, and anything else slippi-js provides.

### **Head-to-Head Analysis**
Compare connect codes to see match histories and analytics such as win/loss ratio, average damage and stocks taken per game, and more.

### **Data At Your Fingertips**

Use the API directly for whatever you want. Currently supports searches for Users, DisplayNames, CodeIds(Connect Codes with a uuid), and Games

## Technologies Used

Option Select's is built with the MERN stack but would not be possible without Slippi-JS

### **Front End**

React conditional rendering

Bootstrap CSS styling

### **Back End**

Node Express server

Mongoose library for MongoDB

Slippi-JS for .slp file parsing and anlysis

Apollo GraphQL for API, providing information for the front-end and anyone else who may want to connect using a URI (deployment TBD)

## Future Development

### **3rd Party Authentication with Slippi.gg**

Slippi.gg is the creator and proprieter of the information identifying a Connect Code with its Unique User ID (connectCode and userId in the CodeId model). This information is available directly from the .slp files and is a one-to-one relationship. As such, it is *theoritically* possible to implement a 3rd Party Authentication feature that allows Option Select Users to verify that they are the creator and owner of the Connect Code they claim to have.

However, Slippi.gg currently has no OAuth standard and functionality on 3rd Party Authentication in general would have to be expanded significantly in order for there to be a safe and secure connection between Option Select and Slippi.gg. As such, User creation has been left out of current development considering I want to avoid a scenario where a user impersonates someone for malicious intent.