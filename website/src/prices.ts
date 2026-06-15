const Prices = {
  main: {
    x1: 1500,
    x2: 2700, // 1350 €/slot
    x4: 5000, // 1250 €/slot
    x8: 9600, // 1200 €/slot
  },
  second: {
    x1: 800,
    x2: 1300, // 650 €/slot
    x4: 2200, // 550 €/slot
    x8: 4000, // 500 €/slot
  },
  quickLinkReact: {
    x1: 550,
    x2: 900, // 450 €/slot
    x4: 1600, // 400 €/slot
    x8: 3000, // 375 €/slot
  },
  quickLinkReactNative: {
    x1: 200,
    x2: 400, // 200 €/slot
    x4: 600, // 150 €/slot
    x8: 1000, // 125 €/slot
  },
} as const;

export default Prices;
