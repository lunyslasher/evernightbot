import { Relic } from "@/types/relic"

const parseRelics = (relics: Relic[]) => {
    return relics.map(r => {
        return `${r.id},${r.level},${r.mainStatId},${r.subStatsCount},${r.subStats.map(s => {return `${s.id}:${s.count}:${s.steps}`}).join(`,`)}`
    })
}

export default parseRelics;