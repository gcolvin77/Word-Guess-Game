$(window).bind("load", function () {


	var wins = 0;
	var losses = 0;
	var guessesLeft = 8;
	var wordList = ["Michael", "Dwight", "Beets", "Bears", "Battlestar Galactica", "Scranton", "Dunder Mifflin",
		"Jim and Pam", "Dundee Award", "Creed", "Paper Sales", "David Wallace", "Beet Farm", "Mose Schrute",]
	var displayWord = [];
	var wrongLetters = [];
	var guessedLetters = [];




	resetGame();

	function start() {
		document.getElementById("pressKey").style.visibility = "hidden";
		document.getElementById("picture").style.visibility = "hidden";

		var word = wordList[Math.floor(Math.random() * wordList.length)]; //chooses word from list
		

		for (i = 0; i < word.length; i++) {	   //creates the lines in the word display	
			if (word.charAt(i) !== " ") {
				displayWord.push("_");
			}

			else {
				displayWord.push("&nbsp");

			}
			document.getElementById("wordDisplay").innerHTML = displayWord.join(" ");
		}

		//display boxes 
		document.getElementById("badGuess").innerHTML = "Guesses Left: " + guessesLeft;
		document.getElementById("usedLetters").innerHTML = "Used Letters: " + wrongLetters.join(" ");
		document.getElementById("scoreCardWins").innerHTML = "# wins: " + wins;
		document.getElementById("scoreCardLosses").innerHTML = "# losses: " + losses;


		document.onkeyup = function (event) {


			var guess = event.key.toLowerCase();
			var lowerCaseWord = word.toLowerCase();
			var correct = 0;


			for (i = 0; i < word.length; i++) {
				if (lowerCaseWord.charAt(i) === guess) {
					displayWord.splice(i, 1, guess.toUpperCase());
					correct++;
					guessedLetters.push(guess);
					console.log(displayWord);
					document.getElementById("wordDisplay").innerHTML = displayWord.join(" ");

					if (displayWord.indexOf("_") === -1) {
						console.log("winner");
						winGame();
					}
				}
			}

			if (correct == 0 && guessedLetters.indexOf(guess) === -1) {
				guessesLeft--;
				document.getElementById("badGuess").innerHTML = "Guesses Left: " + guessesLeft;
			}
			if (lowerCaseWord.indexOf(guess) == -1 && guessedLetters.indexOf(guess) === -1) {
				wrongLetters.push(guess);
				guessedLetters.push(guess);
				document.getElementById("usedLetters").innerHTML = "Used Letters: " + wrongLetters.join(" ");
			}
			//losing, randomly chooses losing pic
			if (guessesLeft === 0) {
				losses++;
				document.getElementById("scoreCardLosses").innerHTML = "# losses: " + losses;
				var randomPicture = Math.floor(Math.random() * 100);
				if (randomPicture <= 33) {
					document.getElementById("picture").innerHTML = "<img src=\"assets/images/dwight.jpg\" width=\"300px\" height=\"168px\">";
				}

				if (randomPicture > 34 && randomPicture <= 67) {
					document.getElementById("picture").innerHTML = "<img src=\"assets/images/dwight2.jpg\" width=\"300px\" height=\"168px\">";
				}

				if (randomPicture >= 68) {
					document.getElementById("picture").innerHTML = "<img src=\"assets/images/mscott2.jpg\" width=\"300px\" height=\"168px\">";
				}

				document.getElementById("picture").style.visibility = "visible";
				resetGame();
			}

		}
	}

	function winGame() {
		wins++;
		document.getElementById("picture").innerHTML = "<img src=\"assets/images/winner.jpg\" width=\"300px\" height=\"168px\">";
		document.getElementById("scoreCardWins").innerHTML = "# wins: " + wins;
		document.getElementById("picture").style.visibility = "visible";
		resetGame();

	}

	function resetGame() {
		displayWord = [];
		wrongLetters = [];
		guessedLetters = [];
		guessesLeft = 8
		document.getElementById("pressKey").innerHTML = "Press Any Key"
		document.getElementById("pressKey").style.visibility = "visible";
		document.onkeyup = function () { start() };

	}






});
