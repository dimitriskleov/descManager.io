        </div>
    </div>
    <script>
        // Initial setup of file list and search bar
        document.addEventListener('DOMContentLoaded', () => {
            // Handle the search input
            document.getElementById('searchBar').addEventListener('keyup', filterFiles);
            // Call filterFiles initially to set up
            filterFiles();
        });

        function filterFiles() {
            const query = document.getElementById('searchBar').value.toLowerCase();
            const fileItems = document.querySelectorAll('.file-item');
            
            fileItems.forEach(item => {
                const fileName = item.querySelector('span').textContent.toLowerCase();
                if (fileName.includes(query)) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        }
    </script>
</body>
</html>
