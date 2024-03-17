export const OPERATORS=[
  '^',
  '*',
  '/',
  '+',
  '-',
];


export const PRECEDENCE={
    '(': 0,
    ')': 0,
    '^': 4,
    '*': 3,
    '/': 3,
    '+': 2,
    '-': 2,
    'sin': 4,
    'cos': 4,
    'tan': 4,
    'sqrt': 4,
    'log': 4,
    'abs': 4,
    'floor': 4,
    'ceil': 4,
    'max': 4,
    'min': 4,
    'round': 4,
    '!': 5
  }

export const LEFT_ASSOCIATIVE={
    '^': false,
    '*': true,
    '/': true,
    '+': true,
    '-': true,
    '!': false
}

//export={ OPERATORS, PRECEDENCE ,LEFT_ASSOCIATIVE };
