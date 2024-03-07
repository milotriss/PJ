"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const event_entity_1 = __importDefault(require("../entities/event.entity"));
class EventRepository {
    createEvent(event) {
        return __awaiter(this, void 0, void 0, function* () {
            yield event_entity_1.default.create(event);
        });
    }
    updateEvent(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (data.status === 2) {
                yield event_entity_1.default.update(data, { where: { id } });
            }
            else if (data.status === 3) {
                yield event_entity_1.default.update({ status: data.status }, { where: { id } });
            }
        });
    }
    deleteEvent(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield event_entity_1.default.destroy({ where: { id } });
        });
    }
}
exports.default = EventRepository;
