let File = function (name, type, size, modified_date) {
    this.name = name;
    this.type = type;
    this.size = size;
    this.modified_date = modified_date;

    let size_display = size == "0 Bytes" ? '' : `- ${size}`;
    this.display = `${name} ${size_display}`.trim(); 
};

module.exports = File;