# option-select-overlay
Track and display your greatest moments in Melee with the Option Select Overlay

## Original Scope

The original intent of this project was for an overlay that uses slp-realtime in order to cast information to a stream, but CORS makes that difficult so would be better suited for a fork with electron.

## Current Scope

Upload your .slp files to a searchable compendium using the site or its API. 


### **Search Functionality**
Look up display names, connect codes, and individual games associated with them to analyze combos, conversions, and anything else slippi-js provides.

### **Head-to-Head Analysis**
Compare connect codes to see match histories and analytics

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