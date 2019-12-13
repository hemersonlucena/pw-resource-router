function getDistanceToMine(xpos, zpos, mine){
	return Math.sqrt(Math.pow(xpos - mine.x, 2) + Math.pow(zpos - mine.z, 2));
}

function getTheClosestOne(xpos, zpos){
	let closestOne = [0, 0, 99999];

	for(let i = 0; i < resourcesData.length; i++){
		for(let j = 0; j < resourcesData[i].mines.length; j++){

			if (resourcesData[i].mines[j].isTaken == true)
				continue;

			let distance = getDistanceToMine(xpos, zpos, resourcesData[i].mines[j]);

			if(distance < closestOne[2]){
				closestOne[0] = i;
				closestOne[1] = j;
				closestOne[2] = distance;
			}
		}
	}

	return closestOne;
}

function updatePlayerPos(fromMine = false, mineIndexes = [0, 0]){
	if (fromMine) {
		let mine = resourcesData[mineIndexes[0]].mines[mineIndexes[1]];
		playerPos.x = mine.x;
		playerPos.y = mine.y;
		playerPos.z = mine.z;
	}else{
		playerPos.x = parseInt(document.getElementById("charPos").value.split(" ")[0]);
		playerPos.z = parseInt(document.getElementById("charPos").value.split(" ")[1]);
	}

}
function updatePageDiv(nextMineIndexes){
	let pageDiv = document.getElementsByClassName("page")[0];

	let formatedMinePos = Math.round(resourcesData[nextMineIndexes[0]].mines[nextMineIndexes[1]].x) +
	", "
	+ Math.round(resourcesData[nextMineIndexes[0]].mines[nextMineIndexes[1]].z) +
	" ("
	+ resourcesData[nextMineIndexes[0]].mines[nextMineIndexes[1]].y +
	")";

	let formateMineName = resourcesData[nextMineIndexes[0]].name;

	pageDiv.innerHTML = "<p>Go to<br><span id=\"resourceCoords\">"
	+ formatedMinePos +
	"</span><br>and collect <span id=\"resourceName\">"
	+ formateMineName +
	"</span></p>"
}

function startCollecting(){
	updatePlayerPos();

	nextMineIndexes = getTheClosestOne(playerPos.x, playerPos.z);

	let controlsDiv = document.getElementsByClassName("controls")[0];

	controlsDiv.innerHTML = "";

	let newButton = document.createElement("button");
	newButton.setAttribute("class", "btn one-btn");
	newButton.setAttribute("onclick", "gotIt()");
	newButton.innerHTML = "Got It!";

	controlsDiv.appendChild(newButton);


	updatePageDiv(nextMineIndexes);
	currentMineIndexes = nextMineIndexes;
}

function setTaken(mineIndexes){
	resourcesData[mineIndexes[0]].mines[mineIndexes[1]].isTaken = true;
	// TODO: set timeout to respawn.
}

function gotIt(){
	updatePlayerPos(true, currentMineIndexes);
	setTaken(currentMineIndexes);

	nextMineIndexes = getTheClosestOne(playerPos.x, playerPos.z);
	updatePageDiv(nextMineIndexes);
	currentMineIndexes = nextMineIndexes;

	console.log("DONE!");
	console.log(currentMineIndexes);
}

// MAIN

let playerPos = {x: 133, y: 71, z: 337};

let currentMineIndexes = [0, 0];