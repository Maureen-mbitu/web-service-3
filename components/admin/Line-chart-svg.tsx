export default function LineChartSvg({ path, arrow }: { path: string; arrow: string }) {
  return (
    <svg viewBox="0 0 100 50" className="w-full h-full">
      <path
        d={path}
        fill="none"
        stroke="#2e7d32"
        strokeWidth="2"
        className="stroke-current"
      />
      <polyline points={arrow} fill="none" stroke="#2e7d32" strokeWidth="2" />
    </svg>
  );
}