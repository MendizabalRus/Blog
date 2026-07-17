// Packages
import { useState } from "react";

// Style
import style from "../../shared/style/utilsStyle/input.module.css";

// Files

const isValidUsername = (text) =>
  /^(?!.*\.\.)(?![._-])(?!.*[._-]$)[A-Za-z0-9._-]+$/.test(text);

const TextInput = ({
  label,
  name,
  value="",
  placeholder,
  onChange,
  required = true,
  validate = isValidUsername,
}) => {
  const [interacted, setInteracted] = useState(false);

  const isValid = !value ? !required : validate(value);

  const status = !interacted
    ? style.neutral
    : isValid
      ? style.valid
      : style.invalid;

  const handleChange = (e) => {
    if (!interacted) setInteracted(true);
    onChange(e);
  };

  return (
    <>
      <input
        type="text"
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        required={required}
        className={`${style.input} ${status}`}
      />
      {interacted && !isValid && (
        <p className={style.error}>
          {!value
            ? `${label} is required.`
            : `${label} must only contain letters, numbers, dots, dashes and underscores. Note: username cannot begin or end with dots, dashes or underscores,`}
        </p>
      )}
    </>
  );
};
export default TextInput;
