import clsx from "clsx";
import React, { memo} from "react";
import { useCalculator } from "./hooks";

function Screen({ children }) {

  return (
      <div
        className={clsx(
          "flex justify-end items-center rounded-lg p-6 pb-4 relative",
          "text-3xl sm:text-5xl font-bold",
          "blue:bg-blue-600",
          "pink:bg-pink-400",
          "purple:bg-purple-500"
        )}
      >
        <output>{children}</output>

           {/* <div
            className={clsx(
              "absolute top-2 left-2  text-xl sm:text-xl ",
            )}
          > 
            
          </div> */}
      </div>
  );
}

function Button({ type = "button", children, className, ...props }) {
  return (
    <button
      type={type}
      className={clsx(
        "rounded sm:rounded-full font-bold",
        "shadow-normal active:shadow-pressed active:brightness-110",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

function Toggle({ children, className, name, checked, ...props }) {
  return (
    <div>
      <input
        type="radio"
        id={children}
        name={name}
        className="hidden peer"
        defaultChecked={checked}
      />

      <label
        className={clsx(
          "h-full rounded sm:rounded-full font-bold",
          "shadow-normal peer-checked:brightness-110",
          className
        )}
        {...props}
        htmlFor={children}
      >
        {children}
      </label>
    </div>
  );
}

const Keypad = memo(
  ({ operator, actions: { reset, push, remove, operate, enter } }) => {
    function Number({ className, ...props }) {

      return (
        <Button
          className={clsx(
            "text-3xl",
            "blue:text-blue-900 blue:bg-blue-100 blue:ring-gray-100",
            "pink:text-gray-200 pink:bg-pink-400 pink:ring-gray-200",
            "purple:text-purple-800 purple:bg-purple-200 purple:ring-gray-200",
            className
          )}       
          onClick={push(props.children)}     
          {...props}
        />
      );
    }

    function Sqrt({ className, ...props }) {
      return (
        <Button
        className={clsx(
          "text-3xl flex justify-center items-center",
          "blue:text-blue-500 blue:bg-white blue:ring-gray-300",
          "pink:text-pink-600 pink:bg-gray-200 pink:ring-gray-400",
          "purple:text-purple-200 purple:bg-purple-600 purple:ring-gray-300"
        )}
          onClick={push(props.children)}
          {...props}
        />
      );
    }

    function Fraction(props) {
      return <Number {...props} />;
    }

    function Operator(props) {
      return (
        <Toggle
          name="operator"
          className={clsx(
            "text-3xl flex justify-center items-center",
            "blue:text-blue-500 blue:bg-white blue:ring-gray-300",
            "pink:text-pink-600 pink:bg-gray-200 pink:ring-gray-400",
            "purple:text-purple-200 purple:bg-purple-600 purple:ring-gray-300"
          )}
          checked={operator === props.children}
          onClick={operate(props.children) }
          {...props}
        />
      );
    }

    function Del({ className, ...props }) {
      return (
        <Button
          className={clsx(
            "col-span-2",
            "blue:bg-purple-400 blue:ring-gray-300",
            "pink:text-white pink:bg-blue-300 pink:ring-gray-300",
            "purple:bg-pink-300 purple:ring-gray-300",
            className
          )}
          onClick={remove()}
          {...props}
        />
      );
    }

    function Reset({ className, ...props }) {
      return (
        <Del
          type="reset"
          className={clsx("col-span-2", className)}
          onClick={reset()}
          {...props}
        />
      );
    }

    function Enter({ className, ...props }) {
      return (
        <Button
          className={clsx(
            "col-span-2",
            "blue:bg-red-500 blue:ring-gray-300",
            "pink:bg-red-500 pink:ring-gray-300 pink:text-white",
            "purple:bg-red-500 purple:ring-gray-300 purple:text-white",
            className
          )}
          onClick={enter()}
          {...props}
        />
      );
    }

    return (
      <div
        className={clsx(
          "p-6 rounded-lg min-h-[30rem]",
          "grid grid-cols-4 gap-3 sm:gap-4",
          "blue:bg-blue-500",
          "pink:bg-pink-300",
          "purple:bg-purple-500"
        )}
      >
        <Sqrt>²√x</Sqrt>
        <Operator>xʸ</Operator>
        <Del> ↩ D E L E T E</Del>

        <Number>7</Number>
        <Number>8</Number>
        <Number>9</Number>
        <Operator>+</Operator>

        <Number>4</Number>
        <Number>5</Number>
        <Number>6</Number>
        <Operator>-</Operator>

        <Number>1</Number>
        <Number>2</Number>
        <Number>3</Number>
        <Operator>x</Operator>

        <Fraction>.</Fraction>
        <Number>0</Number>
        <Number>%</Number>
        <Operator>÷</Operator>
        

        <Reset>R E S E T</Reset>
        <Enter>=</Enter>
      </div>
    );
  }
);

export function Calculator() {
  const { output, operator, actions } = useCalculator();

  return (
    <form className="flex flex-col gap-6">
      <Screen>{output}</Screen>

      <Keypad operator={operator} actions={actions} />
    </form>
  );
}
