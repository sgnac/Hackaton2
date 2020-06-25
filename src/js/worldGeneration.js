var inventory = []
var actions = [];

var current_location_id;
var global_location;
var rooms = [];
var current_goal;

var max_iterations = 10;
var current_iteration = 0;

generate_start();

function generate_start() {	
	// generate global location
	global_location = global_locations[Math.floor(Math.random() * global_locations.length)];
	text_message = generate_global_location_description(global_location) + "<br>";
	
	// generate map
	generate_rooms();
	
	// generate objects
	generate_objects();
		
	// pick start location
	current_location_id = Math.floor(Math.random() * rooms.length);
	text_message += generate_location_description(rooms[current_location_id]) + "<br>";
	
	// generate goal
	current_goal = goals[Math.floor(Math.random() * goals.length)];
	text_message += current_goal.desc + " <br>";
	text_message += "</p>";
	
	add_text_message(text_message);
	
	// generate actions
	add_new_room_actions();
	
	generate_action_buttons();
}

function add_new_room_actions() {
	actions = ["Search"];
	
	rooms[current_location_id].connections.forEach(connection => {
		actions.push("Go to the " + rooms[connection].name + " " + rooms[connection].id);
	});
	
	// TODO add other actions
}

function generate_action_buttons() {
	document.getElementById("userActionArea").innerHTML = "";
	for (i in actions) {
		actionButton = '<div class="actionButton"><button type="button" onclick="doAction(\'' + actions[i] + '\')">' + actions[i] + '</button></div>';
		document.getElementById("userActionArea").innerHTML += actionButton;
	}
}

function generate_rooms() {		
	rooms_to_proba = [];
	total_proba = 0;
	
	// look for eligible locations
	locations.forEach(potential_location => {
		proba = 0;
		if (potential_location.appearance.hasOwnProperty("base")) {
			proba += potential_location.appearance["base"];
		}
		global_location.tags.forEach(tag => {
			if (potential_location.appearance.hasOwnProperty(tag)) {
				proba += potential_location.appearance[tag];
			}
		});
		rooms_to_proba.push({"room": potential_location, "proba": proba + total_proba});
		total_proba += proba;
	});
	
	// select rooms
	for (i = 0; i < global_location.rooms; i++) {
		random_value = Math.random() * total_proba;
		for (j = 0; j < rooms_to_proba.length; j++) {
			if (random_value < rooms_to_proba[j].proba) {
				room_to_add = Object.assign({}, rooms_to_proba[j].room);
				room_to_add["id"] = i;
				room_to_add["connections"] = [];
				rooms.push(room_to_add);
				break;
			}
		}
	}
	
	// connect rooms
	max_possible_number_of_connections = Math.min(global_location.rooms - 1, 4);
	rooms.forEach(room => {
		
		if (global_location.tags.includes("outside")) {
			for (i = 0; i < global_location.rooms; i++) {
				if (i != room.id) {
					room.connections.push(i);
				}
			}
		} else {
			possible_number_of_connections = max_possible_number_of_connections - room.connections.length;
			if (possible_number_of_connections > 0) {
				number_of_connections = Math.floor(Math.random() * (possible_number_of_connections - 1)) + 1;
				for (i=0; i < number_of_connections; i++) {
					connect = room.id;
					while(connect == room.id || room.connections.includes(connect) || rooms[connect].connections.length == max_possible_number_of_connections) {
						connect = Math.floor(Math.random() * global_location.rooms);
					}
					room.connections.push(connect);
					rooms[connect].connections.push(room.id);
				}
			}
		}
	});
}

function generate_objects() {
	rooms.forEach(room => {
		room.objects = [];
		objects_to_proba = [];
		total_proba = 0;
		
		// look for eligible objects
		objects.forEach(object => {
			proba = 0;
			if (object.appearance.hasOwnProperty("base")) {
				proba += object.appearance["base"];
			}
			room.tags.forEach(tag => {
				if (object.appearance.hasOwnProperty(tag)) {
					proba += object.appearance[tag];
				}
			});
			objects_to_proba.push({"object": object, "proba": proba + total_proba});
			total_proba += proba;
		});
		
		// select objects
		for (i = 0; i < room.findings; i++) {
			random_value = Math.random() * total_proba;
			for (j = 0; j < objects_to_proba.length; j++) {
				if (random_value < objects_to_proba[j].proba) {
					room.objects.push(objects_to_proba[j].object);
					break;
				}
			}
		}
	});
	
	
}

function remove_item_from_array(array, item) {
	for(i = 0; i < array.length; i++){ if ( array[i] === item) { array.splice(i, 1); }}
}

