addLayer("e", {
    name: "elections", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "E", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#DC14B3",
    branches:["po"],
    requires: new Decimal(1000), // Can be a function that takes requirement increases into account
    resource: "Election Polls", // Name of prestige currency
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
        {key: "e", description: "E: Reset for Elections", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){if (player.po.points.gte(500) || player[this.layer].points.gte(1) || hasUpgrade(this.layer,11)) return true
                else return false},
    tabFormat:[
        "main-display",
        "prestige-button",
        ["display-text",
        `This layer DOES RESET BUYABLE LAYER<br>
        This layer have nothing now as noone suggest and i don't know how to make an upgrade tree ;-;`],
        "milestones",
        "buyables",
        "upgrades",
        ],
  effectDescription(){
    if(hasMilestone("e",1))return "multiplying point gain by "+format(player.e.points.div(1000).add(1))
  },
  milestones:{
    1:{requirementDescription:"3 election polls",
      rewardDescription:"Elections have a useful effect (very useful trust me)",
       done(){return player.e.points.gte(3)}
    }
  },
    buyables: {
        11: {
            cost(x){return new Decimal(0)},
            title:'Elund',
            display() {
                words = "Click me to change color to purple.<br>Currently: Clicked "
                words = words+format(getBuyableAmount(this.layer,this.id))+" times."
                return words
            },
            unlocked(){return true},
            style() {
              if(Number(getBuyableAmount(this.layer,this.id))%2==1)return{
                
                'height': '150px',
                'width': '150px',
                'background-color': '#8000ff'
              }
              return{
                'height': '150px',
                'width': '150px'}
            },
            canAfford(){return true},
            buy(){
                setBuyableAmount(this.layer,this.id,getBuyableAmount(this.layer,this.id).add(1))
            },
        },
    },
    upgrades:{
11:{
  title: "f",
  description(){return "gain 4.9 fumos"},
  cost: new Decimal(0),
  onPurchase(){player.f.points=player.f.points.add(4.9)}
}
    },
  grid: {
    rows: 4, // If these are dynamic make sure to have a max value as well!
    cols: 5,
    getStartData(id) {
        return 0
    },
    getUnlocked(id) { // Default
        return true
    },
    getCanClick(data, id) {
        return true
    },
    onClick(data, id) { 
        player[this.layer].grid[id]++
    },
    getDisplay(data, id) {
        return data 
    },
}
})