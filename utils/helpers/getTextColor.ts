// Function to determine contrasting text color (black or white)
export const getContrastingTextColor = (color: string): string => {
  const hexColor = color.replace('#', '');
  const r = parseInt(hexColor.substring(0, 2), 16);
  const g = parseInt(hexColor.substring(2, 4), 16);
  const b = parseInt(hexColor.substring(4, 6), 16);

  // Calculate luminance (relative brightness)
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  // If luminance is below a certain threshold, use white text, otherwise black
  return luminance < 128 ? 'white' : 'black';
};
