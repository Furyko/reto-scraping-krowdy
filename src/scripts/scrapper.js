import { $,$$ } from '../utils/selectors.js'


async function startScraping() {
    function getProfiles() {
        const resultsContainer = $$('.reusable-search__entity-result-list > .reusable-search__result-container')
        const profileUrlList = []
        resultsContainer.forEach((resultItem) => {
            const profileUrlItem = $(
                '.entity-result > .entity-result__item > .entity-result__content > .mb1 > div > div > span > span > a',
                resultItem
            )
            try {
                console.log(profileUrlItem.attributes.href.textContent)
                profileUrlList.push(profileUrlItem.attributes.href.textContent)
            } catch {}
        })
        return profileUrlList
    }

    getProfiles()
}

startScraping()
