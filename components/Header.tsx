const Header: React.FC = () => {
  return (
    <header className="w-full fixed top-2 z-10 flex justify-center">
      <img
        src="/Phone.svg"
        alt="Header Image"
        className="w-full h-auto max-w-xl lg:max-w-3xl xl:max-w-4xl"
      />
    </header>
  );
};

export default Header;
