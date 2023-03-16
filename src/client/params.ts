// scaling sources:
// https://britastro.org/2018/the-size-of-things

const realistic = false;
export var earth_radius = 5;
export var moon_radius = .7;
export var sun_radius = 10;
export var earth_orbit_radius = 90;
export var moon_orbit_radius = 15;

if (realistic) {
    earth_radius = 1;
    moon_radius = earth_radius * .27;
    sun_radius = earth_radius * 109;

    earth_orbit_radius = earth_radius * 11728;
    moon_orbit_radius = earth_radius * 30;
}

export const multiplier = 30;
export const earth_delta = 2 * Math.PI / 365 / multiplier;
export const moon_delta = 2 * Math.PI / 28 / multiplier;
export const daily_delta = moon_delta * 24;