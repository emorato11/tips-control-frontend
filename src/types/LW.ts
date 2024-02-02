export interface SeriesOptions {
  topFillColor1: string
  topFillColor2: string
  topLineColor: string
  bottomFillColor1: string
  bottomFillColor2: string
  bottomLineColor: string
  lineStyle: number
  lineType: number
  pointMarkersVisible: boolean
  lastPriceAnimation: number
}

export interface ChartOptions {
  layout: { background: { color: string }; textColor: string }
  grid: { vertLines: { color: string }; horzLines: { color: string } }
  height: number
}

export interface SerieData {
  time: string
  value: number
}
