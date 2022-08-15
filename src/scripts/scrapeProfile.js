import axios from 'axios'
import { waitForSelector } from '../utils/waitFor'
import { $, $$ } from '../utils/selectors'


async function getProfileInfo() {
    await waitForSelector('#experience')

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

    let url = 'http://localhost:3000/profiles'
    let postData = profile
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .catch(error => console.log('Error:', error))
        .then(response => console.log('Success:', response))
}

getProfileInfo()