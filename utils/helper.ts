export const ART_WORKS = [
  "rooms_by_the_sea",
  "the_sleeping_gypsy",
  "the_channel_at_gravelines_evening",
  "maman",
  "composition",
  "near_washington_square",
  "christina's_world",
  "the_moon",
  "icons",
  "cabeza",
  "the_kiss",
  "fountain",
  "the_snail",
  "the_castle_of_the_pyrenees",
  "café_terrace_at_night",
  "decalcomania",
  "wanderer_above_the_sea_of_fog",
  "the_sower",
  "girl_in_white",
  "the_lovers",
  "nighthawks",
  "dollar_sign",
  "the_birth_of_day",
  "impression_sunrise",
  "the_son_of_man",
  "head_of_a_woman",
  "the_persistence_of_memory",
  "the_false_mirror",
  "untitled(head)_1982",
  "blue_nude_ii",
  "the_scream",
  "the_starry_night",
  "the_great_wave_off_kanagawa",
  "composition_with_red_yellow_and_blue",
];

export const pprint = (name: string) => {
  return name.replace(/_/g, " ").toUpperCase();
};

export function getTextWidth(text: string): number | undefined {
  // re-use canvas object for better performance
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (context) {
    context.font = getCanvasFont();
    const metrics = context.measureText(text);
    return metrics.width;
  }

  return undefined;
}

function getCanvasFont() {
  const fontWeight = "700";
  const fontSize = "48px";
  const fontFamily = "__Inter_2d22c6";

  return `${fontWeight} ${fontSize} ${fontFamily}`;
}

export const shuffleArray = (array: any[]) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

export const calculateMargin = (innerWidth: number, pieceWidth: number) => {
  return (
    (Math.ceil((innerWidth - pieceWidth * 4) / pieceWidth) / 2) * pieceWidth
  );
};
