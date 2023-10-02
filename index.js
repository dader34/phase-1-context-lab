/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const createEmployeeRecord = (obj) =>{
    const employeeObj = {
        firstName: obj[0],
        familyName: obj[1],
        title: obj[2],
        payPerHour: obj[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employeeObj
}

const createEmployeeRecords = (objArr) =>{
    return objArr.map(createEmployeeRecord)
}

const createTimeInEvent = function(fullDate){
    const date = fullDate.split(" ")[0]
    const hour = parseInt(fullDate.split(" ")[1])
    this.timeInEvents.push({type: "TimeIn", hour: hour, date: date})
    return this
}

const createTimeOutEvent = function(fullDate){
    const date = fullDate.split(" ")[0]
    const hour = parseInt(fullDate.split(" ")[1])
    this.timeOutEvents.push({type: "TimeOut", hour: hour, date: date})
    return this
}

const hoursWorkedOnDate = function(fullDate){
    const timeInEvents = this.timeInEvents
    const timeOutEvents = this.timeOutEvents
    const position = timeInEvents.indexOf(timeInEvents.find((a) =>{
        return a['date'] === fullDate
    }))
    // console.log(parseInt(timeInEvents[position].hour.toString().length))
    const inHour = parseInt(timeInEvents[position].hour.toString())
    // console.log(inHour)
    // console.log(inHour.toString().length)
    const clockIn = (inHour.toString().length > 3 ? parseInt(inHour.toString().slice(0,2)) : parseInt(("0" + inHour).slice(0,2)))
    // console.log(clockIn)
    const clockOut = parseInt(timeOutEvents[position].hour.toString().slice(0,2))
    // console.log(clockOut - clockIn)
    return(clockOut - clockIn)
}

const wagesEarnedOnDate = function(fullDate){
    return hoursWorkedOnDate.call(this,fullDate) * this.payPerHour
}


const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })
    // console.log(this.payPerHour)

    const payable = eligibleDates.reduce((acc,curr)=>{
        // console.log(hoursWorkedOnDate.call(this,curr))
        // console.log(this)
        // console.log(wagesEarnedOnDate.call(this,curr))
        return acc + (wagesEarnedOnDate.call(this,curr))
    },0)

    return payable

}

const findEmployeeByFirstName = (collection,firstNameString) =>{
    return collection.find(e => {
        return e.firstName === firstNameString
    })
}

const calculatePayroll = (employeeRecords) =>{
    return employeeRecords.reduce((acc,curr) =>{
        return acc + allWagesFor.call(curr)
    },0)
}


