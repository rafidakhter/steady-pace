import Svg, { Line, Rect, Text as SvgText } from "react-native-svg";

import { theme } from "@/core/theme";

interface WeeklyDistanceDatum {
  actual: number;
  label: string;
  target: number;
}

interface WeeklyDistanceChartProps {
  data: WeeklyDistanceDatum[];
}

const CHART_HEIGHT = 240;
const CHART_WIDTH = 320;
const PADDING = {
  bottom: 34,
  left: 28,
  right: 12,
  top: 16
} as const;

export function WeeklyDistanceChart({ data }: WeeklyDistanceChartProps) {
  const chartInnerHeight = CHART_HEIGHT - PADDING.top - PADDING.bottom;
  const chartInnerWidth = CHART_WIDTH - PADDING.left - PADDING.right;
  const maxValue = Math.max(
    ...data.flatMap((item) => [item.actual, item.target]),
    1
  );
  const groupGap = 12;
  const groupWidth = data.length > 0 ? (chartInnerWidth - groupGap * Math.max(0, data.length - 1)) / data.length : chartInnerWidth;
  const barGap = 6;
  const barWidth = Math.max((groupWidth - barGap) / 2, 8);

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
      {data.map((item, index) => {
        const groupX = PADDING.left + index * (groupWidth + groupGap);
        const targetHeight = chartInnerHeight * (item.target / maxValue);
        const actualHeight = chartInnerHeight * (item.actual / maxValue);

        return (
          <Rect
            fill={theme.colors.accent}
            height={Math.max(targetHeight, 2)}
            key={`${item.label}-target`}
            width={barWidth}
            x={groupX}
            y={CHART_HEIGHT - PADDING.bottom - targetHeight}
          />
        );
      })}
      {data.map((item, index) => {
        const groupX = PADDING.left + index * (groupWidth + groupGap);
        const actualHeight = chartInnerHeight * (item.actual / maxValue);

        return (
          <Rect
            fill={theme.colors.primary}
            height={Math.max(actualHeight, 2)}
            key={`${item.label}-actual`}
            width={barWidth}
            x={groupX + barWidth + barGap}
            y={CHART_HEIGHT - PADDING.bottom - actualHeight}
          />
        );
      })}
      {data.map((item, index) => {
        const x = PADDING.left + index * (groupWidth + groupGap) + groupWidth / 2;

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
