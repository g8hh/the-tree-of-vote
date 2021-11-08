addLayer("co", {
    name: "community", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "CO", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#77CD81",
    branches:["po"],
    requires: new Decimal(10000), // Can be a function that takes requirement increases into account
    resource: "Members", // Name of prestige currency
    baseResource: "Rigged Polls", // Name of resource prestige is based on
    baseAmount() {return player.po.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 2, // Prestige currency exponent
    gainMult() {
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "C", description: "C: Reset for Members", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){if (player.po.points.gte(500) || player[this.layer].points.gte(1)) return true
                else return false},
    effect(){return player[this.layer].points.add(1).pow(1.5)},
    effectDescription:function(){
        return "Which is boost yout Rigged Polls gain by "+format(this.effect())
    },
  canBuyMax(){return hasChallenge("ac",11)},
    upgrades:{
        11: {
            name: "ant warmer",
            description: "Multiplies point gain by light mode.",
            cost: new Decimal(0),
            unlocked(){
                if (player[this.layer].points.gte(1)||(hasUpgrade(this.layer, 11)))return true
                else return false
            },
            tooltip:"Current light mode: 2"
        },
      12: {
            name: "",
            description: "Gain the square root of rigged polls on reset per second",
            cost: new Decimal(1),
            unlocked(){
                if (player[this.layer].points.gte(1)||(hasUpgrade(this.layer, 11)))return true
                else return false
            },
        },
    },
  milestones:{
    1:{
      requirementDescription: "3 members",
        effectDescription: "Keep rigged poll milestones on reset",
        done() { return player.co.points.gte(3) }
    },
    2:{
      requirementDescription: "12 members",
        effectDescription: "Keep rigged poll upgrades on reset",
        done() { return player.co.points.gte(12) }
    }
  }
})