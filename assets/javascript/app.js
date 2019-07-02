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
  
  // 2. Button for adding Train
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var dest = $("#destination-input").val().trim();
    var firstStop = moment($("#first-input").val().trim(), 'HH:mm').format('X');
    var freq = $("#frequency-input").val().trim();
  
    // Creates local "temporary" object for holding train data
    var newTrain = {
      name: trainName,
      destination: dest,
      start: firstStop,
      frequency: freq
    };
  
    // Uploads train data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.start);
    console.log(newTrain.frequency);
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-input").val("");
    $("#frequency-input").val("");
  });
  
  function test(){
    database.ref().on("child_added", function (childSnapshot) {
    
    
      // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var dest = childSnapshot.val().destination;
    var firstStop = 0;
    var freq = childSnapshot.val().frequency;
  

      var firstConverted = moment(firstStop, "HH:mm").subtract(1, "years");
      console.log(firstConverted);
    
      var currentTime = moment();
      console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));
    
      var diffTime = moment().diff(moment(firstConverted), "minutes");
      console.log("DIFFERENCE IN TIME: " + diffTime);
    
      var tRemainder = diffTime % freq;
      console.log(tRemainder);
    
      var tMinutesTillTrain = freq - tRemainder;
      console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    
      var nextTrain = moment().add(tMinutesTillTrain, "minutes");
      console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));
    
    
      $("tbody").append("<tr><td>" + trainName + "</td><td>" + dest + "</td><td>" + freq + 
         "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>");
    });
    };
    
function updateTime(){
$('tbody').empty();
test();
};

                                                                    

updateTime();
setInterval(function(){
 updateTime();
},60000);
    
   






/*function updateTime(){
    $('tbody').empty();
    test();
    };
    
                                                                        
    
    updateTime();
    setInterval(function(){
     updateTime();
    },60000);


      // 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
    console.log(childSnapshot.val().destination);
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var dest = childSnapshot.val().destination;
    var firstStop = childSnapshot.val().start;
    var freq = childSnapshot.val().frequency;
  
    // Train Info
    console.log(trainName);
    console.log(dest);
    console.log(firstStop);
    console.log(freq);
  
    // Prettify the first stop
    var firstStopClean = moment.unix(firstStop).format('HH:mm');
  
    // Calculate the how far away the next train is
    var minAway
    console.log();
  
    // Calculate the next arrival time
    var nextArrival
    console.log();
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(dest),
      $("<td>").text(freq),
      $("<td>").text(nextArrival),
      $("<td>").text(minAway),
      $("<td>").text(firstStopClean),
     
      
      
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });*/