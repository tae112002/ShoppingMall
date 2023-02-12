const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const db = require("../db/conn");

// middleware
router.use(express.urlencoded({ extended: false }));
router.use(express.json());
router.use(express.static("uploads"));

// multer
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads");
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + "_productImage_" + file.originalname);
  },
});
const upload = multer({ storage });

// url
router.get("/products", (req, res) => {
  const page = req.query.page;
  const offset = parseInt(req.query.offset);
  const startNums = page * offset;

  let searchType = `${req.query.typeQuery}` || "";
  let search = req.query.searchQuery || "";
  let searchWord = `%${search}%`;

  let sql = "SELECT COUNT(pId) AS count FROM product WHERE ? LIKE ?;";
  let dataSql =
    "SELECT * FROM product WHERE ?? LIKE ? ORDER BY pId DESC LIMIT ?, ?;";
  db.query(sql, [searchType, searchWord], (err, result) => {
    if (err) {
      throw err;
    } else {
      db.query(
        dataSql,
        [searchType, searchWord, startNums, offset],
        (err, products) => {
          if (err) throw err;
          res.json({
            status: 201,
            products: products,
            page: page, // 1, 2, 3 ... 페이지
            totalPageNumber: Math.ceil(result[0].count / offset), // 전체 페이지 수
            totalRows: result[0].count,
          });
        }
      );
    }
  });
});

router.post("/product/upload", upload.any("pImage"), (req, res) => {
  const { pGender, pCaregory, pName, pStock, pPrice, pContent } = req.body;
  let sql =
    "INSERT INTO product VALUES(NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, now());";
  db.query(
    sql,
    [
      pName,
      pGender,
      pCaregory,
      pStock,
      pPrice,
      req.files[0].filename,
      req.files[1].filename,
      req.files[2].filename,
      pContent,
    ],
    (err) => {
      if (err) {
        throw err;
      } else {
        res.send({
          status: 201,
          msg: "상품이 등록되었습니다.",
        });
      }
    }
  );
});

router.delete("/delete/product/:id", (req, res) => {
  let sql1 = "select pImage1, pImage2, pImage3 from product where pId=?;";
  db.query(sql1, req.params.id, (err, photo) => {
    if (err) throw err;
    if (
      fs.existsSync("./uploads/" + photo[0].pImage1) &&
      fs.existsSync("./uploads/" + photo[0].pImage2) &&
      fs.existsSync("./uploads/" + photo[0].pImage3)
    ) {
      try {
        fs.unlinkSync("./uploads/" + photo[0].pImage1);
        fs.unlinkSync("./uploads/" + photo[0].pImage2);
        fs.unlinkSync("./uploads/" + photo[0].pImage3);
      } catch (error) {
        throw error;
      }
    }
    let sql = "delete from product where pId=?";
    db.query(sql, req.params.id, (err) => {
      if (err) throw err;
      res.send({ status: 201, msg: "삭제가 완료되었습니다." });
    });
  });
});

router.get("/product/edit/:id", (req, res) => {
  let sql = "select * from product where pid=?;";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send({
        result,
        status: 201,
      });
    }
  });
});

router.post("/product/edit/:id", (req, res) => {
  const { pGender, pCaregory, pName, pStock, pPrice, pContent } = req.body;
  let sql =
    "update product set pGender=?, pCaregory=?, pName=?, pStock=?, pPrice=?, pContent=? where pid=?;";
  db.query(
    sql,
    [pGender, pCaregory, pName, pStock, pPrice, pContent, req.params.id],
    (err, result) => {
      if (err) {
        throw err;
      } else {
        res.send({
          result,
          status: 201,
          msg: "수정이 완료되었습니다.",
        });
      }
    }
  );
});

router.delete("/delete/cart", (req, res) => {
  let sql = "delete from cart where mId=? and pId=? ";
  db.query(sql, [req.query.mId, req.query.pId], (err) => {
    if (err) throw err;
    res.send({ status: 201, msg: "삭제가 완료되었습니다." });
  });
});

router.get("/products/all", (req, res) => {
  let sql1 = "select * from product order by pId desc limit 0,3;";
  db.query(sql1, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send({
        result,
        status: 201,
      });
    }
  });
});

