/** load model apoteker */
const adminModel = require(`../models/admin.model`)

/** load crypt */
const crypt = require(`../crypto`)
const { response } = require("../routes/auth.route")

/** function utk menampilkan halaman login */
exports.showLogin = (request, response) => {
    try {
        return response.render(`../views/pages/login`)

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

/** function utk proses authentication */
exports.authentication = async (request, response) => {
    try {
        /** tampung data username & password */
        let username = request.body.username //request body mengambuil dari data yang diinput
        let password = request.body.password

        /** check kecocokan username */
        let result = await adminModel .findByCriteria({ username: username }) //username yang depan untuk sesuai dengan database, kalau belakang sesuai dengan username yang diatas 

        /** cek keberadaan data admin */
        if (result.length > 0) { //length hanya untuk array (result : array)
            /** kita cek dulu kecocokan password-nya */
            /** 123 === deskripsi(shjkshjksjkf) */
            if (password === crypt.deskripsi(result[0].password)) {
                /** login berhasil */
                /** menyimpan data user ke session 
                * session adalah : menyimpan data diserver 
                */

                /** `userData` = label of session */
                request.session.dataUser = result[0]

                /** definisi cart di session */
                request.session.cart = []

                return response.redirect(`/telur`)
            } else {
                /** login gagal */
                return response.redirect(`/auth`)
            }
        } else {
            /** data apoteker tidak ada */
            return response.redirect(`/auth`)
        }

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

/** membuat function utk logout */
exports.logout = async (request, response) => {
    try {
        /** menghapus data user dari session */
        request.session.dataUser = undefined //undefined : tidak dikenali

        return response.redirect(`/auth`)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}