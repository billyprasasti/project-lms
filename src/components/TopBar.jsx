import Logo from "./Logo";

export default function TopBar() {
  return (
    <header className="border-b border-line bg-white">
      <div className="mx-auto flex h-[68px] w-full max-w-[1180px] items-center px-6">
        <Logo />
      </div>
    </header>
  );
}
