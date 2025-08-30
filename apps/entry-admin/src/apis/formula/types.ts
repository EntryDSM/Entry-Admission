export interface IFormulaRequest {
  name: string,
  description: string,
  applicationType: string,
  educationalStatus: string,
  region: string,
  formulas: {
    step: number
    name: string
    expression: string
    resultVariable: string
  }
}