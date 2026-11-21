// Icônes pixel art 16×16 dessinées pour AdamOS (une lettre = une couleur, "." = transparent).

const C = {
  K: '#141414',
  W: '#FFFFFF',
  Y: '#FFC53D',
  O: '#E09A1A',
  G: '#9AA0A6',
  L: '#D9D4C7',
  B: '#6FB7FF',
  N: '#23345F',
  R: '#FF5E3A',
  M: '#3DDC97',
  P: '#FF8FC7',
}

const MAPS = {
  folder: [
    '................',
    '..KKKKK.........',
    '.KYYYYYK........',
    '.KYYYYYKKKKKKKK.',
    '.KYYYYYYYYYYYYYK',
    '.KOOOOOOOOOOOOOK',
    '.KYYYYYYYYYYYYYK',
    '.KYYYYYYYYYYYYYK',
    '.KYYYYYYYYYYYYYK',
    '.KYYYYYYYYYYYYYK',
    '.KYYYYYYYYYYYYYK',
    '.KYYYYYYYYYYYYYK',
    '.KOOOOOOOOOOOOOK',
    '..KKKKKKKKKKKKK.',
    '................',
    '................',
  ],
  doc: [
    '..KKKKKKKKK.....',
    '..KWWWWWWWKK....',
    '..KWWWWWWWKWK...',
    '..KWWWWWWWKKKK..',
    '..KWKKKKKWWWWK..',
    '..KWWWWWWWWWWK..',
    '..KWKKKKKKKKWK..',
    '..KWWWWWWWWWWK..',
    '..KWKKKKKKKKWK..',
    '..KWWWWWWWWWWK..',
    '..KWKKKKKKWWWK..',
    '..KWWWWWWWWWWK..',
    '..KWWWWWWWWWWK..',
    '..KKKKKKKKKKKK..',
    '................',
    '................',
  ],
  pdf: [
    '..KKKKKKKKK.....',
    '..KWWWWWWWKK....',
    '..KWWWWWWWKWK...',
    '..KWWWWWWWKKKK..',
    '..KWWWWWWWWWWK..',
    '..KWKKKKKKKKWK..',
    '..KWWWWWWWWWWK..',
    '..KRRRRRRRRRRK..',
    '..KRWRRWRWWRRK..',
    '..KRRRRRRRRRRK..',
    '..KWWWWWWWWWWK..',
    '..KWKKKKKKKKWK..',
    '..KWWWWWWWWWWK..',
    '..KKKKKKKKKKKK..',
    '................',
    '................',
  ],
  computer: [
    '................',
    '.KKKKKKKKKKKKKK.',
    '.KLLLLLLLLLLLLK.',
    '.KLKKKKKKKKKKLK.',
    '.KLKBBBBBBBBKLK.',
    '.KLKBWBBBBBBKLK.',
    '.KLKBBBBBBBBKLK.',
    '.KLKBBBBBBBBKLK.',
    '.KLKBBBBBBBBKLK.',
    '.KLKKKKKKKKKKLK.',
    '.KLLLLLLLLLLLLK.',
    '.KKKKKKKKKKKKKK.',
    '......KLLK......',
    '....KKKKKKKK....',
    '....KLLLLLLK....',
    '....KKKKKKKK....',
  ],
  log: [
    '................',
    '.KKKKKKKKKKKKKK.',
    '.KMMMMMMMMMMMMK.',
    '.KKKKKKKKKKKKKK.',
    '.KNNNNNNNNNNNNK.',
    '.KNWNNNNNNNNNNK.',
    '.KNNWNNNNNNNNNK.',
    '.KNWNNWWWWNNNNK.',
    '.KNNNNNNNNNNNNK.',
    '.KNWWWWWWWNNNNK.',
    '.KNNNNNNNNNNNNK.',
    '.KNWWWWNNNNNNNK.',
    '.KNNNNNNNNNNNNK.',
    '.KKKKKKKKKKKKKK.',
    '................',
    '................',
  ],
  mail: [
    '................',
    '................',
    '................',
    '.KKKKKKKKKKKKKK.',
    '.KKWWWWWWWWWWKK.',
    '.KWKWWWWWWWWKWK.',
    '.KWWKWWWWWWKWWK.',
    '.KWWWKWWWWKWWWK.',
    '.KWWWWKKKKWWWWK.',
    '.KWWWWWWWWWWWWK.',
    '.KWWWWWWWWWWWWK.',
    '.KPPWWWWWWWWWWK.',
    '.KWWWWWWWWWWWWK.',
    '.KKKKKKKKKKKKKK.',
    '................',
    '................',
  ],
  motus: [
    'KKKKKKKKKKKKKKKK',
    'KRRRRKBBBBKYYYYK',
    'KRRRRKBBBBKYYYYK',
    'KRRRRKBBBBKYYYYK',
    'KRRRRKBBBBKYYYYK',
    'KKKKKKKKKKKKKKKK',
    'KBBBBKRRRRKBBBBK',
    'KBBBBKRRRRKBBBBK',
    'KBBBBKRRRRKBBBBK',
    'KBBBBKRRRRKBBBBK',
    'KKKKKKKKKKKKKKKK',
    'KRRRRKRRRRKRRRRK',
    'KRRRRKRRRRKRRRRK',
    'KRRRRKRRRRKRRRRK',
    'KRRRRKRRRRKRRRRK',
    'KKKKKKKKKKKKKKKK',
  ],
  trash: [
    '................',
    '......KKKK......',
    '..KKKKKKKKKKKK..',
    '..KLLLLLLLLLLK..',
    '..KKKKKKKKKKKK..',
    '...KLGLGLGLGK...',
    '...KLGLGLGLGK...',
    '...KLGLGLGLGK...',
    '...KLGLGLGLGK...',
    '...KLGLGLGLGK...',
    '...KLGLGLGLGK...',
    '...KLGLGLGLGK...',
    '...KLLLLLLLLK...',
    '...KKKKKKKKKK...',
    '................',
    '................',
  ],
}

export function PixelIcon({ name, size = 48, className = '' }) {
  const map = MAPS[name] || MAPS.doc
  const rects = []
  map.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      const c = C[row[x]]
      if (c) rects.push(<rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={c} />)
    }
  })
  return (
    <svg
      viewBox="0 0 16 16"
      width={size}
      height={size}
      shapeRendering="crispEdges"
      aria-hidden="true"
      className={`shrink-0 ${className}`}
    >
      {rects}
    </svg>
  )
}
