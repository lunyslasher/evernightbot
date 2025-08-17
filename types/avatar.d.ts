import { Relic } from "./relic";

export interface Avatar {
  id: number,
  name: string,
  level: number,
  promotion: number,
  rank: number,
  lightCone: LightCone | null,
  relics: Relic[]
}