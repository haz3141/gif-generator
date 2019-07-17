let buttons = ['hamster', 'hawk', 'dolphin']; 

const createButtons = () => {
    $('#buttons').empty();
    buttons.forEach(value => {
        let button = `<button class='gifBtn' data-value='${value}'>${value}`;
        $('#buttons').append(button);
    });
    getGif();
}

function getGif() {
    $('.gifBtn').click(function(event) {
      event.preventDefault();
      console.log('here');
        let query = this.getAttribute('data-value');

        let queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + query + '&limit=10&api_key=qcPjtIk81Q4pg5dxw3fy3Z6hxO41PlGD';

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
          console.log(response);
          for (let i = 0; i < 10; i++) {
            let stillURL = response.data[i].images.fixed_height_small_still.url;
            let animateURL = response.data[i].images.original.url;
            let gif = `<img class='gif' event='false' src='${stillURL}' data-animate='${animateURL}' data-still='${stillURL}' data-state='still'>`;
            // gif.attr('class', 'gif').attr('src', stillURL).attr('data-animate', animateURL).attr('data-still', stillURL).attr('data-state', 'still');
            let rating = `<p>${response.data[i].rating}</p>`;
            let gifDiv = `<div class='gif-div'>${rating}${gif}`;
            $('#gifs').prepend(gifDiv);
          }
          animateGifs();//will keep adding event listeners each time causes bug
        });
    });
}

function animateGifs() {
  $(".gif").on("click", function() {
    let state = $(this).attr('data-state');
    if (state === 'still') {
      $(this).attr('data-state', 'animate');
      $(this).attr('src', $(this).attr('data-animate'));
    } else {
      $(this).attr('data-state', 'still');
      $(this).attr('src', $(this).attr('data-still'));
    }
  });
}

function addBtn() {
  $("#addBtn").on("click", function(event) {
    event.preventDefault();
    let newQuery = $("#newQuery").val().trim();
    if (newQuery !== '') {
      buttons.push(newQuery);
      document.getElementById('form').reset();
      createButtons();
    }
  });
}

createButtons();
addBtn();