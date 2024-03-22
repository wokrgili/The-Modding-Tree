addLayer("shop", {
  name: "shop", // This is optional, only used in a few places, If absent it just uses the layer id.
  symbol: "SHOP", // This appears on the layer's node. Default is the id with the first letter capitalized
  position: -2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
  startData() {
    return {
      unlocked: true,
      points: new Decimal(0),
      Buttons: new Decimal(0),
      "Super_Buttons": new Decimal(0),
      
      "Common_Runes": new Decimal(0),
      "Uncommon_Runes": new Decimal(0),
      "Rare_Runes": new Decimal(0),
      "Epic_Runes": new Decimal(0),
      "Legendary_Runes": new Decimal(0),
      "NormcChance": new Decimal(0),
      "NormuChance": new Decimal(0),
      "NormrChance": new Decimal(0),
      "NormeChance": new Decimal(0),
      "NormlChance": new Decimal(0),
    };
  },
  tooltip: "Shop",
  color: "#fffb00",
  requires: new Decimal(1), // Can be a function that takes requirement increases into account
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
      key: "c",
      description: "C: Reset for coins",
      onPress() {
        if (canReset(this.layer)) doReset(this.layer);
      },
    },
  ],
  layerShown() {
    return true;
  },
  buyables: {
      11: {
            cost(x) { return new Decimal(1.55).pow(x).mul(25) },
            effect(x) { return new Decimal(1).add(x || getBuyableAmount(this.layer, this.id)).times(0.1).plus(0.90).sub(0) },
            canAfford() { return player.shop.Buttons.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/30 <br/>Button Increaser"
            },
            display() {
                return "which are boosting  button gain by ×" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Buttons"
            },
            buy() {
                let base = new Decimal(25)
                let growth = 1.55
                let max = Decimal.affordGeometricSeries(player.shop.Buttons, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.shop.Buttons = player.shop.Buttons.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
               
            },
            style: {
            'background-color'() {
                let color = "#bf8f8f"
                if (tmp.shop.buyables[11].canAfford) color = "#a3a3a3"
                if (player.shop.buyables[11].gte(30)) color = "#14ff00"
                return color
          },
            'height'() {
              return "100px"
            },
            'width'() {
              return "650px"
            },
            'font-size'() {
              return "14px"
            },
            'border-radius'() {
              return "0%"
            },
        },
            purchaseLimit: "30", 
            marked() {
              if(player.shop.buyables[11].gte(30)) return true
            },
          
        },
     12: {
            cost(x) { return new Decimal(1.3).pow(x).mul(15) },
            effect(x) { return new Decimal(1).add(x || getBuyableAmount(this.layer, this.id)).times(0.05).plus(0.95).sub(0) },
            canAfford() { return player.shop.Buttons.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Button Increaser"
            },
            display() {
                return "which are boosting  button gain by ×" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Buttons"
            },
            buy() {
                let base = new Decimal(15)
                let growth = 1.3
                let max = Decimal.affordGeometricSeries(player.shop.Buttons, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.shop.Buttons = player.shop.Buttons.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
               
            },
            style: {
            'background-color'() {
                let color = "#bf8f8f"
                if (tmp.shop.buyables[12].canAfford) color = "#fc3d3d"
                return color
          },
            'height'() {
              return "100px"
            },
            'width'() {
              return "650px"
            },
            'font-size'() {
              return "14px"
            },
            'border-radius'() {
              return "0%"
            },
        },
        },
    13: {
            cost(x) { return new Decimal(6).pow(x).mul(250) },
            effect(x) { return new Decimal(0).add(x || getBuyableAmount(this.layer, this.id))
              let eff = Decimal.times(1).plus(0).sub(0) 
              return eff
              },
            canAfford() { return player.shop.Buttons.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/5 <br/>UnlockedRunes "
            },
            display() {
                return "You have " + formatWhole(tmp[this.layer].buyables[this.id].effect) + " unlocked runes\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Buttons"
            },
            buy() {
                let base = new Decimal(250)
                let growth = 6
                let max = Decimal.affordGeometricSeries(player.shop.Buttons, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.shop.Buttons = player.shop.Buttons.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
               
            },
            style: {
            'background-color'() {
                let color = "#bf8f8f"
                if (tmp.shop.buyables[12].canAfford) color = "#424242"
                return color
          },
            'height'() {
              return "100px"
            },
            'width'() {
              return "650px"
            },
            'font-size'() {
              return "14px"
            },
            'border-radius'() {
              return "0%"
            },
        },
        },
    14: {
            cost(x) { return new Decimal(1).mul(1000) },
            effect(x) { return new Decimal(0).add(x || getBuyableAmount(this.layer, this.id))
              let eff = Decimal.times(1).plus(0).sub(0) 
              return eff
              },
            canAfford() { return player.shop.Buttons.gte(this.cost()) },
            title() {
                return "Unlock Generators"
            },
            display() {
              return "<br> Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Buttons"
            },
            buy() {
                let base = new Decimal(1000)
                let growth = 1
                let max = Decimal.affordGeometricSeries(player.shop.Buttons, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.shop.Buttons = player.shop.Buttons.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
               
            },
            style: {
            'background-color'() {
                let color = "#bf8f8f"
                if (tmp.shop.buyables[12].canAfford) color = "#424242"
                return color
          },
            'height'() {
              return "100px"
            },
            'width'() {
              return "650px"
            },
            'font-size'() {
              return "20px"
            },
            'border-radius'() {
              return "0%"
            },
        },
        },

  },
  
  bars: {
    'Common Runes': {
        direction: RIGHT,
        width: 940,
        height: 60,
        progress() { 
          return player.points
                   },
        display() {
                    return " Common Runes: " + formatWhole(player.shop.Common_Runes)
                },
        textStyle: {
          'text-shadow': '0px 15 px 100px #000000',
          'color': "white",                   
          'color': "white",       
          'font-size': "36px",  
        },
        fillStyle: {'background-color' : "#424242"},
    },
    'Uncommon Runes': {
        direction: RIGHT,
        width: 940,
        height: 60,
        progress() { 
          return player.points
                   },
        display() {
                    return " Uncommon Runes: " + formatWhole(player.shop.Uncommon_Runes)
                },
        textStyle: {
          'text-shadow': '0px 15 px 100px #000000',
          'color': "white",       
          'font-size': "36px",
        },
        fillStyle: {'background-color' : "#18b800"},
    },
    'Rare Runes': {
        direction: RIGHT,
        width: 940,
        height: 60,
        progress() { 
          return player.points
                   },
        display() {
                    return " Rare Runes: " + formatWhole(player.shop.Rare_Runes) 
                },
        textStyle: {
          'text-shadow': '0px 15 px 100px #000000',
          'color': "white",
          'font-size': "36px"
        },
        fillStyle: {'background-color' : "#0300b8"},
    },
    'Epic Runes': {
        direction: RIGHT,
        width: 940,
        height: 60,
        progress() { 
          return player.points
                   },
        display() {
                    return " Epic Runes: " + formatWhole(player.shop.Epic_Runes) + ""
                },
        textStyle: {
          'text-shadow': '0px 15 px 100px #000000',
          'color': "white",                  
          'font-size': "36px"
        },
        fillStyle: {'background-color' : "#5300b8"},
    },
    'Legendary Runes': {
        direction: RIGHT,
        width: 940,
        height: 60,
        progress() { 
          return player.points
                   },
        display() {
                    return " Legendary Runes: " + formatWhole(player.shop.Legendary_Runes) 
                },
        textStyle: {
          'text-shadow': '0px 15 px 100px #000000',
          'color': "white",                   
          'font-size': "36px"
        },
        fillStyle: {'background-color' : "#ffdd00"},
    },
        
},
  clickables: {
    31: {
      display() {
        return "Normal Rune \n\ Cost: 100 Buttons"
      },
      tooltip: "   Chances<br> Common Rune 1/1<br>   Uncommon Rune 1/2<br>  Rare Rune 1/33<br>  Epic Rune 1/10<br>  Legendary Rune 1/100<br>",
      canClick() {
       if (player.shop.Buttons.gte(100))  return true
      },
      onClick() {
        player.shop.Buttons = player.shop.Buttons.sub(100)
        player.shop.NormcChance = Math.random()+1;
        player.shop.NormuChance = (Math.random()*1);
        player.shop.NormrChance = (Math.random()*3.3333333333);
        player.shop.NormeChance = (Math.random()*10)+1;
        player.shop.NormlChance = (Math.random()*100)+1;
        
        if (player.shop.NormcChance>=0)  
        player.shop.Common_Runes = player.shop.Common_Runes.add(1)
        
        if (player.shop.NormcChance>=0&&player.shop.NormuChance>0.5)
         
         
        player.shop.Uncommon_Runes = player.shop.Uncommon_Runes.add(1)
        
        if (player.shop.NormcChance>0&&player.shop.NormrChance>=3)
        player.shop.Common_Runes = player.shop.Common_Runes.sub(1), 
        player.shop.Rare_Runes = player.shop.Rare_Runes.add(1)
        
        if (player.shop.NormcChance>=0&&player.shop.NormeChance>=10)
        player.shop.Common_Runes = player.shop.Common_Runes.sub(1), 
        player.shop.Epic_Runes =player.shop.Epic_Runes.add(1)
        
        if (player.shop.NormcChance>=0&&player.shop.NormlChance>=100)
        player.shop.Common_Runes = player.shop.Common_Runes.sub(1), 
        player.shop.Legendary_Runes = player.shop.Legendary_Runes.add(1)
        
        
      }, 
      style: {
        'border-radius'() {
          return "5%"
        },
        'width'() {
          return "700px"
        },
        'min-height'() {
          return "110px"
        },
        'font-size'() {
          return "30px"
        },
      
        'background-color'() {
                let color = "#bf8f8f"
                if (tmp.shop.clickables[31].canClick) color = "#5c5c5c"
                return color
          },
      },
    },
  },
  tabFormat: {
    Main: {
      content: [
        [
          "display-text",
          function () {
            return "You have " + format(player.points) + " money";
          },
          {
            /*color: "#fc3d3d",*/ "font-size":
              "30px" /*  "font-family": "Lexend"*/,
          },
        ],
        "blank",
        [
          "display-text",
          function () {
            return "You have<h2 style='color:#a3a3a3;text-shadow:0px 0px 10px;'> " + format(player.shop.Buttons) + "</h2> Buttons";
          },
          {
            /*color: "#fc3d3d",*/ "font-size":
              "22px" /*  "font-family": "Lexend"*/,
          },
        ],
        
        "blank",
        "buyables",
      ],
    },
    Runes: {
      content: [
         ["display-text",
          function () {
            return "Normal Rune";
          },{
           "font-size":"80px", "font-family": "Lexend", "font-color": "grey",
          },
        ],                
        "blank",
        ["bar", "Common Runes"],
        ["bar", "Uncommon Runes"],
        ["bar", "Rare Runes"],
        ["bar", "Epic Runes"],
        ["bar", "Legendary Runes"],
         
         
        "clickables",
      ],
      
      buttonStyle() {return {'border-color': '#5c5c5c'}},
      
    },
    'Button Generators': {
      content: [
         [
          "display-text",
          function () {
            return "You have " + format(player.points) + " money";
          },
          {
            /*color: "#fc3d3d",*/ "font-size":
              "30px" /*  "font-family": "Lexend"*/,
          },
        ],
        "blank",
        [
          "display-text",
          function () {
            return "You have<h2 style='color:#a3a3a3;text-shadow:0px 0px 10px;'> " + format(player.shop.Buttons) + "</h2> Buttons";
          },
          {
            /*color: "#fc3d3d",*/ "font-size":
              "40px" /*  "font-family": "Lexend"*/,
          },
        ],
      ],
      
      buttonStyle() {return {'border-color': '#9c9c9c'}},
      
    },
  },
  microTabs: {
    'Generator System': {
      Generators: {
        
      },
      'Level up': {
        
      },
    },
  },
    
}); //Shop for buying Items
addLayer("bm", {
  name: "button multiplier", // This is optional, only used in a few places, If absent it just uses the layer id.
  symbol: "BM", // This appears on the layer's node. Default is the id with the first letter capitalized
  position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
  startData() {
    return {
      unlocked: true,
      points: new Decimal(0),
      multiplier: new Decimal(0),
      multipliercalculate: new Decimal(0),
      
    };
  },
  tooltip: "Button Multiplier",
  color: "#fc3d3d",
  requires: new Decimal(10), // Can be a function that takes requirement increases into account
  resource: "", // Name of prestige currency
  baseResource: "money", // Name of resource prestige is based on
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
  
clickables: {
    11: {
       title: "4 Money = 1 Multiplier Button Get: 0.01     ",
       canClick() {
         if (player.points.gte(4)) return true;
       },
       onClick() {
         player.points = player.points.sub(4);
         player.bm.multiplier = player.bm.multiplier.add(this.effect());
         player.shop.Buttons = player.shop.Buttons.add(199894.03);
       },
       effect() {
         let eff = player.bm.multipliercalculate.add(1);
         if (player.shop.unlocked) eff = eff.times(buyableEffect("shop", 12))
         if (player.r.unlocked) eff = eff.times(tmp.custom.effect)
         
         return eff;
       },
       
     },
     12: {
       title: "23 Money = Multiplier Button Get: 0.012    ",
       canClick() {
         if (player.points.gte(23)) return true;
       },
       onClick() {
         player.points = player.points.sub(23);
         player.bm.multiplier = player.bm.multiplier.add(this.effect());
         player.shop.Buttons = player.shop.Buttons.add(0.012);
       },
       effect() {
         let eff = player.bm.multipliercalculate.add(3);
         if (player.shop.unlocked) eff = eff.times(buyableEffect("shop", 12))
         if (player.r.unlocked) eff = eff.times(tmp.custom.effect)
         
         return eff;
       },
     },
     13: {
       title: "145 Money = 6 Multiplier    Button Get: 0.015    ",
       canClick() {
         if (player.points.gte(145)) return true;
       },
       onClick() {
         player.points = player.points.sub(145);
         player.bm.multiplier = player.bm.multiplier.add(this.effect());
         player.shop.Buttons = player.shop.Buttons.add(0.045);
       },
       effect() {
         let eff = player.bm.multipliercalculate.add(6);
         if (player.shop.unlocked) eff = eff.times(buyableEffect("shop", 12))
         if (player.r.unlocked) eff = eff.times(tmp.custom.effect)
         
         return eff;
       },
     },
     14: {
       title: "670 Money = 22 Multiplier   Button Get: 0.017    ",
       canClick() {
         if (player.points.gte(670)) return true;
       },
       onClick() {
         player.points = player.points.sub(670);
         player.bm.multiplier = player.bm.multiplier.add(this.effect());
         player.shop.Buttons = player.shop.Buttons.add(0.051);
       },
       effect() {
         let eff = player.bm.multipliercalculate.add(22);
         if (player.shop.unlocked) eff = eff.times(buyableEffect("shop", 12))
         if (player.r.unlocked) eff = eff.times(tmp.custom.effect)
         
         return eff;
       },
     },
     21: {
       title: "2150 Money = 65 Multiplier   Button Get: 0.019    ",
       canClick() {
         if (player.points.gte(2150)) return true;
       },
       onClick() {
         player.points = player.points.sub(2150);
         player.bm.multiplier = player.bm.multiplier.add(this.effect());
         player.shop.Buttons = player.shop.Buttons.add(0.057);
       },
       effect() {
         let eff = player.bm.multipliercalculate.add(65);
         if (player.shop.unlocked) eff = eff.times(buyableEffect("shop", 12))
         if (player.r.unlocked) eff = eff.times(tmp.custom.effect)
         
         return eff;
       },
     },
     22: {
       title: "7680 Money = 150 Multiplier",
       canClick() {
         if (player.points.gte(7680)) return true;
       },
       onClick() {
         player.points = player.points.sub(7680);
         player.bm.multiplier = player.bm.multiplier.add(this.effect());
         player.shop.Buttons = player.shop.Buttons.add(0.69);
       },
       effect() {
         let eff = player.bm.multipliercalculate.add(150);
         if (player.shop.unlocked) eff = eff.times(buyableEffect("shop", 12))
         if (player.r.unlocked) eff = eff.times(tmp.custom.effect)
         
         return eff;
       },
     },
     23: {
       title: "20360 Money = 284 Multiplier",
       canClick() {
         if (player.points.gte(20360)) return true;
       },
       onClick() {
         player.points = player.points.sub(20360);
         player.bm.multiplier = player.bm.multiplier.add(this.effect());
         player.shop.Buttons = player.shop.Buttons.add(0.075);
       },
       effect() {
         let eff = player.bm.multipliercalculate.add(284);
         if (player.shop.unlocked) eff = eff.times(buyableEffect("shop", 12))
         if (player.r.unlocked) eff = eff.times(tmp.custom.effect)
         
         return eff;
       },
     },
     24: {
       title: "53890 Money = 284 Multiplier",
       canClick() {
         if (player.points.gte(53890)) return true;
       },
       onClick() {
         player.points = player.points.sub(53890);
         player.bm.multiplier = player.bm.multiplier.add(this.effect());
         player.shop.Buttons = player.shop.Buttons.add(0.081);
       },
       effect() {
         let eff = player.bm.multipliercalculate.add(284);
         if (player.shop.unlocked) eff = eff.times(buyableEffect("shop", 12))
         if (player.r.unlocked) eff = eff.times(tmp.custom.effect)
         
         return eff;
       },
     },
     31: {
       title: "99999 Money = 999 Multiplier",
       canClick() {
         if (player.points.gte(99999)) return true;
       },
       onClick() {
         player.points = player.points.sub(99999);
         player.bm.multiplier = player.bm.multiplier.add(this.effect());
         player.shop.Buttons = player.shop.Buttons.add(0.09);
       },
       effect() {
         let eff = player.bm.multipliercalculate.add(999);
         if (player.shop.unlocked) eff = eff.times(buyableEffect("shop", 12))
         if (player.r.unlocked) eff = eff.times(tmp.custom.effect)
         
         return eff;
       },
     },
     32: {
       title: "141650 Money = 1390 Multiplier",
       canClick() {
         if (player.points.gte(141650)) return true;
       },
       onClick() {
         player.points = player.points.sub(141650);
         player.bm.multiplier = player.bm.multiplier.add(this.effect());
         player.shop.Buttons = player.shop.Buttons.add(0.096);
       },
       effect() {
         let eff = player.bm.multipliercalculate.add(1390);
         if (player.shop.unlocked) eff = eff.times(buyableEffect("shop", 12))
         if (player.r.unlocked) eff = eff.times(tmp.custom.effect)
         
         return eff;
       },
     },
     33: {
       title: "204790 Money = 1850 Multiplier",
       canClick() {
         if (player.points.gte(204790)) return true;
       },
       onClick() {
         player.points = player.points.sub(204790);
         player.bm.multiplier = player.bm.multiplier.add(this.effect());
         player.shop.Buttons = player.shop.Buttons.add(0.102);
       },
       effect() {
         let eff = player.bm.multipliercalculate.add(1850);
         if (player.shop.unlocked) eff = eff.times(buyableEffect("shop", 12))
         if (player.r.unlocked) eff = eff.times(tmp.custom.effect)
         
         return eff;
       },
     },
     34: {
       title: "369710 Money = 2630 Multiplier",
       canClick() {
         if (player.points.gte(369710)) return true;
       },
       onClick() {
         player.points = player.points.sub(369710);
         player.bm.multiplier = player.bm.multiplier.add(this.effect());
         player.shop.Buttons = player.shop.Buttons.add(0.111);
       },
       effect() {
         let eff = player.bm.multipliercalculate.add(2630);
         if (player.shop.unlocked) eff = eff.times(buyableEffect("shop", 12))
         if (player.r.unlocked) eff = eff.times(tmp.custom.effect)
         
         return eff;
       },
     },
     41: {
       title: "369710 Money = 2630 Multiplier",
       canClick() {
         if (player.points.gte(369710)) return true;
       },
       onClick() {
         player.points = player.points.sub(369710);
         player.bm.multiplier = player.bm.multiplier.add(this.effect());
         player.shop.Buttons = player.shop.Buttons.add(0.111);
       },
       effect() {
         let eff = player.bm.multipliercalculate.add(2630);
         if (player.shop.unlocked) eff = eff.times(buyableEffect("shop", 12))
         if (player.r.unlocked) eff = eff.times(tmp.custom.effect)
         
         return eff;
       },
     },
  },
  tabFormat: {
    Main: {
      content: [
        function () {
          if (player.tab == "bm") return "resource-display";
        },
        [
          "display-text",
          function () {
            return (
              "There is <h2 style='color:#fc3d3d;text-shadow:0px 0px 10px;'>" +
              format(player.bm.multiplier) +
              "</h2> multiplier"
            );
          },
          { color: "#fc3d3d", "font-size": "27px", "font-family": "Lexend" },
        ],
        "blank",
        "clickables",
      ],
    },
  },
}); //Multipliers Button Layer
addLayer("r", {
  name: "Rebirths", // This is optional, only used in a few places, If absent it just uses the layer id.
  symbol: "R", // This appears on the layer's node. Default is the id with the first letter capitalized
  position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
  startData() {
    return {
      unlocked: true,
      points: new Decimal(0),
      rebirth: new Decimal(0),
      rebirthcalculate: new Decimal(0),
    };
  },
  tooltip: "Rebirths",
  color: "#1bace7",
  requires: new Decimal(0), // Can be a function that takes requirement increases into account
  resource: "", // Name of prestige currency
  baseResource: "money", // Name of resource prestige is based on
  baseAmount() {
    return player.points;
  }, // Get the current amount of baseResource
  type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
  branches: ["bm"],
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
  row: 2, // Row the layer is in on the tree (0 is the first row)
  hotkeys: [
    {
      key: "r",
      description: "M: Reset for Multiplier(Cannot)",
      onPress() {
        if (canReset(this.layer)) doReset(this.layer);
      },
    },
  ],
  layerShown() {
    return true;
  },
 clickables: {
    11: {
      title: "1250 Multiplier = 1 Rebirth",
      canClick() {
        if(player.bm.multiplier.gte(1250)) return true;
      },
      onClick() {
        player.points = player.points.times(0)
        player.bm.multiplier = player.bm.multiplier.times(0)
        player.r.rebirth = player.r.rebirth.add(1);
        
      },
      effect() {
        let eff = player.r.rebirthcalculate.add(1)
        
        return eff;
      },
      style: {
      'font-size': "10px"
      },
        
    },
    12: {
      title: "4660 Multiplier = 3 rebirth",
      canClick() {
        if(player.bm.multiplier.gte(4660)) return true;
      },
      onClick() {
        player.points = player.points.times(0)
        player.bm.multiplier = player.bm.multiplier.times(0);
        player.r.rebirth = player.r.rebirth.add(this.effect());
        
      },
      effect() {
        let eff = player.r.rebirthcalculate.add(3)
        
        return eff;
      },
    },
    13: {
      title: "10290 Multiplier = 7 rebirth",
      canClick() {
        if(player.bm.multiplier.gte(10290)) return true;
      },
      onClick() {
        player.points = player.points.times(0)
        player.bm.multiplier = player.bm.multiplier.times(0);
        player.r.rebirth = player.r.rebirth.add(this.effect());
        
      },
      effect() {
        let eff = player.r.rebirthcalculate.add(7)
        
        return eff;
      },
    },
    21: {
      title: "23430 Multiplier = 15 rebirth",
      canClick() {
        if(player.bm.multiplier.gte(23430)) return true;
      },
      onClick() {
        player.points = player.points.times(0)
        player.bm.multiplier = player.bm.multiplier.times(0);
        player.r.rebirth = player.r.rebirth.add(this.effect());
        
      },
      effect() {
        let eff = player.r.rebirthcalculate.add(15)
        
        return eff;
      },
    },
    22: {
      title: "41740 Multiplier = 27 rebirth",
      canClick() {
        if(player.bm.multiplier.gte(41740)) return true;
      },
      onClick() {
        player.points = player.points.times(0)
        player.bm.multiplier = player.bm.multiplier.times(0);
        player.r.rebirth = player.r.rebirth.add(this.effect());
        
      },
      effect() {
        let eff = player.r.rebirthcalculate.add(27)
        
        return eff;
      },
    },
    23: {
      title: "110090 Multiplier = 71 rebirth",
      canClick() {
        if(player.bm.multiplier.gte(110090)) return true;
      },
      onClick() {
        player.points = player.points.times(0)
        player.bm.multiplier = player.bm.multiplier.times(0);
        player.r.rebirth = player.r.rebirth.add(this.effect());
        
      },
      effect() {
        let eff = player.r.rebirthcalculate.add(71)
        
        return eff;
      },
    },
    31: {
      title: "354780 Multiplier = 123 rebirth",
      canClick() {
        if(player.bm.multiplier.gte(354780)) return true;
      },
      onClick() {
        player.points = player.points.times(0)
        player.bm.multiplier = player.bm.multiplier.times(0);
        player.r.rebirth = player.r.rebirth.add(this.effect());
        
      },
      effect() {
        let eff = player.r.rebirthcalculate.add(123)
        
        return eff;
      },
    },
    32: {
      
      title: "876210 Multiplier = 231 rebirth",
      canClick() {
        if(player.bm.multiplier.gte(876210)) return true;
      },
      onClick() {
        player.points = player.points.times(0)
        player.bm.multiplier = player.bm.multiplier.times(0);
        player.r.rebirth = player.r.rebirth.add(this.effect());
        
      },
      effect() {
        let eff = player.r.rebirthcalculate.add(231)
        
        return eff;
      },
    },
    33: {
      title: "1454000 Multiplier = 355 rebirth",
      canClick() {
        if(player.bm.multiplier.gte(1454000)) return true;
      },
      onClick() {
        player.points = player.points.times(0)
        player.bm.multiplier = player.bm.multiplier.times(0);
        player.r.rebirth = player.r.rebirth.add(this.effect());
        
      },
      effect() {
        let eff = player.r.rebirthcalculate.add(355)
        
        return eff;
      },
    },
  },
  tabFormat: {
    Main: {
      content: [
        [
          "display-text",
          function () {
            return "You have " + format(player.points) + " money";
          },
          {
            /*color: "#fc3d3d",*/ "font-size":
              "27px" /*  "font-family": "Lexend"*/,
          },
        ],
        "blank",
        "blank",
        [
          "display-text",
          function () {
            return (
              "You have <h2 style='color:#1bace7;text-shadow:0px 0px 10px;'>" +
              format(player.r.rebirth) +
              "</h2> Rebirths"
            );
          },
          {
            /*color: "#fc3d3d",*/ "font-size":
              "22px" /* "font-family": "Lexend"*/,
          },
        ],
        "blank",
        [
          "display-text",
          function () {
            return (
              "You have <h2 style='color:#fc3d3d;text-shadow:0px 0px 10px;'>" +
              format(player.bm.multiplier) +
              "</h2> Multiplier"
            );
          },
          {
            /*color: "#fc3d3d",*/ "font-size":
              "22px" /* "font-family": "Lexend"*/,
          },
        ],
        "blank",
        "clickables",
      ],
    },
  },
}); //Rebirths Button Layer
addLayer("ur", {
  name: "ultra rebirths", // This is optional, only used in a few places, If absent it just uses the layer id.
  symbol: "UR", // This appears on the layer's node. Default is the id with the first letter capitalized
  position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
  startData() {
    return {
      unlocked: false,
      points: new Decimal(0),
      best: new Decimal(0),
      total: new Decimal(0),
      pseudoUpgs: [],
    };
  },
  nodeStyle() {
    return {
      background:
        player.ur.unlocked || canReset("ur")
          ? "radial-gradient(#1bace7, #962eff)"
          : "#962eff",
    };
  },
  componentStyles: {
    "prestige-button"() {
      return {
        background: canReset("ur")
          ? "radial-gradient(#1bace7, #962eff)"
          : "#962eff",
      };
    },
  },
  color: "#962eff",
  requires: new Decimal(1), // Can be a function that takes requirement increases into account
  resource: "ultra rebirths(rebirth-converted)", // Name of prestige currency
  baseResource: "rebirths", // Name of resource prestige is based on
  baseAmount() {
    return player.points;
  }, // Get the current amount of baseResource
  type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
  branches: ["r"],
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
  row: 3, // Row the layer is in on the tree (0 is the first row)
  hotkeys: [
    {
      key: "r",
      description: "R: Reset for rebirth points",
      onPress() {
        if (canReset(this.layer)) doReset(this.layer);
      },
    },
  ],
  layerShown() {
    return false; //player.r.unlocked;
  },

  effect() {
    let eff = player.ur.points.plus(1).pow(1);

    return eff; //Above is next layer button multipliers
  },
}); //Ultra Rebirths Button Layer
addLayer("p", {
  name: "prestiges", // This is optional, only used in a few places, If absent it just uses the layer id.
  symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
  position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
  startData() {
    return {
      unlocked: false,
      points: new Decimal(0),
      best: new Decimal(0),
      total: new Decimal(0),
      pseudoUpgs: [],
    };
  },
  color: "#fff780",
  requires: new Decimal(1), // Can be a function that takes requirement increases into account
  resource: "prestiges(utra rebirths-converted)", // Name of prestige currency
  baseResource: "rebirths", // Name of resource prestige is based on
  baseAmount() {
    return player.points;
  }, // Get the current amount of baseResource
  type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
  branches: ["ur"],
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
  row: 4, // Row the layer is in on the tree (0 is the first row)
  hotkeys: [
    {
      key: "r",
      description: "R: Reset for rebirth points",
      onPress() {
        if (canReset(this.layer)) doReset(this.layer);
      },
    },
  ],
  layerShown() {
    return player.ur.unlocked;
  },
}); //Prestiges Button Layer
addLayer("up", {
  name: "ultra prestiges", // This is optional, only used in a few places, If absent it just uses the layer id.
  symbol: "UP", // This appears on the layer's node. Default is the id with the first letter capitalized
  position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
  startData() {
    return {
      unlocked: false,
      points: new Decimal(0),
      best: new Decimal(0),
      total: new Decimal(0),
      pseudoUpgs: [],
    };
  },
  nodeStyle() {
    return {
      background:
        player.p.unlocked || canReset("up")
          ? "radial-gradient(#fffb00, #ff8f00)"
          : "#ff8f00de",
    };
  },
  componentStyles: {
    "prestige-button"() {
      return {
        background: canReset("up")
          ? "radial-gradient(#fffb00, #ff8f00)"
          : "#ff8f00de",
      };
    },
  },
  color: "#fffb00",
  requires: new Decimal(1), // Can be a function that takes requirement increases into account
  resource: "ultra prestiges(prestiges-converted)", // Name of prestige currency
  baseResource: "prestiges", // Name of resource prestige is based on
  baseAmount() {
    return player.points;
  }, // Get the current amount of baseResource
  type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
  branches: ["p"],
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
  row: 5, // Row the layer is in on the tree (0 is the first row)
  hotkeys: [
    {
      key: "r",
      description: "R: Reset for rebirth points",
      onPress() {
        if (canReset(this.layer)) doReset(this.layer);
      },
    },
  ],
  layerShown() {
    return player.p.unlocked;
  },
}); //Ultra Prestige Button Layer
