function populateEventsList() {
  $.ajax({
    url: '/api/event/',
    type: 'GET',
    success: function(response) {
      var events = response.events;
      var list = $('#event-list')[0];
      for (var i = 0; i < events.length; i++) {
        addEventToList(events[i], list);
      }
    }
    });
}

function addEventToList(event, list) {
  var li = document.createElement('li');
  li.innerHTML = "Title: '<b>" + event["title"] + "</b>', Desc: '<b>" + event["description"] + "</b>'";
  list.appendChild(li);
}

populateEventsList();
