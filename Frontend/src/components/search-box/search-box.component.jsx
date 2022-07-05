import "./search-box.styles.css";

const SearchBox = (props) => {
  const { placeholder, onChange, className } = props;
  return (
    <div className="search-box">
      <input
        className={`search-box ${className}`}
        type="search"
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBox;
