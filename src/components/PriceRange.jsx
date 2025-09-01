import * as React from "react";
import { Range, getTrackBackground } from "react-range";

const STEP = 5;
const MIN = 0;
const MAX = 500;

const PriceRange = ({ priceMin, setPriceMin, priceMax, setPriceMax }) => {
  const [values, setValues] = React.useState([priceMin, priceMax]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        flex: 1,
      }}
    >
      <Range
        values={values}
        step={STEP}
        min={MIN}
        max={MAX}
        onChange={(values) => {
          setValues(values);
          setPriceMin(values[0]);
          setPriceMax(values[1]);
        }}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: "36px",
              display: "flex",
              width: "100%",
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: "5px",
                width: "100%",
                borderRadius: "4px",
                background: getTrackBackground({
                  values,
                  colors: ["#ccc", "var(--vinted-color)", "#ccc"],
                  min: MIN,
                  max: MAX,
                }),
                alignSelf: "center",
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ index, props }) => (
          <div
            {...props}
            key={props.key}
            style={{
              ...props.style,
              height: "15px",
              width: "15px",
              borderRadius: "50%",
              backgroundColor: "var(--vinted-color)",
              border: "1px solid white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-28px",
                color: "#fff",
                fontSize: "12px",
                padding: "4px",
                borderRadius: "4px",
                backgroundColor: "var(--vinted-color)",
              }}
            >
              {values[index].toFixed(0)}&nbsp;€
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default PriceRange;
