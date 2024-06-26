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
            {
                name: "Khu căn cứ cách mạng Hải Chi - Đình làng Dạ",
                left: 21.320593052763357,
                right: 107.13797183650449,
                href: 'https://tinhdoanquangninh.vn/khu-can-cu-cach-mang-hai-chi-dinh-lang-da/',
                type: 'local',
                icon: redIcon,
            },
            {
                name: "Ngã tư đường lên mỏ Đèo Nai (Nơi mở đầu cuộc tổng bãi công của ba vạn thợ mỏ ngày 12/11/1936)",
                left: 21.017082973508277,
                right: 107.30800561248184,
                href: 'https://tinhdoanquangninh.vn/nga-tu-duong-len-mo-deo-nai/',
                type: 'local',
                icon: yellowIcon,
            },
            {
                name: "Cầu Poóc Tính 1 - Trận địa pháo Cao xạ - Hầm chỉ huy của xí nghiệp than Cửa Ông",
                left: 21.026260395382067,
                right: 107.37187615201181,
                href: 'https://tinhdoanquangninh.vn/cau-pooc-tich-1-tran-dia-phao-cao-xa-ham-chi-huy-cua-xi-nghiep-tuyen-than-cua-ong/',
                type: 'local',
                icon: yellowIcon,
            },
            {
                name: "Địa điểm lưu niệm Bác Hồ về thăm mỏ than Đèo Nai ngày 30/3/1959",
                left: 21.01354704082289,
                right: 107.28902013531457,
                href: 'https://tinhdoanquangninh.vn/dia-diem-luu-niem-bac-ho-ve-tham-mo-than-deo-nai-ngay-30-3-1959/',
                type: 'local',
                icon: yellowIcon,
            },
            {
                name: "Khu lưu niệm Chủ tịch Hồ Chí Minh trên đảo Cô Tô",
                left: 20.973308880070505,
                right: 107.76328330096015,
                href: 'https://tinhdoanquangninh.vn/khu-luu-niem-chu-tich-ho-chi-minh-tren-dao-co-to/',
                type: 'nation',
                icon: yellowIcon,
            },
            {
                name: "Tượng đài Anh hùng Liệt sĩ Hà Quang Vóc",
                left: 21.351822080502437,
                right: 107.60049671136883,
                href: 'https://tinhdoanquangninh.vn/tuong-dai-ha-quang-voc-dam-ha/',
                type: 'local',
                icon: redIcon,
            },
            {
                name: "Núi Hứa",
                left: 21.334711648009524,
                right: 107.55254206559084,
                href: 'https://tinhdoanquangninh.vn/di-tich-khao-co-lich-su-danh-thang-nui-hua/',
                type: 'local',
                icon: redIcon,
            },
            {
                name: "Cụm di tích lịch sử văn hóa xã Yên Thọ",
                left: 21.04567441961115,
                right: 106.61867369870015,
                href: 'https://tinhdoanquangninh.vn/cum-di-tich-lich-su-van-hoa-xa-yen-tho/',
                type: 'local',
                icon: redIcon,
            },
            {
                name: "Nhà bia Yên Dưỡng",
                left: 21.043793168286136,
                right: 106.6923707266633,
                href: 'https://tinhdoanquangninh.vn/nha-bia-yen-duong-hong-thai-dong/',
                type: 'local',
                icon: redIcon,
            },
            {
                name: "Lưu niệm Bác Hồ xã Hồng Thái Tây",
                left: 21.048488522381835,
                right: 106.6688560606629,
                href: 'https://tinhdoanquangninh.vn/luu-niem-bac-ho-xa-hong-thai-tay/',
                type: 'local',
                icon: redIcon,
            },
            {
                name: "Địa điểm lịch sử Trung tâm chiến khu Đông Triều - Chùa Bắc Mã",
                left: 21.12566045409731,
                right: 106.48270335284258,
                href: 'https://tinhdoanquangninh.vn/dia-diem-lich-su-trung-tam-chien-khu-dong-trieu/',
                type: 'local',
                icon: yellowIcon,
            },
            {
                name: "Nơi thành lập đệ tứ chiến khu Đông Triều - Đình chùa Hổ Lao",
                left: 21.115589790744604,
                right: 106.51795990800345,
                href: 'https://tinhdoanquangninh.vn/dinh-chua-ho-lao-noi-thanh-lap-de-tu-chien-khu-dong-trieu/',
                type: 'local',
                icon: yellowIcon,
            },
            {
                name: "Di tích mỏ than Mạo Khê - Nơi thành lập Chi bộ Đảng Cộng sản đầu tiên ở Quảng Ninh",
                left: 21.070949627859008,
                right: 106.59683239248761,
                href: 'https://tinhdoanquangninh.vn/di-tich-lich-su-than-mao-khe/',
                type: 'local',
                icon: yellowIcon,
            },
            {
                name: "Trận địa pháo cao xạ 12 ly 7",
                left: 21.077911041449486,
                right: 106.5419125039142,
                href: 'https://tinhdoanquangninh.vn/tran-dia-phao-cao-xa-12-ly-7/',
                type: 'local',
                icon: blueIcon,
            },
            {
                name: "Khu lưu niệm Bác Hồ trên đảo Tuần Châu",
                left: 20.93101857548878,
                right: 106.98557641293512,
                href: 'https://tinhdoanquangninh.vn/khu-luu-niem-bac-ho-tren-dao-tuan-chau/',
                type: 'local',
                icon: redIcon,
            },

            {
                name: "Lưu niệm sự kiện thành lập Binh đoàn than",
                left:  20.957923863430526,
                right: 107.06756749379532,
                href: 'https://tinhdoanquangninh.vn/luu-niem-su-kien-thanh-lap-binh-doan-than/',
                type: 'local',
                icon: redIcon,
            },
            {
                name: "Trung tâm Điện chính Bưu điện Quảng Ninh (1964-1975) trên núi Bài Thơ",
                left: 20.947755793235302,
                right: 107.0782737891011,
                href: 'https://tinhdoanquangninh.vn/trung-tam-dien-chinh-buu-dien-quang-ninh-1964-1975-tren-nui-bai-tho/',
                type: 'local',
                icon: yellowIcon,
            },
            {
                name: "Tượng đài Nguyễn Văn Thuộc",
                left: 20.966047472708603,
                right: 107.10806910505939,
                href: 'https://tinhdoanquangninh.vn/tuong-dai-nguyen-van-thuoc/',
                type: 'local',
                icon: blueIcon,
            },
            {
                name: "Tượng đài Vũ Văn Hiếu",
                left: 20.952562624700516,
                right: 107.09026600176891,
                href: 'https://tinhdoanquangninh.vn/tuong-dai-vu-van-hieu-ha-long/',
                type: 'local',
                icon: blueIcon,
            },
            {
                name: "Di tích lưu niệm Bác Hồ sự kiện năm 1965",
                left: 20.95898844705714,
                right: 107.09961134231463,
                href: 'https://tinhdoanquangninh.vn/di-tich-luu-niem-bac-ho-ve-tham-truong-cap-3-hon-gai-nam-1965/',
                type: 'local',
                icon: blueIcon,
            },
            {
                name: "Đồi Trần Phú",
                left: 21.539445444303585,
                right: 108.0152885469715,
                href: 'https://tinhdoanquangninh.vn/di-tich-lich-su-doi-tran-phu/',
                type: 'local',
                icon: redIcon,
            },
            {
                name: "Đồn Biên phòng 209 Pò Hèn",
                left: 21.638566440224974,
                right: 107.76002237476443,
                href: 'https://tinhdoanquangninh.vn/don-bien-phong-209-po-hen/',
                type: 'local',
                icon: redIcon,
            },
            {
                name: "Lưu niệm Bác Hồ tại phường Trà Cổ Năm 1961",
                left: 21.485919698185963,
                right: 108.05697928557224,
                href: 'https://tinhdoanquangninh.vn/luu-niem-bac-ho-tai-phuong-tra-co-thanh-pho-mong-cai-nam-1961/',
                type: 'local',
                icon: redIcon,
            },
            {
                name: "Địa điểm thành lập Chi bộ Đảng Cộng sản Việt Nam đầu tiên của thành phố Móng Cái năm 1946",  
                left: 21.524631815981174,
                right: 107.96649587922752,
                href: 'https://tinhdoanquangninh.vn/dia-diem-thanh-lap-chi-bo-dang-cong-san-viet-nam-dau-tien-cua-thanh-pho-mong-cai/',
                type: 'local',
                icon: redIcon,
            },
            {
                name: "Sự kiện Bác Hồ qua Trạm Hải quan cửa khẩu Bắc Luân thăm nhân dân Đông Hưng, Trung Quốc năm 1960",
                left: 21.536762635801,
                right: 107.96938694559508,
                href: 'https://tinhdoanquangninh.vn/dia-diem-ghi-dau-su-kien-bac-ho-qua-tram-hai-quan-cua-khau-bac-luan-tham-nhan-dan-dong-hung-trung-quoc-nam-1960/',
                type: 'local',
                icon: blueIcon,
            },
            {
                name: "Đồi Thông Yên Lập - Nơi Bác dừng chân năm 1965",
                left: 21.01172509807486,
                right: 106.86610592734257,
                href: 'https://tinhdoanquangninh.vn/doi-thong-yen-lap-noi-bac-ho-dung-chan-nam-1965/',
                type: 'local',
                icon: blueIcon,
            },
            {
                name: "Khe Giao - Nơi thành lập chi bộ Đảng Cộng sản Việt Nam đầu tiên huyện Tiên Yên",
                left: 21.385819247197094,
                right: 107.32070162834916,
                href: 'https://tinhdoanquangninh.vn/khe-giao-noi-thanh-lap-chi-bo-dang-dau-tien-huyen-tien-yen/',
                type: 'local',
                icon: redIcon,
            },
            {
                name: "Di tích lưu niệm Bác Hồ năm 1961",
                left: 21.33084758801346,
                right: 107.4158635902562,
                href: 'https://tinhdoanquangninh.vn/di-tich-luu-niem-bac-ho-nam-1961/',
                type: 'local',
                icon: blueIcon,
            },
            {
                name: "Lưu niệm sự kiện Bác Hồ về thăm Uông Bí năm 1965",
                left: 21.041484745901542,
                right: 106.78707202903169,
                href: 'https://tinhdoanquangninh.vn/luu-niem-su-kien-bac-ho-ve-tham-uong-bi-nam-1965/',
                type: 'local',
                icon: redIcon,
            },
            {
                name: "Di tích Lưu niệm Bác Hồ trên đảo Ngọc Vừng",
                left: 20.813084784619647,
                right: 107.37033232352007,
                href: 'https://tinhdoanquangninh.vn/di-tich-luu-niem-bac-ho-tren-dao-ngoc-vung/',
                type: 'local',
                icon: blueIcon,
            },
            {
                name: "Căn cứ kháng chiến Khe Mai",
                left: 21.113752243424997,
                right: 107.42302421858291,
                href: 'https://tinhdoanquangninh.vn/can-cu-khang-chien-khe-mai/',
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
