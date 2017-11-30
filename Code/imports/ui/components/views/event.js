Template.event.helpers({
  getMapUrl(location) {
    return "<a href=\"https://www.google.com/maps/?q=" + location.lat + "," + location.lng +"\">"
          + location.lat + "," + location.lng + "</a>";
  }
}
