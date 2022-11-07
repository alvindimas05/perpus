const { User, Book } = require("./db"),
app = require("./express");

//username, password, vpassword
async function create_account(req, res){
    var body = req.body;

    if(body.password == body.vpassword){
        var username = await User.findOne({
            username:body.username
        });
        
        if(username){
            res.json({
                status:false,
                message:2//"Username already used!"
            });
        } else {
            (await new User({
                username:body.username,
                password:body.password,
                book_id:null,
                date_rent:null,
                date_return:null
            })).save();
    
            res.json({
                status:true
            });
        }
    } else {
        res.json({
            status:false,
            message:1//"Password verification is not same!"
        });
    }
}

//username, password
async function login_account(req, res){
    var body = req.body;

    var data = await User.findOne({
        username:body.username,
        password:body.password
    });
    
    res.json({
        status:data ? true : false
    });
}

async function get_books(req, res){
    var data = await Book.find().select({
        _id:0,
        __v:0,
        status:0,
        date_return:0
    });

    res.json(data);
}

//query, by
async function search_books(req, res){
    var body = req.body;

    var data = await Book.find().select({
        _id:0,
        __v:0,
        status:0,
        date_return:0
    }),
    result = [];

    data.forEach(dat => {
        if(dat[body.by].toLowerCase().includes(body.query.toLowerCase())){
            result.push(dat);
        }
    });

    res.json(result);
}

//title, author, category, publications
async function add_book(req, res){
    var body = req.body;

    var len = await Book.find();
    len = len.length;
    (new Book({
        book_id:len + 1,
        title:body.title,
        author:body.author,
        category:body.category,
        publications:body.publications,
        status:false,
        date_return:null
    })).save();
}

//book_id, title, author, category, publications
async function edit_book(req, res){
    var body = req.body;

    await Book.findOneAndUpdate({book_id:body.book_id}, {
        title:body.title,
        author:body.author,
        category:body.category,
        publications:body.publications
    });
}

//username, book_id, date_rent, date_return
async function rent_book(req, res){
    var body = req.body;

    var book = await Book.findOne({book_id:body.book_id});
    if(book.status){
        res.json({
            status:false
        });
    } else {
        await User.findOneAndUpdate({username:body.username}, {
            book_id:req.book_id,
            date_rent:req.date_rent,
            date_return:req.date_return
        });
    
        await Book.findOneAndUpdate({book_id:body.book_id}, {
            status:true,
            date_return:body.date_return
        });
        
        res.json({
            status:false
        });
    }
}

//username, book_id
async function return_book(req, res){
    var body = req.body;

    await User.findOneAndUpdate({username:body.username}, {
        book_id:null,
        date_rent:null,
        date_return:null
    });

    await Book.findOneAndUpdate({book_id:body.book_id}, {
        status:false,
        date_return:null
    });
}

app.post("/account/create", create_account);
app.post("/account/login", login_account);

app.get("/books", get_books);
app.post("/books/search", search_books);
app.post("/books/add", add_book);
app.post("/books/edit", edit_book);

app.post("/books/rent", rent_book);
app.post("/books/return", return_book);