const { test, expect } = require('@jest/globals')
const {normalizeURL, getURLsFromHTML} = require('./crawl.js')


test('normalize URL', () => {
    expect(normalizeURL('http://blog.boot.dev/path')).toEqual('blog.boot.dev/path');
})


test('getURLsFromHTML', () => {
    const testHTMLBody = `
<html>
    <body>
        <a href="https://blog.boot.dev/"><span>Go to Boot.dev</span></a>
        <a href="/path"><span>Go to Boot.dev</span></a>
    </body>
</html>
`
    const testBaseURL = `https://blog.boot.dev`
    expect(getURLsFromHTML(testHTMLBody, testBaseURL)).toEqual(['https://blog.boot.dev/', 'https://blog.boot.dev/path'])
})

