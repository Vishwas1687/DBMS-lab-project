import { useState } from "react";
import "../styles/FormInput.css";

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <div className="formInput">
      <label className="register-label">{label}</label>
      <input
        {...inputProps}
        onChange={onChange}
        className="register-input"
        onBlur={handleFocus}
        onFocus={() =>
          inputProps.name === "confirmPassword" && setFocused(true)
        }
        focused={focused.toString()}
      />
      <span className="error-message">{errorMessage}</span>
    </div>
    
  );
};

export default FormInput;