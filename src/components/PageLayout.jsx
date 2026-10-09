import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

export default function PageLayout({ profile, children }) {
  return (
    <>
      <SiteHeader profile={profile} />
      {children}
      <SiteFooter />
    </>
  );
}
