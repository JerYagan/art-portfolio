export default function Star4SVG({ color }) {
  return (
    <svg
      viewBox="0 0 100 100"
      width="100%"
      height="100%"
      fill="none"
    >
      <polygon
        points="50,0 58,42 100,50 58,58 50,100 42,58 0,50 42,42"
        fill={color}
      />
    </svg>
  );
}
