export type BattleConfig = {
  battle_id: number,
  stage_id: number;
  cycle_count: number;
  monster_wave: [[number]];
  monster_level: number;
  blessings: any[];
}
