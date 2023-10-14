emailjs.init("nKyezAY8dl7ulg8t1"); // EmailJS User ID

const sendBtn = document.querySelector('.send-btn');
const result = document.querySelector('.result');

sendBtn.addEventListener('click', sendEmail);

function sendEmail(){
    // get the form data
    const to = document.getElementById('to').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // send the email using EmailJS
    emailjs.send("service_5udvc6o", "template_zwqib4e",{
        to_email:to,
        subject:subject,
        message:message
    }).then(function () {
        result.innerHTML = "Email sent successfully!"
        result.computedStyleMap.opacity = 1;
    }, function (error){
        result.innerHTML = "Email senting failed!"
        result.computedStyleMap.opacity = 1;
        console.log(error);
    })
}