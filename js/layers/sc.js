addLayer("sc", {
    name: "Softcaps", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "SC", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FFD400",
    tooltip:"Softcap",
    resource: "Softcaps", // Name of prestige currency
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    row: "side", // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    tabFormat:[
    "blank",
        ["display-text",function(){
            words = ``
            if(hasUpgrade('p',32)) words = words + '<h3>Inflaction</h3><br>Start at 0x.<br>effect ^1e-5<br><br>'
            return words}],
        
    ],
})
