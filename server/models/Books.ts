import { IDbUtils } from "../config/mysql";


export class Books {
    constructor(private dbConn: IDbUtils){}
    async get(id:string,name:string){
        const sql = `
        SELECT * FROM books
        WHERE id = ? and name = ?;
        `;
        const rows = await this.dbConn.getRows(sql, [id,name])
        return rows.length ? rows[0] : null
    }
    async getAll(){
        const sql = `
        SELECT m.member_id,m.name member,c.committee_id,c.name committee
        FROM members m
        INNER JOIN committees c
        ON m.name=c.name
        `;
        const rows = await this.dbConn.getRows(sql)
        return rows.length ? rows: null
    }
    async inCategories(){
        const sql = `
        INSERT INTO Category(name) VALUES
        ('Clothes'),
        ('Shoes'),
        ('Accessories')
        `;
        const rows = await this.dbConn.getRows(sql)
        return rows.length ? rows:null
    }
    async inSubCategories(){
        const sql = `
        INSERT INTO SubCategory(name,cat_id) VALUES
        ('T-Shirt',1),
        ('Saree',1),
        ('Pants',1),
        ('Sports_Shoes',2),
        ('Formal_Shoes',2),
        ('Lockets',3),
        ('Mobile_Covers',3)
        `;
        const rows = await this.dbConn.getRows(sql)
        return rows.length ? rows:null
    }
    async inProducts(){
        const sql = `
        INSERT INTO Products(name,price,size,description,image_path,sub_id) VALUES 
        ('Lannister',100,'S,M,L','This is a t-shirt','/Home/T-Shirts',1), 
        ('Nike',200,'S,M,L','This is a Nike t-shirt','/Home/T-Shirts',1), 
        ('Paithani',300,'S,M,L','This is a Paithani','/Home/Saree',2),
        ('Nauvari',400,'S,M,L,XL','This is a Nauvari','/Home/Saree',2), 
        ('Rajasthani',500,'S,M,L,XL','This is a Rajasthani','/Home/Saree',2), 
        ('Jeans',600,'S,M,L,XL','This is a Jeans','/Home/Pants',3), 
        ('Cargo',700,'S,M,L,XL','This is a Cargo','/Home/Pants',3), 
        ('Adidas',800,'S,M,L,XL','This is a Adidas','/Home/Sports_Shoes',4),
        ('Titan',900,'S,M,L,XL','This is a Titan','/Home/Accessories',5);
        `;
        const rows = await this.dbConn.getRows(sql)
        return rows.length ? rows:null
    }
    async getTShirt(){
        const sql = `SELECT * FROM Products INNER JOIN SubCategory s USING (sub_id)
        WHERE s.name='T-Shirt'`;
        const rows = await this.dbConn.getRows(sql)
        return rows.length ? rows:null
    }
}