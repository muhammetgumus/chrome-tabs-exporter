let mailInput = document.getElementById('mailInput')
let inputArea = document.getElementById('inputArea')
let result = document.getElementById('result')
let resultText = document.getElementById('resultText')
let urls = []
let mailBodyText = ""
const MESSAGE_SUBJECT = "Exported-URLS";

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
        } catch (err) {
            setResultMessage("Failed")
        }
    } else {
        showResultArea()
        setResultMessage("Mail address is invalid!")
    }
}

function sendMail(messageBody) {
    console.log("Final" + `${mailInput.value}?subject=Exported-URLS&body=${messageBody}`)
    window.open(`mailto:${mailInput.value}?subject=${MESSAGE_SUBJECT}&body=${messageBody}`);
}

function validateMail(mailAddress) {
    var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(mailAddress)
}

function convertUrlsToString(urls) {
    var result = "";
    urls.forEach(url => result += url + "\n");
    return result;
}

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