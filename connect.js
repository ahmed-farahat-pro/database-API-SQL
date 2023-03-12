const express = require('express');
const sql = require('mssql');
const app = express();

const config = {
    user: 'sa', // better stored in an app setting such as process.env.DB_USER
    password: 'MyPassword123#', // better stored in an app setting such as process.env.DB_PASSWORD
    server: 'localhost', // better stored in an app setting such as process.env.DB_SERVER
    port: 1433, // optional, defaults to 1433, better stored in an app setting such as process.env.DB_PORT
    database: 'ahmed', // better stored in an app setting such as process.env.DB_NAME
    authentication: {
        type: 'default'
    },
    options: {
        encrypt: true,
        trustServerCertificate: true
        
    }
}




app.get("/fetch" , (req ,res) => {

async function connectAndQuery() {
    try {
        var poolConnection = await sql.connect(config);
            var x = []
        console.log("Reading rows from the Table...");
        var resultSet = await poolConnection.request().query(`Select * FROM systemuser`);

        console.log(`${resultSet.recordset.length} rows returned.`);

        // output column headers
        var columns = "";
        for (var column in resultSet.recordset.columns) {
            columns += column + ", ";
        }
        console.log("%s\t", columns.substring(0, columns.length - 2));

        // ouput row contents from default record set
        resultSet.recordset.forEach(row => {
                x.push(row.username)
            x.push(row.password);
        
            
        });
        res.send(x)
        console.log("haytihelwa")

        // close connection only when we're certain application is finished
        poolConnection.close();
    } catch (err) {
        console.error(err.message);
    }
}

connectAndQuery();


})







app.get("/fetch-admin" , (req ,res) => {

async function connectAndQuery() {
    try {
        var poolConnection = await sql.connect(config);
            var x = []
        console.log("Reading rows from the Table...");
        var resultSet = await poolConnection.request().query(`Select a.username , b.password FROM system_admin a , systemuser b where b.username = a.username `);

        console.log(`${resultSet.recordset.length} rows returned.`);

        // output column headers
        var columns = "";
        for (var column in resultSet.recordset.columns) {
            columns += column + ", ";
        }
        console.log("%s\t", columns.substring(0, columns.length - 2));

        // ouput row contents from default record set
        resultSet.recordset.forEach(row => {
                x.push(row.username)
            x.push(row.password);
        });
        res.send(x)
        console.log("haytihelwa")

        // close connection only when we're certain application is finished
        poolConnection.close();
    } catch (err) {
        console.error(err.message);
    }
}

connectAndQuery();


})




app.get("/fetch-upcommingn" , (req ,res) => {

async function connectAndQuery() {
    try {
        var poolConnection = await sql.connect(config);
            var x = []
        console.log("Reading rows from the Table...");
        var resultSet = await poolConnection.request().query(`Select * from allMatches`);

        console.log(`${resultSet.recordset.length} rows returned.`);

        // output column headers
        var columns = "";
        for (var column in resultSet.recordset.columns) {
            columns += column + ", ";
        }
        console.log("%s\t", columns.substring(0, columns.length - 2));

        // ouput row contents from default record set
        resultSet.recordset.forEach(row => {
                x.push(row.start_time)
            x.push(row.host);
            x.push(row.guest);
        });
        res.send(x)
       

        // close connection only when we're certain application is finished
        poolConnection.close();
    } catch (err) {
        console.error(err.message);
    }
}

connectAndQuery();


})





