import Svg, { Circle, Line, Polyline, Text as SvgText } from "react-native-svg";

import { theme } from "@/core/theme";

interface WeeklyTimeDatum {
  label: string;
  value: number;
}

interface WeeklyTimeChartProps {
  data: WeeklyTimeDatum[];
}

const CHART_HEIGHT = 220;
const CHART_WIDTH = 320;
const PADDING = {
  bottom: 34,
  left: 20,
  right: 12,
  top: 16
} as const;

export function WeeklyTimeChart({ data }: WeeklyTimeChartProps) {
  const chartInnerHeight = CHART_HEIGHT - PADDING.top - PADDING.bottom;
  const chartInnerWidth = CHART_WIDTH - PADDING.left - PADDING.right;
  const maxValue = Math.max(...data.map((item) => item.value), 1);
  const stepX = data.length > 1 ? chartInnerWidth / (data.length - 1) : chartInnerWidth / 2;
  const points = data
    .map((item, index) => {
      const x = PADDING.left + index * stepX;
      const y = PADDING.top + chartInnerHeight - chartInnerHeight * (item.value / maxValue);

      return `${x},${y}`;
    })
    .join(" ");

  return (
    <Svg height={CHART_HEIGHT} viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`} width="100%">
      <Line
        stroke={theme.colors.accent}
        strokeWidth={1}
        x1={PADDING.left}
        x2={CHART_WIDTH - PADDING.right}
        y1={CHART_HEIGHT - PADDING.bottom}
        y2={CHART_HEIGHT - PADDING.bottom}
      />
      <Polyline
        fill="none"
        points={points}
        stroke={theme.colors.primary}
        strokeLinecap="square"
        strokeLinejoin="miter"
        strokeWidth={3}
      />
      {data.map((item, index) => {
        const x = PADDING.left + index * stepX;
        const y = PADDING.top + chartInnerHeight - chartInnerHeight * (item.value / maxValue);

        return <Circle cx={x} cy={y} fill={theme.colors.primary} key={`${item.label}-point`} r={4} />;
      })}
      {data.map((item, index) => {
        const x = PADDING.left + index * stepX;

        return (
          <SvgText
            fill={theme.colors.muted}
            fontSize={10}
            key={`${item.label}-label`}
            textAnchor="middle"
            x={x}
            y={CHART_HEIGHT - 12}
          >
            {item.label}
          </SvgText>
        );
      })}
    </Svg>
  );
}
