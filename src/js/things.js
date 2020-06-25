/*
tags: caracteristizes the thing
appearance: what tag the parent can have with the chance to appear
findings: number of objects discovered when searching
rooms: number of sub locations
*/
var global_locations = [
	{
		"name":"submarine",
		"tags":["vehicle","mechanical", "building", "inside", "warmachine"],
		"appearance":{
			"base":0,
			"water":1
		},
		"findings": 1,
		"rooms": 4
	},
	{
		"name":"forest",
		"tags":["nature", "outside", "forest"],
		"appearance":{
			"base":1,
			"water":0
		},
		"findings": 1,
		"rooms": 3
	},
	{
		"name":"village",
		"tags":["city", "outside"],
		"appearance":{
			"base":1
		},
		"findings": 1,
		"rooms": 3
	},
	{
		"name":"dungeon",
		"tags":["building", "inside", "lair"],
		"appearance":{
			"base":1
		},
		"findings": 1,
		"rooms": 5
	},
	{
		"name":"castle",
		"tags":["building", "inside", "castle"],
		"appearance":{
			"base":1
		},
		"findings": 1,
		"rooms": 5
	},
	{
		"name":"desert",
		"tags":["outside", "hot", "desert"],
		"appearance":{
			"base":1
		},
		"findings": 1,
		"rooms": 5
	}
];

tags = []
global_locations.forEach(gl => {
	gl.tags.forEach(t => {
		if (!tags.includes(t)) {
			tags.push(t);
		}
	});
});
window.console.log("---global_locations_tags---");
window.console.log(tags);

var locations = [
	{
		"name":"engine room",
		"tags":["inside", "mechanical"],
		"appearance":{
			"base":0,
			"building": 0.3,
			"mechanical": 1
		},
		"findings": 1
	},
	{
		"name":"cockpit",
		"tags":["inside", "mechanical"],
		"appearance":{
			"base":0,
			"mechanical": 1
		},
		"findings": 1
	},
	{
		"name":"corridor",
		"tags":["inside"],
		"appearance":{
			"base":0,
			"building":0.7
		},
		"findings": 0
	},
	{
		"name":"treasury",
		"tags":["inside", "room", "treasure"],
		"appearance":{
			"base":0,
			"lair":0.7
		},
		"findings": 5
	},
	{
		"name":"keep",
		"tags":["inside", "room"],
		"appearance":{
			"base":0,
			"lair":1,
			"castle":1
		},
		"findings": 2
	},
	{
		"name":"trap room",
		"tags":["inside", "trap", "room"],
		"appearance":{
			"base":0,
			"lair":1
		},
		"findings": 1
	},
	{
		"name":"sacrifical chamber",
		"tags":["inside", "room"],
		"appearance":{
			"base":0,
			"lair":1
		},
		"findings": 1
	},
	{
		"name":"jail",
		"tags":["inside", "room"],
		"appearance":{
			"base":0,
			"lair":1,
			"castle": 1
		},
		"findings": 1
	},
	{
		"name":"monster den",
		"tags":["inside", "room", "fightingZone"],
		"appearance":{
			"base":0,
			"lair":1,
		},
		"findings": 1
	},
	{
		"name":"throne room",
		"tags":["inside", "room"],
		"appearance":{
			"base":0,
			"castle": 1
		},
		"findings": 1
	},
	{
		"name":"corridor",
		"tags":["inside"],
		"appearance":{
			"base":0,
			"building":0.7
		},
		"findings": 0
	},
	{
		"name":"weapon room",
		"tags":["inside", "weapon"],
		"appearance":{
			"base":0,
			"mechanical": 1,
			"castle": 0.5
		},
		"findings": 2
	},
	{
		"name":"ballroom",
		"tags":["inside", "party"],
		"appearance":{
			"base":0,
			"castle": 0.3
		},
		"findings": 1
	},
	{
		"name":"great hall",
		"tags":["inside"],
		"appearance":{
			"base":0,
			"castle": 0.5
		},
		"findings": 1
	},
	{
		"name":"bedroom",
		"tags":["inside"],
		"appearance":{
			"base":0,
			"building": 0.7,
			"castle": 0.7
		},
		"findings": 1
	},
	{
		"name":"kitchen",
		"tags":["inside", "cooking"],
		"appearance":{
			"base":0,
			"building": 0.7
		},
		"findings": 2
	},
	{
		"name":"food shop",
		"tags":["city","cooking", "shop"],
		"appearance":{
			"base":0,
			"city": 0.7
		},
		"findings": 2
	},
	{
		"name":"weapon shop",
		"tags":["city","weapon", "shop"],
		"appearance":{
			"base":0,
			"city": 0.2
		},
		"findings": 2
	},
	{
		"name":"tool shop",
		"tags":["city","mechanical", "shop"],
		"appearance":{
			"base":0,
			"city": 0.2
		},
		"findings": 2
	},
	{
		"name":"street",
		"tags":["city"],
		"appearance":{
			"base":0,
			"city": 1
		},
		"findings": 1
	},
	{
		"name":"church",
		"tags":["city"],
		"appearance":{
			"base":0,
			"city": 0.8,
			"castle": 0.3
		},
		"findings": 0
	},
	{
		"name":"house",
		"tags":["city"],
		"appearance":{
			"base":0,
			"forest":0.1,
			"city": 1
		},
		"findings": 1
	},
	{
		"name":"city hall",
		"tags":["city"],
		"appearance":{
			"base":0,
			"city": 0.4
		},
		"findings": 1
	},
	{
		"name":"cave",
		"tags":["nature", "inside"],
		"appearance":{
			"base":0,
			"nature": 0.5,
			"desert": 0.25

		},
		"findings": 1
	},
	{
		"name":"trail",
		"tags":["nature", "outside"],
		"appearance":{
			"base":0,
			"nature": 1,
			"desert": 0.7
		},
		"findings": 1
	},
	{
		"name":"bog",
		"tags":["nature", "outside", "swamp", "trap"],
		"appearance":{
			"base":0,
			"nature": 0.4,
			"swamp":1
		},
		"findings": 1
	},
	{
		"name":"clearing",
		"tags":["nature", "outside"],
		"appearance":{
			"base":0,
			"forest": 1
		},
		"findings": 1
	},
	{
		"name":"stream",
		"tags":["water"],
		"appearance":{
			"base":0,
			"forest": 1,
			"city": 0.1

		},
		"findings": 1
	},
	{
		"name":"oasis",
		"tags":["nature", "outside", "water", "desert"],
		"appearance":{
			"base":0,
			"desert": 0.1,
		},
		"findings": 3
	},
	{
		"name":"sand dune",
		"tags":["nature", "outside", "water", "desert"],
		"appearance":{
			"base":0,
			"desert": 1,
		},
		"findings": 0
	}
];
	

