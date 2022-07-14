import "./button.styles.css";

const Button = ({ children }) => {
  return (
    <div>
      <button className="button">{children}</button>
    </div>
  );
};

export default Button;
