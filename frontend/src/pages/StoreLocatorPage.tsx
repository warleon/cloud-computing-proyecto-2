import { useEffect, useMemo, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import L from "leaflet";
import { ChevronLeft, MapPin, X } from "lucide-react";

import blackPin from "@/assets/blackPin.svg";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type Store = {
  id: string;
  name: string;
  address: string;
  hours: string;
  distance: string;
  position: LatLngExpression;
};

const stores: Store[] = [
  {
    id: "sjm",
    name: "SJM",
    address: "Av. Vargas Machuca 770, San Juan de Miraflores, Lima, 15801",
    hours: "Horas de hoy: 11:30 AM - 10:00 PM",
    distance: "2.1 km de ti",
    position: [-12.156, -76.982],
  },
  {
    id: "heroes",
    name: "Los Heroes",
    address: "Av. los Heroes 240, San Juan de Miraflores, Lima, 15803",
    hours: "Horas de hoy: 11:30 AM - 10:30 PM",
    distance: "2.6 km de ti",
    position: [-12.142, -76.987],
  },
  {
    id: "real-plaza-vmt",
    name: "Real Plaza VMT",
    address:
      "Av. Pachacutec Pje. Cesar Vallejo cruce con 26 de Noviembre, Villa Maria del Triunfo, Provincia de Lima, 15817",
    hours: "Horas de hoy: 02:30 PM - 09:30 PM",
    distance: "2.8 km de ti",
    position: [-12.1604, -76.9661],
  },
  {
    id: "mall-del-sur",
    name: "Mall Del Sur",
    address:
      "Av. Los Lirios 301 Int. PCS 4002, Calle las Camelias 145, San Juan de Miraflores, Provincia de Lima, 15801",
    hours: "Horas de hoy: 11:00 AM - 10:30 PM",
    distance: "3.1 km de ti",
    position: [-12.127, -76.998],
  },
  {
    id: "cruceta",
    name: "Cruceta",
    address:
      "Av. Guardia Civil Sur 310, Urb Villa Alegre - cerca al Condominio Parques de Villa, San Juan de Miraflores, Lima, 15801",
    hours: "Horas de hoy: 02:30 PM - 09:30 PM",
    distance: "3.4 km de ti",
    position: [-12.1615, -77.0014],
  },
  {
    id: "la-molina",
    name: "La Molina",
    address: "Av. La Molina 1234, La Molina, Lima, 15024",
    hours: "Horas de hoy: 11:00 AM - 10:00 PM",
    distance: "8.6 km de ti",
    position: [-12.0865, -76.9426],
  },
  {
    id: "san-borja",
    name: "San Borja",
    address: "Av. San Borja Sur 567, San Borja, Lima, 15036",
    hours: "Horas de hoy: 11:30 AM - 10:00 PM",
    distance: "6.4 km de ti",
    position: [-12.0993, -76.9994],
  },
  {
    id: "miraflores",
    name: "Miraflores",
    address: "Av. Jose Pardo 920, Miraflores, Lima, 15074",
    hours: "Horas de hoy: 11:00 AM - 11:00 PM",
    distance: "10.1 km de ti",
    position: [-12.1191, -77.0301],
  },
  {
    id: "san-isidro",
    name: "San Isidro",
    address: "Av. Javier Prado Este 1881, San Isidro, Lima, 15036",
    hours: "Horas de hoy: 11:00 AM - 10:00 PM",
    distance: "9.2 km de ti",
    position: [-12.0915, -77.028],
  },
];

const createPinIcon = () =>
  L.icon({
    iconUrl: blackPin,
    iconSize: [42, 42],
    iconAnchor: [21, 40],
    popupAnchor: [0, -36],
    className: "drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)]",
  });

export function StoreLocatorPage() {
  const [selectedStoreId, setSelectedStoreId] = useState(stores[0].id);

  const selectedStore = useMemo(
    () => stores.find((store) => store.id === selectedStoreId) ?? stores[0],
    [selectedStoreId]
  );
  const pinIcon = useMemo(() => createPinIcon(), []);

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <div className="relative z-10 w-full max-w-xl rounded-[32px] bg-white shadow-2xl ring-1 ring-black/5">
        <header className="flex items-center justify-between border-b px-8 py-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full border border-black/10 bg-white text-black"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div>
              <p className="text-2xl font-semibold">
                Selecciona una tienda para recoger
              </p>
              <p className="text-sm text-muted-foreground">
                Selecciona un pin o direccion para elegir una cabana
              </p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full border border-black/10 bg-white text-black"
          >
            <X className="h-5 w-5" />
          </Button>
        </header>

        <div className="flex items-center gap-2 px-8 py-4 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 text-[#00a5cf]" />
          <span>Mostrando tiendas cercanas a tu ubicacion actual</span>
        </div>

        <ScrollArea className="h-[55vh] px-8">
          <RadioGroup
            value={selectedStoreId}
            onValueChange={setSelectedStoreId}
            className="space-y-5 pb-6"
          >
            {stores.map((store) => (
              <div
                key={store.id}
                onClick={() => setSelectedStoreId(store.id)}
                className={cn(
                  "cursor-pointer rounded-[28px] border px-5 py-4 shadow-sm transition-all",
                  store.id === selectedStoreId
                    ? "border-[#dc1b2e] bg-white shadow-lg ring-1 ring-[#dc1b2e]/30"
                    : "border-transparent bg-[#f7f7f9]"
                )}
              >
                <div className="flex items-start gap-4">
                  <RadioGroupItem
                    id={store.id}
                    value={store.id}
                    className="mt-1"
                  />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor={store.id}
                        className="text-lg font-semibold text-[#1d1d1f]"
                      >
                        {store.name}
                      </Label>
                      <span className="text-sm font-semibold text-[#0a84ff]">
                        {store.distance}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-[#535353]">
                      {store.address}
                    </p>
                    <p className="text-sm font-medium text-[#1d1d1f]">
                      {store.hours}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </RadioGroup>
        </ScrollArea>

        <div className="border-t px-8 py-6">
          <Button className=" h-12 w-full rounded-2xl bg-[#dc1b2e] text-base font-semibold text-white hover:bg-[#c11226]">
            Confirmar Tienda
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden rounded-[36px] bg-white shadow-2xl ring-1 ring-black/5 min-h-[420px]">
        <MapContainer
          center={selectedStore.position}
          zoom={12}
          className="h-full w-full"
          scrollWheelZoom
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapFlyTo position={selectedStore.position} />

          {stores.map((store) => (
            <Marker
              key={store.id}
              position={store.position}
              icon={pinIcon}
              eventHandlers={{
                click: () => setSelectedStoreId(store.id),
              }}
              zIndexOffset={store.id === selectedStoreId ? 1000 : 0}
            >
              <Popup>
                <div className="space-y-1">
                  <p className="font-semibold">{store.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {store.address}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

type MapFlyToProps = {
  position: LatLngExpression;
};

function MapFlyTo({ position }: MapFlyToProps) {
  const map = useMap();

  useEffect(() => {
    map.flyTo(position, 13, { duration: 1.25 });
  }, [map, position]);

  return null;
}
