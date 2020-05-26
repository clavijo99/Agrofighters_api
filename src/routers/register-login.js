const express = require('express');
const router = express.Router();
const mysql = require('mysql');



//connetion
const mysqlConnection = mysql.createPool({
    connectionLimit: 100,
    host: 'us-cdbr-east-06.cleardb.net',
    user: 'ba3eafebe4764f',
    password: '80c6ad26',
    database: 'heroku_8b7301e3a8950b2',
});

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////USUARIOS///////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////



// extraemos toda la informacion de los usuarios
router.get('/', (req, res) => res.send('BIENVENIDO A AGROFIGHTERSPRO'));

router.get('/user/', (req, res) => {
    mysqlConnection.getConnection(function (error, connetion) {
        if (error) {
            console.log('error de myqsl');
        } else {
            mysqlConnection.query('SELECT * FROM Users', (err, rows, fields) => {
                if (rows != '') {
                    res.json(rows);
                } else {
                    res.json(null);
                }
            });
        }
    });
});


//extraemos la password de un usario atraves de su user
router.get('/search/user/:user', (req, res) => {
    const { user } = req.params;
    mysqlConnection.getConnection(function (error, connetion) {
        if (error) {
            console.log('error de myqsl');
        } else {
            mysqlConnection.query('SELECT * FROM Users WHERE user = ?', [user], (err, rows, fields) => {
                if (rows != '') {
                    console.log(rows);
                    res.json(rows);
                } else {
                    res.json(null);
                }
            });
        }
    });
});

//extraemos la informacion de un usuario atravez de su id
router.get('/user/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.getConnection(function (error, connetion) {
        if (error) {
            console.log('error de myqsl');
        } else {
            mysqlConnection.query('SELECT * FROM Users WHERE id =  ?', [id], (err, rows, fields) => {
                if (rows != '') {
                    res.json(rows);
                } else {
                    console.log('no  encontro usuario registrado');
                    res.json(null);
                }
            });
        }
    });
});

//creamos un usuario 
router.post('/create/user/', (req, res) => {
    const data = req.body;
    mysqlConnection.getConnection(function (error, connetion) {
        if (error) {
            console.log('error de myqsl');
        } else {
            mysqlConnection.query('INSERT INTO Users set ?', [data], (err, rows, fields) => {
                if (!err) {
                    res.json({ 'status': 'usuario creado' });
                    console.log('creado');
                } else {
                    res.json(null);
                    console.log('error al guardar');
                }
            });
        }
    });
});

//actualizamos la informacion de un usuario atrvez de su id
router.post('/update/information/user/:id', (req, res) => {
    const { id } = req.params;
    const data = req.body;
    mysqlConnection.getConnection(function (error, connetion) {
        if (error) {
            console.log('error de myqsl');
        } else {
            mysqlConnection.query('UPDATE Users set ? WHERE id = ?', [data, id], (err, rows, fields) => {
                if (!err) {
                    res.json({ status: 'usuario modificado' });
                } else {
                    console.log(err);
                    res.json(null);
                }
            });
        }
    });
});
//eliminamos un usario atravez de su id
router.delete('/delete/user/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.getConnection(function (error, connetion) {
        if (error) {
            console.log('error de myqsl');
        } else {
            mysqlConnection.query('DELETE FROM Users WHERE id = ?', [id], (err, rows, fields) => {
                if (!err) {
                    res.json({ status: 'empleado eliminado' });
                } else {
                    res.json(null);
                }
            });
        }
    });
});

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
///////////////////////////SENSORES/////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////


//date
router.get('/get/date/', (req, res) => {
    var hoy = new Date();
    res.json(hoy.getFullYear()+'/'+(hoy.getMonth()+1) + '/'+ hoy.getDate());
});

router.get('/get/time/', (req, res) => {
    var hoy = new Date();
    res.json(hoy.getHours()+':'+hoy.getMinutes() + ':'+ hoy.getSeconds());
});
//extraemos 
router.get('/get/temperature/', (req, res) => {
    mysqlConnection.getConnection(function (err, connetion) {
        if (err) {
            console.log('error de myqsl');
        } else {
            mysqlConnection.query('SELECT * FROM Temperature', (error, rows, fields) => {
                if (rows != '') {
                    res.json(rows);
                } else {
                    res.json(null);
                }
            })
        }
    });
});
///////////////////////////////////////////////////////////////////////////s
router.get('/get/temperature/1/', (req, res) => {
    const data = req.body;
    mysqlConnection.getConnection(function (err, connetion) {
        if (err) {
            console.log('error de myqsl');
        } else {
            mysqlConnection.query('SELECT * FROM Temperature', (error, rows, fields) => {
                if (rows != '') {
                    res.json(rows[(Object.keys(rows).length) - 1].temperature);
                } else {
                    res.json(null);
                }
            });
        }
    });
});
/////////////////////////////////////////////////////////////////////////////
router.post('/temperature/insert/', (req, res) => {
    const data = req.body;
    mysqlConnection.getConnection(function (error, connetion) {
        if (error) {
            console.log('error de myqsl');
        } else {
            mysqlConnection.query('INSERT INTO Temperature set ?', [data], (err, rows, fields) => {
                if (!err) {
                    res.json({ status: "exitoso" });
                } else {
                    res.json(null);
                }
            });
        }
    });
});

