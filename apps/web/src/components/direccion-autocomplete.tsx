"use client";

import { useEffect, useRef, useState } from "react";
import { setOptions, importLibrary } from "@googlemaps/js-api-loader";

export type ParsedDireccion = {
  street: string;
  number: string;
  district: string;
};

const DISTRITO_GOOGLE: Record<string, string> = {
  "Cercado de Lima": "CERCADO_DE_LIMA",
  "Ancón": "ANCON",
  "Ate": "ATE",
  "Barranco": "BARRANCO",
  "Breña": "BRENA",
  "Carabayllo": "CARABAYLLO",
  "Chaclacayo": "CHACLACAYO",
  "Chorrillos": "CHORRILLOS",
  "Cieneguilla": "CIENEGUILLA",
  "Comas": "COMAS",
  "El Agustino": "EL_AGUSTINO",
  "Independencia": "INDEPENDENCIA",
  "Jesús María": "JESUS_MARIA",
  "La Molina": "LA_MOLINA",
  "La Victoria": "LA_VICTORIA",
  "Lince": "LINCE",
  "Los Olivos": "LOS_OLIVOS",
  "Lurigancho": "LURIGANCHO",
  "Lurín": "LURIN",
  "Magdalena del Mar": "MAGDALENA_DEL_MAR",
  "Miraflores": "MIRAFLORES",
  "Pachacámac": "PACHACAMAC",
  "Pucusana": "PUCUSANA",
  "Pueblo Libre": "PUEBLO_LIBRE",
  "Puente Piedra": "PUENTE_PIEDRA",
  "Punta Hermosa": "PUNTA_HERMOSA",
  "Punta Negra": "PUNTA_NEGRA",
  "Rímac": "RIMAC",
  "San Bartolo": "SAN_BARTOLO",
  "San Borja": "SAN_BORJA",
  "San Isidro": "SAN_ISIDRO",
  "San Juan de Lurigancho": "SAN_JUAN_DE_LURIGANCHO",
  "San Juan de Miraflores": "SAN_JUAN_DE_MIRAFLORES",
  "San Luis": "SAN_LUIS",
  "San Martín de Porres": "SAN_MARTIN_DE_PORRES",
  "San Miguel": "SAN_MIGUEL",
  "Santa Anita": "SANTA_ANITA",
  "Santa María del Mar": "SANTA_MARIA_DEL_MAR",
  "Santa Rosa": "SANTA_ROSA",
  "Santiago de Surco": "SANTIAGO_DE_SURCO",
  "Surquillo": "SURQUILLO",
  "Villa El Salvador": "VILLA_EL_SALVADOR",
  "Villa María del Triunfo": "VILLA_MARIA_DEL_TRIUNFO",
};

function mapDistrict(nombre: string): string {
  if (DISTRITO_GOOGLE[nombre]) return DISTRITO_GOOGLE[nombre];
  return nombre
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toUpperCase()
    .replace(/\s+/g, "_");
}

function parseComponents(
  components: google.maps.GeocoderAddressComponent[]
): ParsedDireccion {
  let street = "";
  let number = "";
  let district = "";
  for (const c of components) {
    if (c.types.includes("route")) street = c.long_name;
    if (c.types.includes("street_number")) number = c.long_name;
    if (!district && (
      c.types.includes("sublocality_level_1") ||
      c.types.includes("sublocality") ||
      c.types.includes("administrative_area_level_3")
    )) {
      district = mapDistrict(c.long_name);
    }
  }
  // Fallback: buscar por nombre en todos los componentes
  if (!district) {
    for (const c of components) {
      if (DISTRITO_GOOGLE[c.long_name]) {
        district = DISTRITO_GOOGLE[c.long_name];
        break;
      }
    }
  }
  return { street, number, district };
}

// Busca en todos los resultados el que tenga mayor detalle de calle
function bestResult(
  results: google.maps.GeocoderResult[]
): google.maps.GeocoderAddressComponent[] | null {
  // Preferir el que tenga route + street_number
  for (const r of results) {
    const types = r.address_components.flatMap((c) => c.types);
    if (types.includes("route") && types.includes("street_number")) {
      return r.address_components;
    }
  }
  // Fallback: el que tenga al menos route
  for (const r of results) {
    const types = r.address_components.flatMap((c) => c.types);
    if (types.includes("route")) return r.address_components;
  }
  return results[0]?.address_components ?? null;
}

