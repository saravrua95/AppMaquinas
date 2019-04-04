
window.onload = () => {

    let botonAtrasCreditos = document.getElementById("botonAtrasCreditos");
    botonAtrasCreditos.addEventListener("click", event => goBack());

    let botonAtrasBebidas = document.getElementById("botonAtrasBebidas");
    botonAtrasBebidas.addEventListener("click", event => goBack());

    let preciosBebidas = document.getElementById("preciosBebidas");
    preciosBebidas.addEventListener("click", event => initPrecios());

    let mapaMaquinas = document.getElementById("tablaMaquinas");
    mapaMaquinas.addEventListener("click", event => initTablaMaquinas());
    
    let ubicacionMaquinas = document.getElementById("ubicacionMaquinas");
    ubicacionMaquinas.addEventListener("click", event => localizaEdificios());

    let creditos = document.getElementById("creditos");
    creditos.addEventListener("click", event => initCreditos());

    function goBack() {
        location.href = "index.html";
    }

    function initCreditos() {
        location.href = "creditos.html";
    }

    function initPrecios() {
        location.href = "preciosBebidas.html";
    }

    function initTablaMaquinas() {
        location.href = "tablaMaquinas.html";
    }


    

    function localizaEdificios() {

        var mapOptions = {
            zoom: 16,
            center: { lat: 38.3837805, lng: -0.5131867 }
        };

        var map = new google.maps.Map(document.getElementById('map'), mapOptions);

        $.ajax({

            url: 'https://dev.datos.ua.es/uapi/SVZ4YSbTzaucFUc6HvUy/datasets/11/data',
            type: 'GET',
            dataType: "jsonp",
            success: function (data) {

                $.each(data, function (i, item) {

                    var coordenadas = item.bbox.split(",");

                    var pos = new google.maps.LatLng(coordenadas[1], coordenadas[0]);

                    var marker = new google.maps.Marker({
                        position: pos,
                        map: map,
                        title: item.nombre
                    });

                    var infowindow = new google.maps.InfoWindow({
                        content: item.nombre
                    });

                    marker.addListener('click', function () {
                        infowindow.open(map, marker);
                    });

                    console.log(marker);

                });

            },
            error: function (jqXHR, textStatus, error) {

                alert("error:" + jqXHR.responseText);
            }
        });
        document.getElementById("map").classList.add("mapa-visible");
    }
    
    /**
     * Ventana Ubicación Máquinas Vending, donde se mostrará una tabla con la ubicación de las máquinas
     * de vending y un enlace a un mapa donde se ubique mediante un marcador dicha máquina
     * y al pulsar sobre su marcador muestre la información de esa máquina.

     */


    function initMap() {
        console.log("mapa iniciado");

        var map;

        map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 38.384845, lng: -0.5134282},
            zoom: 16
 
        });

        var infoWindow = new google.maps.InfoWindow({ map: map });

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                infoWindow.setPosition(pos);
                infoWindow.setContent('Estás aquí!');
                map.setCenter(pos);
            }, function () {
                handleLocationError(true, infoWindow, map.getCenter());
            });
        } else {
            handleLocationError(false, infoWindow, map.getCenter());
        }

        document.getElementById("map").classList.add("mapa-visible");
    }

};