import axios from 'axios'
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

    async function getProfileInfo() {
        const token = document.cookie
            .split(';')
            .find(cookie => cookie.includes('JSESSIONID'))
            .replace(/JSESSIONID=|"/g, '').trim()

        const profileUrlName = window.location.href.match(/in\/.+\//g)[0].slice(3, -1)
        const { data } = await axios.get(
            `https://www.linkedin.com/voyager/api/identity/profiles/${profileUrlName}/profileContactInfo`,
            {
                headers: { 'csrf-token': token }
            }
        )

        const experienceElements = $$('#experience ~ .pvs-list__outer-container > ul > li')
        const experienceTitles = []
        experienceElements.forEach((experienceListItem) => {
            const experienceTitleElement = $('span[aria-hidden]', experienceListItem)
            experienceTitles.push(experienceTitleElement.textContent)
        })

        const educationElements = $$('#education ~ .pvs-list__outer-container > ul > li')
        const educationTitles = []
        educationElements.forEach((educationLitItem) => {
            const educationTitleElement = $('span[aria-hidden]', educationLitItem)
            educationTitles.push(educationTitleElement.textContent)
        })

        const profile = {
            contactInfo: await data,
            experienceTitles,
            educationTitles
        }
        console.log(profile)
    }

    getProfiles()
}

startScraping()
