import { Avatar } from "@/types/avatar";
import { AvatarConfig } from "@/types/avatarConfig";
import { BattleConfig } from "@/types/battleConfig";

class Config {
  avatar_config: AvatarConfig[];
  battle_config: BattleConfig;

  constructor(avatar: Avatar[]) {
    this.avatar_config = avatar.map(a => {
      return {
        name: a.name,
        id: a.id,
        hp: 100,
        sp: 50,
        level: a.level,
        promotion: a.promotion,
        rank: a.rank,
        lightcone: a.lightCone,
        relics: a.relics.map(e => {
          return `${e.id},${e.level},${e.mainStatId},${e.subStatsCount},${e.subStats
            .map(s => {
              return `${s.id}:${s.count}:${s.steps}`;
            })
            .join(`,`)}`;
        }),
        use_technique: false,
      };
    });
    this.battle_config = {
      battle_id: 1,
      stage_id: 201012311,
      cycle_count: 30,
      monster_wave: [[4015011]],
      monster_level: 95,
      blessings: [],
    };
  }
}

export default Config;