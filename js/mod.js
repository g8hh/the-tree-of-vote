let modInfo = {
	name: "The Tree of Vote",
	id: "Vote",
	author: "ajchen and alots of people",
	pointsName: "points",
	modFiles: ["layers/f.js","layers/e.js","layers/co.js","layers/c.js","layers/p.js","layers/po.js","layers/sc.js","layers/b.js", "tree.js","layers/morelayers.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.40.1",
	name: "democracy was never wrong :troll_hdr:",
}

let changelog = `<h1>Changelog:</h1><br>
<br><h3>v0.40.1</h3><br>
- Fixed NaN bug with the first addition upgrade
<br><h3>v0.40</h3><br>
- You found an easter egg
- Added in a bunch of suggestions
- C  
  <br><h3>v0.32</h3><br>
		- Added a clickable that counts the amount of times it is clicked that becomes purple when clicked an odd number of times.<br>
		- Added another spell where the base of the second buyable is increased.<br>
	<br><h3>v0.31</h3><br>
		- (UNVOTE) Fixed inflation-HOLY GOD I JUST FIND THAT.<br>
		- (UNVOTE) Try to banlance everything CUZ THAT INFLATION BUG.<br>
		- Added a challenge that raise points gain by 1.1, called "^".<br>
		- Added a challenge where buyables have square root effect, but the reward is buyables are twice as atrong.<br>
	<br><h3>v0.30</h3><br>
		- (UNVOTE) Fixed upvoid upgrade's effect.<br>
		- (UNVOTE) Try to banlance everything again.<br>
		- Added a upgrade that multiplies point gain by light mode.<br>
		- Added a clickable that doubles point gain for 10 seconds but costs rigged polls.<br>
	<br><h3>v0.28</h3><br>
		- Added a layer called "community" with members as currency that boost rigged polls gain.<br>
		- (UNVOTE) Fixed challenge point caulation.<br>
		- (UNVOTE) Try to banlance everything.<br>
		- Added a upgrade that raise points gain by 1.1, called "^".<br>
	<br><h3>v0.26</h3><br>
		- Added a upgrade that multiplies point gain by (points^(1-1/ln(points+1))).<br>
		- Added a milestone in rigged polls that unlocks an upgrade in prestige points that gives 10% of prestige points gain per second.<br>
		- Addd a challenge that doubles your point gain, with the reward being x2 point gain (same as challenge condition).<br>
		- Added a 10 buyable point milestone.<br>
		- Make a whole layer of anti challenges like elunds.<br>
	<br><h3>v0.21</h3><br>
		- Added a upgrade that does nothing and is called "click here to waste points".<br>
		- Added a upgrade that reads "an upgrade. Buy this" That gives a buyable point.<br>
		- (UNVOTE) Fixed buyable point caulation.<br>
		- Added a upgrade in rigged polls that increases the exponent of the 3^3=7 upgrade based on rigged polls.<br>
		- Fixed fumo layer unlocked too early.<br>
		- Added a magic missle that destory everyone's fumo points.<br>
		- Added e.<br>
	<br><h3>v0.16</h3><br>
		- Added fumo layer.<br>
		- Added some more 1 effect to some upgrade.<br>
		- Added a upgrade called inflation that multiplies point gain by 1.01.<br>
		- Added go to sleep.(not really)<br>
	<br><h3>v0.13</h3><br>
		- Added a upgrade that divides upvoid by 10.<br>
		- Added a upgrade in poll layer that makes the clickable in the first layer do something.<br>
		- Added a buyable in buyable layer that costs rigged polls and multiplies point gain by 2 per buyable.<br>
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
  if(inChallenge("c",21))return gain
	if (hasUpgrade('b',11)) gain = gain.add(5)
//Base Goes UP, Multi Goes DOWN
	if (inChallenge('c', 11)||hasChallenge('c', 11)) gain = gain.times(2)
	if (inChallenge('c', 12)) gain = gain.pow(1.1)
	if (hasUpgrade('p', 11)) gain = gain.times(2)
    if (hasUpgrade('p', 12)) gain = gain.times(upgradeEffect('p', 12))
	if (hasUpgrade('p', 14)) gain = gain.times(upgradeEffect('p', 14))
	if (hasUpgrade('p', 24)) gain = gain.div(upgradeEffect('p', 24))
	if (hasUpgrade('p', 33)) gain = gain.times(1.1)
	if (hasUpgrade('po', 11))gain = gain.times(upgradeEffect('po', 11))
	if (hasUpgrade('po',21)) gain = gain.mul(upgradeEffect('po', 21))
	if (hasUpgrade('po',22)) gain = gain.pow(1.1)
	if (getBuyableAmount('po',11).gt(new Decimal(0)))gain = gain.times(buyableEffect('po',11))// THIS IS X2
	if (hasUpgrade('b',11)) gain = gain.times(5)
	if (getBuyableAmount('b',12).gte(new Decimal(1)))gain = gain.times(buyableEffect('b',12))
	if (hasUpgrade('co',11)) gain = gain.times(2)
if(hasUpgrade("po",23))gain=gain.mul(15)
  if(hasUpgrade("a",11))gain=gain.mul(player.points.add(1).log(10).add(1))
  if(inChallenge("c",22))gain=gain.add(1).log(2).pow(new Decimal(player.c.resetTime).add(2).log(2))
  if(hasChallenge("c",22))gain=gain.mul(player.co.points.max(1))
  if(hasMilestone("e",1))gain=gain.mul(player.e.points.div(1000).add(1))
  if(hasUpgrade("a",14))gain=gain.mul(Decimal.pow(1.01,player.p.upgrades.length))
  if(player.easy)gain=gain.div(10)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
  easy:false
}}

// Display extra things at the top of the page
var displayThings = ["Endgame: 1e15 Rigged Poll",
                     function(){return format(player.po.points.add(1).log(1e15).mul(100))+"% to endgame"}
]

// Determines when the game "ends"
function isEndgame() {
	return (player.po.points.gte(new Decimal(1000000)))
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
	if (oldVersion<0.17) player.f.points=new Decimal(0)
	if (oldVersion<0.30) {player.points=player.points.min(1e30);
		player.po.points=player.po.points.min(1e7)
		player.co.points=player.co.points.min(5)
		player.e.points=player.e.points.min(4)}

}