app.get("/fetch-never" , (req ,res) => {

async function connectAndQuery() {
    try {
        var poolConnection = await sql.connect(config);
            var x = []
        console.log("Reading rows from the Table...");
        var resultSet = await poolConnection.request().query(`Select c.name as name1 , o.name  as name2 from club o , club c , match x where  ((x.host_club_id <> o.club_id AND x.guest_club_id = c.club_id)  OR (x.guest_club_id <> o.club_id AND x.host_club_id = c.club_id )) AND c.club_id<>o.club_id `);

        console.log(`${resultSet.recordset.length} rows returned.`);

        // output column headers
        var columns = "";
        for (var column in resultSet.recordset.columns) {
            columns += column + ", ";
        }
        console.log("%s\t", columns.substring(0, columns.length - 2));

        // ouput row contents from default record set
        resultSet.recordset.forEach(row => {
                x.push(row.start_time)
            x.push(row.name1);
            x.push(row.name2);
        });
        res.send(x)
       

        // close connection only when we're certain application is finished
        poolConnection.close();
    } catch (err) {
        console.error(err.message);
    }
}

connectAndQuery();


})



app.post('/submit-data', (req, res) => {
  const { name, age } = req.body;
  
  // Do something with the received data
  // ...
 console.log(name);
 console.log(age);
  res.json({ message: 'Data received successfully' });
});



app.use(express.json());


app.post('/handle-spmang', (req, res) => {
 
    const { name , username , password } = req.body;

async function connectAndQuery() {
    try {
        var poolConnection = await sql.connect(config);
            var x = []
        console.log("Reading rows from the Table...");
     
        var resultSet = await poolConnection.request().query(`SELECT username from systemuser`);
// insert INTO sports_association_manager VALUES ("sfsfs" , "askjsab")
        console.log(`${resultSet.recordset.length} rows returned.`);

        // output column headers
        var columns = "";
        for (var column in resultSet.recordset.columns) {
            columns += column + ", ";
        }
        console.log("%s\t", columns.substring(0, columns.length - 2));

        // ouput row contents from default record set
        resultSet.recordset.forEach(row => {
               if (username == row.username)
               {
                 res.json({ message: 'already in' });
                 return;
               }});
               console.log("halllo");
       var username1 = '';
       var password1 = '';
       for( i=0 ;i<username.length ; i++)
{
    username1 += username[i];
}
       for( i=0 ;i<password.length ; i++)
{
    password1 += password[i];
}

            
           res.json({ message: 'sucess' });
         await poolConnection.request().query(`EXEC addAssociationManager @name1 = '${name}'  , @username1 = '${username}' , @password1 = '${password}'`)
     
       
       

        // close connection only when we're certain application is finished
        poolConnection.close();
    } catch (err) {
        console.error(err.message);
    }
}

connectAndQuery();


});








app.post('/handle-fan', (req, res) => {
 
    const {  name, username , password , national , phoneNum , address , date } = req.body;

async function connectAndQuery() {
    try {
        var poolConnection = await sql.connect(config);
            var x = []
        console.log("Reading rows from the Table...");
     
        var resultSet = await poolConnection.request().query(`SELECT username from systemuser`);
// insert INTO sports_association_manager VALUES ("sfsfs" , "askjsab")
        console.log(`${resultSet.recordset.length} rows returned.`);

        // output column headers
        var columns = "";
        for (var column in resultSet.recordset.columns) {
            columns += column + ", ";
        }
        console.log("%s\t", columns.substring(0, columns.length - 2));

        // ouput row contents from default record set
        resultSet.recordset.forEach(row => {
               if (username == row.username)
               {
                 res.json({ message: 'already in' });
                 return;
               }});
               console.log("halllo");
       var username1 = '';
       var password1 = '';
       for( i=0 ;i<username.length ; i++)
{
    username1 += username[i];
}
       for( i=0 ;i<password.length ; i++)
{
    password1 += password[i];
}

            
           
         await poolConnection.request().query(`EXEC addFan @name = '${name}', @userrn = '${username}' , @pa = '${password}' , @nation_id  = '${national}' , @birth_date  = '${date}' , @adds = '${address}' , @phone = ${phoneNum} `)
     res.json({ message: 'sucess' });
       
       

        // close connection only when we're certain application is finished
        poolConnection.close();
    } catch (err) {
        console.error(err.message);
    }
}

connectAndQuery();


});










