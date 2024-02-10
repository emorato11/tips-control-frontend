import type { SeriesOptions, ChartOptions } from '@/types/LW'

export const LWSeriesOptions: SeriesOptions = {
  topFillColor1: '#1C2173',
  topFillColor2: '#1280afcc',
  topLineColor: '#c5a649e6',
  bottomFillColor1: '#FABADA',
  bottomFillColor2: '#FABADA',
  bottomLineColor: 'red',
  lineStyle: 2,
  lineType: 2,
  pointMarkersVisible: true,
  lastPriceAnimation: 2
}

export const LWChartOptions: ChartOptions = {
  layout: { background: { color: '#F6F5F2' }, textColor: '#a22029e8' },
  grid: { vertLines: { color: '#a2202980' }, horzLines: { color: '#a2202980' } },
  height: 300
}
