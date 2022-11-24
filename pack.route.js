/** load express js */
const express = require(`express`)

/** create object of express */
const app = express()

/** load telur controller */
const packController = require(`../controllers/pack.controller`)

// load auth
const authorization = require(`../middleware/authorization`)

/** allow route to read urlencoded data */
app.use(express.urlencoded({ extended: true }))

/** create route untuk access data telur */
app.get("/", authorization.cekUser, packController.showDataPack)

/** create route untuk melihat view tambah data telur */
app.get("/add", authorization.cekUser, packController.showAddPage)

/** create route utk process tambah data telur  */
app.post("/add",  authorization.cekUser, packController.processInsert)

/** create route for show edit telur view */
app.get("/edit/:id",  authorization.cekUser, packController.showEditPage)
/** :id -> name of paramter URL */

/** create route for process edit telur */
app.post("/edit/:id",  authorization.cekUser, packController.processUpdate)
/** :id -> name of paramter URL */

/** create route for process delete obat */
app.get("/delete/:id",  authorization.cekUser, packController.processDelete)
/** :id -> name of paramter URL */



/** export object "app" to another file */
module.exports = app

