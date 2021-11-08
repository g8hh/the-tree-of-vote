addLayer("ac", {
    name: "Anti-Challenge", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 3, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#a99b65",
    requires: new Decimal("1eeeeeeeeeeeee10"), // Can be a function that takes requirement increases into account
    resource: "Anti-Challenge points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 2, // Prestige currency exponent
    gainMult() {
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    doReset(resettingLayer){
        if (['e'].includes(resettingLayer)) layerDataReset(this.layer)

    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return hasUpgrade("a",15)||player.ac.unlocked},
    tabFormat:[
        "main-display",
        ["display-text",
        `For every challenge you complete, you'll gain an anti-challenge point.<br>
        They DON'T reset unless said so.`],
        "blank",
        "milestones",
        "buyables",
        "blank",
        "challenges",
        ],
    update(diff){
        var p = new Decimal(0)
        for(i in player[this.layer].challenges)
        p = p.add(challengeCompletions(this.layer, i))

        player[this.layer].points = p
    },
    challenges: {
        11: {
            name: "Leave!",
            challengeDescription: "Member effect is disabled",
            goalDescription:"Get 1e58 points.",
            rewardDescription:"You can buy max members",
            canComplete: function() {return player.points.gte(1e58)},            
        },
      12: {
            name: "Anti-Prestige",
            challengeDescription: "You can't gain prestige points",
            goalDescription:"Get 1e58 points.",
        onEnter(){player.p.points=new Decimal(0)},
            rewardDescription:"You can buy max elections",
            canComplete: function() {return player.points.gte(1e23)},            
        },
    },
})
