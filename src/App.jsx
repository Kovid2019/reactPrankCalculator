import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Button } from "./Button";
import errorBgm from "./assets/errorBgm.mp3";

const audio = new Audio(errorBgm);
const operators = ["%", "/", "*", "-", "+"];
const App = () => {
  const [strToDisplay, setStrToDisplay] = useState("");
  const [lastOperator, setLastOperator] = useState("");
  const [isMouseDown, setIsMouseDown] = useState();
  const [isPrank, setIsprank] = useState(false);
  const isEventAttached = useRef(false);
  useEffect(() => {
    //Binding keyboard with browser app
    !isEventAttached.current &&
      window.addEventListener("keypress", (e) => {
        const value = e.key;
        if (e.code.includes("Key")) {
          return;
        }
        buttonAction(value);
      });

    isEventAttached.current = true;
  }, []);
  const buttonAction = (value) => {
    // displayElm.classList.remove("prank");
    isPrank && setIsprank(false);

    if (value === "AC") {
      setStrToDisplay("");
      return;
    }
    if (value === "C") {
      setStrToDisplay(strToDisplay.slice(0, -1));

      return;
    }
    if (value === "=" || value === "Enter") {
      setLastOperator("");
      //Get the last character
      const lastChar = strToDisplay[strToDisplay.length - 1];
      //Check if it is one of the operators
      if (operators.includes(lastChar)) {
        setStrToDisplay(strToDisplay.slice(0, -1));
      }

      return displayTotal();
    }
    // Show only the last clicked operator
    if (operators.includes(value)) {
      setLastOperator(value);
      //Get the last char
      const lastChar = strToDisplay[strToDisplay.length - 1];
      if (operators.includes(lastChar)) {
        setStrToDisplay(strToDisplay.slice(0, -1) + value);
        return;
      }
    }
    //Handle the dot click
    if (value === ".") {
      const lastOperatorIndex = strToDisplay.lastIndexOf(lastOperator);

      const lastNumberSet = strToDisplay.slice(lastOperatorIndex);
      // console.log(lastNumberSet);

      if (lastNumberSet.includes(".")) {
        return;
      }
      if (!lastOperator && strToDisplay.includes(".")) {
        return;
      }
    }
    setStrToDisplay(strToDisplay + value);
  };

  //Calculate total
  const displayTotal = () => {
    const extraValue = randomValue();
    if (extraValue) {
      setIsprank(true);
      audio.play();
    }
    const total = eval(strToDisplay) + extraValue;
    setStrToDisplay(total.toString());
  };

  const randomValue = () => {
    const num = Math.round(Math.random() * 10); //0-10
    return num < 4 ? num : 0;
  };

  const handleOnButtonClick = (value) => {
    setIsMouseDown();
    buttonAction(value);
  };

  const handleOnMouseDown = (value) => {
    setIsMouseDown(value);
  };

  const btns = [
    {
      cls: "btn-ac",
      label: "AC",
    },
    {
      cls: "btn-c",
      label: "C",
    },
    {
      cls: "btn-per",
      label: "%",
    },
    {
      cls: "btn-divide",
      label: "/",
    },
    {
      cls: "btn-7",
      label: "7",
    },
    {
      cls: "btn-8",
      label: "8",
    },
    {
      cls: "btn-9",
      label: "9",
    },
    {
      cls: "btn-x",
      label: "*",
    },
    {
      cls: "btn-4",
      label: "4",
    },
    {
      cls: "btn-5",
      label: "5",
    },
    {
      cls: "btn-6",
      label: "6",
    },
    {
      cls: "btn-minus",
      label: "-",
    },
    {
      cls: "btn-1",
      label: "1",
    },
    {
      cls: "btn-2",
      label: "2",
    },
    {
      cls: "btn-3",
      label: "3",
    },
    {
      cls: "btn-plus",
      label: "+",
    },
    {
      cls: "btn-0",
      label: "0",
    },
    {
      cls: "btn-dot",
      label: ".",
    },
    {
      cls: "btn-equal",
      label: "=",
    },
  ];

  return (
    <>
      <div className="wrapper flex-center">
        <div className="calculator">
          <div
            className={
              isPrank
                ? "display arbutus-regular prank"
                : "display arbutus-regular"
            }
          >
            {strToDisplay || "0.00"}
          </div>

          {btns.map((btn, i) => (
            <Button
              key={i}
              {...btn}
              handleOnButtonClick={handleOnButtonClick}
              handleOnMouseDown={handleOnMouseDown}
              isMouseDown={isMouseDown}
            />
            // <Button key={i} cls={btn.cls} label={btn.label} />
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
