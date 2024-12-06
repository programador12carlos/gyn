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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.InMemoryCheckInRepository = void 0;
var dayjs_1 = require("dayjs");
var isSameOrAfter_1 = require("dayjs/plugin/isSameOrAfter");
var isSameOrBefore_1 = require("dayjs/plugin/isSameOrBefore");
var crypto_1 = require("crypto");
// Extensão dos plugins necessários para as comparações
dayjs_1["default"].extend(isSameOrAfter_1["default"]);
dayjs_1["default"].extend(isSameOrBefore_1["default"]);
// Criar um banco de dados local para testes
var InMemoryCheckInRepository = /** @class */ (function () {
    function InMemoryCheckInRepository() {
        // criar um array para armazenar os dados com type user
        this.items = [];
    }
    /*
  Funçoes do banco check-in
  ----------------------------------------------------------------------------
  [x] verificar se é possivel efectuar check-in
       na nova academia se baseando na data do check-in anterior
  [x] Criar user no banco
     */
    /*  [x] verificar se é possivel efectuar check-in
    na nova academia se baseando na data do check-in anterior
  */
    InMemoryCheckInRepository.prototype.procurarDataCheckinUser = function (userId, data) {
        return __awaiter(this, void 0, Promise, function () {
            var startOfDay, endOfDay, verificarCheckinUser;
            return __generator(this, function (_a) {
                startOfDay = dayjs_1["default"](data).startOf('day');
                endOfDay = dayjs_1["default"](data).endOf('day');
                verificarCheckinUser = this.items.find(function (checkin) {
                    var dataOfCadastro = dayjs_1["default"](checkin.create_time);
                    var verificarData = dataOfCadastro.isSameOrAfter(startOfDay) &&
                        dataOfCadastro.isSameOrBefore(endOfDay);
                    return checkin.user_id === userId && verificarData;
                });
                return [2 /*return*/, verificarCheckinUser || null];
            });
        });
    };
    // [x] Criar user no banco
    InMemoryCheckInRepository.prototype.criar = function (data) {
        return __awaiter(this, void 0, Promise, function () {
            var checkin;
            return __generator(this, function (_a) {
                checkin = {
                    id: crypto_1.randomUUID(),
                    create_time: new Date(),
                    validade_at: data.validade_at ? new Date(data.validade_at) : null,
                    user_id: data.user_id,
                    gin_id: data.gin_id
                };
                this.items.push(checkin);
                return [2 /*return*/, checkin];
            });
        });
    };
    InMemoryCheckInRepository.prototype.totalCheckin = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            var total;
            return __generator(this, function (_a) {
                total = this.items.filter(function (item) { return item.user_id === id; }).length;
                return [2 /*return*/, total];
            });
        });
    };
    InMemoryCheckInRepository.prototype.listarCheckin = function (userId, pagina) {
        return Promise.resolve(this.items
            .filter(function (item) { return item.user_id === userId; })
            .slice((pagina - 1) * 20, pagina * 20));
    };
    // [x] deve ser possivel buscar o id
    InMemoryCheckInRepository.prototype.buscarid = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var checkins;
            return __generator(this, function (_a) {
                checkins = this.items.find(function (item) { return item.id === id; });
                if (!checkins) {
                    return [2 /*return*/, null];
                }
                return [2 /*return*/, checkins];
            });
        });
    };
    // deve ser possivel salvar a validacao do checkin
    InMemoryCheckInRepository.prototype.salvar = function (checkin) {
        return __awaiter(this, void 0, void 0, function () {
            var checkinIndex;
            return __generator(this, function (_a) {
                checkinIndex = this.items.findIndex(function (item) { return item.id === checkin.id; });
                if (checkinIndex >= 0) {
                    this.items[checkinIndex] = checkin;
                }
                return [2 /*return*/, checkin];
            });
        });
    };
    return InMemoryCheckInRepository;
}());
exports.InMemoryCheckInRepository = InMemoryCheckInRepository;
