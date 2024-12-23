const colors = {
  black: "\x1b[0;90m",
  red: "\x1b[0;91m",
  green: "\x1b[0;92m",
  yellow: "\x1b[0;93m",
  blue: "\x1b[0;94m",
  purple: "\x1b[0;95m",
  cyan: "\x1b[0;96m",
  white: "\x1b[0;97m",
  reset: "\x1b[0m",
};
const term = (color: keyof typeof colors, text: string) =>
  `${colors[color]}${text}${colors.reset}`;

export default term;
