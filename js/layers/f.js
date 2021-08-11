addLayer("f", {
    name: "Fumo", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "F", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#ed1941",
    requires: new Decimal("1eeeeeeeeeeeee10"), // Can be a function that takes requirement increases into account
    resource: "Fumo", // Name of prestige currency
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
    row: "side", // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){if(player[this.layer].points.gt(0)||player.po.points.gte(5)) return true
        else return false},
    tabFormat:[
        "main-display",
        "milestones",
        "buyables",
        "blank",
        "upgrades",
        ],
    upgrades:{
        11: {
            cost: new Decimal(5),
            description: "Unlock the third rigged poll upgrade.",
            canAfford(){return false},
        },
    }
})
