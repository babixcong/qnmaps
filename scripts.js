document.addEventListener("DOMContentLoaded", function(event) {
    if (window.matchMedia("(orientation: portrait)").matches) {
        document.getElementById("need-rotate").style.display="flex";
        document.getElementById("qn_map").style.display="none";
    }
    if (window.matchMedia("(orientation: landscape)").matches) {
        document.getElementById("need-rotate").style.display="none";
        document.getElementById("qn_map").style.display="block";
    }

    window.addEventListener("orientationchange", (event) => {
        if (event.target.screen.orientation.angle === 0) {
            document.getElementById("need-rotate").style.display="flex";
            document.getElementById("qn_map").style.display="none";

        } else {
            document.getElementById("need-rotate").style.display="none";
            document.getElementById("qn_map").style.display="block";

        }
    });

    window.onload = function() {
        let custom_layer = L.layerGroup();

        //Khai báo basemap
        const satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {attribution: 'tinhdoanquangninh'});
        const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: 'tinhdoanquangninh'})
        const Stadia_Outdoors = L.tileLayer('https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png', {attribution: 'tinhdoanquangninh'});
        const Stamen_Toner = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.{ext}', {
            attribution: 'tinhdoanquangninh',
            ext: 'png'
        });

        const label = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png');

        //Khai báo bản đồ
        var map = L.map('qn_map', {
            // dragging: false,
            //tap: !L.Browser.mobile,
            layers: [osm, custom_layer],
            fullscreenControl: true,
            fullscreenControlOptions: {
                position: 'topleft'
            }
        }).setView([21.2158,107.3309], 11);

        const baseMaps = {
            "Đường phố": osm,
            //"Vệ tinh": satellite,
            // "Sắc nét": Stadia_Outdoors,
            //"Trắng Đen": Stamen_Toner
        };

        //Thêm option vào overlayMaps
        var overlayMaps = {
            "Nhãn": label,
        };


        //Thêm tìm kiếm
        // const searchControl = L.esri.Geocoding.geosearch().addTo(map);
        // var results = L.layerGroup().addTo(map);
        // searchControl.on('results', function (data) {
        //     results.clearLayers();
        //     for (var i = data.results.length - 1; i >= 0; i--) {
        //         results.addLayer(L.marker(data.results[i].latlng));
        //     }
        // });

         function onEachFeature(feature, layer) {
           if (feature.properties && feature.properties.popupContent && feature.properties.red_nation) {
                layer.bindPopup(`
                    <div>
                    <div style="font-size: 16px; text-transform: uppercase">${feature.properties.popupContent}</div>
                    <div><b style="color: red">Địa chỉ đỏ cấp quốc gia:</b> <i>${feature.properties.red_nation}</i></div>
                    <div><b style="color: green">Địa chỉ đỏ cấp tỉnh:</b> <i>${feature.properties.red_local}</i></div>
                    <div><b style="color: blue">Địa chỉ đỏ kiểm kê:</b> <i>${feature.properties.red_kiem_ke}</i></div>
                    </div>
                `);
            }
       }
        const redIcon = new L.icon({
            iconUrl: './red.png',
        });

        const yellowIcon = new L.icon({
            iconUrl: './yellow.png',
        });

        const districtCoords =[
            {
                name: "Khu căn cứ cách mạng hải Chi - Đình làng Dạ",
                left: 21.320593052763357,
                right:107.13797183650449,
                href:'',
                type: 'local',
                icon: redIcon,
            },
            {
                name: "Hang núi đá Chồng",
                left: 21.036335503372438,
                right: 106.8726048611921,
                href: '',
                type: 'local',
                icon: redIcon,
            },
            {
                name: "Khu di tích và Danh thắng Vũng Đục",
                left: 21.009400590593483,
                right: 107.2951829954266,
                href:'',
                type: 'local',
                icon: redIcon,
            },
            {
                name: "Ngã tư đường lên mỏ Đèo Nai",
                left: 21.017082973508277,
                right: 107.30800561248184,
                href:'',
                type: 'local',
                icon: redIcon,
            },
            {
                name: "Cầu Poóc Tính 1 - Trận địa pháo Cao xạ - Hầm chỉ huy của xí nghiệp than Cửa Ông",
                left: 21.026260395382067,
                right: 107.37187615201181,
                href:'',
                type: 'local',
                icon: redIcon,
            },
            {
                name: "Bác Hồ về thăm mỏ than Đèo Nai",
                left: 21.01354704082289,
                right: 107.28902013531457,
                href:'',
                type: 'local',
                icon: redIcon,
            },
            {
                name: "Khu lưu niệm Chủ tịch Hồ Chí Minh trên đảo",
                left: 20.973308880070505,
                right: 107.76328330096015,
                href: '',
                type: 'nation',
                icon: yellowIcon,
            },
            {
                name: "Tượng đài Anh hùng Liệt sĩ Hà Quang Vóc",
                left: 21.351822080502437,
                right: 107.60049671136883,
                href:'',
                type: 'local',
                icon: redIcon,
            },
            {
                name: "Núi Hứa",
                left: 21.334711648009524,
                right: 107.55254206559084,
                href:'',
                type: 'local',
                icon: redIcon,
            },
            {
                name: "Cụm di tích lịch sử văn hóa xã Yên Thọ",
                left: 21.04567441961115,
                right: 106.61867369870015,
                href:'',
                type: 'local',
                icon: redIcon,
            },
            {
                name: "Nhà bia Yên Dưỡng",
                left: 21.043793168286136,
                right: 106.6923707266633,
                href:'',
                type: 'local',
                icon: redIcon,
            },
            {
                name: "Lưu niệm Bác Hồ xã Hồng Thái Tây",
                left: 21.048488522381835,
                right: 106.6688560606629,
                href:'',
                type: 'local',
                icon: redIcon,
            },
            {
                name: "Địa điểm lịch sử Trung tâm chiến khu Đông Triều",
                left: 21.12566045409731,
                right: 106.48270335284258,
                href:'',
                type: 'local',
                icon: redIcon,
            },
            {
                name: "Nơi thành lập đệ tứ chiến khu Đông Triều",
                left: 21.115589790744604,
                right: 106.51795990800345,
                href:'',
                type: 'local',
                icon: redIcon,
            },
            {
                name: "Đồn Cao Đông Triều",
                left: 21.080519789369127,
                right: 106.51241199406427,
                href:'',
                type: 'local',
                icon: redIcon,
            },
            {
                name: "Di tích mỏ than Mạo Khê - Nơi thành lập Chi bộ Đảng Cộng sản đầu tiên ở Quảng Ninh",
                left: 21.070949627859008,
                right: 106.59683239248761,
                href:'',
                type: 'local',
                icon: redIcon,
            },
            {
                name: "Trận địa pháo cao xạ 12 ly 7",
                left: 21.077911041449486,
                right: 106.5419125039142,
                href:'',
                type: 'local',
                icon: redIcon,
            },
            {
                name: "Khu lưu niệm Bác Hồ trên đảo Tuần Châu",
                left: 20.93101857548878,
                right: 106.98557641293512,
                href:'',
                type: 'local',
                icon: redIcon,
            },

            { name: "Lưu niệm sự kiện thành lập Binh đoàn than",
                left: 20.95379851139367,
                right: 107.06810818762321,
                href:'',
                type: 'local',
                icon: redIcon,
            },
            {
                name: "Trận địa pháo 37 ly của Xí nghiệp tuyển than Hòn Gai",
                left: 20.954784324789994,
                right: 107.07153167589206,
                href:'',
                type: 'local',
                icon: redIcon,
            },
            {
                name: "Trung tâm Điện chính Bưu điện Quảng Ninh (1964-1975) trên núi Bài Thơ",
                left: 20.947755793235302,
                right: 107.0782737891011,
                href:'',
                type: 'local',
                icon: redIcon,
            },
            {
                name: "Tượng đài Nguyễn Văn Thuộc",
                left: 20.966047472708603,
                right: 107.10806910505939,
                href:'',
                type: 'local',
                icon: redIcon,
            },
            {
                name: "Tượng đài Vũ Văn Hiếu",
                left: 20.952562624700516,
                right: 107.09026600176891,
                href:'https://tinhdoanquangninh.vn/dia-chi-do-tuong-dai-vu-van-hieu-ha-long/',
                type: 'local',
                icon: redIcon,
            },
            {
                name: "Di tích lưu niệm Bác Hồ",
                left: 20.95898844705714,
                right: 107.09961134231463,
                href:'',
                type: 'local',
                icon: redIcon,
            },
            {
                name: "Đồi Trần Phú",
                left: 21.539445444303585,
                right: 108.0152885469715,
                href:'',
                type: 'local',
                icon: redIcon,
            },
            {
                name: "Đồn Biên phòng 209 Pò Hèn",
                left: 21.638566440224974,
                right: 107.76002237476443,
                href:'',
                type: 'local',
                icon: redIcon,
            },
            {
                name: "Lưu niệm Bác Hồ tại phường Trà Cổ Năm 1961",
                left: 21.485919698185963,
                right: 108.05697928557224,
                href:'',
                type: 'local',
                icon: redIcon,
            },
            {
                name: "Địa điểm lưu niệm sự kiện Bác Hồ về thăm Móng Cái",
                left: 21.3704553156853,
                right: 107.8864782351543,
                href:'',
                type: 'local',
                icon: redIcon,
            },
            {
                name: "Sự kiện Bác Hồ qua Trạm Hải quan cửa khẩu Bắc Luân thăm nhân dân Đông Hưng, Trung Quốc năm 1960",
                left: 21.536762635801,
                right: 107.96938694559508,
                href:'',
                type: 'local',
                icon: redIcon,
            },
            {
                name: "Đồi Thông Yên Lập",
                left: 21.01172509807486,
                right: 106.86610592734257,
                href:'',
                type: 'local',
                icon: redIcon,
            },
            {
                name: "Khe Giao -  Nơi thành lập chi bộ đầu tiên Đảng Cộng sản Việt Nam",
                left: 21.385819247197094,
                right: 107.32070162834916,
                href:'',
                type: 'local',
                icon: redIcon,
            },
            {
                name: "Di tích lưu niệm Bác Hồ",
                left: 21.34974352192511,
                right: 107.39294688013902,
                href:'',
                type: 'local',
                icon: redIcon,
            },
            {
                name: "Lưu niệm sự kiện Bác Hồ về thăm Uông Bí năm 1965",
                left: 21.041484745901542,
                right: 106.78707202903169,
                href:'',
                type: 'local',
                icon: redIcon,
            },
        ];




        districtCoords.forEach(district => {
            let marker = L.marker([district.left, district.right], {
                icon: district.icon,
            }).addTo(map);

            marker.bindTooltip(
                `<div style="background:white; padding:1px 3px 1px 3px; display: flex; align-items: center">
<!--                    <div style="width: 50px"><img src="rotate.png" alt="" width="100%" /></div>-->
                    <div style="margin-left: 5px">${district.name}</div>
                </div>`,
                {
                    direction: 'top',
                    permanent: false,
                    sticky: true,
                    offset: [10, 0],
                    opacity: 1,
                    className: 'leaflet-tooltip-own'
                });
            marker.on('click', function () {
                window.open(district.href, '_blank');
            })
        });

        var myFeatureGroup=L.featureGroup();
        L.geoJSON(Pol_1, {style: poly_0288D1_2000_125, onEachFeature: onEachFeature }).addTo(myFeatureGroup);
        L.geoJSON(Pol_2, {style: poly_817717_2000_120, onEachFeature: onEachFeature }).addTo(myFeatureGroup);
        L.geoJSON(Mul_1, {style: poly_0F9D58_2000_133, onEachFeature: onEachFeature }).addTo(myFeatureGroup);
        L.geoJSON(Mul_2, {style: poly_3949AB_2000_125, onEachFeature: onEachFeature }).addTo(myFeatureGroup);
        L.geoJSON(Mul_3, {style: poly_E65100_2000_133, onEachFeature: onEachFeature }).addTo(myFeatureGroup);
        L.geoJSON(Pol_3, {style: poly_F9A825_2000_112, onEachFeature: onEachFeature }).addTo(myFeatureGroup);
        L.geoJSON(Mul_4, {style: poly_F57C00_2000_128, onEachFeature: onEachFeature }).addTo(myFeatureGroup);
        L.geoJSON(Mul_5, {style: poly_795548_2000_143, onEachFeature: onEachFeature }).addTo(myFeatureGroup);
        L.geoJSON(Mul_6, {style: poly_673AB7_2000_120, onEachFeature: onEachFeature }).addTo(myFeatureGroup);
        L.geoJSON(Mul_7, {style: poly_9C27B0_2000_120, onEachFeature: onEachFeature }).addTo(myFeatureGroup);
        L.geoJSON(Pol_4, {style: poly_C2185B_2000_99, onEachFeature: onEachFeature }).addTo(myFeatureGroup);
        L.geoJSON(Pol_5, {style: poly_0288D1_2000_125, onEachFeature: onEachFeature }).addTo(myFeatureGroup);
        L.geoJSON(Mul_8, {style: poly_FBC02D_2000_181, onEachFeature: onEachFeature }).addTo(myFeatureGroup);



        myFeatureGroup.addTo(custom_layer);

        overlayMaps["Quảng Ninh"]=custom_layer;

        L.control.layers(baseMaps,overlayMaps).addTo(map);

        map.fitBounds(myFeatureGroup.getBounds());
        map.options.minZoom = 9;
        map.setMaxBounds(map.getBounds().pad(Math.sqrt(2) / 2));
    }
});
