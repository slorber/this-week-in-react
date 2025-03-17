import React, { ReactNode, useState, ComponentProps } from "react";
import Prices from "@site/src/prices";

type State = {
  main: number;
  second: number;
  quickLinkReact: number;
  quickLinkReactNative: number;
};

type PriceLevel = 1 | 2 | 4 | 8;

function computeUnitSlotPrice(offer: keyof State, level: PriceLevel): number {
  const levelKey = `x${level}` as const;
  return roundPrice(Prices[offer][levelKey] / level);
}

function computeBundlePrice(state: State): {
  price: number;
  level: PriceLevel;
  range: { min: number; max: number };
} {
  function computePriceLevel(level: PriceLevel): number {
    const key = `x${level}` as const;
    return (
      state.main * (Prices.main[key] / level) +
      state.second * (Prices.second[key] / level) +
      state.quickLinkReact * (Prices.quickLinkReact[key] / level) +
      state.quickLinkReactNative * (Prices.quickLinkReactNative[key] / level)
    );
  }

  const pricesX1 = computePriceLevel(1);
  const pricesX2 = computePriceLevel(2);
  const pricesX4 = computePriceLevel(4);
  const pricesX8 = computePriceLevel(8);

  // console.log({ pricesX1, pricesX2, pricesX4, pricesX8 });

  if (pricesX1 < 1200) {
    return { level: 1, range: { min: 0, max: 1200 }, price: pricesX1 };
  } else if (pricesX2 < 2500) {
    return { level: 2, range: { min: 1300, max: 2500 }, price: pricesX2 };
  } else if (pricesX4 < 4500) {
    return { level: 4, range: { min: 2500, max: 4500 }, price: pricesX4 };
  } else {
    return { level: 8, range: { min: 4500, max: Infinity }, price: pricesX8 };
  }
}

function roundPrice(price: number): number {
  return Math.round(price / 10) * 10;
}

export default function PriceCalculator(): ReactNode {
  const [state, setState] = useState<State>({
    main: 0,
    second: 0,
    quickLinkReact: 0,
    quickLinkReactNative: 0,
  });

  const { price, level, range } = computeBundlePrice(state);

  // console.log({ price });

  function createSlotLine(label: string, offer: keyof typeof state) {
    return (
      <SlotLine
        label={label}
        quantity={state[offer]}
        onQuantityChange={(newQuantity) => {
          setState((s) => ({
            ...s,
            [offer]: newQuantity,
          }));
        }}
        unitPrice={computeUnitSlotPrice(offer, level)}
      />
    );
  }

  return (
    <section style={{ padding: 10 }}>
      <div>
        {createSlotLine("1st sponsor slots", "main")}
        {createSlotLine("2nd sponsor slots", "second")}
        {createSlotLine("React Link slots", "quickLinkReact")}
        {createSlotLine("React Native Link slots", "quickLinkReactNative")}
      </div>

      <div>
        <span style={{ marginTop: 20, fontSize: 30 }}>
          <span>
            <strong>Total Price</strong> ={" "}
          </span>
          <span>
            <strong style={{ color: "red" }}>{roundPrice(price)} €</strong>
          </span>
        </span>
        <div style={{ marginTop: 20 }}>
          Price level {level} - Range ${range.min}€ - ${range.max}€
        </div>
      </div>
    </section>
  );
}

function SlotLine({
  label,
  quantity,
  onQuantityChange,
  unitPrice,
}: {
  label: string;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  unitPrice: number;
}) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: 600,
        }}
      >
        <div style={{ flex: 1 }}>
          <span style={{ fontSize: 24 }}>
            <strong style={{ color: "red" }}>{quantity}</strong>
            <strong>{" × "}</strong>
          </span>
          <strong>{label}</strong>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <input
            type="range"
            value={quantity}
            onChange={(e) => onQuantityChange(e.target.valueAsNumber)}
            min="0"
            max="10"
          />
          <div style={{ width: 100 }}>Unit={unitPrice}€</div>
        </div>
      </div>
    </div>
  );
}
