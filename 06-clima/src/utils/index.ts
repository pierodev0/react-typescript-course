export function formatTempeture(temperature: number): number {
  const kelvin = 273.15;
  return parseInt((temperature - kelvin).toString());
}
