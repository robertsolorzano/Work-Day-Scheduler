// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  var currentDate = dayjs().format('ddd, MMMM D, h:mm A')
  $(`#currentDay`).text(currentDate);

  //Event listener for 'click' to the save button
  $('.saveBtn').on('click', function () {
    var timeBlockId = $(this).closest('.time-block').attr('id');
    var userText = $(this).siblings('.description').val();
    localStorage.setItem(timeBlockId, userText);
  });

  //Apply past,present and future classes
  var currentHour = dayjs().hour();
  $('.time-block').each(function () {
    var timeBlockHour = parseInt($(this).attr('id').split('-')[1]);
    if (timeBlockHour < currentHour) {
      $(this).addClass('past');
    } else if (timeBlockHour === currentHour) {
      $(this).addClass('present');
    } else {
      $(this).addClass('future');
    }
  })

  //user input from the local storage
  $('.time-block').each(function () {
    var timeBlockId = $(this).attr('id');
    var storedText = localStorage.getItem(timeBlockId);
    $(this).find('.description').val(storedText);
  });

});
