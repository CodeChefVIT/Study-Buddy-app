import "./search-box.styles.css";

const SearchBox = (props) => {
  const { onChange } = props;
  return (
    <div className="search-box">
      <input className="search-box" type="search" onChange={onChange} />
    </div>
  );
};

export default SearchBox;
