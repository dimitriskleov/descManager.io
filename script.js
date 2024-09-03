document.getElementById('fetchFiles').addEventListener('click', async () => {
    const repoUrl = document.getElementById('repoUrl').value;
    const [owner, repo] = extractOwnerRepo(repoUrl);
    if (!owner || !repo) {
        alert('Invalid GitHub repository URL');
        return;
    }
    try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents`);
        const files = await response.json();
        displayFiles(files);
    } catch (error) {
        console.error('Error fetching files:', error);
        alert('Failed to fetch files. Please check the console for details.');
    }
});

function extractOwnerRepo(url) {
    const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    return match ? [match[1], match[2]] : [null, null];
}

function displayFiles(files) {
    const fileList = document.getElementById('fileList');
    fileList.innerHTML = '';
    files.forEach(file => {
        if (file.name.endsWith('.desc')) {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            fileItem.innerHTML = `
                <span>${file.name}</span>
                <button onclick="downloadFile('${file.download_url}', '${file.name}')">Download</button>
            `;
            fileList.appendChild(fileItem);
        }
    });
}

function downloadFile(url, name) {
    fetch(url)
        .then(response => response.blob())
        .then(blob => {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = name;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })
        .catch(error => {
            console.error('Error downloading file:', error);
            alert('Failed to download file. Please check the console for details.');
        });
}
