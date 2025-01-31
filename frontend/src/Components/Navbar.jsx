import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";


import { useLogoutUserMutation } from "../redux/features/authRoutes/authRoutesApi";
import { logout } from "../redux/features/authRoutes/authRoutesSlice";
import avatarImg from "../assets/avatar.png";

const Navbar = () => {
 

  //show user if logged in
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [logoutUser] = useLogoutUserMutation();
  const navigate = useNavigate();


  //dropdown menus
  const [isDropdownOpen, setisDropdownOpen] = useState(false);
  const handleDropdownToggle = () => {
    setisDropdownOpen(!isDropdownOpen);
  };

  const adminDropdownMenus = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Manage Items", path: "/dashboard/manage-products" },
    { label: "All Orders", path: "/dashboard/manage-orders" },
    { label: "Add Product", path: "/dashboard/add-product" },
  ];

  const userDropdownMenus = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Profile", path: "/dashboard/profile" },
    { label: "Payments", path: "/dashboard/payments" },
    { label: "Orders", path: "/dashboard/orders" },
  ];

  const dropdownMenus =
    user?.role === "admin" ? [...adminDropdownMenus] : [...userDropdownMenus];

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };
  return (
    <header className="fixed-nav-bar w-nav">
      <nav className="max-w-screen-2xl mx-auto px-4 flex justify-between items-center">
        <ul className="nav__links">
          <li className="link">
            <Link to="/">Home</Link>
          </li>
          <li className="link">
            <Link to="/shop">Shop</Link>
          </li>
          <li className="link">
            <Link to="/">Pages</Link>
          </li>
          <li className="link">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
        <div className="nav__logo">
          <Link to="/">
            Lebaba<span>.</span>
          </Link>
        </div>

        <div className="nav__icons relative">
          <span>
            <Link to="/search">
              <i className="ri-search-line"></i>
            </Link>
          </span>
          <span>
            <button  className="hover:text-primary">
              <i className="ri-shopping-bag-line"></i>
              <sup className="text-sm inline-block px-1.5 text-white rounded-full bg-primary text-center">
                1
              </sup>
            </button>
          </span>
          <span>
            {user && user ? (
              <>
             
             <img
                  onClick={handleDropdownToggle}
                  src={user?.profileImage || avatarImg}
                  alt=""
                  className="size-6 rounded-full cursor-pointer"
                />

{isDropdownOpen && (
                  <div className="absolute right-0 mt-3 p-4 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <ul className="font-medium space-y-2 p-2">
                      {dropdownMenus.map((menu, index) => (
                        <li key={index}>
                          <Link
                            onClick={() => setisDropdownOpen(false)}
                            className="dropdown-items"
                            to={menu.path}
                          >
                            {menu.label}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link onClick={handleLogout} className="dropdown-items">
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login">
                <i className="ri-user-line"></i>login
              </Link>
            )}
          </span>
        </div>
      </nav>

     
    </header>
  );
};

export default Navbar;