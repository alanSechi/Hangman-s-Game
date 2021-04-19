window.onload = function () {
  var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",];


  class category {
    constructor(word, hint, category) {
      this.word = word;
      this.hint = hint;
      this.category = category;
    }
  }

  const categories = [
    new category("python", "It's perfect for data science", "Programming Languages"),
    new category("css", "It's like the skin of a webpage", "Programming Languages"),
    new category("javascript", "The world's most popular programming language", "Programming Languages"),
    new category("matlab", "If you are a mathematician...", "Programming Languages"),
    new category("java", "It's a backend programing language", "Programming Languages"),
    new category("typescript", "It's similar to JavaScript", "Programming Languages"),
    new category("fortran", "Formula Translation", "Programming Languages"),
    new category("alien", "Science-Fiction horror film", "Films"),
    new category("dirty-harry", "1971 American action film", "Films"),
    new category("gladiator", "Historical drama", "Films"),
    new category("finding-nemo", "Animated Fish", "Films"),
    new category("jaws", "Giant great white shark", "Films"),
    new category("manchester", "Northern city in the UK", "Cities"),
    new category("milan", "Home of AC and Inter", "Cities"),
    new category("madrid", "Spanish capital", "Cities"),
    new category("amsterdam", "Netherlands capital", "Cities"),
    new category("prague", "Czech Republic capital", "Cities"),
  ];

  //var categories; // Array of topics
  var chosenCategory; // Selected catagory
  var getHint; // Word getHint
  var word; // Selected word
  var guess; // Geuss
  var guesses = []; // Stored guesses
  var lives; // Lives
  var counter; // Count correct guesses
  var space; // Number of spaces in word '-'

  // Get elements
  var showLives = document.getElementById("mylives");
  var showCatagory = document.getElementById("scatagory");
  var getHint = document.getElementById("hint");
  var showClue = document.getElementById("clue");

  // create alphabet ul
  var buttons = function () {
    myButtons = document.getElementById("buttons");
    letters = document.createElement("ul");

    let letter = alphabet.map(x => {
      letters.id = "alphabet";
      list = document.createElement("li");
      list.id = "letter";
      list.innerHTML = x;
      check();
      myButtons.appendChild(letters);
      letters.appendChild(list);
      
    })
    
  };

  // Select Catagory
  var selectCat = function () {
      catagoryName.innerHTML = "The category is " + categories[chosenCategory].category;
  };

  // Create guesses ul
  result = function () {
    wordHolder = document.getElementById("hold");
    correct = document.createElement("ul");

    for (var i = 0; i < word.length; i++) {
      correct.setAttribute("id", "my-word");
      guess = document.createElement("li");
      guess.setAttribute("class", "guess");
      if (word[i] === "-") {
        guess.innerHTML = "-";
        space = 1;
      } else {
        guess.innerHTML = "_";
      }

      guesses.push(guess);
      wordHolder.appendChild(correct);
      correct.appendChild(guess);
    }
  };

  // Show lives
  comments = function () {
    showLives.innerHTML = "You have " + lives + " lives";
    showLives.style.color = "#000000";
if (lives < 1) {
        showLives.innerHTML = "Game Over";
        showLives.style.color = "#ff0000";
      }
    
      
      if (counter + space === guesses.length && lives > 0) {
        showLives.innerHTML = "You Win!";
        showLives.style.color = "#00FF37";
      }
    
  };

  // Animate man
  var animate = function () {
    var drawMe = lives;
    drawArray[drawMe]();
  };

  // Hangman
  canvas = function () {
    myStickman = document.getElementById("stickman");
    context = myStickman.getContext("2d");
    context.beginPath();
    context.lineWidth = 2;
    context.font = "30px Verdana";
   
  };

  head = function () {
    myStickman = document.getElementById("stickman");
    context = myStickman.getContext("2d");
    context.beginPath();
    context.arc(60, 25, 10, 0, Math.PI * 2, true);
    context.stroke();
  };

  draw = function ($pathFromx, $pathFromy, $pathTox, $pathToy) {
    context.moveTo($pathFromx, $pathFromy);
    context.lineTo($pathTox, $pathToy);
    context.stroke();
  };

  frame1 = function () {
    draw(0, 150, 150, 150);
    draw(10, 0, 10, 600);
    draw(0, 5, 70, 5);
    draw(60, 5, 60, 15);
  };

  torso = function () {
    draw(60, 36, 60, 70);
  };

  rightArm = function () {
    draw(60, 40, 70, 50);
  };

  leftArm = function () {
    draw(60, 40, 50, 50);
  };

  rightLeg = function () {
    draw(60, 70, 70, 100);
  };

  leftLeg = function () {
    draw(60, 70, 50, 100);
  };

  drawArray = [rightLeg, leftLeg, rightArm, leftArm, torso, head, frame1];

  // OnClick Function
  check = function () {
    list.onclick = function () {
      var geuss = this.innerHTML;
      this.setAttribute("class", "active");
      this.onclick = null;
      for (var i = 0; i < word.length; i++) {
        if (word[i] === geuss) {
          guesses[i].innerHTML = geuss;
          counter += 1;
        }
      }
      var j = word.indexOf(geuss);
      if (j === -1) {
        lives -= 1;
        comments();
        animate();
      } else {
        comments();
      }
    };
  };

  // Play
  play = function () {
   chosenCategory = Math.floor(Math.random() * categories.length);
    word = categories[chosenCategory].word;
    word = word.replace(/\s/g, "-");
    buttons();

    guesses = [];
    lives = 7;
    counter = 0;
    space = 0;
    result();
    comments();
    selectCat();
    canvas();
  };

  play();

  // Hint

  hint.onclick = function () {
    showClue.innerHTML = "Clue: - " + categories[chosenCategory].hint;
  };

  // Reset

  document.getElementById("reset").onclick = function () {
    correct.parentNode.removeChild(correct);
    letters.parentNode.removeChild(letters);
    showClue.innerHTML = "";
    context.clearRect(0, 0, 400, 400);
    play();
  };
};
