

var genders = ["male","female"];
// todo : add gather
var predicamentTypes = new Map();
predicamentTypes.set("goto", ["location"]);
predicamentTypes.set( "find", ["object", "person", "knowledge"]);
predicamentTypes.set("destroy", ["object", "person"]);
var heroGender = genders[Math.floor(Math.random() * genders.length)];
var heroName = generateName(heroGender);

predicamentKeys = Array.from(predicamentTypes.keys());
var predicament =predicamentKeys[Math.floor(Math.random() *predicamentKeys.length)];
var predicamentSubjectType =  predicamentTypes.get(predicament)[Math.floor(Math.random() *  predicamentTypes.get(predicament).length)];
var predicamentSubject = generatePredicamentSubject();

generateStory();

function addTextMessage(textToAdd) {
	textMessageFromGame = document.getElementById("textMessageFromGame");
	textMessageFromGame.innerHTML += "<p>" + textToAdd + "</p>";
	rowTextMessage = document.getElementById("rowTextMessage");
	rowTextMessage.scrollTop = rowTextMessage.scrollHeight;
}

function generateStory() {
	addTextMessage(generateStart());
	addTextMessage(generatePredicamentStory());
}

function generateStart() {
	rawGrammar = {
		origin : "#line#",
		line : heroName+" was #job.a# in #location.a#.",
		maleName : ["Lewis", "Luke", "Tony"],
		femaleName : ["Carol", "Anna", "Sophia"],
		job : ["carpenter", "priest", "soldier", "teacher", "hermit"],
		location : ["village", "city", "forest"]
    };

	return createDescription(rawGrammar); 
}


function generatePredicamentStory() {

	rawGrammar = {
		origin: "[predicamentSubject:"+predicamentSubject+"]#"+predicament+capitalize(predicamentSubjectType)+"Line#",
		gotoLocationLine: [heroName + " wanted to visit  #predicamentSubject#."],
		findObjectLine: [heroName + " wanted to get #predicamentSubject.a#."],
	       	findPersonLine: [heroName + " wanted to find #predicamentSubject.a#."],
		findKnowledgeLine: [heroName + " wanted to learn #predicamentSubject#."],
		destroyObjectLine:  [heroName + " wanted to destroy the #predicamentSubject.capitalize#."],
	       destroyPersonLine: [heroName + " wanted to kill the #predicamentSubject.capitalize#."],
	}
	return createDescription(rawGrammar); 
}

function generatePredicamentSubject() {

	rawGrammar = {
		location: ["the Holy Forest", "the capital city", "the Great Desert"],
		object: ["treasure", "jewel", "book"],
		person: ["doctor", "magician", "lover"],
		knowledge: ["how to break the curse", "how to cook", "how to ride a bike"]
	}
	
	return createDescription(rawGrammar, predicamentSubjectType);
}

function generateName (type) {
	rawGrammar = {
		origin : "#"+type+"Name#",
		maleName : ["Lewis", "Luke", "Tony"],
		femaleName : ["Carol", "Anna", "Sophia"]
	}

	return createDescription(rawGrammar);
}


function createDescription(rawGrammar, toGenerate="origin") {
	grammar = tracery.createGrammar(rawGrammar);
	grammar.addModifiers(baseEngModifiers);
	return grammar.flatten("#" + toGenerate +"#");
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
