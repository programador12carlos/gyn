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
exports.InMemoryGinRepository = void 0;
var client_1 = require("@prisma/client");
var crypto_1 = require("crypto");
var distancia_calc_1 = require("@/services/utlis/distancia_calc");
// Criar um banco de dados local para testes
var InMemoryGinRepository = /** @class */ (function () {
    function InMemoryGinRepository() {
        // criar um array para armazenar os dados com type user
        this.items = [];
    }
    /*
  Funçoes do banco
  ----------------------------------------------------------------------------
  [x] Procurar user pelo id no banco
  [x] Criar user no banco
     */
    // [x] Procurar user pelo id e retorna o user
    InMemoryGinRepository.prototype.ProcurarId = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            var procurarid;
            return __generator(this, function (_a) {
                procurarid = this.items.find(function (item) { return item.id === id; });
                if (!procurarid) {
                    return [2 /*return*/, null];
                }
                return [2 /*return*/, procurarid];
            });
        });
    };
    InMemoryGinRepository.prototype.BuscarGymProximo = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var academiasProximas;
            return __generator(this, function (_a) {
                academiasProximas = this.items.filter(function (item) {
                    var distancia = distancia_calc_1.getDistanceBetweenCoordinates({
                        latitude: params.latitude,
                        longitude: params.longitude
                    }, {
                        longitude: item.longitude.toNumber(),
                        latitude: item.latitule.toNumber()
                    });
                    console.log("Dist\u00E2ncia para a academia " + item.title + ": " + distancia + " km");
                    return distancia < 10; // Considerando academias a menos de 10 km
                });
                // Retorna o array de academias próximas
                return [2 /*return*/, academiasProximas];
            });
        });
    };
    InMemoryGinRepository.prototype.BuscarGym = function (query, pagina) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.items
                        .filter(function (dados) { return dados.title.includes(query); }) // Usando includes para busca parcial dentro de uma frase
                        .slice((pagina - 1) * 20, pagina * 20)];
            });
        });
    };
    /*
  A função slice em JavaScript é usada para extrair uma porção de um array sem
   modificar o array original.
  Ela retorna uma nova cópia de um segmento do array especificado por índices de
   início e fim.
  */
    InMemoryGinRepository.prototype.CriarGym = function (data) {
        var _a, _b;
        var gym = {
            id: crypto_1.randomUUID(),
            title: data.title,
            descricption: (_a = data.descricption) !== null && _a !== void 0 ? _a : null,
            phone: (_b = data.phone) !== null && _b !== void 0 ? _b : null,
            latitule: new client_1.Prisma.Decimal(data.latitule.toString()),
            longitude: new client_1.Prisma.Decimal(data.longitude.toString())
        };
        this.items.push(gym);
        return Promise.resolve(gym);
    };
    return InMemoryGinRepository;
}());
exports.InMemoryGinRepository = InMemoryGinRepository;