app.post('/handle-club-rep', (req, res) => {
 
    const {  name, username , password , cbdName} = req.body;

async function connectAndQuery() {
    try {
        var poolConnection = await sql.connect(config);
            var x = []
        console.log("Reading rows from the Table...");
     
        var resultSet = await poolConnection.request().query(`SELECT username from systemuser`);
// insert INTO sports_association_manager VALUES ("sfsfs" , "askjsab")
        console.log(`${resultSet.recordset.length} rows returned.`);

        // output column headers
        var columns = "";
        for (var column in resultSet.recordset.columns) {
            columns += column + ", ";
        }
        console.log("%s\t", columns.substring(0, columns.length - 2));

        // ouput row contents from default record set
        resultSet.recordset.forEach(row => {
               if (username == row.username)
               {
                 res.json({ message: 'already in' });
                 return;
               }});
               console.log("halllo");
       var username1 = '';
       var password1 = '';
       for( i=0 ;i<username.length ; i++)
{
    username1 += username[i];
}
       for( i=0 ;i<password.length ; i++)
{
    password1 += password[i];
}

            
           
         await poolConnection.request().query(`EXEC addRepresentative @name_rep = '${name}', @usern = '${username}' , @pass = '${password}' , @club_namee = ${cbdName}`)
     res.json({ message: 'sucess' });
       
       

        // close connection only when we're certain application is finished
        poolConnection.close();
    } catch (err) {
        console.error(err.message);
    }
}

connectAndQuery();


});





app.post('/handle-std-mang', (req, res) => {
 
    const {  name, username , password , stdName} = req.body;

async function connectAndQuery() {
    try {
        var poolConnection = await sql.connect(config);
            var x = []
        console.log("Reading rows from the Table...");
     
        var resultSet = await poolConnection.request().query(`SELECT username from systemuser`);
// insert INTO sports_association_manager VALUES ("sfsfs" , "askjsab")
        console.log(`${resultSet.recordset.length} rows returned.`);

        // output column headers
        var columns = "";
        for (var column in resultSet.recordset.columns) {
            columns += column + ", ";
        }
        console.log("%s\t", columns.substring(0, columns.length - 2));

        // ouput row contents from default record set
        resultSet.recordset.forEach(row => {
               if (username == row.username)
               {
                 res.json({ message: 'already in' });
                 return;
               }});
               console.log("halllo");
       var username1 = '';
       var password1 = '';
       for( i=0 ;i<username.length ; i++)
{
    username1 += username[i];
}
       for( i=0 ;i<password.length ; i++)
{
    password1 += password[i];
}

            
           
         await poolConnection.request().query(`EXEC addStadiumManager @namee = '${name}', @std_name = ${stdName} , @user_n = '${username}' , @pas = '${password}' `)
     res.json({ message: 'sucess' });
       
       

        // close connection only when we're certain application is finished
        poolConnection.close();
    } catch (err) {
        console.error(err.message);
    }
}

connectAndQuery();


});





app.post('/handle-club-add', (req, res) => {
 
   const {  name, username , password } = req.body;

async function connectAndQuery() {
    try {
        var poolConnection = await sql.connect(config);
         await poolConnection.request().query(`EXEC addClub @name_club = '${name}', @club_location = '${username}' `);
     res.json({ message: 'sucess' });
       
        // close connection only when we're certain application is finished
        poolConnection.close();
    } catch (err) {
        console.error(err.message);
    }
}

connectAndQuery();

});


app.post('/handle-std-info', (req, res) => {
 
   const {username} = req.body;

async function connectAndQuery() {
    try {
        var poolConnection = await sql.connect(config);
    var resultSet =  await poolConnection.request().query(`select  b.id , b.name , b.location , b.capacity , b.status FROM stadium b , stadium_manager d , systemuser a where b.id = d.stadium_id AND a.username = d.username AND d.username = '${username}' `);
 console.log(`${resultSet.recordset.length} rows returned.`);

        // output column headers
        var columns = "";
        for (var column in resultSet.recordset.columns) {
            columns += column + ", ";
        }
        console.log("%s\t", columns.substring(0, columns.length - 2));

        var x ="";
        // ouput row contents from default record set
      resultSet.recordset.forEach(row => {
                x+= " "+ row.id
                x+= " " +row.name
            x+= " "+ row.location;
            x+= " "+ row.capacity;
             x+= " "+ row.status;

            
        });
       


     res.json({ message: x });
       
        // close connection only when we're certain application is finished
        poolConnection.close();
    } catch (err) {
        console.error(err.message);
    }
}

connectAndQuery();

});

