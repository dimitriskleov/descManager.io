document.addEventListener('DOMContentLoaded', () => {
    const repoUrl = 'https://api.github.com/repos/dimitriskleov/games/contents';
    fetchFiles(repoUrl);

    document.getElementById('searchBar').addEventListener('input', filterFiles);
});

let allFiles = [];

async function fetchFiles(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        // Filter for .desc files
        allFiles = data.filter(file => file.name.endsWith('.desc'));
        renderFiles(allFiles);
    } catch (error) {
        console.error('Error fetching files:', error);
        alert('Failed to fetch files. Please check the console for details.');
    }
}

function renderFiles(files) {
    const fileList = document.getElementById('fileList');
    fileList.innerHTML = '';
    files.forEach(file => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `
            <span>${file.name}</span>
            <a href="${file.download_url}" download>Download</a>
        `;
        fileList.appendChild(fileItem);
    });
}

function filterFiles() {
    const query = document.getElementById('searchBar').value.toLowerCase();
    const filteredFiles = allFiles.filter(file => file.name.toLowerCase().includes(query));
    renderFiles(filteredFiles);
}
