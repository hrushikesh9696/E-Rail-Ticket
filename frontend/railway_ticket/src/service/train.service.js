import axios from "axios";
import { BASE_API_URL } from "../common/constant";
import { AuthHeader } from "./auth.header";

const API_URL = BASE_API_URL + "/api/train";
class TrainService {

    saveTrain(train) {
        return axios.post(API_URL + "/saveTrain", train, { headers: AuthHeader() });
    }

    getAllTrain() {
        return axios.get(API_URL + "/getAllTrain");
    }

    getTrainById(id) {
        return axios.get(API_URL + "/getTrainById/" + id, { headers: AuthHeader() });
    }

    deleteTrain(id) {
        return axios.delete(API_URL + "/deleteTrain/" + id, { headers: AuthHeader() });
    }

    updateTrain(train) {
        return axios.put(API_URL + "/updateTrain/" + train.id, train, { headers: AuthHeader() });
    }

    saveTrainSchedule(schedule) {
        return axios.post(API_URL + "/saveTrainSchedule", schedule, { headers: AuthHeader() });
    }

    getAllTrainSchedule() {
        return axios.get(API_URL + "/getAllTrainSchedule", { headers: AuthHeader() });
    }


    getAllTrainScheduleByTrainId(id) {
        return axios.get(API_URL + "/getTrainScheduleByTrainNo/" + id);
    }

    getScheduleById(id) {
        return axios.get(API_URL + "/getScheduleById/" + id);
    }

    deleteTrainSchedule(id) {
        return axios.delete(API_URL + "/deleteTrainSchedule/" + id, { headers: AuthHeader() });
    }

    updateTrainSchedule(schedule) {
        return axios.put(API_URL + "/updateTrainSchedule/" + schedule.id, schedule, { headers: AuthHeader() });
    }

    searchTrain(search) {
        return axios.get(API_URL + "/searchTrain?sr=" + search.source + "&&de=" + search.destination);
    }

    saveTicket(ticket) {
        return axios.post(API_URL + "/saveTicket", ticket, { headers: AuthHeader() });
    }

    getTicket() {
        return axios.get(API_URL + "/getTicketByUser", { headers: AuthHeader() });
    }

    getAllTicket() {
        return axios.get(API_URL + "/getAllTicket", { headers: AuthHeader() });
    }

    cancelTicket(id) {
        return axios.get(API_URL + "/cancelTicket/" + id, { headers: AuthHeader() });
    }

}

export default new TrainService();