tags = []
locations.forEach(l => {
	l.tags.forEach(t => {
		if (!tags.includes(t)) {
			tags.push(t);
		}
	});
});
window.console.log("---locations_tags---");
window.console.log(tags);
	
var objects = [
	{
		"name":"wrench",
		"tags":["tool","pickable"],
		"appearance":{
			"base":0.01,
			"mechanical":1
		}
	},
	{
		"name":"bolt",
		"tags":["pickable"],
		"appearance":{
			"base":0.01,
			"mechanical":1
		}
	},
	{
		"name":"pipe",
		"tags":["pickable"],
		"appearance":{
			"base":0.1,
			"mechanical":0.8,
			"weapon":0.7
		}
	},	
	{
		"name":"knife",
		"tags":["cooking","pickable", "weapon"],
		"appearance":{
			"base":0.1,
			"inside":0.5,
			"weapon":1
		}
	},
	{
		"name":"sword",
		"tags":["pickable", "weapon"],
		"appearance":{
			"base":0,
			"weapon":1
		}
	},
	{
		"name":"axe",
		"specifier": "an ",
		"tags":["pickable", "weapon"],
		"appearance":{
			"base":0,
			"weapon":1,
			"nature":0.2
		}
	},	
	{
		"name":"vegetable",
		"tags":["pickable", "food"],
		"appearance":{
			"base":0,
			"nature": 1,
			"cooking": 1,
		}
	},
	{
		"name":"bread",
		"specifier": "",
		"tags":["pickable", "food"],
		"appearance":{
			"base":0,
			"cooking": 1
		}
	},
	{
		"name":"flower",
		"tags":["pickable", "nature"],
		"appearance":{
			"base":0,
			"nature": 1,
			"inside": 0.2
		}
	},
	{
		"name":"wood",
		"specifier": "",
		"tags":["pickable", "nature"],
		"appearance":{
			"base":0,
			"nature": 1,
			"inside": 0.05
		}
	},
	{
		"name":"water",
		"specifier": "",
		"tags":["pickable", "beverage"],
		"appearance":{
			"base":0,
			"nature":0.05,
			"cooking": 1,
			"water": 1
		}
	},
	{
		"name":"beer",
		"tags":["pickable", "beverage"],
		"appearance":{
			"base":0,
			"cooking": 1,
			"party": 1
		}
	},
	{
		"name":"gold",
		"specifier": "",
		"tags":["pickable", "money"],
		"appearance":{
			"base":0,
			"treasure": 1
		}
	},
	{
		"name":"trap",
		"tags":["death"],
		"appearance":{
			"base":0,
			"trap": 1
		}
	}
];


tags = []
objects.forEach(o => {
	o.tags.forEach(t => {
		if (!tags.includes(t)) {
			tags.push(t);
		}
	});
});
window.console.log("---objects_tags---");
window.console.log(tags);

var goals = [
	{
		"name": "hungry",
		"desc": "You are hungry!",
		"appearance": {"base": 1},
		"ending_conditions": [
			{"inventory_contains": ["food"]}
		],
		"default_ending" : ["death"]
	},
	{
		"name": "thirsty",
		"desc": "You are thirsty!",
		"appearance": {"base": 0.1, "hot": 1},
		"ending_conditions": [
			{"inventory_contains": ["beverage"]}
		],
		"default_ending" : ["death"]
	},
	{
		"name": "poor",
		"desc": "You are poor!",
		"appearance": {"base": 1},
		"ending_conditions": [
			{"inventory_contains": ["money"]}
		],
		"default_ending" : ["death"]
	}
];
