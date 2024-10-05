const Levels = [
  {
    min: 0,
    max: 100,
    value: 1,
  },
  {
    min: 100,
    max: 250,
    value: 2,
  },
  {
    min: 250,
    max: 500,
    value: 3,
  },
  {
    min: 500,
    max: 1000,
    value: 4,
  },
  {
    min: 1000,
    max: 1500,
    value: 5,
  },
  {
    min: 1500,
    max: 2500,
    value: 6,
  },
  {
    min: 2500,
    max: 3500,
    value: 7,
  },
  {
    min: 3500,
    max: 5000,
    value: 8,
  },
  {
    min: 5000,
    max: 7500,
    value: 9,
  },
  {
    min: 7500,
    max: 10000,
    value: 10,
  },
  {
    min: 10000,
    max: 999999999,
    value: 11,
  },
];

function GetLevels() {
  return Levels;
}
 
export default GetLevels;
