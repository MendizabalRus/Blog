// Packages
import { useState } from "react";

// Style
import style from "../../shared/style/utilsStyle/input.module.css";

// Files

const isEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const EmailInput = ({
  label,
  name,
  value = "",
  placeholder,
  onChange,
  validate = isEmail,
  required=true,
}) => {
  const [interacted, setInteracted] = useState(false);

  const isValid = !value ? !required : validate(value);

  const status = !interacted
    ? style.neutral
    : isValid
      ? style.valid
      : style.invalid;

  const handleChange = (e) => {
    setInteracted(true);
    onChange(e);
  };

  return (
    <>
      <input
        type="email"
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        required={required}
        className={`${style.input} ${status}`}
      />
      {interacted && !isValid && (
        <p className={style.error}>
          {!value
            ? `${label} is required.`
            : `${label} must be a valid e-mail address. For example, user@email.com.`}
        </p>
      )}
    </>
  );
};
export default EmailInput;