router.get("/products/men", (req, res) => {
  let sql1 =
    "select * from product where pgender='MEN' order by pId desc limit 0,3;;";
  db.query(sql1, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send({
        result,
        status: 201,
      });
    }
  });
});

router.get("/products/women", (req, res) => {
  let sql1 =
    "select * from product where pgender='WOMEN' order by pId desc limit 0,3;";
  db.query(sql1, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send({
        result,
        status: 201,
      });
    }
  });
});

router.get("/products/list", (req, res) => {
  const caregory = req.query.caregory;
  const gender = req.query.gender;
  if (gender == "all") {
    if (caregory != "all") {
      let sql2 = "select * from product where pCaregory=? order by pId desc;";
      db.query(sql2, [caregory], (err, result) => {
        if (err) {
          throw err;
        } else {
          res.send({
            result,
            status: 201,
          });
        }
      });
    } else {
      let sql1 = "select * from product order by pId desc;";
      db.query(sql1, (err, result) => {
        if (err) {
          throw err;
        } else {
          res.send({
            result,
            status: 201,
          });
        }
      });
    }
  } else {
    if (caregory != "all") {
      let sql2 =
        "select * from product where pGender=? and pCaregory=? order by pId desc;";
      db.query(sql2, [gender, caregory], (err, result) => {
        if (err) {
          throw err;
        } else {
          res.send({
            result,
            status: 201,
          });
        }
      });
    } else {
      let sql1 = "select * from product where pGender=? order by pId desc;";
      db.query(sql1, gender, (err, result) => {
        if (err) {
          throw err;
        } else {
          res.send({
            result,
            status: 201,
          });
        }
      });
    }
  }
});

router.get("/detail/:id", (req, res) => {
  let sql = "select * from product where pid=?;";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send({
        result,
        status: 201,
      });
    }
  });
});

router.post("/cart", (req, res) => {
  const { idx, counter, pId } = req.body;
  let sql3 = "select cid from cart where pid=? and mid=?;";
  db.query(sql3, [pId, idx], (err, result) => {
    if (err) throw err;
    else {
      if (result.length == 1) {
        let sql2 =
          "update cart set cQuantity=cQuantity+? where mid=? and pid=?";
        db.query(sql2, [counter, idx, pId], (err, result) => {
          if (err) {
            throw err;
          } else {
            res.send({
              status: 201,
              msg: "장바구니에 상품을 담았습니다.",
            });
          }
        });
      } else {
        let sql = "insert into cart values(null, ?, ?, ?);";
        db.query(sql, [idx, counter, pId], (err, result) => {
          if (err) {
            throw err;
          } else {
            res.send({
              status: 201,
              msg: "장바구니에 상품을 담았습니다.",
            });
          }
        });
      }
    }
  });
});

router.get("/cart/:idx", (req, res) => {
  let sql =
    "select product.pId, product.pImage1, product.pname, product.pPrice, cart.cid, cart.cQuantity from cart join product on product.pid=cart.pid where mid=?;";
  db.query(sql, [req.params.idx], (err, cart) => {
    if (err) {
      throw err;
    } else {
      res.send({
        cart,
        status: 201,
      });
    }
  });
});

//한개짜리 카트에 저장
router.post(`/buy`, (req, res) => {
  console.log(req.body.pId);
  console.log(req.body.mId);
  const { counter } = req.body;
  let sql3 = "SELECT cId FROM cart WHERE pId = ? AND mId = ?;";
  db.query(sql3, [req.body.pId, req.body.mId], (err, result) => {
    if (err) throw err;
    else {
      console.log(result);
      res.send({
        result,
        status: 201,
      });
    }
  });
});

router.post(`/buy/cart/add/:idx`, (req, res) => {
  const { counter } = req.body;
  let sql2 = "insert into cart values(null, ?, ?, ?);";
  db.query(sql2, [req.params.idx, counter, req.body.pId], (err) => {
    if (err) {
      throw err;
    } else {
      let sql1 = "select cid from cart order by cid desc limit 0,1";
      db.query(sql1, [req.params.idx, req.body.pId], (err, result) => {
        res.send({
          status: 201,
          result,
        });
      });
    }
  });
});

