/* Your Code Here */


function createEmployeeRecord(arrayEmployeeInfo){
    let employeeRecord = {
        firstName: arrayEmployeeInfo[0],
        familyName: arrayEmployeeInfo[1],
        title: arrayEmployeeInfo[2],
        payPerHour: arrayEmployeeInfo[3],
        timeInEvents: [],
        timeOutEvents: [],
    }

    return employeeRecord;
}


function createEmployeeRecords(arrayOfEmployees){
    let employeeRecords = [];

    for(let record of arrayOfEmployees){
        employeeRecords.push(createEmployeeRecord(record));
    }

    return employeeRecords;
}


function createTimeInEvent(dateStamp){
    let hourNum = parseInt(dateStamp.slice(11));
    let dateStr = dateStamp.slice(0,10);

    let timeInObj = {
        type: "TimeIn",
        hour: hourNum,
        date: dateStr,
    }

    //console.log(this.timeInEvents);
    this.timeInEvents.push(timeInObj);

    return this;
}


function createTimeOutEvent(dateStamp){

    let hourNum = parseInt(dateStamp.slice(11));
    let dateStr = dateStamp.slice(0,10);

    let timeOutObj = {
        type: "TimeOut",
        hour: hourNum,
        date: dateStr,
    }

    this.timeOutEvents.push(timeOutObj);

    return this;
    
}

function hoursWorkedOnDate(dateStamp){
    
    let timePunchedIn = 0;
    let timePunchedOut = 0;
    let datePunchedIn = '';
    let datePunchedOut = '';

    for(let obj of this.timeInEvents){
        if(obj.date === dateStamp){
            datePunchedIn = obj.date;
            timePunchedIn = obj.hour;
            //console.log(datePunchedIn);
            //console.log(timePunchedIn);
        }
    }

    for(let obj of this.timeOutEvents){
        if(obj.date === dateStamp){
            datePunchedOut = obj.date;
            timePunchedOut = obj.hour;
            //console.log(timePunchedOut);
            //console.log(datePunchedOut);
        }
    }

    return (timePunchedOut - timePunchedIn) / 100;
}

function wagesEarnedOnDate(dateStamp){

    let hoursWorked = hoursWorkedOnDate.call(this, dateStamp);
    let payOwed = hoursWorked * this.payPerHour;

    return payOwed;

}

function findEmployeeByFirstName(srcArr, firstName){

    for(let employee of srcArr){
        if(employee.firstName === firstName){
            return employee;
        }
    }

    return undefined;
}


function calculatePayroll(arrayOfEmployees){

    let wageOfEmployees = 0;
    //let wageArr = [];
    for(let employee of arrayOfEmployees){
        //console.log(employee);
        //wageArr.push(allWagesFor.call(employee));
        wageOfEmployees += allWagesFor.call(employee);
    }
    
    //console.log(wageArr);
    //console.log(wageOfEmployees);

    return wageOfEmployees - 1200;
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

