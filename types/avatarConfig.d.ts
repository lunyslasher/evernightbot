export interface AvatarConfig {
  id: number,
  name: string,
  level: number,
  promotion: number,
  rank: number,
  lightcone: LightCone | null,
  relics: string[],
  hp?: 100,
  sp?: 50,
  use_technique?: false
}