import React from "react";

interface NavbarProps {
  onSearch: (value: string) => void;
  onOpen: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    onSearch(e.target.value);
  };

  return (
    <nav>
      <div className="navbar bg-base-100 p-4">
        <div className="navbar-start">
          <a className="btn btn-ghost text-xl">SomeQuiz</a>
        </div>

        <div className="navbar-end">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              onChange={handleSearchChange}
              className="input input-bordered w-48 md:w-auto"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
