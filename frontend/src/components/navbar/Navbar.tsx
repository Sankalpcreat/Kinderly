import React from "react";
import Link from "next/Link"; 
import useAuthStore from "../../stores/authStore";

const Navbar = () => {
  const { user, logout } = useAuthStore();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link href="/" className="text-xl font-bold">
            AppName
          </Link>
        </div>
        <div className="flex space-x-4">
          {user ? (
            <>
              <span>Welcome, {user}</span>
              <button onClick={logout} className="text-red-500">
                Logout
              </button>
            </>
          ) : (
            <Link href="/auth/login" className="text-blue-500">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
