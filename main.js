const { crawlPage } = require('./crawl.js')
const { printReport } = require('./report.js')

async function main() {
    if (process.argv.length < 3) {
        console.error('Expected at least one base URL!');
        process.exit(1);
    } 
    
    if (process.argv.length > 3) {
        console.error('Expected only one base URL!');
        process.exit(1);
    }

    const baseURL = process.argv[2]

    console.log(`Starting crawl of: ${baseURL}...`)

    const pages = await crawlPage(baseURL, baseURL, {})

    const report = printReport(pages)

    console.log(report)
}
  
main()