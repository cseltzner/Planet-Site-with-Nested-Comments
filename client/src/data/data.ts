export const planetData: any = {
  mercury: {
    name: "Mercury",
    summary:
      "Mercury is the closest planet to the sun, and the second hottest in the solar system. Mercury is the smallest planet in our solar system, being just larger than Earth's moon, and has no moons of its own. Because of it's proximity to the sun, Mercury is the fastest moving planet, traveling at 28 Miles per second",
    orbit: "88 Days",
    rotation: "59 Days",
    radius: "1500 Miles",
    mass: "0.055 Earths",
    temp: "350°F",
  },
  venus: {
    name: "Venus",
    summary:
      "Venus is the second planet from the sun and the hottest in our solar system. Heat from the sun is trapped in by thick atmosphere of carbon dioxide and sulfuric acid. The atmosphere is so thick that pressure on the surface of Venus is similar to the pressure 1 mile below the ocean on Earth. Venus is similar in size to the Earth, but it's rotation takes more than 200 times longer. Venus does not have any moons",
    orbit: "225 Days",
    rotation: "243 Days",
    radius: "3760 Miles",
    mass: "0.815 Earths",
    temp: "900°F",
  },
  earth: {
    name: "Earth",
    summary:
      'Earth is the third planet from the sun, and the only planet in our solar system with liquid water on its surface. This water along with an oxygen rich atmosphere has lead to thriving life on the planet. The word "Earth" originally came from central Europe and means "the ground". Earth has a single moon that we call The Moon.',
    orbit: "365 Days",
    rotation: "24 Hours",
    radius: "4000 Miles",
    mass: "1.0 Earths",
    temp: "57°F",
  },
  mars: {
    name: "Mars",
    summary:
      "Mars is the fourth planet from the sun, and it's surface is primarily a reddish, dusty desert. Iron in the soil oxidizes (rusts), which gives Mars it's red hue. Mars is the most visited planet besides Earth, with many satellites passing by and 5 rovers exploring the surface of the planet. Mars has two moons named Deimos and Phobos.",
    orbit: "637 Days",
    rotation: "24.6 Hours",
    radius: "2100 Miles",
    mass: "0.11 Earths",
    temp: "-81°F",
  },
  jupiter: {
    name: "Jupiter",
    summary:
      "Jupiter is the fifth planet from the sun, and is twice the mass as all of the other planets in the solar system combined. Jupiter's stripes consist of windy clouds of ammonia and water in an atmosphere of hydrogen and helium. The red spot on it's surface is a giant storm that began hundreds of Years ago. Jupiter has 53 named moons and another 26 that have not been officially named.",
    orbit: "12 Years",
    rotation: "10 Hours",
    radius: "43,400 Miles",
    mass: "318 Earths",
    temp: "-238°F",
  },
  saturn: {
    name: "Saturn",
    summary:
      "Saturn is the sixth planet from the sun, and is the second largest planet in the Solar System at ~3/4 the size of Jupiter. Saturn has seven rings made of rock and ice, as well as 82 moons surrounding it. Saturn's atmosphere consists primarily of uninhabitable hydrogen and helium.",
    orbit: "29 Years",
    rotation: "10.7 Hours",
    radius: "36,200 Miles",
    mass: "95 Earths",
    temp: "-285°F",
  },
  uranus: {
    name: "Uranus",
    summary:
      "Uranus is the seventh planet from the sun, and is the third largest planet in the Solar System. Uranus primarily consists of freezing water, methane, and ammonia swirling above a small rocky core which contributes to it's blue appearance. Uranus has 27 moons surrounding it, as well as 13 narrow rings.",
    orbit: "84 Years",
    rotation: "17 Hours",
    radius: "15,750 Miles",
    mass: "14.5 Earths",
    temp: "-353°F",
  },
  neptune: {
    name: "Neptune",
    summary:
      "Neptune is the eighth farthest planet from the sun, and is the only planet not visible to the naked eye. Neptune primarily consists of freezing water, methane, and ammonia swirling above a small rocky core which contributes to it's blue appearance. Neptune has 14 moons with at least five rings surrounding the planet",
    orbit: "165 Years",
    rotation: "16 Hours",
    radius: "15,300 Miles",
    mass: "17 Earths",
    temp: "-373°F",
  },
  pluto: {
    name: "Pluto",
    summary:
      "Pluto, once considered a planet and now officially a dwarf planet, is the farthest of the orbital bodies discussed on this site. Pluto is smaller than the Earth's moon, and has a blue-tinted atmosphere. Snow falls on Pluto, but the snow is red. Pluto has a different orbit than other planets, and is sometimes closer to the sun than Neptune. The planet has 5 moons. Charon, one of Pluto's moons, is so large that Pluto and Charon orbit each other",
    orbit: "248 Years",
    rotation: "6.4 Days",
    radius: "740 Miles",
    mass: "0.02 Earths",
    temp: "-387°F",
  },
};

export const planets = [
  "Mercury",
  "Venus",
  "Earth",
  "Mars",
  "Jupiter",
  "Saturn",
  "Uranus",
  "Neptune",
  "Pluto",
];

export const getRandomPlanet = () => {
  return planets[Math.floor(Math.random() * 9)];
};
