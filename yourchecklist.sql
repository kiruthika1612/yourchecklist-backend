use ycdb;

CREATE TABLE Customers ( Cid int NOT NULL AUTO_INCREMENT,
    LastName varchar(255) NOT NULL,
    FirstName varchar(255),
    Email varchar(255),
    Pwd varchar(255),
    DOB varchar(255),
    Streetno varchar(255),
    Streetname varchar(255),
    Complement varchar(255),
    City varchar(255),
    Province varchar(255),
    Country varchar(255),
    Postalcode varchar(255),
    PRIMARY KEY (Cid)
);

create table products(pid varchar(20),productName varchar(50),category varchar(50), productImageUrl varchar(50), PRIMARY KEY (pid));

create table customer_products(id int auto_increment, cid int, pid varchar(20), primary key (id));

insert into  products values ('tt1','Black Travel Trolley','trolley','../../../assets/images/trolley1.JPG');
insert into  products values ('tt2','Dark Blue Travel Trolley','trolley','../../../assets/images/trolley2.JPG');
insert into  products values ('tt3','Black Travel Trolley','trolley','../../../assets/images/trolley3.JPG');
insert into  products values ('tb1','Black Travel Bag','bags','../../../assets/images/travelbag1.JPG');
insert into  products values ('tb2','Green Travel Bag','bags','../../../assets/images/travelbag2.JPG');
insert into  products values ('tb3','Brown Travel Bag','bags','../../../assets/images/travelbag3.JPG');
insert into  products values ('ta1','Leg Holder','accessories','../../../assets/images/travelacc1.JPG');
insert into  products values ('ta2','Travel Kit','accessories','../../../assets/images/travelacc2.JPG');
insert into  products values ('ta3','Neck Pillow','accessories','../../../assets/images/travelacc3.JPG');
insert into  products values ('tc1','Travel Pouch','cosmetics','../../../assets/images/cosmetics1.JPG');
insert into  products values ('tc2','Makeup Kit - Brushes','cosmetics','../../../assets/images/cosmetics2.JPG');
insert into  products values ('tc3','Full Makeup Kit','cosmetics','../../../assets/images/cosmetics3.JPG');