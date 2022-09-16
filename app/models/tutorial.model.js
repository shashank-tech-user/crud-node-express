const mysql = require("./db.js");

const Tutorial = function(tutorial) {
  this.t_id = tutorial.id;
  this.t_title = tutorial.title;
  this.t_description = tutorial.description;
  this.t_published = tutorial.published;
  this.created_at = new Date();
  this.updated_at = new Date();
}

Tutorial.create = (newTutorial, result) => {
  mysql.query(`insert into tutorials set ?`, newTutorial, (err, res)   => {
    if(err) {
      result(null, err);
      return;
    }
    result(null, newTutorial);
  });
};

Tutorial.findAll = (result) => {
  mysql.query(`select * from tutorials`, (err, res) => {
    if(err) {
      result(null, err);
      return;
    }
    result(null, res);
  });
}

Tutorial.findById = (id, result) => {
  mysql.query(`select * from tutorials where t_id = "${id}"`, (err, res) => {
    if(err) {
      result(null, err);
      return;
    }
    result(null, res);
    return;
  });
};

Tutorial.updateById = (id, tutorial, result) => {
  mysql.query(`update tutorials set t_title = ?, t_description = ?, t_published = ?, updated_at = ? where t_id = ? `, 
    [tutorial.t_title, tutorial.t_description, tutorial.t_published, tutorial.updated_at, id],
    (err, res) => {
      if(err) {
        result(null, err);
        return;
      }

      if(res.affectedRows === 0) {
        result(null, {
          error: true,
          message: "0 row affected"
        });
        return;
      }

      result(null, { t_id: id, ...tutorial});
      return;
    }
  )
}

Tutorial.deleteById = (id, result) => {
  mysql.query(`delete from tutorials where t_id = ?`, id, (err, res) => {
    if(err) {
      result(null, err);
      return;
    }

    if(res.affectedRows === 0) {
      result(null, {
        error: true,
        message: "0 row affected"
      });
      return;
    }

    result(null, {
      t_id: id
    });
    return;
  })
}

module.exports = Tutorial;

