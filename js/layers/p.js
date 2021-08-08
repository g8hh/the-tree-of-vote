addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#31aeb0",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade('p', 13)) mult = mult.times(upgradeEffect('p', 13))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    clickables: {
        11: {
            title:'lolyou230',
            display() {return "A completely useless clickable."},
            canClick(){return true},
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
                return player[this.layer].points.add(2).pow(0.5)
            },
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
            description: "Boost your point gain based on your sqrt(prestige point+1).",
            cost: new Decimal(5),
            effect() {
                return player[this.layer].points.add(1).sqrt()
            },
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
        },
        31: {
            title: "Elund",
            description: "Not an upgrade, don't buy this.",
            cost: new Decimal(20),
            unlocked(){if (hasUpgrade(this.layer,23))return true
                else return false},
        },
    }
})
