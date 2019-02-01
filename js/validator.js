var validator = /** @class */ (function () {
    function Validator(lang, own) {
        var _this = this;
        this.specialRules = ['equal', 'greater', 'lower', 'greaterEqual', 'lowerEqual', 'isDate', 'greaterDate', 'lowerDate'];
        this.itemValid = function (name) { return _this.validate(_this.valRules[name], _this.model[name]); };
        this.messages = own
            ? __assign({}, _1.messages[lang], own.messages[lang]) : __assign({}, _1.messages[lang]);
        this.rules = own
            ? __assign({}, _1.rules, own.rules) : __assign({}, _1.rules);
        this.specialRules = own
            ? this.specialRules.concat(own.specialRules) : this.specialRules.slice();
    }
    Validator.prototype.setModel = function (model) {
        this.model = model;
    };
    Validator.prototype.setRules = function (valRules) {
        this.valRules = valRules;
    };
    Validator.prototype.validate = function (validation, value) {
        var _a;
        var message = null;
        if (validation) {
            for (var _i = 0, validation_1 = validation; _i < validation_1.length; _i++) {
                var rule = validation_1[_i];
                var ruleArr = rule.split(':');
                rule = ruleArr[0];
                if (Object.keys(this.rules).indexOf(rule) > -1) {
                    var params = ruleArr[1] ? ruleArr[1].split(',') : [];
                    params.push(value);
                    if (this.specialRules.indexOf(rule) > -1) {
                        params.push(this.model[params[0]]);
                    }
                    try {
                        if (!(_a = this.rules)[rule].apply(_a, params)) {
                            message = this.messages[rule];
                            if (['enum', 'minLength', 'maxLength'].concat(this.specialRules).includes(rule)) {
                                for (var index in params) { // replacements based on parameters
                                    message = message.replace('%' + index, params[index]);
                                }
                                message = message.replace('%', params[0]); // backward compatibility replacement
                            }
                        }
                    }
                    catch (e) {
                        console.error(e);
                    }
                }
            }
        }
        return message;
    };
    Validator.prototype.formValid = function (valNames) {
        if (valNames === void 0) { valNames = []; }
        var valid = true;
        for (var name_1 in this.valRules) {
            if (name_1) {
                var valMsg = this.validate(this.valRules[name_1], this.model[name_1]);
                if (!!valNames && valNames.includes(name_1) && !!valMsg) {
                    valid = false;
                    break;
                }
                if (!valNames && !!valMsg) {
                    valid = false;
                    break;
                }
            }
        }
        return valid;
    };
    return Validator;
}());
