addLayer("po", {
    name: "Polls", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "PO", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        spellTimes:{
            11:new Decimal(0)
        },
    }},
    color: "#4BDC13",
    branches:["p"],
    requires: new Decimal(100), // Can be a function that takes requirement increases into account
    resource: "Rigged Polls", // Name of prestige currency
    baseResource: "Prestige points", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() {
        let mult = new Decimal(1)
        if (player.co.points.gte(1)) mult = mult.mul(layers.co.effect())
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "r", description: "R: Reset for Rigged Polls", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){if (hasUpgrade('p',31) || player[this.layer].points.gte(1) || hasUpgrade(this.layer,11)
                || player.co.points.gte(1) || player.e.points.gte(1) ) return true
                else return false},
    update(diff){
        
        for(i in player[this.layer].buyables)
        setBuyableAmount(this.layer,i,getBuyableAmount(this.layer,i).minus(diff).max(0));


    },
    milestones:{
        1:{
            requirementDescription: "100 Rigged Polls",
            effectDescription: "Unlock an upgrade in prestige layer.",
            done() { return player[this.layer].points.gte(100) },
        },
    },
    buyables: {
        11: {
            cost(x){return new Decimal(1)},
            title:'Elund',
            display() {
                words = "Doubles point gain for 10 seconds,<br>Cost:100 Rigged Polls.<br>Currently: "
                words = words+format(getBuyableAmount(this.layer,this.id))+"s."
                return words
            },
            unlocked(){return true},
            purchaseLimit:new Decimal(0.01),
            style: {
                'height': '150px',
                'width': '150px'
            },
            canAfford(){if (getBuyableAmount(this.layer,this.id).lte(0) && player[this.layer].points.gte(100))return true;
                        else return false},
            buy(){
                player[this.layer].points=player[this.layer].points.sub(100)
                setBuyableAmount(this.layer,this.id,new Decimal(10))
            },
            effect(){
                if (getBuyableAmount(this.layer,this.id).gte(0.0000)) return new Decimal(2)
                else return 1
            },
        },
    },
    upgrades:{
        11: {
            title: "3^3=7",
            description: "point x3^3 (7).",
            cost: new Decimal(1),
            effect(){
                ef= new Decimal(27)
                pow=new Decimal(0.5904145830538074)
                if (hasUpgrade(this.layer,14)) pow=pow.add(upgradeEffect(this.layer,14))
                return ef.pow(pow)
            },
            tooltip:"Actual Formula:(3^3)^<br>0.5904145830538074"
        },
        12: {
            title: "Meo",
            description: "Divides the fourth upvoid effect by 10.",
            cost: new Decimal(3),
            tooltip:"After buying, it will be /0.2 instead of /2."
        },
        13: {
            title: "lolyou230",
            description: "Make the cilckable in prestige layer \"Do Something\".",
            cost: new Decimal(5),
            canAfford(){return false},
        },
        14: {
            title: "ant warmer",
            description: "Increases the exponent of the 3^3=7 upgrade based on rigged polls.",
            cost: new Decimal(10),
            effect(){
                return player[this.layer].points.add(1).cbrt().div(80).min(1)
            },
            effectDisplay() { return "+"+format(upgradeEffect(this.layer, this.id)) },
        },
        21: {
            title: "upvoid",
            description: "Multiplies point gain by (points^(1-1/ln(points+1))).",
            cost: new Decimal(50),
            effect(){
                mul = (player.points.add(1).pow(new Decimal(1).sub(Decimal.div(1,player.points.add(1).log10()))))
                mul = mul.add(1).log10()
                return mul
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        22: {
            title: "^",
            description: "Raise point gain by 1.1.",
            cost: new Decimal(1000),
        },
    }
})