# README

This is a simple CRUD app, built with Ruby on Rails and React.js using Webpacker.  

* Ruby version: 2.7
* Rails version: 6.1.3.2
* Database: postgresql
* React version: 17.0.2

## Running the Project

* run ```bundle exec rails db:prepare```
* run ```npm install or yarn install```
* run ```bundle exec rails s```
* navigate to http://localhost:3000

## Using the App

The application keeps track of item objects, which can be created, read, updated, or destroyed.  On the first page of the 
the application there is a scrolling list of all items in the database, and an option to create a new item at the 
end of the list.  If you click on an item on the list, you can edit its information or choose to delete it.    
