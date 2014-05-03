exports.homepage = function(req, res) {
  res.render('homepage', {'title':'Home', 'group_name':req.params.group_name});
};
exports.boardPage = function(req, res) {
  res.render('board', {'group_name':req.params.group_name});
};
exports.newEventPage = function(req, res) {
  res.render('newevent', {'group_name':req.params.group_name});
};
