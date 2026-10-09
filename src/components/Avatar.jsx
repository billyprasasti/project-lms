export default function Avatar({ profile, size = "h-[42px] w-[42px]", text = "text-sm" }) {
  const initials = (profile?.name || "U").split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  if (profile?.photo)
    return <img src={profile.photo} alt="" className={`${size} rounded-full object-cover`} />;
  return (
    <span className={`flex ${size} items-center justify-center rounded-full bg-gradient-to-br from-orange to-red font-semibold text-white ${text}`}>
      {initials}
    </span>
  );
}
