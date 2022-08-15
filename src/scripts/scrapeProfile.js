import axios from 'axios'
import { db } from '../../config/connectionDB.js'


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

    db.profile.add({
        contactInfo: profile.contactInfo,
        educationTitles: profile.experienceTitles,
        experienceTitles: profile.educationTitles
    })
    console.log(db.profile.toArray())
}

getProfileInfo()