let File = function (name, type, size, modified_date, url, full_path) {
    this.name = name;
    this.type = type;
    this.size = size;
    this.modified_date = modified_date;

    let size_display = size == "0 Bytes" ? '' : `- ${size}`;
    this.display = `${name} ${size_display}`.trim();
    
    this.url = url;
    this.full_path = full_path;
};

module.exports = File;