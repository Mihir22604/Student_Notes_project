$(document).ready(function () {
    let containers = [];
    let deletedContainers = [];

    // Function to render containers
    function renderContainers() {
        $('#container-list').empty();
        containers.forEach((container, index) => {
            $('#container-list').append(`
                <div class="container-box">
                    <input type="checkbox" class="checkbox" ${container.isFavorite ? 'checked' : ''} data-index="${index}">
                    <input type="text" value="${container.name}" />
                    <button class="delete-btn" data-index="${index}">Delete</button>
                </div>
            `);
        });
    }

    // Function to render recent containers
    function renderRecentContainers() {
        $('#recent-container-list').empty();
        containers.forEach((container) => {
            $('#recent-container-list').append(`
                <div>${container.name}</div>
            `);
        });
    }

    // Function to render favorite containers
    function renderFavorites() {
        $('#favorites-container-list').empty();
        containers.forEach((container) => {
            if (container.isFavorite) {
                $('#favorites-container-list').append(`
                    <div>${container.name}</div>
                `);
            }
        });
    }

    // Function to render deleted containers *********
    function renderTrash() {
        $('#trash-container-list').empty();
        deletedContainers.forEach((container) => {
            $('#trash-container-list').append(`
                <div>${container.name}</div>
            `);
        });
    }

    // Modal toggle logic
    function openModal(modalId) {
        $(modalId).fadeIn();
    }

    function closeModal() {
        $('.modal').fadeOut();
    }

    $('.close').on('click', closeModal);

    $('#recent-link').on('click', function () {
        renderRecentContainers();
        openModal('#recent-modal');
    });

    $('#favorites-link').on('click', function () {
        renderFavorites();
        openModal('#favorites-modal');
    });

    $('#trash-link').on('click', function () {
        renderTrash();
        openModal('#trash-modal');
    });

    $('#overview-link').on('click', function () {
        window.location.href = "index.html"; // Redirect to the original page
    });

    // Handle file uploads from the input field
    $('#file-input').on('change', function (event) {
        let files = event.target.files;
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            containers.push({ name: file.name, isFavorite: false });
        }
        renderContainers();
    });

    // Handle upload file button click
    $('#upload-btn').on('click', function () {
        $('#file-input').click(); // Trigger file input click
    });

    // Handle delete button click for containers
    $(document).on('click', '.delete-btn', function () {
        let index = $(this).data('index');
        if (confirm('Are you sure you want to delete this container?')) {
            deletedContainers.push(containers[index]); // Store in trash
            containers.splice(index, 1); // Remove from main containers
            renderContainers();
        }
    });

    // Handle complete delete button click ******
    $('#complete-delete').on('click', function () {
        if (deletedContainers.length > 0) {
            deletedContainers = []; // Empty trash
            renderTrash();
            alert('Trash has been emptied.');
        }
    });

    // Handle restore button click ******
    $('#restore-files').on('click', function () {
        containers = containers.concat(deletedContainers); // Restore deleted files
        deletedContainers = []; // Clear trash
        renderContainers();
        renderTrash();
        alert('Files have been restored.');
    });

    // Handle checkbox click for favorites
    $(document).on('change', '.checkbox', function () {
        let index = $(this).data('index');
        containers[index].isFavorite = $(this).is(':checked');
        renderContainers(); // Update the view
    });
});
 

