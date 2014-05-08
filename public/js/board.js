function init() {
  var listDivName = '#event-list';

  function populateEventsList() {
    $.ajax({
      url: '/api/event/',
      type: 'GET',
      success: function(response) {
        var events = response.events;
        var list = $(listDivName)[0];
        for (var i = 0; i < events.length; i++) {
          list.appendChild(createEventElement(events[i]));
        }
      }
    });
  }

  function createEventElement(event) {
    var containerDiv = document.createElement('div');
    containerDiv.className = 'event';
    var titleDiv = document.createElement('div');
    titleDiv.className = 'title';
    var descriptionDiv = document.createElement('div');
    descriptionDiv.className = 'description';

    titleDiv.innerHTML = event['title'];
    descriptionDiv.innerHTML = event['description'];

    containerDiv.appendChild(titleDiv);
    containerDiv.appendChild(descriptionDiv);
    return containerDiv;
  }

  populateEventsList();
};

init();
