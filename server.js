// Przypisz zaleznosci do zmiennych
var fs = require( 'fs' );
var express = require( 'express' );
var bodyParser = require( 'body-parser' );
var app = express();
var stringyFile;
// Uzyj metody aby zaczac serwowac pliki w danym katalogu
app.use( express.static( 'assets' ) );
// Wywolaj metode GET  
app.get( '/', function( req, res ) {
    // Wywolaj metode aby wyslala w odpowiedzi plik zamiast wiadomosc
    res.sendFile( '/index.html' );
});
// Wywolaj metode GET jesli endpoint zostanie spelniony
app.get( '/userform', function( req, res ) {
    // Utworz stala zmienna ktora przechowa obiekty
    const response = {
        // Przypisz do klucza parametr zadania zapytania do nowych obiektow
        first_name: req.query.first_name,
        last_name: req.query.last_name
    };
    // Uzyj metody aby wyswietlic obiekt i za pomoca metody JSON.stringify przetworz ten
    // obiekt response na string
    res.end( JSON.stringify( response ) );
});

// Nasluchuj na port i adres url serwera
var server = app.listen( 3000, 'localhost', function() {
    // Pobierz dane za pomoca metody adress i zapisz w zmiennych 
    var host = server.address().address;
    var port = server.address().port;
    // Wyswietl komunikat adresu url serwera
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
