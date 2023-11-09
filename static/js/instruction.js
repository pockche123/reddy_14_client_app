const btn = document.querySelector('#btn');

btn.onclick = function(e) {
    e.preventDefault();
  
    // Replace localhost and the folder name
    // based on your setup
    location.href = '/index.html';
}