router.post(`/buy/cart/:idx`, (req, res) => {
  const { counter } = req.body;
  let sql2 = "UPDATE cart set cQuantity=cQuantity+? WHERE mId = ? and pId = ?";
  db.query(sql2, [counter, req.params.idx, req.body.pId], (err) => {
    if (err) {
      throw err;
    } else {
      let sql1 = "select cid from cart where mid=? and pid=?";
      db.query(sql1, [req.params.idx, req.body.pId], (err, result) => {
        res.send({
          status: 201,
          result,
        });
      });
    }
  });
});

router.post(`/buy/:idx`, (req, res) => {
  const { counter } = req.body;
  let sql2 = "UPDATE cart set cQuantity=? WHERE mId = ? and pId = ?";
  db.query(sql2, [counter, req.body.mId, req.params.idx], (err) => {
    if (err) {
      throw err;
    } else {
      let sql1 = "select cid from cart where mid=? and pid=?";
      db.query(sql1, [req.body.mId, req.params.idx], (err, result) => {
        res.send({
          status: 201,
          result,
        });
      });
    }
  });
});

router.get("/order/:idx", (req, res) => {
  let sql =
    "SELECT product.pImage1, product.pName, product.pPrice, cart.*, member.* " +
    "FROM cart JOIN product ON product.pId = cart.pId " +
    "JOIN member ON cart.mId = member.mId WHERE member.mId = ? and cid=?;";
  db.query(sql, [req.params.idx, req.query.cid], (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send({
        result,
        status: 201,
      });
    }
  });
});

router.get("/orderAll/:idx", (req, res) => {
  let sql =
    "SELECT product.pImage1, product.pName, product.pPrice, cart.*, member.* " +
    "FROM cart JOIN product ON product.pId = cart.pId " +
    "JOIN member ON cart.mId = member.mId WHERE member.mId = ?;";
  db.query(sql, [req.params.idx], (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send({
        result,
        status: 201,
      });
    }
  });
});

router.post("/order/pay", (req, res) => {
  const { oPoint, oPrice, oPayment, count, oQuantity, pid, pname, idx } =
    req.body;
  const {
    mName,
    mPostnum,
    mAddr1,
    mAddr2,
    mPhone,
    oPayment_bank,
    oPayment_name,
  } = req.body.oInfo;
  let sql =
    "INSERT INTO orders values(null, ?, ?, ?, ?, ?, ?, ?, ?, ?, now());";
  db.query(
    sql,
    [idx, mName, mPostnum, mAddr1, mAddr2, mPhone, oPoint, oPrice, oPayment],
    // [idx, mName, mPostnum, mAddr1, mAddr2, mPhone, oPoint, oPrice, oPayment +"/" +oPayment_bank + "/" +oPayment_name],
    (err, result) => {
      if (err) {
        throw err;
      } else {
        let sql2 = "select oid from orders order by oid desc limit 1;";
        db.query(sql2, (err, result) => {
          if (err) {
            throw err;
          }
          Object.keys(result).forEach(function (key) {
            var row = result[key];
            let sql1 = "INSERT INTO orderdetails values ?";
            let values = [];
            let sqls = "";
            if (count > 0) {
              let i = 0;
              for (i; i < count; i++) {
                const value = [null, row.oid, oQuantity[i], pid[i], pname[i]];
                values = [...values, value];
                let sql4 = `update product set pStock=pStock-${oQuantity[i]} where pid=${pid[i]}; `;
                sqls = "";
                sqls = sqls + sql4;
                sql4 = "";
              }
            } else {
              const value = [
                null,
                row.oid,
                oQuantity[count],
                pid[count],
                pname[count],
              ];
              values = [...values, value];
              let sql4 = `update product set pStock=pStock-${oQuantity[count]} where pid=${pid[count]}; `;
              sqls = "";
              sqls = sqls + sql4;
              sql4 = "";
            }
            db.query(sql1, [values], (err, result) => {
              if (err) throw err;
              else {
                let sql3 =
                  "delete from cart where pid in (select pid from orderdetails where oid=(select oid from orders order by oid desc limit 0,1));";
                db.query(sql3, idx, (err) => {
                  if (err) throw err;
                });
                db.query(sqls, (err) => {
                  if (err) throw err;
                });
                let sql5 = `update member set mPoint=mPoint-${oPoint} where mid=?;`;
                db.query(sql5, idx, (err) => {
                  if (err) throw err;
                });
                res.send({
                  status: 201,
                });
              }
            });
            values = [];
          });
        });
      }
    }
  );
});

module.exports = router;
