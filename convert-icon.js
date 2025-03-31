const sharp = require('sharp');

sharp('resources/icon.png')
    .resize(128, 128)
    .png()
    .toFile('resources/icon-128.png')
    .then(() => {
        console.log('Icon converted successfully!');
        // Replace the original file
        require('fs').renameSync('resources/icon-128.png', 'resources/icon.png');
    })
    .catch(err => console.error('Error converting icon:', err));