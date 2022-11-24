/** load express js */
const express = require(`express`)

/** create object of express */
const app = express()

/** load telur controller */
const adminController = require(`../controllers/admin.controller`)

// load auth
const authorization = require(`../middleware/authorization`)

/** allow route to read urlencoded data */
app.use(express.urlencoded({ extended: true }))

/** create route untuk access data telur */
app.get("/", authorization.cekUser, adminController.showDataAdmin)

/** create route untuk melihat view tambah data telur */
app.get("/add", authorization.cekUser, adminController.showAddPage)

/** create route utk process tambah data telur  */
app.post("/add", authorization.cekUser, adminController.processInsert)

/** create route for show edit telur view */
app.get("/edit/:id",authorization.cekUser, adminController.showEditPage)
/** :id -> name of paramter URL */

/** create route for process edit telur */
app.post("/edit/:id", authorization.cekUser, adminController.processUpdate)
/** :id -> name of paramter URL */

/** create route for process delete obat */
app.get("/delete/:id",authorization.cekUser, adminController.processDelete)
/** :id -> name of paramter URL */


/** export object "app" to another file */
module.exports = app

