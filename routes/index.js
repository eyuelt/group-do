exports.homepage = function(req, res) {
  res.render('homepage', {'page_title':'Home', 'group_name':req.params.group_name});
};

exports.boardPage = function(req, res) {
  res.render('board', {'group_name':req.params.group_name});
};

exports.newEventPage = function(req, res) {
  res.render('newevent', {'group_name':req.params.group_name});
};

exports.newUserPage = function(req, res) {
  res.render('newuser', {'group_name':req.params.group_name});
};
