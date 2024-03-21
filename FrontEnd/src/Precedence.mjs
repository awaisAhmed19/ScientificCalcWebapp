export const OPERATORS=[
  '^',
  '*',
  '/',
  '+',
  '-',
];


export const PRECEDENCE = {
  '(': 0,
  ')': 0,
  '^': 4,
  '*': 3,
  '/': 3,
  '+': 2,
  '-': 2,
  'sin': 5,
  'cos': 5,
  'tan': 5,
  'sqrt': 5,
  'log': 5,
  'abs': 5,
  'floor': 5,
  'ceil': 5,
  'max': 5,
  'min': 5,
  'round': 5,
  '!': 6  // Adjusted to lower precedence
};


export const LEFT_ASSOCIATIVE={
    '^': false,
    '*': true,
    '/': true,
    '+': true,
    '-': true,
    '!': false
}

//export={ OPERATORS, PRECEDENCE ,LEFT_ASSOCIATIVE };
