
var rawGrammar = {
	origin: ["#[#setHeroNameAndPronouns#][#setPredicament#]story#"],
	setHeroNameAndPronouns: ["[heroThey:she][heroThem:her][heroTheir:her][heroTheirs:hers][heroName:#femaleName.capitalize#]","[heroThey:he][heroThem:him][heroTheir:his][heroTheirs:his][heroName:#maleName.capitalize#]"],
	setPredicament: ["[predicamentType:goto][#setGotoPredicament#][usefulObject:map,compass][usefulKnowledge:where rumors were heard about #predicamentSubject#]", "[predicamentType:find][#setFindPredicament#][usefulObject:charm,old book][usefulKnowledge:where rumors were heard about #predicamentSubject#]", "[predicamentType:destroy][#setDestroyPredicament#][usefulObject:knife,jar of poison][usefulKnowledge:where rumors were heard about #predicamentSubject#,how to fight]"],
	setGotoPredicament: ["[predicamentSubject:#complexLocation#][predicamentStep:#gotoLocationLine#][lastAdventure:#gotoLocationLastAdventure#][endStep:#gotoLocationEndStep#]"],
	setFindPredicament: ["[predicamentSubject:#object.a#][predicamentStep:#findObjectLine#][lastAdventure:#findObjectLastAdventure#][endStep:#findObjectEndStep#]", "[predicamentSubject:#job.a#][predicamentStep:#findPersonLine#][lastAdventure:#findPersonLastAdventure#][endStep:#findPersonEndStep#]", "[predicamentSubject:#knowledge#][predicamentStep:#findKnowledgeLine#][lastAdventure:#findKnowledgeLastAdventure#][endStep:#findKnowledgeEndStep#]"],
	setDestroyPredicament: ["[predicamentSubject:the #object.capitalize#][predicamentStep:#destroyObjectLine#][lastAdventure:#destroyObjectLastAdventure#][endStep:#destroyObjectEndStep#]", "[predicamentSubject:the #job.capitalize#][predicamentStep:#destroyPersonLine#][lastAdventure:#destroyPersonLastAdventure#][endStep:#destroyPersonEndStep#]"],
	
	// utils
	designHero: ["#heroThey#", "#heroThey#", "#heroThey#", "#heroName#"],
	maleName : ["#nameSyllable.capitalize##maleNameEnd#", "#nameSyllable.capitalize##nameSyllable##maleNameEnd#"],
	femaleName : ["#nameSyllable.capitalize##femaleNameEnd#", "#nameSyllable.capitalize##nameSyllable##femaleNameEnd#"],
	nameSyllable: ["e", "ju", "ma", "bo", "ne", "ri", "a", "syl", "val", "di", "fla"],
	femaleNameEnd: ["va", "via", "lie", "rie", "line", "tine", "vie", "ma", "ca", "za", "ra"],
	maleNameEnd: ["l", "gor", "co", "ro", "zo", "vio", "tin", "mo", "med", "ton", "rem", "ric"],
	job : ["carpenter", "priest", "soldier", "teacher", "hermit", "doctor", "magician"],
	basicLocation : ["village", "city", "forest", "desert"],
	locationAdj: ["holy", "great", "delicious", "vicious", "dangerous", "cursed"],
	complexLocation: "the #locationAdj.capitalize# #basicLocation.capitalize#",
	anyLocation: ["#complexLocation#","the #basicLocation#"],
	object: ["treasure", "jewel", "book"],
	knowledge: ["[usefulObject:bottle of holy water,crucifix,magic spell][usefulKnowledge:dispell magic]how to break the curse", "[usefulObject:tomato,spoon,cookbook][usefulKnowledge:a recipe,how to make fire,how to use a fork]how to cook", "[usefulObject:bike,helmet][usefulKnowledge:some stability exercises]how to ride a bike"],
	ennemy: ["bear", "goblin", "bandit", "vampire"],
	mood: ["feeling determined", "focused on #heroTheir# goal", "devastated", "shaking in fear", "full of enthusiasm"],
	
	// title
	title: ["#heroName# and #predicamentSubject#", "The quest of #heroName#"],
	
	// start step
	startStep: "#heroName# was #job.a# in #basicLocation.a#.",
	
	// predicament step
	gotoLocationLine: ["#designHero.capitalize# wanted to visit #predicamentSubject#."],
	findObjectLine: ["#designHero.capitalize# wanted to get #predicamentSubject#."],
	findPersonLine: ["#designHero.capitalize# wanted to find #predicamentSubject#."],
	findKnowledgeLine: ["#designHero.capitalize# wanted to learn #predicamentSubject#."],
	destroyObjectLine:  ["#designHero.capitalize# wanted to destroy #predicamentSubject#."],
	destroyPersonLine: ["#designHero.capitalize# wanted to kill #predicamentSubject#."],
	
	// adventures
	adventures: ["#firstAdventure.p##[currentLocation:#nextLocation#][nextLocation:#anyLocation#]nextAdventure#"],
	adventureGoal: ["find information", "reach #nextLocation#"],
	nextAdventure: ["#lastAdventure.p#", "#middleAdventure.p##[currentLocation:#nextLocation#][nextLocation:#anyLocation#]nextAdventure#"],
	firstAdventure: "#firstAdventureIntro# #genericAdventureCore#",
	middleAdventure: "#genericAdventureIntro# #genericAdventureCore#",
	firstAdventureIntro: ["#designHero.capitalize# started by going to #currentLocation#, in order to #adventureGoal#.", "Not knowing where to start, #designHero.capitalize# first headed to #currentLocation#.", "Hoping to #adventureGoal#, #designHero# went to #currentLocation#."],
	genericAdventureIntro: ["#designHero.capitalize# headed to #currentLocation#, knowing it was #heroTheir# next destination if #heroThey# wanted to #adventureGoal#.", "#designHero.capitalize# decided to travel to #currentLocation#, as #heroThey# has heard it was a good place to #adventureGoal#.", "Then, #designHero# headed toward #currentLocation#, since it was the path to go to #nextLocation#."],
	genericAdventureCore: ["#there.capitalize#, #event#", "#event.capitalize#"],
	there: ["there", "in #currentLocation#", "when #designHero# arrived in #currentLocation#"],
	event: ["#designHero# met #job.a# who gave #heroThem# #usefulObject.a#.", "#designHero# met #job.a# who taught #heroThem# #usefulKnowledge#.", "#designHero# could buy #usefulObject.a#.", "#designHero# was ambushed by #ennemy.a# and had to flee."],
	gotoLocationLastAdventure: ["On #heroTheir# way to #heroTheir# next destination, #designHero# finally saw what #heroThey# was looking for: #predicamentSubject#!"],
	findObjectLastAdventure: ["#lastAdventureIntro# Indeed, #predicamentSubject# was there!"],
	findPersonLastAdventure: ["#lastAdventureIntro# After many adventures, #designHero# could meet #predicamentSubject#!"],
	findKnowledgeLastAdventure: ["#lastAdventureIntro# There, an old master could teach #heroThem# #predicamentSubject#."],
	destroyObjectLastAdventure: ["#lastAdventureIntro# When #designHero# arrived, #heroThey# used what #heroThey# learnt to destroy #predicamentSubject#."],
	destroyPersonLastAdventure: ["#lastAdventureIntro# #designHero.capitalize# fought #predicamentSubject# and managed to defeat this powerful foe!"],
	lastAdventureIntro: ["#mood.capitalize#, #designHero# finally reached #heroTheir# destination."],
	
	// end
	gotoLocationEndStep: "#designHero.capitalize# spent a month there#genericEnd#",
	findObjectEndStep: "#designHero.capitalize# took #predicamentSubject##genericEnd#",
	findPersonEndStep: "#designHero.capitalize# asked #predicamentSubject# for help#genericEnd#",
	findKnowledgeEndStep: "#designHero.capitalize# stayed a little more to practice#genericEnd#",
	destroyObjectEndStep: "It felt liberating for #heroName#, who went to the nearest village to tell the good news#genericEnd#",
	destroyPersonEndStep: "#designHero.capitalize# chose one of the villain's possessions to keep#genericEnd#",
	genericEnd: [", then got home.", " and decided to continue #heroTheir# adventure."],
	
	// whole story
	story: "#title#***#startStep.p##predicamentStep.p##[currentLocation:#anyLocation#][nextLocation:#anyLocation#]adventures##endStep.p#"
};

generateAndDisplayStory();

function addTextMessage(textToAdd) {
	textMessageFromGame = document.getElementById("textMessageFromGame");
	textMessageFromGame.innerHTML += textToAdd ;
	rowTextMessage = document.getElementById("rowTextMessage");
	rowTextMessage.scrollTop = rowTextMessage.scrollHeight;
}

function generateAndDisplayStory() {
	grammar = tracery.createGrammar(rawGrammar);
	grammar.addModifiers(baseEngModifiers);
	grammar.addModifiers(customEngModifiers);
	fullStory = grammar.flatten("#origin#");
	
	storyElements = fullStory.split("***");
	title = storyElements[0];
	story = storyElements[1];
	storyTitleElement = document.getElementById("storyTitle");
	storyTitleElement.innerHTML = title;
	addTextMessage(story);
}
