const btn1 = document.getElementById('fact-get');
const btn2 = document.getElementById('dog-get');
const fact = document.getElementById('fact');
const image = document.getElementById('img-dog');

btn1.addEventListener('click', async () => {
    try {
        const factText = await getFacts();
        fact.innerHTML = factText;
        fact.style.display = 'block'; // Show the fact
    } catch (error) {
        fact.innerHTML = 'Failed to fetch cat fact. Please try again later.';
        console.error('Error fetching cat fact:', error);
        fact.style.display = 'block'; // Show the error message
    }
});

btn2.addEventListener('click', async () => {
    try {
        const dogImage = await getDogImage();
        image.src = dogImage;
        image.style.display = 'block'; // Show the image
    } catch (error) {
        image.src = '';
        image.style.display = 'none'; // Hide the image if there's an error
        image.alt = 'Failed to load dog image';
        console.error('Error fetching dog image:', error);
    }
});

async function getFacts() {
    const response = await axios.get('https://catfact.ninja/fact');
    const data = response.data;
    const fact = data.fact;
    return fact;
}

async function getDogImage() {
    const response = await axios.get('https://dog.ceo/api/breeds/image/random');
    const data = response.data;
    const image = data.message;
    return image;
}