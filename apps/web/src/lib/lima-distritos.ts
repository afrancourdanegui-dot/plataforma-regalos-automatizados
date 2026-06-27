const DISTRITOS_ENTRIES = [
  ["CERCADO_DE_LIMA", "Cercado de Lima"],
  ["ANCON", "Ancón"],
  ["ATE", "Ate"],
  ["BARRANCO", "Barranco"],
  ["BRENA", "Breña"],
  ["CARABAYLLO", "Carabayllo"],
  ["CHACLACAYO", "Chaclacayo"],
  ["CHORRILLOS", "Chorrillos"],
  ["CIENEGUILLA", "Cieneguilla"],
  ["COMAS", "Comas"],
  ["EL_AGUSTINO", "El Agustino"],
  ["INDEPENDENCIA", "Independencia"],
  ["JESUS_MARIA", "Jesús María"],
  ["LA_MOLINA", "La Molina"],
  ["LA_VICTORIA", "La Victoria"],
  ["LINCE", "Lince"],
  ["LOS_OLIVOS", "Los Olivos"],
  ["LURIGANCHO", "Lurigancho (Chosica)"],
  ["LURIN", "Lurín"],
  ["MAGDALENA_DEL_MAR", "Magdalena del Mar"],
  ["MIRAFLORES", "Miraflores"],
  ["PACHACAMAC", "Pachacámac"],
  ["PUCUSANA", "Pucusana"],
  ["PUEBLO_LIBRE", "Pueblo Libre"],
  ["PUENTE_PIEDRA", "Puente Piedra"],
  ["PUNTA_HERMOSA", "Punta Hermosa"],
  ["PUNTA_NEGRA", "Punta Negra"],
  ["RIMAC", "Rímac"],
  ["SAN_BARTOLO", "San Bartolo"],
  ["SAN_BORJA", "San Borja"],
  ["SAN_ISIDRO", "San Isidro"],
  ["SAN_JUAN_DE_LURIGANCHO", "San Juan de Lurigancho"],
  ["SAN_JUAN_DE_MIRAFLORES", "San Juan de Miraflores"],
  ["SAN_LUIS", "San Luis"],
  ["SAN_MARTIN_DE_PORRES", "San Martín de Porres"],
  ["SAN_MIGUEL", "San Miguel"],
  ["SANTA_ANITA", "Santa Anita"],
  ["SANTA_MARIA_DEL_MAR", "Santa María del Mar"],
  ["SANTA_ROSA", "Santa Rosa"],
  ["SANTIAGO_DE_SURCO", "Santiago de Surco"],
  ["SURQUILLO", "Surquillo"],
  ["VILLA_EL_SALVADOR", "Villa El Salvador"],
  ["VILLA_MARIA_DEL_TRIUNFO", "Villa María del Triunfo"],
] as const;

export type LimaDistrictCode = (typeof DISTRITOS_ENTRIES)[number][0];

export const DISTRITO_CODES = DISTRITOS_ENTRIES.map(
  ([value]) => value
) as [LimaDistrictCode, ...LimaDistrictCode[]];

export const DISTRITO_LABEL: Record<LimaDistrictCode, string> =
  Object.fromEntries(DISTRITOS_ENTRIES) as Record<LimaDistrictCode, string>;

export const DISTRITOS_LIMA = DISTRITOS_ENTRIES.map(([value, label]) => ({
  value,
  label,
})).sort((a, b) => a.label.localeCompare(b.label, "es"));

export const HOUSING_TYPE_LABEL: Record<string, string> = {
  CASA: "Casa",
  DEPARTAMENTO: "Departamento",
};
