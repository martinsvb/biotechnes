var rules = {
    /**
     *  Value is included in allowedvalues check
     *
     *  @param {string} allowedValues
     *  @param {any} value
     *
     *  @return {boolean}
     */
    enum: function (allowedValues, value) {
        if (!allowedValues) {
            throw new Error('Validation rules enum: Parameter allowedValues is required.');
        }
        var result = false;
        if (!!value) {
            exports.rules._typeofCheck('enum', { value: value }, 'string');
            var allowedValuesArr = allowedValues.split('|');
            if (!!allowedValuesArr.length) {
                result = allowedValuesArr.includes(value);
            }
        }
        return result;
    },
    /**
     *  String min length check
     *
     *  @param {number} minLength
     *  @param {string} value
     *
     *  @return {boolean}
     */
    minLength: function (minLength, value) {
        if (!minLength) {
            throw new Error('Validation rules minLength: Parameter minLength is required.');
        }
        minLength = Number(minLength);
        exports.rules._typeofCheck('minLength', { minLength: minLength }, 'number');
        var result = false;
        if (!!value) {
            exports.rules._typeofCheck('minLength', { value: value }, 'string');
            result = value.length >= minLength;
        }
        return result;
    },
    /**
     *  String max length check
     *
     *  @param {number} maxLength
     *  @param {string} value
     *
     *  @return {boolean}
     */
    maxLength: function (maxLength, value) {
        if (!maxLength) {
            throw new Error('Validation rules maxLength: Parameter maxLength is required.');
        }
        maxLength = Number(maxLength);
        exports.rules._typeofCheck('maxLength', { maxLength: maxLength }, 'number');
        var result = true;
        if (!!value && value.length) {
            exports.rules._typeofCheck('maxLength', { value: value }, 'string');
            result = value.length <= maxLength;
        }
        return result;
    },
    /**
     *  String email regex check
     *
     *  @param {string} email
     *
     *  @return {boolean}
     */
    email: function (value) {
        var result = false;
        if (!!value) {
            exports.rules._typeofCheck('email', { value: value }, 'string');
            result = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
        }
        return result;
    },
    /**
     *  String email simple regex check
     *
     *  @param {string} email
     *
     *  @return {boolean}
     */
    emailSimple: function (value) {
        var result = false;
        if (!!value) {
            exports.rules._typeofCheck('email', { value: value }, 'string');
            result = /(\w)+@[A-Za-z\-_.]+\.[A-Za-z]{2,}/.test(value);
        }
        return result;
    },
    /**
     *  Values equality compare
     *
     *  @param {string} secName name of pair input
     *  @param {any} value checked value
     *  @param {any} secValue pair value for check
     *
     *  @return {boolean}
     */
    equal: function (secName, value, secValue) {
        if (!secName) {
            throw new Error('Validation rules equal: Parameter secName is required.');
        }
        exports.rules._typeofCheck('equal', { secName: secName }, 'string');
        return validator_1.valueExists(value) && validator_1.valueExists(secValue) ? value === secValue : true;
    },
    /**
     *  Value is greater than secValue compare
     *
     *  @param {string} secName name of pair input
     *  @param {any} value checked value
     *  @param {any} secValue pair value for check
     *
     *  @return {boolean}
     */
    greater: function (secName, value, secValue) {
        if (!secName) {
            throw new Error('Validation rules greater: Parameter secName is required.');
        }
        exports.rules._typeofCheck('greater', { secName: secName }, 'string');
        return validator_1.valueExists(value) && validator_1.valueExists(secValue) ? value > secValue : true;
    },
    /**
     *  Value is lower than secValue compare
     *
     *  @param {string} secName name of pair input
     *  @param {any} value checked value
     *  @param {any} secValue pair value for check
     *
     *  @return {boolean}
     */
    lower: function (secName, value, secValue) {
        if (!secName) {
            throw new Error('Validation rules lower: Parameter secName is required.');
        }
        exports.rules._typeofCheck('lower', { secName: secName }, 'string');
        return validator_1.valueExists(value) && validator_1.valueExists(secValue) ? value < secValue : true;
    },
    /**
     *  Value is greater than secValue or same compare
     *
     *  @param {string} secName name of pair input
     *  @param {any} value checked value
     *  @param {any} secValue pair value for check
     *
     *  @return {boolean}
     */
    greaterEqual: function (secName, value, secValue) {
        if (!secName) {
            throw new Error('Validation rules greaterEqual: Parameter secName is required.');
        }
        exports.rules._typeofCheck('greaterEqual', { secName: secName }, 'string');
        return validator_1.valueExists(value) && validator_1.valueExists(secValue) ? value >= secValue : true;
    },
    /**
     *  Value is lower than secValue or same compare
     *
     *  @param {string} secName name of pair input
     *  @param {any} value checked value
     *  @param {any} secValue pair value for check
     *
     *  @return {boolean}
     */
    lowerEqual: function (secName, value, secValue) {
        if (!secName) {
            throw new Error('Validation rules lowerEqual: Parameter secName is required.');
        }
        exports.rules._typeofCheck('lowerEqual', { secName: secName }, 'string');
        return validator_1.valueExists(value) && validator_1.valueExists(secValue) ? value <= secValue : true;
    },
    /**
     *  Value contains something and no null values check
     *
     *  @param {string|number} value
     *
     *  @return {boolean}
     */
    requiredNoNull: function (value) {
        var result = exports.rules.required(value);
        if (value === 0 || value === '0' || value === '' || value === null || (value instanceof Array && !value.length)) {
            result = false;
        }
        return result;
    },
    /**
     *  Value contains something check
     *
     *  @param {string|number} value
     *
     *  @return {boolean}
     */
    required: function (value) {
        var result = false;
        result = !!value;
        if (typeof value === 'string') {
            result = !!value.trim();
        }
        else if (value instanceof Array) { // for validation of input type 'tags'
            result = !!value.length;
        }
        return result;
    },
    /**
     *  Value contains something check
     *
     *  @param {regex} reg
     *  @param {string} neg return negated result (true/false)
     *  @param {string|number} value
     *
     *  @return {boolean}
     */
    regex: function (reg, neg, value) {
        if (!value) {
            value = ''; // to be able test empty string
        }
        if (!reg) {
            throw new Error('Validation rules regex: reg parameter is required.');
        }
        exports.rules._typeofCheck('regex', { value: value }, 'string');
        var result = XRegExp(reg).test(value);
        return neg.toLowerCase() === 'true' ? !result : result;
    },
    /**
     *  Value presents valid date check. It can be Date object or Moment object and also formatted string.
     *
     *  @param {string}                         format  expected date format of string value
     *  @param {moment.Moment | Date | string}  value
     *
     *  @return {boolean}
     */
    validDate: function (format, value) {
        if (moment_1.isMoment(value)) {
            return value.isValid();
        }
        else if (typeof value === 'object' && value instanceof Date) {
            return moment.utc(value.toUTCString()).isValid();
        }
        else if (value) {
            return moment(value, format).isValid();
        }
        return false;
    },
    /**
     *  Date value is greater than secValue
     *
     *  @param {string} secName     name of pair input
     *  @param {string} format      expected date format of string value
     *  @param {any}    value       value of input
     *  @param {any}    secValue    pair value for check
     *
     *  @return {boolean}
     */
    greaterDate: function (secName, format, value, secValue) {
        if (!value) {
            return true; // nothing to be validated
        }
        if (!secName) {
            throw new Error('Validation rules greaterDate: Parameter secName is required.');
        }
        exports.rules._typeofCheck('greaterDate', { secName: secName }, 'string');
        if (validator_1.valueExists(value) && validator_1.valueExists(secValue) && moment(value, format).isValid() && moment(secValue).isValid()) {
            var diff = moment.utc(value, format).diff(moment.utc(secValue), 'minutes');
            return diff > 0;
        }
        else {
            return true;
        }
    },
    /**
     *  Date value is lower than secValue
     *
     *  @param {string} secName     name of pair input
     *  @param {string} format      expected date format of string value
     *  @param {any}    value       value of input
     *  @param {any}    secValue    pair value for check
     *
     *  @return {boolean}
     */
    lowerDate: function (secName, format, value, secValue) {
        if (!value) {
            return true; // nothing to be validated
        }
        if (!secName) {
            throw new Error('Validation rules lowerDate: Parameter secName is required.');
        }
        exports.rules._typeofCheck('lowerDate', { secName: secName }, 'string');
        if (validator_1.valueExists(value) && validator_1.valueExists(secValue) && moment(value, format).isValid() && moment(secValue).isValid()) {
            var diff = moment(value, format).diff(moment(secValue), 'minutes');
            return diff < 0;
        }
        else {
            return true;
        }
    },
    /**
     * Value type check
     *
     * @param {string} method
     * @param {object} checkObj
     * @param {string} type
     */
    _typeofCheck: function (method, checkObj, type) {
        for (var _i = 0, _a = Object.keys(checkObj); _i < _a.length; _i++) {
            var name_1 = _a[_i];
            if (type === 'number' && !/^\d+$/.test(checkObj[name_1])) {
                throw new Error("Validation rules " + method + ": parameter " + name_1 + " must be a number. Inserted: " + JSON.stringify(checkObj[name_1]));
            }
            else if (typeof checkObj[name_1] !== type) {
                throw new Error("Validation rules " + method + ": parameter " + name_1 + " must be a " + type + ". Inserted: " + JSON.stringify(checkObj[name_1]));
            }
        }
    }
};
