// Przypisz zaleznosci do zmiennych
var fs = require( 'fs' );
var express = require( 'express' );
var bodyParser = require( 'body-parser' );
var app = express();
var stringyFile;

app.use( express.static( 'assets' ) );

app.get( '/', function( req, res ) {
    res.sendFile( '/index.html' );
});

app.get( '/userform', function( req, res ) {
    const response = {
        first_name: req.query.first_name,
        last_name: req.query.last_name
    };
    res.end( JSON.stringify( response ) );
});

var server = app.listen( 3000, 'localhost', function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log( 'Przykładowa aplikacja nasłuchuje na http://' + host + ':' + port );
});

// Uzyj body-parser aby skorzystac z formatu application/json
app.use( bodyParser.json());
// Wywolaj metode GET ktora pobierze dane z serwera jesli endpoint zostanie znaleziony
app.get( '/getNote', function( req, res ) {
    // Wywolaj metode ktora zczyta plik w Node po przeslaniu endpointa
    fs.readFile( './test.json', 'utf8', function( err, data ) {
        // Jesli plik nie zostal znaleziony, zwroc blad i wyswietl w Node
        if( err ) throw err;
        // Przypisz parametr ktory przechowuje zapytanie o endpoincie zapisane jako string
        stringyFile = data;
        // Wyslij zapytanie do serwera
        res.send( data );
    });
});

// Wywolaj metode POST ktora przesle dane do serwera jesli dynamiczny endpoint zostal odszukany
app.post( '/updateNote/:note', function( req, res ) {
    // Przypisz obiekt przechowujacy zapytanie o endpoint do zmiennej
    stringyFile = req.params.note;
    // Wywolaj metode ktora zapisze pobrane dane z endpointa do pliku json
    fs.writeFile( './test.json', stringyFile, function( err ) {
        // Jesli plik nie zostal znaleziony, wyswietl blad w Node
        if( err ) throw err;
        // Powiadom serwer ze plik zostal pomyslnie zaktualizowany
        console.log( 'file updated' );
    });
});

// Nasluchuj zmiany na port serwera
app.listen( 3000 );