import { withTranslation } from './with-translation';
import { withExperiments } from './with-experiments';
var Composer = /** @class */ (function () {
    function Composer() {
        this.funcs = [];
    }
    Composer.prototype.withTranslation = function () {
        this.funcs.push(withTranslation);
        return this;
    };
    Composer.prototype.withExperiments = function () {
        this.funcs.push(withExperiments);
        return this;
    };
    Composer.prototype.compose = function (val) {
        return this.funcs.reduceRight(function (prevComposition, func) { return func(prevComposition); }, val);
    };
    return Composer;
}());
export var composer = function () { return new Composer(); };
//# sourceMappingURL=composer.js.map