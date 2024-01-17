function printReport(pages) {
    console.log(`The report is starting...`)

    let sortedPages = []
    for (const url in pages) {
        sortedPages.push([url, pages[url]])
    }

    sortedPages.sort(function(a, b) {
        return b[1] - a[1]
    })

    sortedPages.forEach((element) => {
        console.log(`Found ${element[1]} internal links to ${element[0]}`)
    }) 
}

module.exports = {printReport}