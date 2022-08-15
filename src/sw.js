import { inyectScript, deleteTabAndCreateNewOne } from "./utils/chromium";


chrome.action.onClicked.addListener((tab) => {
    inyectScript("scripts/scrapper.js", tab.id)
})

chrome.runtime.onConnect.addListener((port) => {
    port.onMessage.addListener(async (msg, port) => {
        const tabId = await deleteTabAndCreateNewOne(port.sender.tab.id, msg.profiles[0])
        inyectScript("scripts/scrapeProfile.js", tabId)
    })
})
