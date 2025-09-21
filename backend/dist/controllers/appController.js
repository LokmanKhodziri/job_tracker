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
exports.getApplications = exports.createApplication = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
// Get all applications for the logged-in user
const createApplication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { company, position, status, notes } = req.body;
    const app = yield prisma_1.default.application.create({
        data: {
            company,
            position,
            status,
            notes,
            userId: req.user.id,
        },
    });
    res.status(201).json({ application: app });
});
exports.createApplication = createApplication;
const getApplications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const apps = yield prisma_1.default.application.findMany({
        where: { userId: req.user.id },
    });
    res.status(200).json({ applications: apps });
});
exports.getApplications = getApplications;
//# sourceMappingURL=appController.js.map