type Props = { onParsed: (parsed: ParsedDireccion) => void };

export function DireccionAutocomplete({ onParsed }: Props) {
  const [mapaAbierto, setMapaAbierto] = useState(false);
  const [mapaListo, setMapaListo] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const onParsedRef = useRef(onParsed);
  useEffect(() => { onParsedRef.current = onParsed; });

  // Autocomplete
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) return;

    let autocomplete: google.maps.places.Autocomplete | null = null;
    let mounted = true;

    setOptions({ key: apiKey });
    importLibrary("places").then((places) => {
      if (!mounted || !inputRef.current) return;
      const { Autocomplete } = places;
      autocomplete = new Autocomplete(inputRef.current, {
        types: ["address"],
        componentRestrictions: { country: "pe" },
        fields: ["address_components"],
      });
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete!.getPlace();
        if (place.address_components) {
          onParsedRef.current(parseComponents(place.address_components));
        }
      });
    });

    return () => {
      mounted = false;
      if (autocomplete) google.maps.event.clearInstanceListeners(autocomplete);
    };
  }, []);

  // Mapa (solo se inicializa cuando se abre)
  useEffect(() => {
    if (!mapaAbierto) return;
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) return;

    let mounted = true;
    let mapInstance: google.maps.Map | null = null;
    let markerInstance: google.maps.Marker | null = null;

    setOptions({ key: apiKey });
    Promise.all([importLibrary("maps"), importLibrary("geocoding")]).then(
      ([mapsLib, geocodingLib]) => {
        if (!mounted || !mapRef.current) return;

        const { Map } = mapsLib;
        const { Geocoder } = geocodingLib;

        mapInstance = new Map(mapRef.current, {
          center: { lat: -12.0464, lng: -77.0428 },
          zoom: 13,
          disableDefaultUI: true,
          zoomControl: true,
          clickableIcons: false,
        });

        const geocoder = new Geocoder();
        setMapaListo(true);

        mapInstance.addListener("click", (event: google.maps.MapMouseEvent) => {
          const latLng = event.latLng;
          if (!latLng) return;

          if (markerInstance) {
            markerInstance.setPosition(latLng);
          } else {
            markerInstance = new google.maps.Marker({
              position: latLng,
              map: mapInstance!,
            });
          }

          geocoder.geocode({ location: latLng }, (results, status) => {
            if (status !== "OK" || !results?.length) return;
            const components = bestResult(results);
            if (components) onParsedRef.current(parseComponents(components));
          });
        });
      }
    );

    return () => {
      mounted = false;
      if (markerInstance) markerInstance.setMap(null);
      if (mapInstance) google.maps.event.clearInstanceListeners(mapInstance);
    };
  }, [mapaAbierto]);

  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) return null;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-gris-calido">
          {mapaAbierto ? "Ubicación en mapa" : "Buscar dirección"}
        </label>
        <button
          type="button"
          onClick={() => setMapaAbierto((v) => !v)}
          className="text-[11px] font-semibold text-terracota"
        >
          {mapaAbierto ? "Cerrar mapa" : "¿No la encuentras? Usa el mapa"}
        </button>
      </div>

      {!mapaAbierto && (
        <>
          <input
            ref={inputRef}
            type="text"
            autoComplete="off"
            placeholder="Ej. Av. Larco 1150, Miraflores"
            className="w-full rounded-lg border border-arena bg-white px-4 py-2.5 text-sm text-carbon placeholder:text-gris-calido focus:border-terracota focus:outline-none transition-colors duration-200"
          />
          <p className="text-[11px] text-gris-calido">
            Selecciona una opción para completar los campos automáticamente.
          </p>
        </>
      )}

      {mapaAbierto && (
        <>
          <div
            ref={mapRef}
            className="h-60 w-full overflow-hidden rounded-xl border border-arena"
          />
          <p className="text-[11px] text-gris-calido">
            {mapaListo
              ? "Toca el mapa para fijar la ubicación y completar los campos."
              : "Cargando mapa..."}
          </p>
        </>
      )}
    </div>
  );
}