router.get('/get/humidity/', (req, res) => {
    mysqlConnection.getConnection(function (error, connetion) {
        if (error) {
            console.log('error de myqsl');
        } else {
            mysqlConnection.query('SELECT * FROM Humidity', (err, rows, fields) => {
                if (rows != '') {
                    res.json(rows);
                } else {
                    res.json(null);
                }
            });
        }
    });
});

router.get('/get/humidity/1/', (req, res) => {
    mysqlConnection.getConnection(function (error, connetion) {
        if (error) {
            console.log('error de myqsl');
        } else {
            mysqlConnection.query('SELECT * FROM Humidity', (err, rows, fields) => {
                if (rows != '') {
                    res.json(rows[(Object.keys(rows).length) - 1].temperature);
                } else {
                    res.json(null);
                }
            });
        }
    });
});

router.post('/humidity/insert/', (req, res) => {
    const data = req.body;
    mysqlConnection.getConnection(function (error, connetion) {
        if (error) {
            console.log('error de myqsl');
        } else {
            mysqlConnection.query('INSERT INTO Humidity set ?', [data], (err, rows, fields) => {
                if (!err) {
                    res.json({ status: "exitoso" });
                } else {
                    res.json(null);
                }
            });
        }
    });
});

////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
//////////////////////ALERT/////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////


router.get('/get/alert/', (req, res) => {
    mysqlConnection.getConnection(function (error, connetion) {
        if (error) {
            console.log('error de myqsl');
        } else {
            mysqlConnection.query('SELECT * FROM Alert', (err, rows, fields) => {
                if (rows != null) {
                    res.json(rows);
                } else {
                    res.json(null);
                }
            });
        }
    });
});

router.get('/get/alert/connetion/', (req, res) => {
    mysqlConnection.getConnection(function (error, connetion) {
        if (error) {
            console.log('error de myqsl');
        } else {
            mysqlConnection.query('SELECT * FROM Alert', (err, rows, fields) => {
                if (rows != null) {
                    console.log(rows[0].connection_alert);
                    res.json(rows[0].connection_alert);
                } else {
                    res.json(null);
                }
            });
        }
    });
});

router.get('/get/alert/engine1/', (req, res) => {
    mysqlConnection.getConnection(function (error, connetion) {
        if (error) {
            console.log('error de myqsl');
        } else {
            mysqlConnection.query('SELECT * FROM Alert', (err, rows, fields) => {
                if (rows != null) {
                    console.log(rows[0].engine_errors_1);
                    res.json(rows[0].engine_errors_1);
                } else {
                    res.json(null);
                }
            });
        }
    });
});

router.get('/get/alert/engine2/', (req, res) => {
    mysqlConnection.getConnection(function (error, connetion) {
        if (error) {
            console.log('error de myqsl');
        } else {
            mysqlConnection.query('SELECT * FROM Alert', (err, rows, fields) => {
                if (rows != null) {
                    console.log(rows[0].engine_errors_2);
                    res.json(rows[0].engine_errors_2);
                } else {
                    res.json(null);
                }
            });
        }
    });
});

router.get('/get/alert/sensor1/', (req, res) => {
    mysqlConnection.getConnection(function (error, connetion) {
        if (error) {
            console.log('error de myqsl');
        } else {
            mysqlConnection.query('SELECT * FROM Alert', (err, rows, fields) => {
                if (rows != null) {
                    console.log(rows[0].error_sensor_temperature);
                    res.json(rows[0].error_sensor_temperature);
                } else {
                    res.json(null);
                }
            });
        }
    });
});

router.get('/get/alert/sensor2/', (req, res) => {
    mysqlConnection.getConnection(function (error, connetion) {
        if (error) {
            console.log('error de myqsl');
        } else {
            mysqlConnection.query('SELECT * FROM Alert', (err, rows, fields) => {
                if (rows != null) {
                    console.log(rows[0].error_sensor_humidity);
                    res.json(rows[0].error_sensor_humidity);
                } else {
                    res.json(null);
                }
            });
        }
    });
});

router.put('/alert/update/alert/', (req, res) => {
    const data = req.body;
    mysqlConnection.getConnection(function (error, connetion) {
        if (error) {
            console.log('error de myqsl');
        } else {
            mysqlConnection.query('UPDATE Alert set ?', [data], (err, rows, fields) => {
                if (!err) {
                    res.json({ status: "exitoso" });
                } else {
                    res.json(null);
                }
            });
        }
    });
});

/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
////////////////////////// information of a aplication //////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////


router.get('/get/information/aplication', (req, res) => {
    mysqlConnection.getConnection(function (error, connetion) {
        if (error) {
            console.log('error de myqsl');
        } else {
            mysqlConnection.query('SELECT * FROM Information_aplication', (err, rows, fields) => {
                if (rows != '') {
                    res.json(rows);
                } else {
                    res.json(null);
                }
            });
        }
    });
});

router.put('/update/information/aplication/', (req, res) => {
    const data = req.body;
    mysqlConnection.getConnection(function (error, connetion) {
        if (error) {
            console.log('error de myqsl');
        } else {
            mysqlConnection.query('UPDATE Information_aplication set ?', [data], (rows, err, fields) => {
                if (!err) {
                    res.json({ status: 'datos actualizados' })
                } else {
                    res.json(null);
                }
            });
        }
    });
});
module.exports = router;

