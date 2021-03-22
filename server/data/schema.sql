CREATE TABLE IF NOT EXISTS Category (
    cat_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS SubCategory (
    sub_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20),
    cat_id INT,
    FOREIGN KEY (cat_id)
    REFERENCES Category(cat_id)
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Products (
    prod_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30),
    price INT,
    size VARCHAR(20),
    description TEXT,
    image_path VARCHAR(40),
    sub_id INT,
    FOREIGN KEY (sub_id)
    REFERENCES SubCategory(sub_id)
    ON DELETE CASCADE
);

