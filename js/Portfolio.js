$(document).foundation();

function setUpPortfolio (portfolioConfig) {
    //Open modal from portfolio items
    $(portfolioConfig.items).each(function() {
        // Portfolio Page Sliding Title Overlay
        $(this).hover(function() {
            $(portfolioConfig.itemInfo, this).stop().animate({top:'0px'},{queue:false,duration:300});
            $('img', this).addClass('effect');
        }, function() {
            $(portfolioConfig.itemInfo, this).stop().animate({top:'100%'},{queue:false,duration:300});
            $('img', this).removeClass('effect');
        });

        // Make entire face clickable and open link in modal
        if ($(this).find('a').length) {

            var linkURL = $(this).find("a").attr("href");

            $(this).css({'cursor': 'pointer'}).click(function() {
                $.ajax({
                    url: linkURL,
                    type: 'GET',
                    success: function(data) {
                        $(portfolioConfig.modalItem).html($(data).filter('#main'));
                        $('<a class="close-reveal-modal">&#215;</a>').insertAfter(portfolioConfig.modalItem +' '+ portfolioConfig.pageFragment);
                        $(portfolioConfig.modalItem).foundation('reveal', 'open');
                    },
                    error: function() {
                        alert('Sorry an error has occurred');
                    }
                });
                return false;
            });
        }
    });
}

$(document).ready(function(){
    // Configs
    setUpPortfolio({
        items: ".card",
        itemInfo: ".back",
        modalItem: "#modal-1",
    pageFragment: "#main"
    });

    // Handle the Prev/Next links in modal
    $("#modal-1").click(function(event) {
        if( $(event.target).hasClass('button')) {
            var urlLink = $(event.target).attr("href");
            $(".fragment").load( urlLink+" #main");
            event.preventDefault();
        }
    });

    // Remove HTML from modal on close
    $(document).on('close.fndtn.reveal', '[data-reveal]', function () {
        $("#modal-1 .fragment").empty();
    });
});