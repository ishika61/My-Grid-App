const generateUserColor = () => {
  const hue = Math.floor(Math.random() * 360);
  const saturation = 65 + Math.floor(Math.random() * 20);
  const lightness = 45 + Math.floor(Math.random() * 15);
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

module.exports = generateUserColor;
