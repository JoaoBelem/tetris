const blocks = {
  Square: {
    id: 'square',
    pattern: [
      [-1, 0],
      [-1, 1],
      [0, 1],
    ],
    size: {
      left: 1,
      right: 0,
      down: 1,
    },
    color: 'pink',
  },
  L: {
    id: 'L',
    pattern: [
      [-1, 0],
      [-1, 1],
      [1, 0],
    ],
    size: {
      left: 1,
      right: 1,
      down: 1,
    },
    color: 'green',
  },
  J: {
    id: 'J',
    pattern: [
      [1, 0],
      [1, 1],
      [-1, 0],
    ],
    size: {
      left: 1,
      right: 1,
      down: 1,
    },
    color: 'red',
  },
  S: {
    id: 'S',
    pattern: [
      [1, 0],
      [0, 1],
      [-1, 1],
    ],
    size: {
      left: 1,
      right: 1,
      down: 1,
    },
    color: 'yellow',
  },
  Z: {
    id: 'Z',
    pattern: [
      [-1, 0],
      [0, 1],
      [1, 1],
    ],
    size: {
      left: 1,
      right: 1,
      down: 1,
    },
    color: 'purple',
  },
  T: {
    id: 'T',
    pattern: [
      [1, 0],
      [-1, 0],
      [0, 1],
    ],
    size: {
      left: 1,
      right: 1,
      down: 1,
    },
    color: 'cyan',
  },
  Line: {
    id: 'line',
    pattern: [
      [1, 0],
      [-1, 0],
      [-2, 0],
    ],
    size: {
      left: 2,
      right: 1,
      down: 0,
    },
    color: 'white',
  },
};

export default blocks;