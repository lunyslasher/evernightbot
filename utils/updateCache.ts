import { StarRail } from 'starrail.js';
const enkaClient = new StarRail({ defaultLanguage: `en` });

const updateCache = async () => {
    console.log(`Updating cache..`);
    await enkaClient.cachedAssetsManager.fetchAllContents({ useRawStarRailData: true });
    console.log(`Cache updated.`)
};

updateCache();