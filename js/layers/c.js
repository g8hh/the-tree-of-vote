addLayer("c", {
    name: "Challenge", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#254164",
    requires: new Decimal("1eeeeeeeeeeeee10"), // Can be a function that takes requirement increases into account
    resource: "Challenge points", // Name of prestige currency
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
    layerShown(){if (hasMilestone("b",1)) return true
                else return false},
    tabFormat:[
        "main-display",
        ["display-text",
        `For every challenge you complete, you'll gain an challenge point.<br>
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
            name: "elunds",
            challengeDescription: "Your point gain is /0.5 in this challenge.",
            goalDescription:"Get 1e15 points.",
            rewardDescription:"Boost point gain by 2x.",
            canComplete: function() {return player.points.gte(1e15)},
            
        },
        12: {
            name: "^",
            challengeDescription: "Your point gain is ^0.1*11 in this challenge.",
            goalDescription:"This is an free challenge.",
            rewardDescription:"Nope.",
            canComplete: function() {return player.points.gte(0)},
            
        },
        13: {
            name: "upvoid",
            challengeDescription: "Your buyable effect is square rooted.",
            goalDescription:"Get 1e18 points.",
            rewardDescription:"Your buyable effect is x2.<br>(Except first one.)",
            canComplete: function() {return player.points.gte(0)},
            
        },
    },
})
