export class languageNotFoundException {
    constructor(value) {
        this.value = value;
        this.message = " not a valid language of pre-defined grammar!";
    }
    toString() {
        return "'" + this.value + "'" + this.message;
    }
}

export class UnexpectedRuleItem {
    constructor(value) {
        this.value = value;
        this.message = " not found in tokens or grammar!";
    }
    toString() {
        return "'" + this.value + "'" + this.message;
    }
}
