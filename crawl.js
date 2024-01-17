const { JSDOM } = require('jsdom')

async function crawlPage(baseURL, currentURL, pages) {
    const currentURLobj = new URL(currentURL)
    const baseURLobj = new URL(baseURL)

    if (currentURLobj.hostname !== baseURLobj.hostname) {
        return pages
    } 
        
    const normalizedcurrentURL = normalizeURL(currentURL)

    if (pages[normalizedcurrentURL] > 0) {
        pages[normalizedcurrentURL]++
        return pages
    } else {
        if (currentURL === baseURL) {
            pages[normalizedcurrentURL] = 0
        } else {
            pages[normalizedcurrentURL] = 1
        }}

    console.log(`Crawling ${currentURL}...`)

    let htmlBody = ''
    try {
        const response = await fetch(currentURL)
    
        if (response.status >= 400) {
            console.log(`Error-level status code: ${response.status}`)
            return pages
        }
    
        const contentType = response.headers.get('Content-Type')
        if (! contentType.includes('text/html')) {
            console.log(`Wrong Content-Type: ${contentType}`)
            return pages
        }    
        htmlBody = await response.text()
    } catch (err) {
        console.log(`An error was thrown: ${err}`)
    }

    const urls = getURLsFromHTML(htmlBody, baseURL)
    for (let url of urls) {
        pages = await crawlPage(baseURL, url, pages)
    }
    return pages
    }
   

function getURLsFromHTML(htmlBody, baseURL) {
    const urls = []
    const absurls = []
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')
    for (const linkElement of linkElements) {
        urls.push(linkElement.href)     
    }
    for (const url of urls) {
        if (url.slice(0, 1) === '/') {
            absurl = baseURL + url
            absurls.push(absurl)
        } else {absurls.push(url)}
    }
    return absurls
}

function normalizeURL(urlString) {
    const urlObj = new URL(urlString)
    const path = `${urlObj.hostname}${urlObj.pathname}`
    if (path.slice(-1) === '/') {
        return path.slice(0, -1)
    } else {
        return path
    }
}

module.exports = {normalizeURL, getURLsFromHTML, crawlPage}