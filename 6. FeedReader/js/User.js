function User() {

}

User.prototype.click = function(element) {
  element.trigger("click");
}
