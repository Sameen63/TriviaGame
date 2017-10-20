

var questions = {
    "1": new Question("What is the fastest bird (in the air) in the world?",
        ["Ruby Throated Hummingbird", "Peregrine falcon", "North African ostrich", "Red-billed quelea"],
        1, "The peregrine falcon can fly at speeds of 200 mph.",
        "assets/images/falcon.jpg"),
    "2": new Question("How many stomachs does a cow have?",
        ["1 stomach", "2 stomachs", "3 stomachs", "4 stomachs"],
        3, "Rumen, Reticulum, Omasum and Abomasum.",
        "assets/images/cow.jpg"),
    "3": new Question("What is the largest Frog?",
        ["Cane Toad", "North American Bullfrog", "African Goliath Frog", "Poison Dart Frog"],
        2, "The goliath frog is the largest living frog on Earth",
        "assets/images/frog.jpg"),
    "4": new Question("What is the longest Snake?",
        ["Anaconda", "Reticulated python", 
            "Green tree snake", "Corn snake"],
        1, "Reticulated python is the longest snake. It can exceed upto 20 ft.",
        "assets/images/pyton.jpg"),
    "5": new Question("What bird has the fastest wing beat?", 
        ["Albatross", "Ruby Throated Hummingbird", "Arctic Tern", "Ruppells Vulture"], 
        1, "Ruby Throated hummingbird has an 8 to 11 cm wingspan",
        "assets/images/bird.jpg"),
    "6": new Question("which can jump the highest?", 
        ["Caracal", "Lion", "Tiger", "African Leopard"],
        0, "It can leap higher than 3 m and catch birds in mid-air!",
        "assets/images/caracal.jpg"),
    "7": new Question("Which is the most endangered?",
        ["Lion", "Tiger", "Cheetah",
            "Caracal"],
        3, "Caracals were at risk of extinction as recently as the 1980s.",
        "assets/images/caracal.jpg")
};



    //make all the var
    //set time per page and time for next question

    var questionTime = 30;
    var answerTime = 5;
    var noAnswer = 0;
    var timeleft;
    var intervalId;
    var questionNumerIndex = 0;
    var rightAnswer = 0;
    var wrongAnswer = 0;
    
    
    //convert and show time

function showTime(currentTime) {
    var minutes = Math.floor(currentTime / 60);
    var seconds = currentTime - (minutes * 60);
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    if (minutes === 0) {
      minutes = "00";
    }
    else if (minutes < 10) {
      minutes = "0" + minutes;
    }
    $("#timeleft").html(minutes + ":" + seconds);
}
    
    // set assigns


    function Question(question, userData, userInd, extra, animalPic) {
   
    this.userData = userData;
    this.userInd = userInd;
    this.animalPic = animalPic;
    this.question = question;
    this.extra = extra;
    }



function timer() {
    timeleft--;
    showTime(timeleft);
    if (!timeleft) {
        clearInterval(intervalId);
        userInput(-1);
    }
}


function start() {
    clearInterval(intervalId);
    timeleft = questionTime;
    showTime(timeleft);
    intervalId = setInterval(timer, 1000);
}
    //get user input and compare

function ask() {
    clear();
    $("#questionshow").html(questions[questionNumerIndex].question);
    var responses = questions[questionNumerIndex].userData;
    for (var i = 0; i < responses.length; i++) {
        $("#useranswers").append("<button id=" + i + ">" + responses[i] + "</button>");
    }
}
    //increment so next question appers

function nextQuestion() {
    questionNumerIndex++;
    if (questionNumerIndex > Object.keys(questions).length) {
        clearInterval(intervalId);
        $("#resultshow").html("<h2>Correct answers: " + rightAnswer 
            + "</h2><h2>Incorrect answers: " + wrongAnswer 
            + "</h2><h2>Unanswered: " + noAnswer + "</h2>");
        $("#restart").show();
        return;
    }
    ask(); 
    start();
}
    // clear

function clear() {
    $("#timeleft").empty();
    $("#questionshow").empty();
    $("#useranswers").empty();
    $("#resultshow").empty();
}

    // set condations  

function userInput(input) {
    clear();
    if (input == questions[questionNumerIndex].userInd) {
        $("#resultshow").html("<h2>Congratulations: Right Answer!</h2>");
        rightAnswer++;
    }
    else {
        if (input === -1) {
            $("#resultshow").html("<h2>No Time Left</h2>");
            noAnswer++;
        }
        else {
            $("#resultshow").html("<h2>Wrong answer!</h2>");
            wrongAnswer++;
        }
        $("#resultshow").append("<h2>The correct answer is " +
            questions[questionNumerIndex].userData[questions[questionNumerIndex].userInd] + "</h2>");
    }
    $("#resultshow").append("<h2>" + questions[questionNumerIndex].extra
            + "</h2><img src='" + questions[questionNumerIndex].animalPic + "' >");
    setTimeout(nextQuestion, answerTime * 1000);
}


$(document).ready(function() {

    $("#restart").hide();

    $("#begin").on("click", function() {
        $("#begin").hide();
        nextQuestion();
    });

    $("#useranswers").on("click", function(event) {
        clearInterval(intervalId);
        userInput(event.target.id);
    });

    $("#restart").on("click", function() {
        $("#restart").hide();
        $("#begin").show();
        clear();
        questionNumerIndex = 0;
        rightAnswer = 0;
        wrongAnswer = 0;
        noAnswer = 0;
    });

});