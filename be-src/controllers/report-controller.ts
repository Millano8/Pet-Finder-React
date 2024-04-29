import { Report } from "../models";
import {User} from "../models"
import { petIndex } from "../lib/algolia";
import { cloudinary } from "../lib/cloudinary";

type ReportType = {
    id?: number;
    owner_id: number,
    owner_name: string,
    owner_phone_number: string,
    pet_name:string,
    message: string,
    last_seen_lat: number,
    last_seen_lon: number,
    last_seen: string,
    img: string,
};

class ReportController {
    static async create(reportData:ReportType) {
        try {
            const userExists = await User.findByPk(reportData.owner_id);
            if(!userExists) {
                console.error("El usuario no existe")
            };
            const report:Report = await Report.create(reportData);
            await petIndex.saveObject({
                objectID: report.get("id"),
                owner_id: report.get("owner_id"),
                owner_name: report.get("owner_name"),
                owner_phone_number: report.get("owner_phone_number"),
                pet_name: report.get("pet_name"),
                message: report.get("message"),        
                _geoloc:{
                    lat: report.get("last_seen_lat"),
                    lng: report.get("last_seen_lon")
                },
                last_seen: report.get("last_seen"),
                img: report.get("img"),
                lost: true
            });
            return report;
        } catch (error) {
            console.error('Error in ReportController.create()', error);
        };
    };
    static async uploadImage(imageURL:string) {
        try {
            const petImage = await cloudinary.uploader.upload(imageURL, {
                resource_type: "image",
                discard_original_filename: true,
            });
            return petImage.secure_url;
        } catch (error) {
            console.error('Error in ReportController.uploadImage()', error);
        };
    }
    static async getAllReports(){
        try {
            const allReports:Report[] = await Report.findAll();
            return allReports;
        } catch (error) {
            console.error('Error in ReportController.getAllReports()', error);
        };
    };
    static async getMyReports(userId:number) {
        try {
            const myReports:Report[] = await Report.findAll({
                where: {
                    owner_id: userId
                },
            });
            return myReports;
        } catch (error) {
            console.error('Error in ReportController.geyMyReports()', error);
        };
    }
    static async getReportToUpdate(userId:number,petId:number) {
        try {
            const reportToUpdate = await Report.findOne({
                where: {
                    owner_id: userId,
                    id : petId
                },
            });
            return reportToUpdate;
        } catch (error) {
            console.error('Error in ReportController.geyMyReports()', error);
        };
    };
    static async deleteReport(reportId:number){
        try {
            const reportToDelete= await Report.findByPk(reportId);
            if(!reportToDelete) {
                console.error("El reporte no existe")
            } else {
                await reportToDelete.destroy();
                await petIndex.deleteObject(reportId.toString());
            }
            return reportToDelete;
        } catch (error) {
            console.error('Error in ReportController.deleteReport()', error);
        };
    };
    static async editReport(reportParams:ReportType) {
        try {
            const reportToEdit = await Report.findByPk(reportParams.id);
            if(!reportToEdit) {
                console.error("El reporte no existe")
            } else {
                const editedReport:Report = await reportToEdit.update(reportParams);
                await petIndex.saveObject({
                    objectID: editedReport.get("id"),
                    owner_id: editedReport.get("owner_id"),
                    owner_name: editedReport.get("owner_name"),
                    owner_phone_number: editedReport.get("owner_phone_number"),
                    pet_name: editedReport.get("pet_name"),
                    message: editedReport.get("message"),
                    _geoloc: {
                        lat: editedReport.get("last_seen_lat"),
                        lng: editedReport.get("last_seen_lon")
                    },
                    last_seen: editedReport.get("last_seen"),
                    img: editedReport.get("img"),
                    lost: true
                });
                return editedReport;
            }
        } catch (error) {
            console.error('Error in ReportController.editReport()', error);
        };
    }
    static async foundPet(reportParams:ReportType){
        try {
            const reportToEdit = await Report.findByPk(reportParams.id);
            if(!reportToEdit) {
                console.error("El reporte no existe")
            } else {
                const editedReport:Report = await reportToEdit.update(reportParams);
                await petIndex.saveObject({
                    objectID: editedReport.get("id"),
                    owner_id: editedReport.get("owner_id"),
                    owner_name: editedReport.get("owner_name"),
                    owner_phone_number: editedReport.get("owner_phone_number"),
                    pet_name: editedReport.get("pet_name"),
                    message: editedReport.get("message"),
                    _geoloc: {
                        lat: editedReport.get("last_seen_lat"),
                        lng: editedReport.get("last_seen_lon")
                    },
                    last_seen: editedReport.get("last_seen"),
                    img: editedReport.get("img"),
                    lost: false
                });
                return editedReport;
            }
        } catch (error) {
            console.error('Error in ReportController.foundPet()', error);
        };
    }
    
};

export {ReportController, ReportType}