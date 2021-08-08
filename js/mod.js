let modInfo = {
	name: "The Tree of Vote",
	id: "Vote",
	author: "ajchen and alots of people",
	pointsName: "points",
	modFiles: ["layers/p.js","layers/po.js","layers/b.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.12",
	name: "Atleast something",
}

let changelog = `<h1>Changelog:</h1><br>
	<br><h3>v0.12</h3><br>
		- Added a upgrade that divides upvoid by 10.<br>
		- Added a upgrade in poll layer that makes the clickable in the first layer do something.<br>
	<br><h3>v0.10</h3><br>
		- (UNVOTE) Balanced Poll layer gain.<br>
		- Added a upgrade that description is point x3^3 (7).<br>
	<br><h3>v0.09</h3><br>
		- (UNVOTE) Banlaced prestige upgrade 12.<br>
		- (UNVOTE) Changed buyable layer's display colour.<br>
		- (UNVOTE) Fixed an typo.<br>
		- Added Polls layer.<br>
	<br><h3>v0.08</h3><br>
		- Added an complete useless cilckable.<br>
		- Added a layer called "buyable points".<br>
		- Make prestige point layer teal like that famous TMT mod.<br>
		- Added a buyable that unlocks buyables.<br>
		- Added a sublinear(?) upgrade that uses formula cbrt(x+1).<br>
		- Added an upgrade that unlocks another upgrade, which unlocks an upgrade.<br>
		- Added an upgrade that divides point gain by 2, buying it will put you into hard mode.<br>
		- Added an upgrade called "not an upgrade don't buy this"<br>
	<br><h3>v0.00</h3><br>
		- Added things.<br>
		- Added stuff.<br>`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	if (hasUpgrade('p', 11)) gain = gain.times(2)
    if (hasUpgrade('p', 12)) gain = gain.times(upgradeEffect('p', 12))
	if (hasUpgrade('p', 14)) gain = gain.times(upgradeEffect('p', 14))
	if (hasUpgrade('p', 24)) gain = gain.div(upgradeEffect('p', 24))
	if (hasUpgrade('po', 11))gain = gain.times(7)

	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return hasUpgrade('po',13)
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}