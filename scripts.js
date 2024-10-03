$(document).ready(function() {
  let userData = {
    username: 'User_name',
    email: 'User_name@example.com',
    department: 'Computer Science',
    subject: 'Web Development',
  };

  // Sidebar Toggle
  $('#sidebarToggle, #sidebarToggleMain').on('click', function() {
    $('#sidebar').toggleClass('collapsed');
  });

  // Profile picture upload and display (Top right corner only)
  $('#editProfileForm').on('submit', function(e) {
    e.preventDefault();

    const fileInput = document.getElementById('profilePicture');
    
    if (fileInput.files.length > 0) {
      const reader = new FileReader();
      reader.onload = function(e) {
        // Only update top right profile image
        $('#profileDropdown').attr('src', e.target.result);
      };
      reader.readAsDataURL(fileInput.files[0]);
    }

    // Close profile edit overlay
    $('#profileEditOverlay').fadeOut();
  });

  // Open profile edit overlay
  $('#editProfileBtn').on('click', function() {
    $('#profileEditOverlay').fadeIn();
  });

  // ********************************************
   // Function to update profile picture only
  $('#editProfileForm').on('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting traditionally

    // Get the updated profile picture
    const file = $('#profilePicture')[0].files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        $('#profilePicPreview').attr('src', e.target.result).show(); // Update preview
      }
      reader.readAsDataURL(file);
    }

    // Close the Edit Profile Overlay
    $('#profileEditOverlay').hide();
  });

  // Optional: Handle profile picture preview
  $('#profilePicture').on('change', function() {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        $('#profilePicPreview').attr('src', e.target.result).show(); // Show the image
      }
      reader.readAsDataURL(file);
    }
  });
//********************************************* */



  // Recently uploaded folders array
  let recentFolders = []; // Store recently uploaded folders

  // Function to update modal with recently uploaded folders
  function updateModal() {
    const modalDisplay = $('#modalFolderDisplay');
    modalDisplay.empty(); // Clear current modal content

    recentFolders.forEach(folder => {
      const folderCard = `
        <div class="modal-folder-card">
          <span class="folder-title">${folder}</span>
        </div>`;
      modalDisplay.append(folderCard); // Append each folder to the modal
    });
  }

  // File/folder creation
  $('#createFileBtn').on('click', function() {
    const folderName = prompt('Enter folder name:');
    if (folderName) {
      // Add to the recent folders array
      recentFolders.unshift(folderName); // Add new folder to the front of the array

      // Limit to the last 5 uploaded folders
      if (recentFolders.length > 5) {
        recentFolders.pop(); // Remove the oldest folder if exceeding limit
      }

      // Update the modal with the new folder
      updateModal();

      // Create folder card in the main display
      const newFolder = `
        <div class="col-lg-4 col-md-6 mb-4">
          <div class="card shadow-sm folder-card">
            <div class="card-body text-center">
              <h5 class="card-title text-primary">${folderName}</h5>
              <button class="btn btn-danger deleteBtn">Delete</button>
              <button class="btn btn-primary shareBtn">Share</button>
            </div>
          </div>
        </div>`;
      $('#fileDisplay').append(newFolder);
    }
  });

  // Folder click event - Redirect to a new page
  $(document).on('click', '.folder-card', function(e) {
    if (!$(e.target).hasClass('deleteBtn') && !$(e.target).hasClass('shareBtn')) {
      const folderName = $(this).find('.card-title').text(); // Get folder name

      // Redirect to the new HTML page, passing the folder name as a query parameter
      window.location.href = `folderDetails.html?folder=${encodeURIComponent(folderName)}`;
    }
  });
  // Function to delete folder from the recent folders array
  function removeFolderFromRecent(folderName) {
    recentFolders = recentFolders.filter(folder => folder !== folderName); // Remove folder from array
    updateModal(); // Update modal content
  }

    // Delete folder functionality
    $(document).on('click', '.deleteBtn', function() {
      const folderElement = $(this).closest('.col-lg-4'); // Get the folder element
      const folderName = folderElement.find('.card-title').text(); // Get folder name
  
      // Remove folder from the main screen
      folderElement.remove();
  
      // Remove folder from recent folders array and update modal
      removeFolderFromRecent(folderName);
    });

  // Recently uploaded folders button
  $('#recentFoldersBtn').on('click', function() {
    $('#recentFoldersModal').show(); // Show modal
    updateModal(); // Update modal content
  });
   // Share folder functionality (currently just an alert)
   $(document).on('click', '.shareBtn', function() {
    alert('Share functionality coming soon!'); // Implement sharing logic here
  });

  // Open the modal on button click
  $('#recentFoldersBtn').on('click', function() {
    $('#recentFoldersModal').fadeIn(); // Show the modal
  });

  // Close modal
  $('#closeModal').on('click', function() {
    $('#recentFoldersModal').hide(); // Hide modal
  });
});



