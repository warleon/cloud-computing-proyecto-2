import { type FormEvent } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import logo from "@/assets/logo.svg";
import { Button } from "@/components/ui/button";

export function LoginPage() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="min-h-[calc(100vh-140px)] bg-[#fff7f5] px-4 py-10 text-[#1f1f1f]">
      <div className="mx-auto w-full max-w-lg rounded-[32px] bg-white px-8 py-10 shadow-[0_30px_80px_rgba(0,0,0,0.08)] ring-1 ring-black/5">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#ffe1e5]">
          <img src={logo} alt="Pizza Hut" className="h-9 w-9" />
        </div>

        <Link
          to="/products"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#d91b2a] hover:text-[#b81523]"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Link>

        <div className="mt-8 space-y-3">
          <p className="text-4xl font-black uppercase tracking-[0.2em] text-[#111111]">
            Iniciar Sesion
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-xs font-semibold uppercase tracking-wide text-[#7b7b7b]"
            >
              Correo electronico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Correo electronico *"
              required
              className="w-full rounded-2xl border border-[#d9d9d9] px-4 py-4 text-base font-medium text-[#1f1f1f] placeholder:text-[#9f9f9f] focus:border-[#d91b2a] focus:outline-none focus:ring-4 focus:ring-[#d91b2a]/20"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-xs font-semibold uppercase tracking-wide text-[#7b7b7b]"
            >
              Contrasena
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Contrasena *"
              required
              className="w-full rounded-2xl border border-[#d9d9d9] px-4 py-4 text-base font-medium text-[#1f1f1f] placeholder:text-[#9f9f9f] focus:border-[#d91b2a] focus:outline-none focus:ring-4 focus:ring-[#d91b2a]/20"
            />
          </div>

          <div className="text-right text-sm">
            <Link
              to="/contact"
              className="font-semibold text-[#0067c5] hover:text-[#004e96]"
            >
              Olvidaste tu contrasena?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full rounded-2xl bg-[#d91b2a] py-6 text-base font-semibold text-white shadow-[0_18px_30px_rgba(217,27,42,0.35)] hover:bg-[#b81523]"
          >
            Iniciar Sesion
          </Button>
        </form>
      </div>
    </div>
  );
}
