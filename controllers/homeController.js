exports.index = (req, res) => {
	const menuParam = req.query.menu;
	if (!menuParam) {
		return res.render('index');
	}
	res.render(menuParam);
};