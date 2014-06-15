var pronouns = ["Eu", "Ele/ela/você", "Nós", "Eles/elas/vocês"];
var json = '[{"verb": "Ser", 			"conjugations": ["sou", 		"é", 			"somos", 		"são"			]}, \
			    {"verb": "Ter", 			"conjugations": ["tenho", 		"tem", 		"temos", 		"têm"			]}, \
				 {"verb": "Ir",  			"conjugations": ["vou", 		"vai", 		"vamos", 		"vão"			]}, \
			    {"verb": "Estar", 		"conjugations": ["estou", 		"está", 		"estamos",		"estão"		]}, \
				 {"verb": "Falar", 		"conjugations": ["falo", 		"fala", 		"falamos", 		"falam"		]}, \
			    {"verb": "Cantar", 		"conjugations": ["canto", 		"canta", 	"cantamos",		"cantam"		]}, \
			    {"verb": "Chamar", 		"conjugations": ["chamo", 		"chama", 	"chamamos",		"chamam"		]}, \
			    {"verb": "Nadar", 		"conjugations": ["nado", 		"nada", 		"nadamos",		"nadam"		]}, \
			    {"verb": "Vender", 		"conjugations": ["vendo", 		"vende", 	"vendemos",		"vendem"		]}, \
			    {"verb": "Correr", 		"conjugations": ["corro", 		"corre", 	"corremos",		"correm"		]}, \
			    {"verb": "Beber", 		"conjugations": ["bebo", 		"bebe", 		"bebemos",		"bebem"		]}, \
			    {"verb": "Comer", 		"conjugations": ["como", 		"come", 		"comemos",		"comem"		]}, \
			    {"verb": "Abrir", 		"conjugations": ["abro", 		"abre", 		"abremos",		"abrem"		]}, \
			    {"verb": "Partir", 		"conjugations": ["parto", 		"parte", 	"partimos",		"partem"		]}]';

var questions = JSON.parse(json);
var questionsAnswered = 0;
var questionsAnsweredCorrectly = 0;
var verbEndingSelected = 'ir';
var answers = {};

$(function() {
	askQuestion();

	$("li").on("click", function() {
		updateScore($(this).text());
		askQuestion();
	});
	
	$(function() {
		var duration = 500;
		$('.side-menu').on("touchstart", function(event) {
			if ($('#side-menu-content').width()) {
				$('#side-menu-handle').animate({
					'left': '0%'	
				},
				duration,
				function(){$('#side-menu-content').css({'display': 'none'});});
				  
				$('#side-menu-content').animate({
					'width': '0%'
				},
				duration);	
			} else {
				$('#side-menu-handle').animate({
					'left': '50%'	
				},
				duration);
				
				$('#side-menu-content').css({'display': 'inline'});
				$('#side-menu-content').animate({
					'width': '50%'
				},
				duration);
			}
			return false;
		});
	});
});

function askQuestion() {
	question = questions[randomNumber(questions.length)];
	if (verbEndingSelected) {
		while (question.verb.indexOf(verbEndingSelected) != (question.verb.length - 2)) {
			question = questions[randomNumber(questions.length)];
		}
	}

	setAnswers(question.conjugations);
	var randomArray = randomValues();
	for (var i = 0; i < randomArray.length; i++) {
  		var listIndex = i + 1;
		var conjugateIndex = randomArray[i];
		$("#answer > li:nth-child(" + listIndex + ")").html("<span>" + question.conjugations[conjugateIndex] + "</span>");
	}

	$("#pronoun").text(pronouns[randomNumber(4)]);
	$("#verb").text("{" + question.verb + "}");
}

function setAnswers(conjugations) {
	for (var i = 0; i < pronouns.length; i++) {
		var pronoun = pronouns[i];
		answers[pronoun] = conjugations[i];
	}
};

function updateScore(word) {
	questionsAnswered++;
	var pronoun = $("#pronoun").text();
	if (word == answers[pronoun]) {
		questionsAnsweredCorrectly++;
		alert("Correto!");
	} else {
		alert("Incorreto!");
	}
	var score = (questionsAnsweredCorrectly / questionsAnswered) * 100;
	$("#score").text(~~score + '%');
};

function randomNumber(range) {
	return Math.floor(Math.random() * range);
};

	
function randomValues() {
	var numbers = [0, 1, 2, 3];
	return shuffle(numbers);
};

function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};
