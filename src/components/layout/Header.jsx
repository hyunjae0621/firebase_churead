import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="max-w-[572px] fixed top-0 left-0 right-0 mx-auto">
      <h1 className="py-2 text-center">
        <Link to="/" className="w-fit inline-block">
          <img src="./images/logo.svg" className="mx-auto h-16" alt="로고" />
        </Link>
      </h1>

      <div className="absolute right-5 rounded-lg bg-white text-black top-7 p-1">
        <button type="button">로그아웃</button>
      </div>
    </header>
  );
};

export default Header;
