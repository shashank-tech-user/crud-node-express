const sql = require("./db.js");

const Upload = function(data) {
  this.pic_id = data.id,
  this.pic_name = data.name,
  this.pic_text = data.text,
  this.pic_bg_color = data.color_code,
  this.user_id = data.user_id,
  this.created_at = data.created_at,
  this.updated_at = data.updated_at
}

Upload.uploadPicture = (data, result) => {
  sql.query("insert into profile_pic set ?", data, (err, res) => {
    if(err) {
      result(null, err);
      return;
    }

    result(null, data);
    return;
  })
}

module.exports = Upload;
