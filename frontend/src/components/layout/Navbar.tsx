import { Link } from "react-router-dom";
import lwpStyles from "../../styles";
import React from "react";
import { navItems } from "../../static/data";

interface NavbarProps {
  active: number;
}

const Navbar: React.FC<NavbarProps> = ({ active }) => {
  return (
    <div className={`block 800px:${lwpStyles.noramlFlex}`}>
      {navItems &&
        navItems.map((i, index) => (
          <div className="flex">
            <Link
              to={i.url}
              className={`${
                active === index + 1
                  ? "text-[#17dd1f]"
                  : "text-black 800px:text-[#fff]"
              } pb-[30px] 800px:pb-0 font-[500] px-6 cursor-pointer}`}
            >
              {i.title}
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Navbar;
