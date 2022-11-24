/** load express js */
const express = require(`express`)

/** create object of express */
const app = express()

/** load telur controller */
const memberController = require(`../controllers/member.controller`)

// load auth
const authorization = require(`../middleware/authorization`)

/** allow route to read urlencoded data */
app.use(express.urlencoded({ extended: true }))

/** create route untuk access data telur */
app.get("/", authorization.cekUser, memberController.showDataMember)

/** create route untuk melihat view tambah data telur */
app.get("/add", authorization.cekUser, memberController.showAddPage)

/** create route utk process tambah data telur  */
app.post("/add", authorization.cekUser, memberController.processInsert)

/** create route for show edit telur view */
app.get("/edit/:id", authorization.cekUser, memberController.showEditPage)
/** :id -> name of paramter URL */

/** create route for process edit telur */
app.post("/edit/:id", authorization.cekUser, memberController.processUpdate)
/** :id -> name of paramter URL */

/** create route for process delete obat */
app.get("/delete/:id", authorization.cekUser, memberController.processDelete)
/** :id -> name of paramter URL */



/** export object "app" to another file */
module.exports = app

