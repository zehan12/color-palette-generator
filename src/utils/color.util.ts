export const generateRandomHex = (length: number) => {
  const colors = [];
  for (let i = 1; i <= length; i++) {
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    colors.push(randomColor);
  }
  return colors;
};