app.post('/handle-club-info', (req, res) => {
 
   const {username} = req.body;

async function connectAndQuery() {
    try {
        var poolConnection = await sql.connect(config);
    var resultSet =  await poolConnection.request().query(`select  b.club_id , b.name , b.location FROM club b , club_representative d , systemuser a where b.club_id = d.club_id AND a.username = d.username AND d.username = '${username}' `);
 console.log(`${resultSet.recordset.length} rows returned.`);

        // output column headers
        var columns = "";
        for (var column in resultSet.recordset.columns) {
            columns += column + ", ";
        }
        console.log("%s\t", columns.substring(0, columns.length - 2));

        var x ="";
        // ouput row contents from default record set
      resultSet.recordset.forEach(row => {
                x+= " " +row.name
            x+= " "+ row.location;
            x+= " "+ row.club_id;
            
        });
       


     res.json({ message: x });
       
        // close connection only when we're certain application is finished
        poolConnection.close();
    } catch (err) {
        console.error(err.message);
    }
}

connectAndQuery();

});



app.post('/get_all_std', (req, res) => {
 

async function connectAndQuery() {
    try {
        var poolConnection = await sql.connect(config);
    var resultSet =  await poolConnection.request().query(`select name From stadium `);
 console.log(`${resultSet.recordset.length} rows returned.`);

        // output column headers
        var columns = "";
        for (var column in resultSet.recordset.columns) {
            columns += column + ", ";
        }
        console.log("%s\t", columns.substring(0, columns.length - 2));

        var x =[];
        // ouput row contents from default record set
      resultSet.recordset.forEach(row => {
                x.push(row.name);
            
        });
       


     res.json({ message: x });
       
        // close connection only when we're certain application is finished
        poolConnection.close();
    } catch (err) {
        console.error(err.message);
    }
}

connectAndQuery();

});

app.post('/handle-club-delete', (req, res) => {
 
  const {   name, username , password } = req.body;

async function connectAndQuery() {
    try {
        var poolConnection = await sql.connect(config);
         await poolConnection.request().query(`EXEC deleteClub @club_name = '${name}' `);
     res.json({ message: 'sucess' });
       
        // close connection only when we're certain application is finished
        poolConnection.close();
    } catch (err) {
        console.error(err.message);
    }
}

connectAndQuery();
});



app.post('/handle-std-add', (req, res) => {
 
    const {   name, username , password } = req.body;

async function connectAndQuery() {
    try {
        var poolConnection = await sql.connect(config);
         await poolConnection.request().query(`EXEC addStadium  @name_stad = ${name} , @St_location =  ${username}  , @st_capacity = ${password}  `);
     res.json({ message: 'sucess' });
       
        // close connection only when we're certain application is finished
        poolConnection.close();
    } catch (err) {
        console.error(err.message);
    }
}

connectAndQuery();
});



app.post('/show_match', (req, res) => {
 
    const {   stadium, cbdName   } = req.body;

async function connectAndQuery() {
    try {
        var poolConnection = await sql.connect(config);
    var resultSet =  await poolConnection.request().query(`select k.start_time From match k, club cb Where   k.host_club_id = cb.club_id  AND cb.name = '${cbdName}'`);
 console.log(`${resultSet.recordset.length} rows returned.`);

        // output column headers
        var columns = "";
        for (var column in resultSet.recordset.columns) {
            columns += column + ", ";
        }
        console.log("%s\t", columns.substring(0, columns.length - 2));

        var x =[];
        // ouput row contents from default record set
      resultSet.recordset.forEach(row => {
                x.push(row.start_time);
            
        });
       


     res.json({ message: x });
       
        // close connection only when we're certain application is finished
        poolConnection.close();
    } catch (err) {
        console.error(err.message);
    }
}

connectAndQuery();

});


