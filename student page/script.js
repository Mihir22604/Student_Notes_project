$(document).ready(function() {
    // Toggle profile menu
    // $('#profile-logo').click(function() {
    //   $('#profile-menu').toggle();
    // });
  
    // Hide profile menu if clicked outside
    // $(document).click(function(event) { 
    //   if (!$(event.target).closest('#profile-logo').length && !$(event.target).closest('#profile-menu').length) {
    //     if ($('#profile-menu').is(":visible")) {
    //       $('#profile-menu').hide();
    //     }
    //   }        
    // });
  // ***********************************
  // Toggle dropdown when clicking the profile icon
  $('#profileIcon').on('click', function() {
    $('#profileDropdown').toggle();
});

// When clicking outside the dropdown, close it
$(document).on('click', function(e) {
    if (!$(e.target).closest('#profileIcon, #profileDropdown').length) {
        $('#profileDropdown').hide();
    }
});

// Show the Edit Profile modal when clicking the Edit Profile button
$('#editProfileBtn').on('click', function() {
    $('#editProfileModal').modal('show');
    $('#profileDropdown').hide();  // Hide the dropdown after clicking
});

// Logout button click handler
$('#logoutBtn').on('click', function() {
    alert('You have been logged out!');
    // Add logout functionality here (e.g., redirect to login page)
});

// Preview the uploaded profile picture
$('#uploadProfilePic').on('change', function(e) {
    let reader = new FileReader();
    reader.onload = function(e) {
        $('#profilePicPreview').attr('src', e.target.result);
    }
    reader.readAsDataURL(this.files[0]);
});

// Update profile and display success message
$('#updateButton').on('click', function() {
    let fullName = $('#fullName').val();
    let email = $('#eMail').val();
    let phone = $('#phone').val();
    let dob = $('#dob').val();
    let division = $('#division').val();
    let classInfo = $('#class').val();
    let subject = $('#subject').val();
    let department = $('#department').val();
    let profilePic = $('#profilePicPreview').attr('src');

    // Simple form validation
    if (fullName && email && phone) {
        // Update the profile picture on the main page
        $('#currentProfilePic').attr('src', profilePic);

        // Display success message
        alert('You have successfully updated your profile!');

        // Close the modal
        $('#editProfileModal').modal('hide');
    } else {
        alert('Please fill in all required fields.');
    }
});

// Cancel button functionality
$('#cancelButton').on('click', function() {
    $('#editProfileModal').modal('hide');
});

// ****************************************
// Sample data from teacher's page
let teacherData = [
  {
      teacherName: "Archana Chaugule",
      teacherPhoto: "https://bootdey.com/img/Content/avatar/avatar7.png",
      folderName: "COA-SE-AC-23-24",
      files: ["Assignment 1.pdf", "Lecture Notes.docx", "Project Report.pptx"]
  }
  // Add more folders as needed
];

// Array to hold recent uploads
let recentUploads = [];

// Function to generate and display folder for student
function generateFolderForStudent(folderData) {
  // Create folder card structure
  let folderCard = `
      <div class="folder-card">
          <div class="folder-header">
              <img src="${folderData.teacherPhoto}" alt="${folderData.teacherName}">
              <div class="folder-details">
                  <div class="folder-title">${folderData.folderName}</div>
                  <div class="folder-teacher-name">Sent by ${folderData.teacherName}</div>
              </div>
          </div>
          <div class="folder-actions">
              <img src="https://img.icons8.com/ios-filled/50/000000/file.png" alt="Files" class="file-icon" data-folder-index="${teacherData.indexOf(folderData)}">
          </div>
      </div>
  `;

  // Append the folder card to the student container
  $('#studentFolderContainer').append(folderCard);

  // Add recent upload
  recentUploads.push(folderData.folderName);
  updateRecentUploads();

}

// Update recent uploads list
function updateRecentUploads() {
  $('#recentUploadList').empty();
  recentUploads.forEach((upload) => {
      $('#recentUploadList').append(`<li>${upload}</li>`);
  });
}

// Render all folders
teacherData.forEach((folder) => {
  generateFolderForStudent(folder);
});

// Handle file icon click to display files
$(document).on('click', '.file-icon', function () {
  let folderIndex = $(this).data('folder-index');
  let files = teacherData[folderIndex].files;

  // Clear previous files
  $('#fileList').empty();

  // Add files to the modal
  files.forEach((file) => {
      $('#fileList').append(`<li>${file}</li>`);
  });

  // Show the modal
  $('#fileListModal').modal('show');
});

// Handle recent upload link click to display recent uploads
$('#recentUploadLink').on('click', function (e) {
  e.preventDefault();
  $('#recentUploadModal').modal('show');
});

});