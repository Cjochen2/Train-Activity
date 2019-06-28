// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyB2ZqFHjzMtuVUCxUXerdFnXAao2gIxqeA",
    authDomain: "train-schedule-activity-46f25.firebaseapp.com",
    databaseURL: "https://train-schedule-activity-46f25.firebaseio.com",
    projectId: "train-schedule-activity-46f25",
    storageBucket: "",
    messagingSenderId: "39749940309",
    appId: "1:39749940309:web:998daa02d37d097e"
  };
  
  firebase.initializeApp(firebaseConfig);;
  
  var database = firebase.database();
  
  // 2. Button for adding Employees
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var dest = $("#destination-input").val().trim();
    var firstStop = $("#first-input").val().trim();
    var freq = $("#frequency-input").val().trim();
  
    // Creates local "temporary" object for holding employee data
    var newTrain = {
      name: trainName,
      destination: dest,
      start: firstStop,
      frequency: freq
    };
  
    // Uploads employee data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.start);
    console.log(newTrain.freq);
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-input").val("");
    $("#frequency-input").val("");
  });
  
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var dest = childSnapshot.val().destination;
    var firstStop = childSnapshot.val().start;
    var freq = childSnapshot.val().frequency;
  
    // Employee Info
    console.log(trainName);
    console.log(dest);
    console.log(firstStop);
    console.log(freq);
  
    // Prettify the employee start
    var nextArr
  
    // Calculate the months worked using hardcore math
    // To calculate the months worked
    var minAway
    console.log();
  
    // Calculate the total billed rate
    var empBilled
    console.log();
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(dest),
      $("<td>").text(freq),
      $("<td>").text(nextArr),
      $("<td>").text(minAway),
      
    );
  
    // Append the new row to the table
    $("#employee-table > tbody").append(newRow);
  });