function verify_goal() {
	success = false;
	ending_conditions = current_goal.ending_conditions;
	for (i = 0; i < ending_conditions.length; i++) {
		if (ending_conditions[i].hasOwnProperty("inventory_contains")) {
			conditions_met = 0;
			all_inventory_tags = [];
			inventory.forEach(object => {
				all_inventory_tags = all_inventory_tags.concat(object.tags);
			});

			inventory_conditions = ending_conditions[i].inventory_contains;
			for (j = 0; j < inventory_conditions.length; j++) {
				if (all_inventory_tags.includes(inventory_conditions[j])) {
					remove_item_from_array(all_inventory_tags, inventory_conditions[j]);
					conditions_met++;
				}
			}
			if (conditions_met == inventory_conditions.length) {
				success = true;
				break;
			}
		}
		// add other conditions
	}	
	if (success == true) {
		add_text_message("<p>You won!</p> <br>");
		actions = [];
		generate_action_buttons();
	} else {
		if (current_iteration > max_iterations || actions.length == 0) {
			add_text_message("<p>You lose!</p> <br>");
			actions = [];
			generate_action_buttons();
		}
	}
}

function display_room_objects() {
	// show search results, and allow to pick

	//remove all old pick actions
	actions.forEach(thisAction => {
		action_words = thisAction.split(" ");
		main_action  = action_words[0];
		if (main_action === "Pick") {
			remove_item_from_array(actions, thisAction);		
		}
	});

	text_message = "";
	if (rooms[current_location_id].objects.length == 0) {
		text_message += "There's nothing to find here. <br>";
	}
	rooms[current_location_id].objects.forEach(object => {
		object_specifier = "a ";
		if (object.hasOwnProperty("specifier")) {
			object_specifier = object.specifier;
		}
		text_message += generate_object_description(object) + "<br>";
		if (object.tags.includes("pickable")) {
			actions.push("Pick the " + object.name);
		}
	});
	generate_action_buttons();
}

function remove_object_from_room(room_id, object_name) {
	new_objects = [];
	found = false;
	for (i = 0; i < rooms[room_id].objects.length; i++) {
		if (rooms[room_id].objects[i].name == object_name && found == false) {
			found = true;
		} else {
			new_objects.push(rooms[room_id].objects[i]);
		}
	}
	rooms[room_id].objects = new_objects;
}

function add_object_to_room(room_id, object) {
	rooms[room_id].objects.push(object)
}

function doAction(action) {
	text_message = "<p>You " + action.toLowerCase() + ". <br>"
	action_words = action.split(" ");
	main_action = action_words[0];
	if (main_action === "Search") {
		current_iteration++;
		display_room_objects();
	} else if (main_action === "Pick") {
		object_name = action_words[2]; //2 => Pick the objectName
		object = rooms[current_location_id].objects.filter(thing => thing.name === object_name)[0];
		addToInventory(object);
		remove_object_from_room(current_location_id, object_name);
		remove_item_from_array(actions, action);
	} else if (main_action === "Drop") {
		object_name = action_words[2]; //2 => Drop the objectName
		object = inventory.filter(thing => thing.name === object_name)[0];
		removeFromInventory(object);
	} else if (main_action === "Go") {
		current_iteration++;
		room_id = parseInt(action_words[action_words.length - 1]); //id is the last element
		current_location_id = room_id;
		add_new_room_actions();
	} else {
		text_message += "This doesn't seem to do anything. <br>";
	}
	text_message += "</p>";
	add_text_message(text_message);
	generate_action_buttons();
	verify_goal();
}

function addToInventory (object) {
	inventory.push(object);
	generateInventory(inventory);
}

function removeFromInventory (object) {
	remove_item_from_array(inventory, object);
	add_object_to_room(current_location_id,object);
	generateInventory(inventory);
}

function generateInventory (inventory) {
	document.getElementById("inventoryContent").innerHTML = "<ul class=\"inventoryList\">";
	document.getElementById("inventoryActionArea").innerHTML = "";
	inventory.forEach(inventoryObject => {
		document.getElementById("inventoryContent").innerHTML += "<li class=\"inventoryListItem\">"+inventoryObject.name+"</li>";
		dropButton = '<button type="button" onclick="doAction(\'Drop the ' +  inventoryObject.name + '\')">Drop the ' + inventoryObject.name + '</button>';
		document.getElementById("inventoryActionArea").innerHTML += dropButton;
	});

	document.getElementById("inventoryContent").innerHTML += "</ul>";
}

function add_text_message(text_to_add) {
	textMessageFromGame = document.getElementById("textMessageFromGame");
	textMessageFromGame.innerHTML += text_to_add;
	rowTextMessage = document.getElementById("rowTextMessage");
	rowTextMessage.scrollTop = rowTextMessage.scrollHeight;
}
