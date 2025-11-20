import { Mail, MapPinned, Phone } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

const contactPoints = [
  {
    title: "Atencion al cliente",
    description: "Resuelve dudas sobre pedidos, envios o promociones.",
    icon: Phone,
    action: "Llamar ahora",
  },
  {
    title: "Soporte en linea",
    description: "Escribenos por correo y te responderemos en minutos.",
    icon: Mail,
    action: "Enviar correo",
  },
  {
    title: "Tiendas cercanas",
    description: "Encuentra direcciones, horarios y puntos de recojo.",
    icon: MapPinned,
    action: "Ver tiendas",
  },
]

export function ContactPage() {
  return (
    <div className="min-h-[calc(100vh-160px)] bg-[#fff7f5] px-4 py-12">
      <div className="mx-auto max-w-5xl space-y-8">
        <header className="space-y-3 text-center text-[#2c2c2c]">
          <Badge className="bg-[#ffe1d6] text-sm font-semibold text-[#d91b2a]">Estamos para ayudarte</Badge>
          <h1 className="text-4xl font-black">Contactanos</h1>
          <p className="text-base text-[#5a5a5a]">
            Nuestro equipo esta listo para ayudarte a elegir tu pizza favorita o resolver cualquier problema
            con tu pedido.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          {contactPoints.map((point) => (
            <Card key={point.title} className="rounded-[28px] border border-[#f4d7cd] bg-white shadow-lg">
              <CardHeader className="space-y-3 text-center">
                <point.icon className="mx-auto h-10 w-10 text-[#d91b2a]" />
                <h2 className="text-xl font-semibold text-[#1f1f1f]">{point.title}</h2>
                <p className="text-sm text-[#6b6b6b]">{point.description}</p>
              </CardHeader>
              <CardContent className="text-center">
                <Button className="rounded-full bg-[#d91b2a] px-6 py-2 text-sm font-semibold text-white hover:bg-[#c21225]">
                  {point.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
