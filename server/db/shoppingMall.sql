create database shoppingmall;
use shoppingmall;

CREATE TABLE member(
    mId INT AUTO_INCREMENT PRIMARY KEY,
    mEmail VARCHAR(255) NOT NULL unique,
    mPwd VARCHAR(255) NOT NULL,
    mName VARCHAR(255) NOT NULL,
    mPhone VARCHAR(13) NOT NULL,
    mPostnum VARCHAR(5),
    mAddr1 VARCHAR(255),
    mAddr2 VARCHAR(255),
    mPoint INT(10) DEFAULT 3000,
    mAuth VARCHAR(10) DEFAULT 'user',
    mRegdate DATE DEFAULT (current_date) 
);

create table product(
    pId int auto_increment primary key,
    pName varchar(100) not null,
    pGender varchar(5) not null,
    pCaregory varchar(20) not null,
    pStock int(10) not null,
    pPrice int(10) not null,
    pImage1 varchar(255) not null,
    pImage2 varchar(255),
    pImage3 varchar(255),
    pContent text not null,
    regdate varchar(255) not null
);

CREATE TABLE qna(
    qId INT AUTO_INCREMENT PRIMARY KEY,
    qCategory VARCHAR(20) NOT NULL,
    pId INT,
    mId INT,
    qTitle VARCHAR(100) NOT NULL,
    qContent TEXT NOT NULL,
    qImage1 VARCHAR(255),
 	qImage2 VARCHAR(255),
    qImage3 VARCHAR(255),
    qSecret BOOLEAN,
    qHit INT(50) DEFAULT 0,
    qRegdate DATE DEFAULT (NOW()),
    FOREIGN KEY (pId) REFERENCES product (pId),
    FOREIGN KEY (mId) REFERENCES member (mId)
);

CREATE TABLE qna_comment(
	qcId INT AUTO_INCREMENT PRIMARY KEY,
	qId INT,
	qcWriter VARCHAR(200),
	qcContent TEXT,
	qcRegdate DATE DEFAULT (NOW()),
	FOREIGN KEY (qId) REFERENCES qna (qId)
);


CREATE TABLE notice(
    nId INT AUTO_INCREMENT PRIMARY KEY ,
    mId INT,
    nTitle VARCHAR(100) NOT NULL,
    nContent TEXT NOT NULL,
    nImage1 VARCHAR(255),
    nImage2 VARCHAR(255),
    nImage3 VARCHAR(255),
    nHit INT(50),
    nRegdate DATE DEFAULT (current_date),
    FOREIGN KEY (mId) REFERENCES member (mId)
);

create table cart(
    cId int auto_increment primary key,
    mId int,
    cQuantity int(10) not null,
    pId int,
    FOREIGN KEY (mId) REFERENCES member (mId),
    FOREIGN KEY (pId) REFERENCES product (pId)
);

create table orders(
    oId int auto_increment primary key,
    mId int,
    oName varchar(255),
    oPostnum varchar(5),
    oAddr1 varchar(255),
    oAddr2 varchar(255),
    oPhone varchar(13), 
    oPoint INT(10),
    oPrice INT(10),
    oPayment varchar(10),
    oDate date,
    FOREIGN KEY (mId) REFERENCES member (mId)    
);

create table orderDetails(
    odId int auto_increment primary key,
    oId int,
    oQuantity int(10),
    pId int,
    pName varchar(255),
    FOREIGN KEY (oId) REFERENCES orders (oId),
    FOREIGN KEY (pId) REFERENCES product (pId)
);

CREATE TABLE review(
    rId INT AUTO_INCREMENT PRIMARY KEY,
    pId INT,
    mId INT,
    rTitle VARCHAR(100) NOT NULL,
    rContent TEXT NOT NULL,
    rImage1 VARCHAR(255),
    rImage2 VARCHAR(255),
    rImage3 VARCHAR(255),
    rStar VARCHAR(5),
    rHit INT(50),
    rRegdate DATE DEFAULT (current_date),
    FOREIGN KEY (pId) REFERENCES product (pId),
    FOREIGN KEY (mId) REFERENCES member (mId)
);