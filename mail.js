const MAIL_SUBJECT = "Chrome-Exported-Tabs";

export function sendMail(messageBody) {
    var newWindow = window.open(`mailto:${mailInput.value}?subject=${MAIL_SUBJECT}&body=${messageBody}`, "_blank");
    var isSuccess = newWindow == null ? false : true;
    return isSuccess;
}

export function validateMail(mailAddress) {
    var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(mailAddress)
}