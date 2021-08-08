addLayer("b", {
    name: "Buyable", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "B", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#845538",
    requires: new Decimal("1eeeeeeeeeeeee10"), // Can be a function that takes requirement increases into account
    resource: "Buyable points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() {
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    tabFormat:[
        "main-display",
        "resource-display",
        "milestones",
        "buyables",
        "upgrades",
        ],
    buyables:{
        11:{
            cost(x){return new Decimal(100).pow(x)},
            title:"Elund",
            display(){words = `Unlock other buyable.<br>
                            Currently: Unlocked `+format(getBuyableAmount(this.layer,this.id))+` more buyable.<br>
                            Next: `
                    if (getBuyableAmount(this.layer,this.id).gte(this.purchaseLimit))return words + "MAXED"
                    else return words + format(this.cost()) + " points."},
            canAfford(){return player.points.gte(this.cost())},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit:new Decimal(0)
        }
    }
})
