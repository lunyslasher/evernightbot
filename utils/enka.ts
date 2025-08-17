import { Avatar } from '@/types/avatar';
import { Relic } from '@/types/relic';
import { StarRail } from 'starrail.js';
import redis from '@/redisClient'
const enkaClient = new StarRail({ defaultLanguage: `en` });

class EnkaRelics {
    fetchUser = async (uid: string) => {
        const playerUid = parseInt(uid);
        if (Number.isNaN(playerUid)) {
            return;
        }

        try {
            const cached = await redis.get(uid);

            if(cached) {
                return JSON.parse(cached);
            }

            const user = await enkaClient.fetchUser(playerUid);

            const characters = user.getCharacters();

            const avatars = [];

            for (let a of characters) {
                const character: Avatar = {
                    name: a.characterData.name.toString(),
                    id: a.characterData.id,
                    level: a.level,
                    promotion: a.ascension,
                    rank: a.eidolons,
                    lightCone: a.lightCone && {
                        id: a.lightCone.lightConeData.id,
                        rank: a.lightCone.superimposition.level,
                        level: a.lightCone.level,
                        promotion: a.lightCone.ascension,
                    },
                    relics: [],
                };
                for (let r of a.relics) {
                    const relic: Relic = {
                        id: r.relicData.id,
                        level: r.level,
                        mainStatId: r.mainStat.mainStatData.id,
                        subStatsCount: r.subStats.length,
                        subStats: r.subStats.map(s => {
                            return {
                                id: s.subStatData.id,
                                count: s.count,
                                steps: s.steps,
                            };
                        }),
                    };
                    character.relics.push(relic);
                }
                avatars.push(character);
            }
            await redis.setEx(uid, 60, JSON.stringify(avatars));
            return avatars;
        } catch (error: any) {
            console.log(error);
        }
    };
    /*
    fetchEnka = async (username: string) => {
        if(!username) {
            return;
        }

        try {
            const user = await enkaClient.fetchEnkaStarRailAccounts(username);

            if(!user){
                return;
            }
            
            const characters = await user[0].fetchBuilds();
            console.log(characters);
            
            if(!characters) {
                return;
            }
            
            const avatars = [];

            for (let a of characters) {
                const character: Avatar = {
                    name: a.characterData.name.toString(),
                    id: a.characterData.id,
                    level: a.level,
                    promotion: a.ascension,
                    rank: a.eidolons,
                    lightCone: a.lightCone && {
                        id: a.lightCone.lightConeData.id,
                        rank: a.lightCone.superimposition.level,
                        level: a.lightCone.level,
                        promotion: a.lightCone.ascension,
                    },
                    relics: [],
                };
                for (let r of a.relics) {
                    const relic: Relic = {
                        id: r.relicData.id,
                        level: r.level,
                        mainStatId: r.mainStat.mainStatData.id,
                        subStatsCount: r.subStats.length,
                        subStats: r.subStats.map(s => {
                            return {
                                id: s.subStatData.id,
                                count: s.count,
                                steps: s.steps,
                            };
                        }),
                    };
                    character.relics.push(relic);
                }
                avatars.push(character);
            }
            console.log(avatars);
            return avatars;
        } catch (error: any) {
            console.log(error);
        }
    };*/
}

export default new EnkaRelics();