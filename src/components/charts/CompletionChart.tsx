import Svg, { Line, Rect, Text as SvgText } from "react-native-svg";

import { theme } from "@/core/theme";

interface CompletionChartDatum {
  label: string;
  value: number;
}

interface CompletionChartProps {
  data: CompletionChartDatum[];
}

const CHART_HEIGHT = 220;
const CHART_WIDTH = 320;
const PADDING = {
  bottom: 34,
  left: 28,
  right: 12,
  top: 16
} as const;

export function CompletionChart({ data }: CompletionChartProps) {
  const chartInnerHeight = CHART_HEIGHT - PADDING.top - PADDING.bottom;
  const chartInnerWidth = CHART_WIDTH - PADDING.left - PADDING.right;
  const maxValue = Math.max(...data.map((item) => item.value), 1);
  const barGap = 10;
  const barWidth = data.length > 0 ? (chartInnerWidth - barGap * Math.max(0, data.length - 1)) / data.length : chartInnerWidth;

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
        const barHeight = chartInnerHeight * (item.value / maxValue);
        const x = PADDING.left + index * (barWidth + barGap);
        const y = CHART_HEIGHT - PADDING.bottom - barHeight;

        return (
          <Rect
            fill={theme.colors.primary}
            height={Math.max(barHeight, 2)}
            key={item.label}
            width={Math.max(barWidth, 8)}
            x={x}
            y={y}
          />
        );
      })}
      {data.map((item, index) => {
        const x = PADDING.left + index * (barWidth + barGap) + barWidth / 2;

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
