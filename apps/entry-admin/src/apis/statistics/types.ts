export interface IRegionStatisticsItem {
  regionName: string;
  count: number;
}

export type IRegionStatisticsResponse = Record<string, number>;

export interface ICompetitionRateItem {
  applicationType: string;
  isDaejeon: boolean;
  count: number;
}

export type ICompetitionRateResponse = ICompetitionRateItem[];

export type IGenderStatisticsResponse = Record<string, number>;
