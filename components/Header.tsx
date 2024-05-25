const Header: React.FC = () => {
  return (
    <header className="w-full fixed top-2 z-10 flex justify-center">
      <img
        src="/Phone.svg"
        alt="Header Image"
        className="w-1/1 sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 z-1"
      />
    </header>
  );
};

export default Header;
