import ColorThief from 'colorthief'
import lightOrDark from './lightOrDark';

const getCommonImgColor = async (imgUrl) => {
  const color = await ColorThief.getColor(imgUrl)
    .then((color) => {
      return 'rgb(' + color.join(',') + ')';
    })
    .catch((err) => {
      console.log(err);
    });
  return [color, lightOrDark(color)];
};

export default getCommonImgColor
