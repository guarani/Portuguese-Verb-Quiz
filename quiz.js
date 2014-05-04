var pronouns = ["Eu", "Tu", "Ele/ela/você", "Nós", "Eles/elas/vocês"];
var json = '[{"verb": "Ser", "conjugations": ["sou", "és", "é", "somos", "são"]}, \
			    {"verb": "Ter", "conjugations": ["tenho", "tens", "tem", "temos", "têm"]}, \
				 {"verb": "Ir", "conjugations": ["vou", "vais", "vai", "vamos", "vão"]}, \
			    {"verb": "Estar", "conjugations": ["estou", "estás", "está", "estamos", "estão"]}, \
				 {"verb": "Falar", "conjugations": ["falo", "falas", "fala", "falamos", "falam"]}]';
var questions = JSON.parse(json);
var questionsAnswered = 0;
var questionsAnsweredCorrectly = 0;
var answers = {};

$(function() {
	askQuestion();
	$("li").on("click", function() {
		updateScore($(this).text());
		askQuestion();
	});
});

function askQuestion() {
	question = questions[randomNumber(questions.length)];
	setAnswers(question.conjugations);
	var randomArray = randomValues();
	for (var i = 0; i < randomArray.length; i++) {
  		var listIndex = i + 1;
		var conjugateIndex = randomArray[i];
		$("#answer > li:nth-child(" + listIndex + ")").html("<span>" + question.conjugations[conjugateIndex] + "</span>");
	}

	$("#pronoun").text(pronouns[randomNumber(5)]);
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
	var numbers = [0, 1, 2, 3, 4];
	return shuffle(numbers);
};

function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};
