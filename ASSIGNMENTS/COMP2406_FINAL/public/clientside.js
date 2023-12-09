function handleSubmitButton() {
  let userText = document.getElementById('textbox').value;

  if (userText && userText.trim() !== '') {
      // Assuming you have a variable currentUser with user information
      let currentUser = window.currentUser;
      let usertosend = new String(currentUser);
      console.log('Hello',currentUser);

      let userRequestObj = {
          user: usertosend,
          text: userText
      };

      fetch('/post-comment', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(userRequestObj),
      })
      .then(response => {
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
      })
      .then(data => {
          console.log('Server response:', data);
      })
      .catch(error => {
          console.error('Error:', error);
      });

      // Clear the text input after sending the request
      document.getElementById('textbox').value = '';
  }
}
function refreshPage(){
  window.location.reload();
} 
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('post').addEventListener('click', refreshPage);
  document.getElementById('post').addEventListener('click', handleSubmitButton);
});
