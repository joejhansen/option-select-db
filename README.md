# **Option Select Database**

![Option Select Database](./client/src/optionselectdb2-cropped.svg)

 Search, track, and analyze your greatest moments in Melee with the Option Select Database

# **Current Scope**

Upload your .slp files to a free and open-source, searchable compendium using the site or its integrated API. 

## **Search Functionality**

Look up display names, connect codes, and individual games associated with them to analyze combos, conversions, and anything else slippi-js provides.

## **Data At Your Fingertips**

Use the API directly for whatever you want. Currently supports searches for Users, DisplayNames, CodeIds(Connect Codes with a uuid), and Games

# **Technologies Used**

Option Select's is built with the MERN stack but would not be possible let alone conceivable without the dedicated work of Jas "Fizzi" Laferriere, Vince Au, Nikhil "Nikki" Narayana, and all the other contributors to [Slippi-JS](https://github.com/project-slippi/slippi-js).

## **Front End**

React conditional rendering

Bootstrap CSS styling

A *lot* of css grid

## **Back End**

Slippi-JS for .slp file parsing and anlysis

Node Express server

Multer for file uploads

Mongoose library for MongoDB

Apollo GraphQL for API, providing information for the front-end and anyone else who may want to connect using a URI (deployment TBD)

# **Future Development**

## **Head-to-Head Analysis**

Search two Connect Codes and get their uploaded stats in a head to head analysis against all games played.

## **Leaderboards**

A central board to track players with superlatives in anything slippi-js might provide. Lowest openings-per-kill ratio, most average inputs per minute, highest succesfull L-cancel percentage, and more. 

## **3rd Party Authentication with Slippi.gg**

Slippi.gg is the creator and proprieter of the information identifying a Connect Code with its Unique User ID (connectCode and userId in the CodeId model). This information is available directly from the .slp files and is a one-to-one relationship. As such, it is *theoritically* possible to implement a 3rd Party Authentication feature that allows Option Select Users to verify that they are the creator and owner of the Connect Code they claim to have.

However, Slippi.gg currently has no OAuth standard and functionality on 3rd Party Authentication in general would have to be expanded significantly in order for there to be a safe and secure connection between Option Select and Slippi.gg. As such, User creation has been left out of current development considering I want to avoid a scenario where a user impersonates someone for malicious intent.

# **Want to Help?**

The Option Select Database is an open-source project dedicated to giving players access to the information and stats they need. Currently, the only game supported is Super Smash Bros.: Melee, but I hope this platform can grow into much more than that. If you are a developer interested in adding functionality for your favorite game or a fellow fan of Melee and want to help out, please contact me at josephjameshansen@gmail.com or go ahead and submit a PR.