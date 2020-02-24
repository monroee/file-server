let File = function (name, type, size, modified_date) {
    this.name = name;
    this.type = type;
    this.size = size;
    this.modified_date = modified_date;
    this.display = `${name} - ${size}`;

};

module.exports = File;