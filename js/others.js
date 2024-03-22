addLayer("statsinfo", {
    name: " stats info", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "INFO", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    tooltip() {
      return "Layer Info and Currency Info"
    },
    nodeStyle() {return {
        'width': "",
        'height': "",
        'font-size': "22px",
    }},
    color: "#696969",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "", // Name of prestige currency
    baseResource: "", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: "side", // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    infoboxes: {
    Multi: {
        title: "Multiplier ",
        body() { return "Increases Money by 2x" },
        style: {"border-color": "#fc3d3d"}, 
        unlocked() {return player.bm.unlocked },
    },
    Rebirth: {
      title: "Rebirth ",
        body() { return "Increases Multiplier by 2x" },
        style: {"border-color": "#1bace7"}, 
        unlocked() {return player.r.unlocked }
    },
},
tabFormat: [
  "blank",
  ["infobox", "Multi"],
  "blank",
  ["infobox", "Rebirth"],
]
  

})
addLayer("achievements", {
    name: "Achievements", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},
    tooltip() {
      return "Achievements"
    },
    color: "#FFFF00",
    nodeStyle() {return {
        "background": "radial-gradient(#FFFF00, #d5ad83)" ,
        'font-size': "30px",
    }},
  requires: new Decimal(10), // Can be a function that takes requirement increases into account
  resource: "", // Name of prestige currency
  baseResource: "", // Name of resource prestige is based on
  baseAmount() {
    return player.points;
  }, // Get the current amount of baseResource
  type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
  exponent: 0, // Prestige currency exponent
  gainMult() {
    // Calculate the multiplier for main currency from bonuses
    mult = new Decimal(1);
    return mult;
  },
  gainExp() {
    // Calculate the exponent on main currency from bonuses
    return new Decimal(1);
  },
  row: "side", // Row the layer is in on the tree (0 is the first row)
  hotkeys: [
    {
      key: "m",
      description: "M: Reset for Multiplier(Cannot)",
      onPress() {
        if (canReset(this.layer)) doReset(this.layer);
      },
    },
  ],
  layerShown() {
    return true;
  },
    achievements: {
      11: {
        name: "Multipliers!",
            tooltip: "Get 1 Multiplier",
            done() {
                return player.bm.multiplier.gte(1)
            },
            style: {
              'border-radius'() {
              return "5%"
            },
              'height'() {
              return "100px"
            },
              'width'() {
              return "100px"
            },
            },

      },
      12: {
        name: "Rebirths",
            tooltip: "Get 1 Rebirth ",
            done() {
                return player.r.rebirth.gte(1)
            },
            style: {
              'border-radius'() {
              return "5%"
            },
              'height'() {
              return "100px"
            },
              'width'() {
              return "100px"
            },
            },
      },
    },
  
})
addLayer("multiply", {
  name: "", // This is optional, only used in a few places, If absent it just uses the layer id.
  symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
  position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
  startData() {
    return {
      unlocked: false,
      points: new Decimal(0),
      calculate: new Decimal(0),
      
      
    };
  },
  color: "#FFFFFF",
  requires: new Decimal(10), // Can be a function that takes requirement increases into account
  resource: "", // Name of prestige currency
  baseResource: "", // Name of resource prestige is based on
  baseAmount() {
    return player.points;
  }, // Get the current amount of baseResource
  type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
  exponent: 0, // Prestige currency exponent
  gainMult() {
    // Calculate the multiplier for main currency from bonuses
    mult = new Decimal(1);
    return mult;
  },
  gainExp() {
    // Calculate the exponent on main currency from bonuses
    return new Decimal(1);
  },
  row: 1, // Row the layer is in on the tree (0 is the first row)
  hotkeys: [
    {
      key: "",
      description: "M: Reset for Multiplier(Cannot)",
      onPress() {
        if (canReset(this.layer)) doReset(this.layer);
      },
    },
  ],
  layerShown() {
    return false;
  },
   effect() {
     let eff = player.multiply.calculate.add(0)
     if (player.r.unlocked) eff = eff.add(player.r.rebirth).times(2).add(1)
     return eff
   },
})
addLayer("custom", {
  name: "", // This is optional, only used in a few places, If absent it just uses the layer id.
  symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
  position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
  startData() {
    return {
      unlocked: false,
      points: new Decimal(0),
      calculate: new Decimal(0),
      
      
    };
  },
  color: "#FFFFFF",
  requires: new Decimal(10), // Can be a function that takes requirement increases into account
  resource: "", // Name of prestige currency
  baseResource: "", // Name of resource prestige is based on
  baseAmount() {
    return player.points;
  }, // Get the current amount of baseResource
  type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
  exponent: 0, // Prestige currency exponent
  gainMult() {
    // Calculate the multiplier for main currency from bonuses
    mult = new Decimal(1);
    return mult;
  },
  gainExp() {
    // Calculate the exponent on main currency from bonuses
    return new Decimal(1);
  },
  row: 1, // Row the layer is in on the tree (0 is the first row)
  
  layerShown() {
    return false;
  },
   effect() {
     let eff = player.custom.calculate.add(0)
     if (player.r.unlocked) eff = eff.add(player.r.rebirth).times(2).add(1)
     return eff
   },
})
addLayer("multii", {
  name: "", // This is optional, only used in a few places, If absent it just uses the layer id.
  symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
  position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
  startData() {
    return {
      unlocked: false,
      points: new Decimal(0),
      calculate: new Decimal(0),
      multiplierindicate: new Decimal(0),
      
    };
  },
  color: "#FFFFFF",
  requires: new Decimal(10), // Can be a function that takes requirement increases into account
  resource: "", // Name of prestige currency
  baseResource: "", // Name of resource prestige is based on
  baseAmount() {
    return player.points;
  }, // Get the current amount of baseResource
  type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
  exponent: 0, // Prestige currency exponent
  gainMult() {
    // Calculate the multiplier for main currency from bonuses
    mult = new Decimal(1);
    return mult;
  },
  gainExp() {
    // Calculate the exponent on main currency from bonuses
    return new Decimal(1);
  },
  row: 1, // Row the layer is in on the tree (0 is the first row)
  hotkeys: [
    {
      key: "",
      description: "M: Reset for Multiplier(Cannot)",
      onPress() {
        if (canReset(this.layer)) doReset(this.layer);
      },
    },
  ],
  layerShown() {
    return false;
  },
   effect() {
     let indicate = player.multii.multiplierindicate.add(0)
     if (player.bm.unlocked) indicate = indicate.add(tmp.custom.effect)
   },
})