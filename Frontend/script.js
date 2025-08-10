function handleFAQ() {
    window.open('#faq', '_blank');
    console.log('FAQ section accessed');
}

function handleMeme() {
    console.log('Meme Me feature accessed');
    window.location.href = "memeify.html"; // replace with your file name
}

document.addEventListener('DOMContentLoaded', function () {
    const logo = document.querySelector('.logo');

    setInterval(() => {
        logo.style.transform = `rotate(${Math.sin(Date.now() * 0.001) * 5}deg)`;
    }, 16);
});

// "+" button click → open file picker
function handlePlusClick() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch('http://127.0.0.1:5000/memeify', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) throw new Error('Failed to create meme');

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);

            // Display the meme image
            const memeResult = document.getElementById('memeResult');
            memeResult.src = url;

        } catch (error) {
            console.error('Error:', error);
            alert('Error creating meme!');
        }
    };
    fileInput.click();
}


// "Send" button → process meme request
function handleSendClick() {
    const input = document.getElementById('searchInput');
    const inputValue = input.value.trim();

    if (inputValue) {
        alert(`Processing your meme request: "${inputValue}"`);
        console.log('Send button clicked with input:', inputValue);
        // Here you would typically process the meme generation
    } else {
        alert('Please enter something to meme-ify first!');
    }
}

// Input focus
function handleInputClick() {
    const input = document.getElementById('searchInput');
    input.focus();
}

// Input blur (optional)
function handleInputBlur() {
    // Placeholder will automatically reappear if input is empty when user clicks away
}

// Toggle animation on funny image
function toggleAnimation() {
    const image = document.querySelector('.funny-image');
    image.classList.toggle('animated');
}

// Emoji change on hover
const funnyImage = document.querySelector('.funny-image');
const emojis = ['😂', '🤣', '😭', '💀', '🔥', '👀', '🤔', '😎'];
let currentEmojiIndex = 0;

if (funnyImage) {
    funnyImage.addEventListener('mouseenter', () => {
        currentEmojiIndex = (currentEmojiIndex + 1) % emojis.length;
        funnyImage.textContent = emojis[currentEmojiIndex];
    });
}

// Enter key triggers send
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            handleSendClick();
        }
    });
}
