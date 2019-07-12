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
    $('.gifBtn').click(function() {
        let query = this.getAttribute('data-value');

        let queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + query + '&limit=10&api_key=qcPjtIk81Q4pg5dxw3fy3Z6hxO41PlGD';

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            
            for (let i = 0; i < 10; i++) {
                let stillURL = response.data[i].images.original_still.url;
                let animateURL = response.data[i].images.original.url;
                let gif = $('<img>');
                gif.attr('class', 'gif').attr('src', stillURL).attr('data-animate', animateURL).attr('data-still', stillURL).attr('data-state', 'still');
                $('#gifs').prepend(gif);
            }

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
        });
    });
    
}

function addBtn() {
  $("#addBtn").on("click", function(event) {
    event.preventDefault();
    let newQuery = $("#newQuery").val().trim();
    buttons.push(newQuery);
    document.getElementById('form').reset();
    createButtons();
  });
}

createButtons();
addBtn();