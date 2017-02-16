'use strict';
var exports = module.exports = {};
const cassandra = require('cassandra-driver');

var host = process.env.CASSANDRA_HOST || 'localhost';
var keyspace = process.env.CASSANDRA_KEYSPACE || 'ranga';
const client = new cassandra.Client({
    contactPoints: [host], keyspace: keyspace
});

var entity = require('./employee');

function findAll(){
    let query = "select id,name,age,salary from employee";
    client.execute(query, function (err, result) {
        let employeeList = [];
        if (err != null) {
            console.log(err);
        }
        else {
            var employee;
            for (var i = 0; i < result.rows.length; i++) {
                employee = new entity.Employee(result.rows[i].id, result.rows[i].name, result.rows[i].age, result.rows[i].salary);
                employeeList.push(employee);
            }
        }
        console.log(employeeList);
    });
}

exports.selectAll = function () {
    findAll();
};