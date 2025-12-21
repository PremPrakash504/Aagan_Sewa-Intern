CREATE TABLE PROVIENCE(
   provience_id INT AUTO_INCREMENT PRIMARY KEY,
    provience_name VARCHAR(100) NOT NULL 
);
CREATE TABLE district(
    district_id INT AUTO_INCREMENT PRIMARY KEY,
    district_name VARCHAR(100) NOT NULL,
    provience_id INT not null,
    FOREIGN KEY (provience_id) REFERENCES PROVIENCE(provience_id)
);
CREATE TABLE branch(
    branch_id INT AUTO_INCREMENT PRIMARY KEY,
    branch_name VARCHAR(100) NOT NULL,
    remarks VARCHAR(255) NULL,
    district_id INT not null,
    FOREIGN KEY (district_id) REFERENCES district(district_id)
);

    CREATE TABLE services(
    service_id INT AUTO_INCREMENT PRIMARY KEY,
    service_name VARCHAR(150),
    description varchar(255),
    service_image varchar(255),
    branch_id INT,
    FOREIGN KEY (branch_id)
      REFERENCES branch(branch_id) 

);

CREATE TABLE staff(
    staff_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(20) NOT NULL,
    address TEXT,
    password VARCHAR(255),
    role VARCHAR(20) DEFAULT 'staff',
    branch_id INT NOT NULL,
    FOREIGN KEY (branch_id) REFERENCES branch (branch_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);