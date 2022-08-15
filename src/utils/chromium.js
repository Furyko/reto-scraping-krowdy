export async function inyectScript(path, tabId) {
    const options = {
        target: { tabId },
        files: [path]
    }
    return chrome.scripting.executeScript(options)
}

export async function deleteTabAndCreateNewOne(oldId,  url) {
    try {
        chrome.tabs.remove(oldId)
        const { id } = await chrome.tabs.create({ url })
        return id
    } catch(error) {
        console.log(error)
    }
}