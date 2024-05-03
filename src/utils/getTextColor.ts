type TextColor = {
  white: string;
  black: string;
};

const defaultTextColor: TextColor = {
  white: '#fff',
  black: '#000',
};

const yiqValues = [299, 587, 114];

export const getTextColor = (
  bgColor: string,
  textColor: TextColor = defaultTextColor
) => {
  let rgb: number[] = [];

  if (/^#/.test(bgColor)) {
    // make 6 places hex values
    const hex =
      bgColor.slice(1).length === 3
        ? bgColor.replace(/[\da-f]/gi, '$&$&')
        : bgColor;

    // convert to rgb values
    rgb = hex.match(/[\da-f]{2}/gi)!.map(hexColor => parseInt(hexColor, 16));
  } else if (/^rgb/.test(bgColor)) {
    rgb = bgColor.match(/[\da-f]{2}/gi)!.map(rgbStr => Number(rgbStr));
  }

  const yiqSum = rgb.reduce(
    (result, color, index) => result + color * yiqValues[index]
  );
  const brightness = Math.round(yiqSum / 1000);

  return brightness > 125 ? textColor.black : textColor.white;
};
