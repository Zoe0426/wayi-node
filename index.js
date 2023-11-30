//=====.env 環境設定=====
require("dotenv").config();
console.log(process.env.DB_NAME);

//=====載入node套件=====
const express = require("express");
const app = express();
const db = require(__dirname + "/modules/db_connect");
const cors = require("cors");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
dayjs.extend(utc);
dayjs.extend(timezone);
const corsOptions = {
  // Credential: true,
  credentials: true,
  origin: (origin, cb) => {
    // console.log({ origin });
    cb(null, true);
  },
};

//=====middle ware=====
app.use(cors(corsOptions)); //拜訪權限
app.use(express.json()); //翻釋req.body

//=====測試=====
app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/test-db", async (req, res) => {
  //連線
  const [data] = await db.query("SELECT * FROM task LIMIT 1");
  res.json(data);
});

//=====API=====
app.get("/get-task", async (req, res) => {
  const [rows] = await db.query(`
    SELECT * FROM task 
    ORDER BY task.updated_at ASC;
    `);

  rows.forEach((row) => {
    if (row.updated_at) {
      // 將 updated_at 解析為 UTC，然後轉換為 Taipei 時間
      let tzUpdatedAt = dayjs.utc(row.updated_at).tz("Asia/Taipei");
      // 格式化日期和時間部分
      row.updated_at = tzUpdatedAt.format("YYYY-MM-DD HH:mm");
    }
  });

  res.json(rows);
});

app.post("/add-task", async (req, res) => {
  const sql = `INSERT INTO task(
    name, description, 
    created_at, updated_at) VALUES(
    ?, ?,
    NOW(), NOW()
  )`;

  const [result] = await db.query(sql, [req.body.taskName, req.body.description]);
  res.json(result);
});

app.delete("/delete-task", async (req, res) => {
  const sql = `DELETE FROM task WHERE id IN (?)`;

  const [result] = await db.query(sql, [req.body.ids]);

  if (result.affectedRows === 0) {
    // 沒有任何行被影響，代表沒有找到匹配的 id
    return res.status(404).json({ message: "任務不存在" });
  }

  // 成功刪除
  return res.json({ message: "刪除成功" });
});

app.put("/complete-task", async (req, res) => {
  const sql = `UPDATE task SET is_completed=? WHERE id IN (?)`;

  const updateValue = 1;
  const idsToUpdate = req.body.ids;

  const [result] = await db.query(sql, [updateValue, idsToUpdate]);

  res.json(result);
});

app.put("/uncomplete-task", async (req, res) => {
  const sql = `UPDATE task SET is_completed=? WHERE id IN (?)`;

  const updateValue = 0;
  const idsToUpdate = req.body.ids;

  const [result] = await db.query(sql, [updateValue, idsToUpdate]);

  res.json(result);
});

//=====自訂404=====
app.use((req, res) => {
  res.type("text/html");
  res.status(404);
  res.send("<h1>404 - not found</h1>");
});

//=====port設定=====
const port = process.env.PORT || 3005;
app.listen(port, () => {
  console.log("start server, port:" + port);
});
