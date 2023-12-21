import { useNavigate } from "react-router-dom";
import lwpStyles from "../../styles";

const Dropdown = ({ categoriesData, setDropDown }) => {
  const navigate = useNavigate();
  const submitHandle = (item) => {
    navigate(`/products?category=${item.title}`);
    setDropDown(false);
    window.location.reload();
  };
  return (
    <div className="pb-4 w-[270px] bg-[#fff] absolute z-30 rounded-b-md shadow-sm">
      {categoriesData &&
        categoriesData.map((i, index: number) => (
          <div
            key={index}
            className={`${lwpStyles.noramlFlex}`}
            onClick={() => submitHandle(i)}
          >
            <img
              src={i.image_Url}
              style={{
                width: "25px",
                height: "25px",
                objectFit: "contain",
                marginLeft: "10px",
                userSelect: "none",
              }}
              alt=""
            />
            <h3 className="m-3 cursor-pointer select-none">{i.title}</h3>
          </div>
        ))}
    </div>
  );
};

export default Dropdown;
