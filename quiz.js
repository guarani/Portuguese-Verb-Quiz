
// The pronouns used to conjugate the verbs.
var pronouns = ["Eu", "Ele/ela/você", "Nós", "Eles/elas/vocês"];

// The verb congugation database.
var json = '[{"verb": "Ser", 			"conjugations": ["sou", 		"é", 			"somos", 		"são"			]}, \
			    {"verb": "Ter", 			"conjugations": ["tenho", 		"tem", 		"temos", 		"têm"			]}, \
				 {"verb": "Ir",  			"conjugations": ["vou", 		"vai", 		"vamos", 		"vão"			]}, \
			    {"verb": "Estar", 		"conjugations": ["estou", 		"está", 		"estamos",		"estão"		]}, \
				 {"verb": "Falar", 		"conjugations": ["falo", 		"fala", 		"falamos", 		"falam"		]}, \
			    {"verb": "Cantar", 		"conjugations": ["canto", 		"canta", 	"cantamos",		"cantam"		]}, \
			    {"verb": "Chamar", 		"conjugations": ["chamo", 		"chama", 	"chamamos",		"chamam"		]}, \
			    {"verb": "Nadar", 		"conjugations": ["nado", 		"nada", 	"nadamos",		"nadam"	    	]}, \
			    {"verb": "Vender", 		"conjugations": ["vendo", 		"vende", 	"vendemos",		"vendem"		]}, \
			    {"verb": "Correr", 		"conjugations": ["corro", 		"corre", 	"corremos",		"correm"		]}, \
			    {"verb": "Beber", 		"conjugations": ["bebo", 		"bebe", 	"bebemos",		"bebem"		    ]}, \
			    {"verb": "Comer", 		"conjugations": ["como", 		"come", 	"comemos",		"comem"	    	]}, \
			    {"verb": "Abrir", 		"conjugations": ["abro", 		"abre", 	"abremos",		"abrem" 		]}, \
			    {"verb": "Partir", 		"conjugations": ["parto", 		"parte", 	"partimos",		"partem"		]}]';

// Convert the verb database from JSON into a dictionary.
var questions = JSON.parse(json);
            
// The total number of questions answered. 
var questionsAnswered = 0;              

// The total number of questions correctly answered.
var questionsAnsweredCorrectly = 0;

// The current verb type to use.
var verbEndingSelected = 'ir';

// Used to store the current mapping of pronouns to congugations.
var answers = {};

/**
 Called when the document is ready.
 */
$(function() {
    // The duration of time that the menu takes to open or close.
    var menuAnimationDurationMS = 500;

    // Present a new question to the user.
	askQuestion();

    // A click handler to allow the user to select the verb ending from the side menu.
	$("#side-menu > li").on("click", function() {
        // Slide the menu handle over to the left.
        $('#side-menu-handle').animate({'left': '0%'}, menuAnimationDurationMS);
            
        // Close the menu by setting its width to 0.
        $('#side-menu').animate(
            {'width': '0%'},
            menuAnimationDurationMS,	
            function() { 
                $('#side-menu').css({'display': 'none'});
            }
        );

        // Set the ver ending.
        if ($(this).index() == 0) 
        {
           verbEndingSelected = 'er'; 
        }
        if ($(this).index() == 1) 
        {
           verbEndingSelected = 'ar'; 
        }
        if ($(this).index() == 2) 
        {
           verbEndingSelected = 'ir'; 
        }
        if ($(this).index() == 3) 
        {
           verbEndingSelected = '*'; 
        }

        // Present a new question.
        askQuestion();
    });


    // A click handler for when the user selects an answer.
	$("#answer > li").on("click", function() {
        // Update the score if the answer is correct.
		updateScore($(this).text());
        
        // Present a new question to the user.
		askQuestion();
	});
	
    // Add a touch event handler to the side menu handle so that we know when the user touches it to open it.
	$('#side-menu-handle').on("touchstart", function(event) {
        // Only when the side menu handle is in the closed position do we want to do anything. 
        var left = parseInt($(this).css('left'), 10);
        if (left == 0) {
            // Slide the menu handle out.
            $(this).animate({'left': '50%'}, menuAnimationDurationMS);
            
            // Open the menu by increasing its width.
            $('#side-menu').css({'display': 'inline'});
            $('#side-menu').animate({'width': '50%'}, menuAnimationDurationMS);
        }
        
        // Prevent default behaviour.
        return false;
    });
});

/**
 Present a new question to the user.
 */
function askQuestion() {
    // Get a random question.
	question = questions[randomNumber(questions.length)];

    // Here we look randomly for the first question matching the currently selected verb termination (e.g. 'ir')
	if (verbEndingSelected && verbEndingSelected != '*') {
        // The verb termination is the last two characters of the verb.
		while (question.verb.indexOf(verbEndingSelected) != (question.verb.length - 2)) {
			question = questions[randomNumber(questions.length)];
		}
	}

    // Make a dictionary mapping the current question to the pronouns.
	setAnswers(question.conjugations);

    // Get an array filled with random numbers, e.g. [3, 1, 4, 2, 5].
	var randomArray = randomValues();

    // Set the values of the answer buttons.
	for (var i = 0; i < randomArray.length; i++) {
  		var listIndex = i + 1;
		var conjugateIndex = randomArray[i];
		$("#answer > li:nth-child(" + listIndex + ")").html("<span>" + question.conjugations[conjugateIndex] + "</span>");
	}

    // Set the pronoun text in the header.
	$("#pronoun").text(pronouns[randomNumber(4)]);
    
    // Set the verb text in the header.
	$("#verb").text("{" + question.verb + "}");
}

/**
 Make a dictionary mapping the given conjugation to the pronouns.
*/
function setAnswers(conjugations) {
	for (var i = 0; i < pronouns.length; i++) {
		var pronoun = pronouns[i];
		answers[pronoun] = conjugations[i];
	}
};

/**
 Update the score.
 */
function updateScore(word) {
    
    // Increment the number of questions answered.
	questionsAnswered++;

    // Get the current pronoun.
	var pronoun = $("#pronoun").text();

    // Check if the given answer is correct by looking it up in the answers dictionary.
	if (word == answers[pronoun]) {
        // If it's correct increment the number of questions answered correctly
		questionsAnsweredCorrectly++;
		alert("Correto!");
	}
     else
      {
		alert("Incorreto!");
	}

    // Calculate the current score.
	var score = (questionsAnsweredCorrectly / questionsAnswered) * 100;

    // Round the score down, e.g. floor it, and set in on the screen.
	$("#score").text(~~score + '%');
};

/**
 Return a random number between 0 and @range - 1.
 */
function randomNumber(range) {
	return Math.floor(Math.random() * range);
};

/**
 Return a randomized array of non-duplicate values between 0 and 3 inclusive.
 */	
function randomValues() {
	var numbers = [0, 1, 2, 3];

    // Shuffle to randomize the array.
	return shuffle(numbers);
};

/**
 Shuffle the contents of the given array.
 */
function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};
