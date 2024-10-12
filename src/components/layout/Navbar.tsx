import React from "react";
import SearchInput from "./SearchInput";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <div className="flex items-center gap-x-4 p-5">
      <div className="hidden lg:flex lg:flex-1 ">
        <SearchInput />
      </div>
      {/* <UserButton /> */}
    </div>
  );
};

export default Navbar;
