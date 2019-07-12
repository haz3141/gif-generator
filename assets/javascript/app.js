let buttons = ['hamster', 'hawk', 'dolphin'];

let toDoCount = 0;  

let createButtons = () => {
    $('#buttons').empty();
    buttons.forEach(value => {
        console.log(value);
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
            console.log(response);
            for (let i = 0; i < 10; i++) {
                let stillURL = response.data[i].images.original_still.url;
                let animateURL = response.data[i].images.original.webp;

                console.log(stillURL);
                let gif = $('<img>');
                gif.attr('class', 'gif').attr('src', stillURL).attr('data-animate', animateURL).attr('data-still', stillURL).attr('data-state', 'still');
                $('#gifs').prepend(gif);
            }

            console.log('here');
    $(".gif").on("click", function() {
        // STEP ONE: study the html above.
        // Look at all the data attributes.
        // Run the file in the browser. Look at the images.
    
        // After we complete steps 1 and 2 we'll be able to pause gifs from giphy.
    
        // STEP TWO: make a variable named state and then store the image's data-state into it.
        // Use the .attr() method for this.
        let state = $(this).attr('data-state');
        console.log(state);
        // ============== FILL IN CODE HERE FOR STEP TWO =========================
    
        // CODE GOES HERE
    
        // =============================================
    
        // STEP THREE: Check if the variable state is equal to 'still',
        // then update the src attribute of this image to it's data-animate value,
        // and update the data-state attribute to 'animate'.
        if (state === 'still') {
          $(this).attr('data-state', 'animate');
          $(this).attr('src', $(this).attr('data-animate'));
        } else {
          $(this).attr('data-state', 'still');
          $(this).attr('src', $(this).attr('data-still'));
        }
        // If state is equal to 'animate', then update the src attribute of this
        // image to it's data-still value and update the data-state attribute to 'still'
        // ============== FILL IN CODE HERE FOR STEP THREE =========================
    
        // CODE GOES HERE
    
        // ==============================================
    
        // STEP FOUR: open the file in the browser and click on the images.
        // Then click again to pause.
      });
        });
    });
    
}

function addBtn() {
  $("#addQuery").on("click", function(event) {
    event.preventDefault();
    console.log(event);
    let newQuery = $("#newQuery").val().trim();
    buttons.push(newQuery);
    console.table(buttons);
    document.getElementById('form').reset();
    createButtons();
  });
}

createButtons();
addBtn();