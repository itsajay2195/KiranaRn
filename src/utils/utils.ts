export const dateFormatter = (date: any) => {
  // Extract hours and minutes
  let hours = date.getHours();
  let minutes: any = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // Convert hours from 24-hour to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;

  // Format the time as 'h.mmAM/PM'
  return `${hours}.${minutes}${ampm}`;
};

export const countries = ['in', 'us', 'de', 'gb'];

export const getRandomIndex = (previousIndex: number, countries: any[]) => {
  let newIndex;
  do {
    // Generate a random index
    newIndex = Math.floor(Math.random() * countries?.length);
  } while (newIndex === previousIndex);

  return newIndex;
};

type ColorRange = {
  range: string[];
  color: string;
};

const colorRanges: ColorRange[] = [
  {range: ['a', 'd'], color: '#FF0000'}, // Red
  {range: ['e', 'h'], color: '#0000FF'}, // Blue
  {range: ['i', 'l'], color: '#00FF00'}, // Green
  {range: ['m', 'p'], color: '#FFFF00'}, // Yellow
  {range: ['q', 't'], color: '#FF00FF'}, // Magenta
  {range: ['u', 'z'], color: '#00FFFF'}, // Cyan
];

export function getColorForChar(char: string): string | null {
  if (char?.length !== 1 || !/[a-z]/i.test(char)) {
    return '#FF0000'; // Invalid input
  }

  const lowerChar = char.toLowerCase();

  for (const {range, color} of colorRanges) {
    const [start, end] = range;
    if (lowerChar >= start && lowerChar <= end) {
      return color;
    }
  }

  return '#FF0000'; // No color found
}
