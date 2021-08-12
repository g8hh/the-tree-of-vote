addLayer("a", {
    name: "addition", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#faba72",
    requires: new Decimal(1e10), // Can be a function that takes requirement increases into account
    resource: "Addition", // Name of prestige currency
    baseResource: "prestige points", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() {
        let mult = new Decimal(1)
        return mult
    },
  branches: ["p"],
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    passiveGeneration(){
        return 0
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "a", description: "A: Reset for addition", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
  upgrades:{
    11: {
      title: "log",
      description: "Multiply point gain by log(points+1)",
      cost: new Decimal(100)
    },
    12: {
      title: "^1.042069",
      description: "prestige gain ^1.042069",
      cost: new Decimal(200)
    },
    13: {
      title: "+",
      description: "increase the softcap exponent of rigged poll upgrade 14 based on members",
      cost: new Decimal(2e7)
    },
    14: {
      title: "upgrades",
      description: "each prestige upgrade upgrades the first prestige upgrade by 1.1x",
      cost: new Decimal(1e10)
    },
    15: {
      title: "elections",
      description: "election polls multiply prestige gain",
      cost: new Decimal(1e11)
    },
    21: {
      title: "bloons",
      description: "Summon a fortified camo regrow red and a regular blue bloon.",
      cost: new Decimal(1e100)
    },
  }
})
addLayer("s", {
    name: "stairs", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#cccccc",
    requires: new Decimal("10^^10"), // Can be a function that takes requirement increases into account
    resource: "stairs", // Name of prestige currency
    baseResource: "prestige points", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
  base: 10,
    exponent: 0.5, // Prestige currency exponent
    gainMult() {
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: "side", // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
})
addLayer("v", {
    name: "votes", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "V", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 3, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
      yes: new Decimal(0),
      no: new Decimal(0),
    }},
    color: "#555555",
    requires: new Decimal(1e50), // Can be a function that takes requirement increases into account
    resource: "votes", // Name of prestige currency
    baseResource: "prestige points", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() {
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: "side", // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "v", description: "V: Reset for votes", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
})