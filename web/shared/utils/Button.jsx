import style from "../style/utilsStyle/Button.module.css";

const Button = ({ value, onClick, type }) => {
  return (
    <button type={type} onClick={onClick} className={style.Button}>
      {value}
    </button>
  );
};
export default Button;
