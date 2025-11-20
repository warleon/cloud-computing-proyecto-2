import { Link, NavLink } from "react-router-dom"
import { MapPin, Phone, UserRound } from "lucide-react"

import logo from "@/assets/logo.svg"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Store", to: "/store" },
  { label: "Products", to: "/products" },
  { label: "Contact", to: "/contact" },
]

export function Navbar() {
  return (
    <header className="bg-[#fffaf8] shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 lg:flex-row lg:items-center lg:justify-between">
        <Link to="/products" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f8d7d9] text-[#d91b2a]">
            <img src={logo} alt="Pizza Hut" className="h-8 w-8" />
          </div>
          <div className="leading-tight text-[#1a1a1a]">
            <p className="text-lg font-semibold uppercase tracking-wide">Pizza Hut</p>
            <p className="text-sm text-[#d91b2a]">Sabor que enamora</p>
          </div>
        </Link>

        <nav className="flex flex-1 flex-wrap gap-2 text-sm font-semibold lg:justify-center">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "rounded-full px-5 py-2 transition-all",
                  isActive
                    ? "bg-[#d91b2a] text-white shadow-[0_8px_20px_rgba(217,27,42,0.25)]"
                    : "text-[#5a5a5a] hover:bg-[#ffecef] hover:text-[#d91b2a]",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3 text-sm font-semibold text-[#1f1f1f]">
          <a
            href="tel:+51015051111"
            className="hidden items-center gap-2 rounded-full border border-[#ffd6d6] px-4 py-2 text-[#d91b2a] lg:inline-flex"
          >
            <Phone className="h-4 w-4" />
            (01) 505-1111
          </a>
          <div className="flex items-center gap-2 text-[#6d6d6d]">
            <MapPin className="h-4 w-4 text-[#d91b2a]" />
            <span className="text-xs uppercase">SJM</span>
          </div>
          <Button
            variant="ghost"
            className="flex items-center gap-2 rounded-full border border-[#ffd6d6] bg-white px-4 py-2 text-[#d91b2a] hover:bg-[#ffe3e3]"
          >
            <UserRound className="h-4 w-4" />
            Ingresar
          </Button>
        </div>
      </div>
    </header>
  )
}
