import NavLink from "./NavLink";

const NavLinkList = () => {
  return (
    <>
      <NavLink href="/">Home</NavLink>
      <NavLink href="/exhibitions" additionalHref="/exhibition">
        Exhibitions
      </NavLink>
      <NavLink href="/artists" additionalHref="/artist">
        Artists
      </NavLink>
      <NavLink href="/fairs" additionalHref="/fair">
        Fairs
      </NavLink>
      <NavLink href="/news">News</NavLink>
      <NavLink href="/events">Events</NavLink>
      <NavLink href="/media-library">Media Library</NavLink>
      <NavLink href="/about">About</NavLink>
      <NavLink href="/contact">Contact</NavLink>
    </>
  );
};

export default NavLinkList;
