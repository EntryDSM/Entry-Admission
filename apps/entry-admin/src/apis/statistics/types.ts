export interface IRegionStatisticsItem {
  regionName: string;
  count: number;
}

export type IRegionStatisticsResponse = Record<string, number>;

export interface ICompetitionRateByType {
  applicationType: string;
  applicants: number;
  capacity: number;
  rate: number;
}

export interface ICompetitionRateTotal {
  applicants: number;
  capacity: number;
  rate: number;
}

export interface ICompetitionRateResponse {
  success: boolean;
  data: {
    total: ICompetitionRateTotal;
    byType: ICompetitionRateByType[];
  };
}

export interface IGenderStatisticsItem {
  gender: string;
  genderName: string;
  count: number;
  percentage: number;
}

export interface IGenderStatisticsResponse {
  success: boolean;
  data: {
    total: number;
    byGender: IGenderStatisticsItem[];
  };
}
