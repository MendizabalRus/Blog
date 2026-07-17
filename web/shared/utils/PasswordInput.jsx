// Packages
import { useState } from "react";

// Style
import style from "../style/utilsStyle/input.module.css";
// Files

const PasswordInput = ({
  label,
  name,
  value,
  placeholder,
  onChange,
  required = true,
}) => {
  const [interacted, setInteracted] = useState(false);
  const [inputType, setInputType] = useState("password");

  const handleChange = (e) => {
    setInteracted(true);
    onChange(e);
  };

  const status = !interacted
    ? style.neutral
    : isValid
      ? style.valid
      : style.invalid;

  const requirements = [
    {
      requirement: "Password must contain atleast a lowercase letter.",
    },
    {
      requirement: "Password must contain atleast an uppercase letter.",
    },
    {
      requirement: "Password must contain atleast a number.",
    },
    {
      requirement: "Password must contain atleast a symbol.",
    },
  ];

  return (
    <>
      <input
        type={type}
        label={label}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        required={required}
        className={style.input}
      />
      {interacted && (
        <>
          {requirements.map((r) => {
            <p>{r.requirement}</p>;
          })}
        </>
      )}
    </>
  );
};
export default PasswordInput;
