
var width=8;
var randomColor = randomColor();
generateAndDisplayAvatars();

function addAvatar(data, id) {
	avatarElement = document.getElementById(id);
	for(i=0; i<width; i++){
		for(j=0; j<width; j++){
			squareSpan = document.createElement('span');
			squareSpan.setAttribute('class', 'square');
			squareSpan.style.background = data[i][j] > 0 ? randomColor : 'white';
			avatarElement.appendChild(squareSpan);
		}
	}
}

function generateAndDisplayAvatars() {
	baseData = generateBase();
	addAvatar(baseData, "base");
	
	verticalSymData= generateVerticalSymetry(baseData);
	addAvatar(verticalSymData, "verticalSymetry");
	
	centralSymData= generateCentralSymetry(baseData);
	addAvatar(centralSymData, "centralSymetry");
	
	circleSymData= generateCircleSymetry(baseData);
	addAvatar(circleSymData, "circleSymetry");
}

function generateCentralSymetry(baseData) {
	data = copyArray(baseData);
	for (i =0; i<width; i++){
		for(j=0; j<width; j++){
			if(baseData[i][j] == 1){
				data[width-1-i][width-1-j]=1;
			}
		}
	}
	return data;
}

function generateCircleSymetry(baseData) {
	data = copyArray(baseData);
	for (i =0; i<width; i++){
		for(j=0; j<width; j++){
			if(baseData[i][j] == 1){
				data[width-1-i][width-1-j]=1;
				data[i][width-1-j]=1;
				data[width-1-i][j]=1;
			}
		}
	}
	return data;
}

function generateVerticalSymetry(baseData) {
	verticalSymData = copyArray(baseData);
	for (i =0; i<width; i++){
		for(j=0; j<width; j++){
			if(baseData[i][j] == 1){
				verticalSymData[i][width-1-j]=1;
			}
		}
	}
	return verticalSymData;
}

function copyArray(array){
	copy = [];
	for (i=0; i<width; i++){
		copy[i]=[]
		for (j =0; j<width; j++){
			copy[i][j]=array[i][j];
		}
	}
	return copy;
}

function generateBase() {
	// 40% filled at most
	ratio = Math.random() * 0.4;
	var baseData = []
	for (i=0; i<width; i++){
		baseData[i]=[]
		for (j =0; j<width; j++){
			baseData[i][j] = Math.random() < ratio ? 1 : 0;
		}
	}
	 return baseData;
}

function randomColor(){ 
        randomColor = Math.random() * 0x1000000; // 0 < randomColor < 0x1000000
        randomColor = Math.floor(randomColor); // 0 < randomColor <= 0xFFFFFF
        randomColor = randomColor.toString(16); // hex representation randomColor
        randomColor = ("000000" + randomColor).slice(-6); // leading zeros added
        randomColor = "#" + randomColor; // # added
		return randomColor;
}
