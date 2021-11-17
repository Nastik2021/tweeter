// counter counting characters entered
$(document).ready(function () {

  $('textarea').keyup(function () {   /////is keyup the best function???

    const input = $(this);
    const length = input.val().length;
    // console.log(length);


    const form = $(this).closest("form");
    const counter = form.find(".counter");

    counter.text(140 - length);

    if (length <= 140) {

      counter.removeClass("negative-count");

    } else {
      console.log("Negative");
      counter.addClass("negative-count");
    }
  });
});