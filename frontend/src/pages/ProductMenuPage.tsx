import { useState } from "react";
import { ChevronDown, ChevronRight, ShoppingBag } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: string;
  recommendation?: string;
  doughOptions: string[];
  image: string;
};

const menuItems: MenuItem[] = [
  {
    id: "hawai",
    name: "Hawaiana",
    description:
      "Paraiso en la mesa con jamon, jugosa pina y queso mozzarella.",
    price: "S/. 34.90",
    recommendation: "Best Seller",
    doughOptions: ["Grande, Artesanal", "Mediana, Pan", "Familiar, Crunchy"],
    image: "from-[#ffd6a5] to-[#ff9f68]",
  },
  {
    id: "continental",
    name: "Continental",
    description: "Jamon, champinones, cebolla roja y queso mozzarella.",
    price: "S/. 34.90",
    doughOptions: ["Grande, Artesanal", "Mediana, Pan"],
    image: "from-[#ffe1a8] to-[#ffb347]",
  },
  {
    id: "veggie",
    name: "Vegetariana",
    description: "Champinones, aceitunas, pimientos y queso mozzarella.",
    price: "S/. 34.90",
    doughOptions: ["Grande, Artesanal", "Familiar, Crunchy"],
    image: "from-[#ffe6d6] to-[#ffa08c]",
  },
  {
    id: "supreme",
    name: "Suprema",
    description: "Pepperoni, res, cerdo y vegetales frescos.",
    price: "S/. 34.90",
    doughOptions: ["Grande, Artesanal", "Familiar, Crunchy"],
    image: "from-[#ffd5c8] to-[#f3755b]",
  },
  {
    id: "meat-lovers",
    name: "Meat Lovers",
    description: "Pepperoni americano, res, cerdo, jamon y extra queso.",
    price: "S/. 38.90",
    recommendation: "Premium",
    doughOptions: ["Grande, Artesanal", "Mediana, Pan"],
    image: "from-[#ffe3c6] to-[#ff9f68]",
  },
  {
    id: "supreme-plus",
    name: "Super Suprema",
    description: "Pepperoni americano, res, cerdo, champinones y aceitunas.",
    price: "S/. 37.90",
    doughOptions: ["Grande, Artesanal", "Familiar, Crunchy"],
    image: "from-[#ffe9d2] to-[#ffa76d]",
  },
  {
    id: "chililovers",
    name: "La Chili Hut",
    description: "Trozos de pollo, pina, tocino y salsa Chili Thai.",
    price: "S/. 35.90",
    doughOptions: ["Grande, Artesanal", "Mediana, Pan"],
    image: "from-[#fff0d1] to-[#fcb57f]",
  },
  {
    id: "bbq",
    name: "Chicken BBQ",
    description: "Pollo, pina, tocino y la salsa BBQ mas dulce.",
    price: "S/. 36.90",
    doughOptions: ["Grande, Artesanal", "Mediana, Pan"],
    image: "from-[#ffe7d4] to-[#ffb48c]",
  },
];

export function ProductMenuPage() {
  const [cartOpen, setCartOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#fff7f5] pb-12 text-[#1f1f1f]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 pt-8 lg:flex-row">
        <section className="flex-1 space-y-8">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {menuItems.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        <aside className="w-full lg:w-96">
          <CartPanel open={cartOpen} onOpenChange={setCartOpen} />
        </aside>
      </div>
    </div>
  );
}

type CartPanelProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function CartPanel({ open, onOpenChange }: CartPanelProps) {
  return (
    <Collapsible
      open={open}
      onOpenChange={onOpenChange}
      className="rounded-[32px] border border-[#f4d7cd] bg-white p-6 shadow-xl"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-2xl font-bold text-[#1e1e1e]">Tu carrito</p>
        </div>
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full border border-[#ffd3ce] text-[#d91b2a] hover:bg-[#fff0ed]"
          >
            <ChevronDown
              className={cn(
                "h-5 w-5 transition-transform",
                open ? "-rotate-180" : "rotate-0"
              )}
            />
          </Button>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent className="space-y-5 pt-5">
        <div className="rounded-3xl border border-dashed border-[#f8c7bd] p-4">
          <div className="flex items-center gap-3 text-[#5f5f5f]">
            <ShoppingBag className="h-6 w-6 text-[#d91b2a]" />
            <div>
              <p className="font-semibold text-[#202020]">
                Tu canasta esta vacia
              </p>
              <p className="text-sm">Agrega pizzas o combos para empezar.</p>
            </div>
          </div>
        </div>

        <Button className="w-full rounded-2xl bg-[#d91b2a] py-6 text-base font-semibold text-white hover:bg-[#c21225]">
          Pedir
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </CollapsibleContent>
    </Collapsible>
  );
}

type MenuCardProps = {
  item: MenuItem;
};

function MenuCard({ item }: MenuCardProps) {
  const [selection, setSelection] = useState(item.doughOptions[0]);

  return (
    <Card className="rounded-[28px] border border-[#f4d7cd] bg-white shadow-[0_12px_30px_rgba(217,27,42,0.08)]">
      <CardHeader className="space-y-4 p-5 pb-2">
        <div className="relative overflow-hidden rounded-[24px] border border-dashed border-[#f8cabc] bg-[#fffaf5]">
          <div className="flex justify-center p-6">
            <div
              className={cn(
                "h-32 w-32 rounded-full border-4 border-white shadow-[inset_0_6px_16px_rgba(0,0,0,0.12)]",
                "bg-gradient-to-br",
                item.image
              )}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-bold uppercase text-[#1f1f1f]">
              {item.name}
            </h3>
            {item.recommendation ? (
              <Badge className="bg-[#fff3ec] text-xs font-bold uppercase tracking-wide text-[#d45b3f]">
                {item.recommendation}
              </Badge>
            ) : null}
          </div>
          <p className="text-sm leading-relaxed text-[#5b5b5b]">
            {item.description}
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 px-5 pb-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#9c9c9c]">
          Seleccionar Tamano &amp; Corteza
        </p>
        <Select value={selection} onValueChange={setSelection}>
          <SelectTrigger className="rounded-2xl border border-[#f8cabc] bg-white text-sm font-semibold text-[#1f1f1f]">
            <SelectValue placeholder="Grande, Artesanal" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {item.doughOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>

      <CardFooter className="flex items-center justify-between px-5 pb-5">
        <p className="text-lg font-bold text-[#d91b2a]">{item.price}</p>
        <Button className="rounded-2xl bg-[#d91b2a] px-6 py-2 font-semibold text-white hover:bg-[#c21225]">
          Agregar
        </Button>
      </CardFooter>
    </Card>
  );
}
