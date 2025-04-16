const videoElement = document.querySelector('#inicio video');

async function fetchVideo() {
    const apiKey = 'J2kfBJFzJLVIyiE3Y775sQgQxT2VxxMFYfWoepwSiYBkNVmZDD7BuwFH'; // Reemplaza con tu clave de API de Pexels
    const videoId = '5858353'; // ID del video específico
    const url = `https://api.pexels.com/videos/videos/${videoId}`; // Endpoint para obtener un video específico

    try {
        const response = await fetch(url, {
            headers: {
                Authorization: apiKey
            }
        });

        if (!response.ok) {
            throw new Error('Error al obtener el video');
        }

        const data = await response.json();

        // Encuentra el archivo de video con la mayor resolución
        const videoFiles = data.video_files;
        const highestQualityVideo = videoFiles.reduce((highest, current) => {
            return current.height > highest.height ? current : highest;
        });

        const videoUrl = highestQualityVideo.link;

        // Cambia la fuente del video dinámicamente
        videoElement.innerHTML = `
            <source src="${videoUrl}" type="video/mp4">
        `;
    } catch (error) {
        console.error('Error:', error);
    }
}

fetchVideo();