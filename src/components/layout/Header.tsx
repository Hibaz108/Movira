// React & hooks
import { useState } from "react";
// React Router
import { Link, NavLink } from "react-router-dom";
// components
import IconBadgeLink from "../common/IconBadgeLink";
// icons
import {
  Film,
  Search,
  Heart,
  Bookmark,
  Sun,
  Moon,
  Menu,
  X,
} from "lucide-react";
// stores
import { useThemeStore } from "@/store/themeStore";
import { useSavedMoviesStore } from "@/store/savedMoviesStore";
//constants
import { NAV_LINKS, ACTION_LINKS } from "@/constants/constants";

const Header = () => {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const [open, setOpen] = useState<boolean>(false);
  const favorites = useSavedMoviesStore((state) => state.favorites);
  const watchlist = useSavedMoviesStore((state) => state.watchlist);

  return (
    <header className="sticky top-0 z-30 bg-background/90">
      <div className="container h-16 flex justify-between items-center">
        {/* logo */}
        <div className="flex items-center justify-start font-heading">
          <Link to="/" className="flex items-center gap-1 text-2xl font-bold">
            <Film className="text-primary size-6" aria-hidden="true" />
            Movira
          </Link>
        </div>
        {/* === logo === */}

        {/* navigation */}
        <nav className="hidden md:flex items-center justify-center gap-6">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              className={({ isActive }) =>
                isActive
                  ? "text-primary font-medium border-b-2 border-b-primary"
                  : "hover:text-primary transition-colors"
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
        {/* === navigation === */}

        {/* controls */}
        <div className="hidden md:flex items-center justify-end gap-5 text-primary">
          <Link to="/search" aria-label="Search">
            <Search className="size-5" aria-hidden="true" />
          </Link>

          <IconBadgeLink
            to="/favorites"
            label="Favorites"
            count={favorites.length}
            Icon={Heart}
          />

          <IconBadgeLink
            to="/watchlist"
            label="Watchlist"
            count={watchlist.length}
            Icon={Bookmark}
          />

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {theme === "dark" ? (
              <Sun className="size-5" />
            ) : (
              <Moon className="size-5" />
            )}
          </button>
        </div>
        {/* === controls === */}

        {/* mobile view */}
        <div className="flex md:hidden items-center justify-end text-foreground">
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>

          <nav
            id="mobile-menu"
            className={`w-full absolute right-0 top-full z-30 bg-background/95 backdrop-blur-lg overflow-hidden transition-all duration-300 
         ${open ? "h-screen visible opacity-100" : "h-0 invisible opacity-0"}`}
            aria-label="Mobile navigation"
            aria-hidden={!open}
          >
            <ul className="h-full flex flex-col pt-4 divide-y divide-border font-medium">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    end={link.path === "/"}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `text-lg p-5 block ${
                        isActive
                          ? "text-primary font-medium"
                          : "text-foreground"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}

              {ACTION_LINKS.map((action) => (
                <li key={action.path}>
                  <NavLink
                    to={action.path}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between p-5 text-lg ${
                        isActive
                          ? "text-primary font-medium"
                          : "text-foreground"
                      }`
                    }
                  >
                    {action.name}
                    <action.icon className="size-5" aria-hidden="true" />
                  </NavLink>
                </li>
              ))}

              <li className="flex justify-center mt-6">
                <button
                  type="button"
                  className="flex items-center gap-2 text-lg text-foreground"
                  onClick={() => {
                    toggleTheme();
                    setOpen(false);
                  }}
                >
                  {theme === "light" ? (
                    <Moon className="size-5" aria-hidden="true" />
                  ) : (
                    <Sun className="size-5" aria-hidden="true" />
                  )}
                  Switch to {theme === "light" ? "Dark" : "Light"} Mode
                </button>
              </li>
            </ul>
          </nav>
        </div>
        {/* === mobile view === */}
      </div>
    </header>
  );
};

export default Header;
