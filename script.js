function handleFAQ() {
    window.open('#faq', '_blank');
    console.log('FAQ section accessed');
}

function handleMeme() {
    console.log('Meme Me feature accessed');
    window.location.href = "Meme-ify.html"; // replace with your file name
}

document.addEventListener('DOMContentLoaded', function() {
    const logo = document.querySelector('.logo');
    
    setInterval(() => {
        logo.style.transform = `rotate(${Math.sin(Date.now() * 0.001) * 5}deg)`;
    }, 16);
});
