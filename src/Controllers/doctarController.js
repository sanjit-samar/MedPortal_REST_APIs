//Crud for doctar can write priccription
// Create - AAdd appointment manually - (patientId, date, time, reason)
// Read - View appointments for specific patient 
// update - Reschedule appointment
//delete - Cancel appointment

const doctarModel = require("../Model/doctar");


const createAppointment = async(req, res) => {
    try{
        const patientDetails = req.body;
        const newAppointment = await doctarModel.create(patientDetails);
        if(newAppointment){
            res.status(201).json({
                message: "patient Id is Craeted",
                status:"success",
                data: newAppointment
            })
        }

    }catch(error){
       res.status(500).json({
                message: "iNTERNAL sever error!",
                status:"false",
            })
    }
}

module.exports = {createAppointment}