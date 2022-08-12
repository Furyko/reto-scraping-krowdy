import { $,$$ } from '../utils/selectors.js'

const resultsContainer = $$('.reusable-search__entity-result-list > .reusable-search__result-container')

resultsContainer.forEach((resultItem) => {
    const profileUrlItem = $(
        '.entity-result > .entity-result__item > .entity-result__content > .mb1 > div > div > span > span > a',
        resultItem
        )
    console.log(profileUrlItem.attributes.href.textContent)
})