app.post('/show_requests', (req, res) => {
 
    const {   username   } = req.body;

async function connectAndQuery() {
    try {
        var poolConnection = await sql.connect(config);
    var resultSet =  await poolConnection.request().query(`select k.start_time From match k, club cb Where   k.host_club_id = cb.club_id  AND cb.name = '${cbdName}'`);
 console.log(`${resultSet.recordset.length} rows returned.`);

        // output column headers
        var columns = "";
        for (var column in resultSet.recordset.columns) {
            columns += column + ", ";
        }
        console.log("%s\t", columns.substring(0, columns.length - 2));

        var x =[];
        // ouput row contents from default record set
      resultSet.recordset.forEach(row => {
                x.push(row.start_time);
            
        });
       


     res.json({ message: x });
       
        // close connection only when we're certain application is finished
        poolConnection.close();
    } catch (err) {
        console.error(err.message);
    }
}

connectAndQuery();

});


app.post('/handle-std-delete', (req, res) => {
 
    const {   name, username , password } = req.body;

async function connectAndQuery() {
    try {
        var poolConnection = await sql.connect(config);
         await poolConnection.request().query(`EXEC deleteStadium  @std_name = ${name}`);
     res.json({ message: 'sucess' });
       
        // close connection only when we're certain application is finished
        poolConnection.close();
    } catch (err) {
        console.error(err.message);
    }
}

connectAndQuery();
});



app.post('/add_req', (req, res) => {
 
    const {   stadium, cbdName , item } = req.body;

async function connectAndQuery() {
    try {
        var poolConnection = await sql.connect(config);
         await poolConnection.request().query(`EXEC addHostRequest  @cl_name = '${cbdName}' , @st_name = '${stadium}' , @st_time = '${item}'`);
     res.json({ message: 'sucess' });
       
        // close connection only when we're certain application is finished
        poolConnection.close();
    } catch (err) {
        console.error(err.message);
    }
}

connectAndQuery();
});


//CREATE PROCEDURE blockFan 
//@national_idd VARCHAR(20)


app.post('/handle-fan-block', (req, res) => {
 
    const {   name, username , password } = req.body;

async function connectAndQuery() {
    try {
        var poolConnection = await sql.connect(config);
         await poolConnection.request().query(`EXEC blockFan  @national_idd = ${name}`);
     res.json({ message: 'sucess' });
       
        // close connection only when we're certain application is finished
        poolConnection.close();
    } catch (err) {
        console.error(err.message);
    }
}

connectAndQuery();
});



app.post('/handle-match-delete', (req, res) => {
 
    const {   name, username , password } = req.body;

async function connectAndQuery() {
    try {
        var poolConnection = await sql.connect(config);
         await poolConnection.request().query(`EXEC deleteMatch  @host_club_name = ${name} , @guest_club_name = ${username} `);
     res.json({ message: 'sucess' });
       
        // close connection only when we're certain application is finished
        poolConnection.close();
    } catch (err) {
        console.error(err.message);
    }
}

connectAndQuery();
});

app.post('/handle-match-add', (req, res) => {
 
    const {   name, username , password ,email} = req.body;

async function connectAndQuery() {
    try {
        var poolConnection = await sql.connect(config);
         await poolConnection.request().query(`EXEC addNEWMatch @host_club_name = '${name}' , @guest_club_name = '${username}'  , @start_time =  '${password}' , @end_time  =  '${email}'`);
     res.json({ message: 'sucess' });
       
        // close connection only when we're certain application is finished
        poolConnection.close();
    } catch (err) {
        console.error(err.message);
    }
}

connectAndQuery();
});
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
