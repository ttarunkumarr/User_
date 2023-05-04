import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import "./OptionBox.css";

export default function OptionBox({ option }) {
  const [quantity, setQuantity] = useState(0);
  const history = useHistory();
  const boxRef = useRef(null);

  const handleSelect = () => {
    
    history.push({
      pathname: "/table",
      state: {
        quantity: quantity,
        name: option.name,
      },
    });
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 0) {
      newQuantity = 0;
    } else if (newQuantity >= 30) {
      newQuantity = 30;
    }
    setQuantity(newQuantity);
  };
  

  const handleScroll = (event) => {
    event.preventDefault();
    const delta = Math.sign(event.deltaY);
    const newQuantity = quantity + delta;
    handleQuantityChange(newQuantity);
  };

  useEffect(() => {
    const boxElement = boxRef.current;
    boxElement.addEventListener("wheel", handleScroll, { passive: false });
    return () => {
      boxElement.removeEventListener("wheel", handleScroll);
    };
  }, [quantity]);

  return (
    <div className="box-container" ref={boxRef}>
      <div>
        <div className="Heading">
          {option.name}
          <img
            src={
              option.name === "Java Developer"
                ? require("./java.png")
                : require("./js.png")
            }
          />
        </div>
        <div className="input-hol">
          
          <input
            className="num"
            type="number"
            id={`quantity-${option.id}`}
            value={quantity}
            onChange={(event) =>
              handleQuantityChange(parseInt(event.target.value))
            }
            min="0"
            max="30"
            
          />
          <span>Years of</span>
          <label htmlFor={`Experience-${option.id}`}>Experience</label>
        </div>
      </div>
      <button className="button-s" onClick={handleSelect}>
        Search
      </button>
    </div>
  );
}
