document.addEventListener("DOMContentLoaded", function (event) {
    window.onload = function () {
        let custom_layer = L.layerGroup();

        //Khai báo basemap
        const satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { attribution: 'tinhdoanquangninh' });
        const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: 'tinhdoanquangninh' });
        const os = L.tileLayer('https://{s}.tile/{z}/{x}/{y}.png', { attribution: 'tinhdoanquangninh' });
        const Stadia_Outdoors = L.tileLayer('https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png', { attribution: 'tinhdoanquangninh' });
        const Stamen_Toner = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.{ext}', {
            attribution: 'tinhdoanquangninh',
            ext: 'png'
        });

        const label = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png');

        //Khai báo bản đồ
        var map;

        if (L.Browser.mobile) {
            // write your code here
            map = L.map('qn_map', {
                //dragging: true,
                //tap: !L.Browser.mobile,
                layers: [osm, custom_layer],
                fullscreenControl: true,
                fullscreenControlOptions: {
                    position: 'center'
                }
            }).setView([21.2158, 107.3309], 9.35);
        } else {
            map = L.map('qn_map', {
                //dragging: true,
                //tap: !L.Browser.mobile,
                layers: [osm, custom_layer],
                fullscreenControl: true,
                fullscreenControlOptions: {
                    position: 'center'
                }
            }).setView([21.2158, 107.3309], 11);
        }

        const baseMaps = {
            "Đường phố": osm,
            //"Vệ tinh": satellite,
           // "Sắc nét": Stadia_Outdoors,
           // "Trắng Đen": Stamen_Toner
        };

        //Thêm option vào overlayMaps
        var overlayMaps = {
            "Nhãn": label,
        };

        function onEachFeature(feature, layer) {
            if (feature.properties && feature.properties.popupContent && feature.properties.red_nation) {
                layer.bindPopup(`
                    <div>
                    <div style="font-size: 16px; text-transform: uppercase">${feature.properties.popupContent}</div>
                    <div><b style="color: yellow">Địa chỉ đỏ cấp quốc gia:</b> <i>${feature.properties.red_nation}</i></div>
                    <div><b style="color: red">Địa chỉ đỏ cấp tỉnh:</b> <i>${feature.properties.red_local}</i></div>
                    <div><b style="color: blue">Địa chỉ đỏ kiểm kê:</b> <i>${feature.properties.red_kiem_ke}</i></div>
                    </div>
                `);
            }
        }
        const yellowIcon = new L.icon({
            iconUrl: './yellow.png',
        });
        const redIcon = new L.icon({
            iconUrl: './red.png',
        });
        const blueIcon = new L.icon({
            iconUrl: './blue.png',
        });

        const districtCoords = [
          const districtCoords = [
            {
                name: "Đại học Hạ Long", 
                left: 21.020977082864725,
                right: 106.82003014479535,
                href: '',
                type: 'local',
                icon: redIcon,
            },
            {
                name: "Đại học Công nghiệp Quảng Ninh", , 
                left: 21.060506992134655,
                right: 106.62376692096228,
                href: '',
                type: 'local',
                icon: yellowIcon,
            },
            {
                name: "Cao đẳng Việt Hàn",  
                left: 21.00446583821854,
                right: 107.06214063734242,
                href: '',
                type: 'local',
                icon: yellowIcon,
            },
            {
                name: "Cao đẳng Than khoáng sản Việt Nam", 
                left: 21.028909423495385, 
                right: 106.98228451850818,
                href: '',
                type: 'local',
                icon: yellowIcon,
            },
            {
                name: "Cao đẳng Y tế Quảng Ninh", 
                left: 20.950420008629017,
                right: 107.10421600683237,
                href: '',
                type: 'nation',
                icon: yellowIcon,
            },
            {
                name: "Cao đẳng Công nghiệp và Xây dựng", 
                left: 21.04830352128272,
                right: 106.71853183205916,
                href: '',
                type: 'local',
                icon: redIcon,
            },
            {
                name: "Cao đẳng Nông lâm Đông Bắc", 
                left: 21.00433427633726,
                right: 106.85317533311567,
                href: '',
  		type: 'local',
                icon: redIcon,
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
            });
        });

        var myFeatureGroup = L.featureGroup();
        L.geoJSON(Pol_1, { style: poly_0288D1_2000_125, onEachFeature: onEachFeature }).addTo(myFeatureGroup);
        L.geoJSON(Pol_2, { style: poly_817717_2000_120, onEachFeature: onEachFeature }).addTo(myFeatureGroup);
        L.geoJSON(Mul_1, { style: poly_0F9D58_2000_133, onEachFeature: onEachFeature }).addTo(myFeatureGroup);
        L.geoJSON(Mul_2, { style: poly_3949AB_2000_125, onEachFeature: onEachFeature }).addTo(myFeatureGroup);
        L.geoJSON(Mul_3, { style: poly_E65100_2000_133, onEachFeature: onEachFeature }).addTo(myFeatureGroup);
        L.geoJSON(Pol_3, { style: poly_F9A825_2000_112, onEachFeature: onEachFeature }).addTo(myFeatureGroup);
        L.geoJSON(Mul_4, { style: poly_F57C00_2000_128, onEachFeature: onEachFeature }).addTo(myFeatureGroup);
        L.geoJSON(Mul_5, { style: poly_795548_2000_143, onEachFeature: onEachFeature }).addTo(myFeatureGroup);
        L.geoJSON(Mul_6, { style: poly_673AB7_2000_120, onEachFeature: onEachFeature }).addTo(myFeatureGroup);
        L.geoJSON(Mul_7, { style: poly_9C27B0_2000_120, onEachFeature: onEachFeature }).addTo(myFeatureGroup);
        L.geoJSON(Pol_4, { style: poly_C2185B_2000_99, onEachFeature: onEachFeature }).addTo(myFeatureGroup);
        L.geoJSON(Pol_5, { style: poly_0288D1_2000_125, onEachFeature: onEachFeature }).addTo(myFeatureGroup);
        L.geoJSON(Mul_8, { style: poly_FBC02D_2000_181, onEachFeature: onEachFeature }).addTo(myFeatureGroup);

        myFeatureGroup.addTo(custom_layer);

        overlayMaps["Quảng Ninh"] = custom_layer;

        L.control.layers(baseMaps, overlayMaps).addTo(map);

        map.fitBounds(myFeatureGroup.getBounds());
        map.options.minZoom = 9.45;
        map.setMaxBounds(map.getBounds().pad(Math.sqrt(2) / 2));
    };
});
