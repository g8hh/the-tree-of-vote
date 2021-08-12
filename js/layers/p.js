addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#31aeb0",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() {
      if(inChallenge("ac",12))return new Decimal(0)
        let mult = new Decimal(1)
        if (hasUpgrade('p', 13)) mult = mult.times(upgradeEffect('p', 13))
      if(hasUpgrade("po",31))mult=mult.mul(player.points.add(1).ln().add(1).log(2).add(1).pow(player.p.points.add(1).log10().pow(0.9).add(1)).add(1).ln().add(1))
      if(hasUpgrade("a",15))mult=mult.mul(player.e.points.add(1))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1).add(hasUpgrade("a",12)?0.042069:0).mul(hasUpgrade("po",24)?2:1)
    },
    passiveGeneration(){
        if (hasUpgrade(this.layer,41))return 0.1
        else return 0
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
  doReset(layer){
if(layers[layer].row>this.row){
let keep = []
if(hasMilestone("po",2)){keep.push("upgrades")}
layerDataReset(this.layer,keep)
}
},
    layerShown(){return true},
    clickables: {
        11: {
            title:'lolyou230',
            display() {if (hasUpgrade('po',13))return "Generate 0.5 Fumo Per click."
                else return "A completely useless clickable."},
            canClick(){return true},
            onClick(){if (hasUpgrade('po',13)) player.f.points=player.f.points.add(0.5)}
        },
      12: {
            title:'enter easy mode',
            display() {return "easy"},
            canClick(){return !player.easy},
            onClick(){player.easy=true}
        },
    },
    upgrades:{
        11: {
            name: "Point doubler",
            description: "Double your point gain.",
            cost: new Decimal(1),
        },
        12: {
            name: "Point booster",
            description: "Boost your point gain based on your prestige point.",
            cost: new Decimal(3),
            effect() {
                return player[this.layer].points.add(1).log10().add(1).pow(2).add(1)
            },
            tooltip:"(And a +1 output as Fawwaz Arkan suggest)",
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        13: {
            name: "Prestige Point booster",
            description: "Boost your prestige point gain based on your point.",
            cost: new Decimal(5),
            effect() {
                return player.points.add(1).pow(0.15)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        14: {
            title: "Fawwaz Arkan",
            description: "Boost your point gain based on cbrt(prestige point+1).",
            cost: new Decimal(5),
            effect() {
                return player[this.layer].points.add(1).cbrt().add(1)
            },
            tooltip:"(And a +1 output as Fawwaz Arkan suggest)",
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        21: {
            title: "upvoid",
            description: "Unlock next upgrade.",
            cost: new Decimal(10),
            unlocked(){if (hasUpgrade(this.layer,14))return true
                        else return false},
        },
        22: {
            title: "upvoid",
            description: "Unlock next upgrade.",
            cost: new Decimal(10),
            unlocked(){if (hasUpgrade(this.layer,21))return true
                else return false},
        },
        23: {
            title: "upvoid",
            description: "Unlock next upgrade.",
            cost: new Decimal(10),
            unlocked(){if (hasUpgrade(this.layer,22))return true
                else return false},
        },
        24: {
            title: "upvoid",
            description: "Devide your point gain by 2.",
            cost: new Decimal(10),
            unlocked(){if (hasUpgrade(this.layer,23))return true
                else return false},
            effect() {
                if (hasUpgrade('po',12)) return new Decimal(2).div(10)
                else return new Decimal(2)
            },
            
        },
        31: {
            title: "Elund",
            description: "Not an upgrade, don't buy this.",
            cost: new Decimal(20),
            unlocked(){if (hasUpgrade(this.layer,23))return true
                else return false},
        },
        32: {
            title: "InFiIipity♾",
            description: "An upgrade. Buy this.",
            cost: new Decimal(25),
            unlocked(){if (hasUpgrade(this.layer,31))return true
                else return false},
        },
        33: {
            title: "inflation",
            description: "Multiplies point gain by 1.1 .",
            cost: new Decimal(50),
            unlocked(){if (hasUpgrade(this.layer,32))return true
                else return false},
        },
        34: {
            title: "foxes1338",
            description: "Click here to waste points.",
            cost: new Decimal(75),
            unlocked(){if (hasUpgrade(this.layer,33))return true
                else return false},
        },
        41: {
            title: "watglan",
            description: "Auto gain 10% of prestige point on prestige per second.",
            cost: new Decimal(1e8),
            unlocked(){if (hasMilestone("po",1))return true
                else return false},
        },
    }
})
