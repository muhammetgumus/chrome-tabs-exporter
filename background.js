import { validateMail, sendMail } from './mail.js'
import { SUCCESS, FAILED, INVALID } from './constants.js'
import { convertUrlsToString } from './util.js'

let mailInput = document.getElementById('mailInput')
let inputArea = document.getElementById('inputArea')
let result = document.getElementById('result')
let resultText = document.getElementById('resultText')
let urls = []
let mailBodyText = ""
document.getElementById('sendButton').onclick = send
document.getElementById('resultConfirmButton').onclick = hideResultArea
document.addEventListener('DOMContentLoaded', function () {
    chrome.tabs.query({}, (tabs) => {
        tabs.forEach(tab => { urls.push(new String(tab.url)) });
    })
}, false);

function send() {
    if (validateMail(mailInput.value)) {
        showResultArea()
        try {
            mailBodyText = convertUrlsToString(urls)
            if (sendMail(mailBodyText)) {
                setResultMessage(SUCCESS)
            } else {
                setResultMessage(FAILED)
            }
        } catch (err) {
            setResultMessage(FAILED)
        }
    } else {
        showResultArea()
        setResultMessage(INVALID)
    }}

function setResultMessage(message) {
    resultText.innerHTML = message;
}

function showResultArea() {
    result.style.display = "block";
    inputArea.style.display = "none"
}

function hideResultArea() {
    result.style.display = "none";
    inputArea.style.display = "block"
    mailInput.value = ""
}