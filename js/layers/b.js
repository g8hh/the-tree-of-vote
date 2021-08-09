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
    layerShown(){return true},
    tabFormat:[
        "main-display",
        ["display-text",
        `For every buyable you buy, you'll gain an buyable point.<br>
        They DON'T reset unless said so.`],
        "blank",
        "milestones",
        "buyables",
        "blank",
        "upgrades",
        ],
    update(diff){
        var p = new Decimal(0)
        for(i in player[this.layer].buyables){
        p =p.add(getBuyableAmount(this.layer,i))
        }
        
        if (hasUpgrade('p',32)) p=p.add(1)

        for(i in layers[this.layer].upgrades){
            if (hasUpgrade(this.layer,i))
            p =p.sub(layers[this.layer].upgrades[i].cost)}
        player[this.layer].points = p
    },
    milestones:{
        1:{
            requirementDescription: "9 Buyable point",
            effectDescription: "Unlock Anti-challenge.",
            done() { return player[this.layer].points.gte(9) },
        },
    },
    buyables:{
        11:{
            cost(x){return new Decimal(100).pow(x+1)},

            title:"Elund",

            display(){words = `Unlock other buyable.<br>
                            Currently: Unlocked `+format(buyableEffect(this.layer,this.id))+` more buyable.<br>
                            Next: `
                    if (getBuyableAmount(this.layer,this.id).gt(this.purchaseLimit))return words + "MAXED"
                    else return words + format(this.cost()) + " points."},
            
            canAfford(){return player.points.gte(this.cost())},
            
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player[this.layer].points=player[this.layer].points.add(1)
            },

            effect(){return getBuyableAmount(this.layer,this.id)},

            purchaseLimit:function(){
                var limit = new Decimal(0)
                if (player.po.points.gte(1) || hasUpgrade(this.layer,11) || getBuyableAmount(this.layer,12).gte(1))limit=limit.add(1)
                
                return limit
            }
        },
        12:{
            unlocked(){if (buyableEffect(this.layer,11).gte(1)) return true
                        else return false},
            
            cost(x){return new Decimal(2).pow(x)},

            title:"ant warmer",

            display(){words = `Boost point gain by x2.<br>
                            Currently: `+format(buyableEffect(this.layer,this.id))+`x.<br>
                            Next: `
                    if (getBuyableAmount(this.layer,this.id).gte(this.purchaseLimit))return words + "MAXED"
                    else return words + format(this.cost()) + " Rigged Polls."},
            
            canAfford(){return player.po.points.gte(this.cost())},

            effect(){return new Decimal(2).pow(getBuyableAmount(this.layer,this.id))},

            buy() {
                player.po.points = player.po.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player[this.layer].points=player[this.layer].points.add(1)
            },

            purchaseLimit:new Decimal(10)
        },

    },
    upgrades:{
        11: {
            title: "Elund",
            description: "Adds 5 to base point gain, and then multiplies point gain by 5.",
            cost: new Decimal(3),
            unlocked(){if(hasUpgrade(this.layer,this.id)||player[this.layer].points.gte(3)) return true
                        else return false }
        },
    }
})
