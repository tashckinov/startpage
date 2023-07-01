// document.body.style.background = Math.floor(Math.random() * 19) + 1 + '.jpg'
var body = document.getElementsByTagName('body')[0];
body.style.backgroundImage = `url(backgrounds/${Math.floor(Math.random() * 18) + 1}.jpg)`;
function trimString(s) {
    var l = 0, r = s.length - 1;
    while (l < s.length && s[l] == ' ') l++;
    while (r > l && s[r] == ' ') r -= 1;
    return s.substring(l, r + 1);
}

function compareObjects(o1, o2) {
    var k = '';
    for (k in o1) if (o1[k] != o2[k]) return false;
    for (k in o2) if (o1[k] != o2[k]) return false;
    return true;
}

function itemExists(haystack, needle) {
    for (var i = 0; i < haystack.length; i++) if (compareObjects(haystack[i], needle)) return true;
    return false;
}

function searchFor(objects, toSearch) {
    var results = [];
    toSearch = trimString(toSearch); // trim it
    for (var i = 0; i < objects.length; i++) {
        for (var key in objects[i]) {
            if (objects[i][key].indexOf(toSearch) != -1) {
                if (!itemExists(results, objects[i])) results.push(objects[i]);
            }
        }
    }
    return results;
}

const app = {
    data() {
        return {
            weather: -273,
            weatherCodes: {
                "0": "Unknown",
                "113": "Sunny",
                "116": "PartlyCloudy",
                "119": "Cloudy",
                "122": "VeryCloudy",
                "143": "Fog",
                "176": "LightShowers",
                "179": "LightSleetShowers",
                "182": "LightSleet",
                "185": "LightSleet",
                "200": "ThunderyShowers",
                "227": "LightSnow",
                "230": "HeavySnow",
                "248": "Fog",
                "260": "Fog",
                "263": "LightShowers",
                "266": "LightRain",
                "281": "LightSleet",
                "284": "LightSleet",
                "293": "LightRain",
                "296": "LightRain",
                "299": "HeavyShowers",
                "302": "HeavyRain",
                "305": "HeavyShowers",
                "308": "HeavyRain",
                "311": "LightSleet",
                "314": "LightSleet",
                "317": "LightSleet",
                "320": "LightSnow",
                "323": "LightSnowShowers",
                "326": "LightSnowShowers",
                "329": "HeavySnow",
                "332": "HeavySnow",
                "335": "HeavySnowShowers",
                "338": "HeavySnow",
                "350": "LightSleet",
                "353": "LightShowers",
                "356": "HeavyShowers",
                "359": "HeavyRain",
                "362": "LightSleetShowers",
                "365": "LightSleetShowers",
                "368": "LightSnowShowers",
                "371": "HeavySnowShowers",
                "374": "LightSleetShowers",
                "377": "LightSleet",
                "386": "ThunderyShowers",
                "389": "ThunderyHeavyRain",
                "392": "ThunderySnowShowers",
                "395": "HeavySnowShowers",
            },
            weatherSymbols: {
                "Unknown": "✨",
                "Cloudy": "☁️",
                "Fog": "🌫",
                "HeavyRain": "🌧",
                "HeavyShowers": "🌧",
                "HeavySnow": "❄️",
                "HeavySnowShowers": "❄️",
                "LightRain": "🌦",
                "LightShowers": "🌦",
                "LightSleet": "🌧",
                "LightSleetShowers": "🌧",
                "LightSnow": "🌨",
                "LightSnowShowers": "🌨",
                "PartlyCloudy": "⛅️",
                "Sunny": "☀️",
                "ThunderyHeavyRain": "🌩",
                "ThunderyShowers": "⛈",
                "ThunderySnowShowers": "⛈",
                "VeryCloudy": "☁️",
            },
            weather_img: '',
            knows_sites: [
                {
                    url: 'ya.ru',
                    img: "data:image/svg+xml;charset=utf8,%3Csvg%20width='44'%20height='44'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3E%3Cpath%20d='M22%2043a21%2021%200%201%200%200-42%2021%2021%200%200%200%200%2042Z'%20fill='%23FC3F1D'/%3E%3Cpath%20d='M25.3%2035.13h4.57V8.86h-6.66c-6.7%200-10.22%203.44-10.22%208.5%200%204.02%201.93%206.43%205.37%208.88l-5.99%208.88h4.97L24%2025.18l-2.32-1.54c-2.8-1.9-4.17-3.36-4.17-6.54%200-2.79%201.97-4.68%205.72-4.68h2.05v22.7h.01Z'%20fill='%23fff'/%3E%3C/svg%3E",
                    colour: '#ffffff'
                },
                {
                    url: 'vk.com',
                    img: 'data:image/svg+xml,%3Csvg width=\'101\' height=\'100\' viewBox=\'0 0 101 100\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg clip-path=\'url(%23clip0_2_2)\'%3E%3Cpath fill-rule=\'evenodd\' clip-rule=\'evenodd\' d=\'M7.52944 7.02944C0.5 14.0589 0.5 25.3726 0.5 48V52C0.5 74.6274 0.5 85.9411 7.52944 92.9706C14.5589 100 25.8726 100 48.5 100H52.5C75.1274 100 86.4411 100 93.4706 92.9706C100.5 85.9411 100.5 74.6274 100.5 52V48C100.5 25.3726 100.5 14.0589 93.4706 7.02944C86.4411 0 75.1274 0 52.5 0H48.5C25.8726 0 14.5589 0 7.52944 7.02944ZM17.3752 30.4169C17.9168 56.4169 30.9167 72.0418 53.7084 72.0418H55.0003V57.1668C63.3753 58.0001 69.7082 64.1252 72.2498 72.0418H84.0835C80.8335 60.2085 72.2914 53.6668 66.9581 51.1668C72.2914 48.0835 79.7915 40.5835 81.5831 30.4169H70.8328C68.4995 38.6669 61.5836 46.1668 55.0003 46.8751V30.4169H44.2499V59.2501C37.5833 57.5835 29.1668 49.5002 28.7918 30.4169H17.3752Z\' fill=\'white\'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id=\'clip0_2_2\'%3E%3Crect width=\'100\' height=\'100\' fill=\'white\' transform=\'translate(0.5)\'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E',
                    colour: '#008aff'
                },
                {
                    url: 'youtube.com',
                    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEQklEQVR4nO3dW4hVVRzH8WVqaEIPWUGWD13oRnSDbhQSkYGB+RCEBWFBl4fKXsqiiw/1UgZRdAGLCqGbWG81EkF0wcpoDOyGpT2oUFN0cSLKbPrGwr+0Z+agM3utPf+91/l94DwNM/P/n9+eWfvstfbaIYiIiIiIiIiIiIiIiIiITAngUOAU4GLgKuAm4E7gQeAx4HngNeBt4BNgM7Ct8hoCfrHXr4y2u/K1+Npe+b6twKfAB8CbwCvAauAh4F7gNmAZsBg4B5gHzOj8YQEcBlxkb/SjwFp7E74F/qBbRoDvgU3AG8CzwF3AFcDxwPTQJsDBwCI7st+xo7ef/Al8BrwE3Agc5RXEHOB+O3rkf38DLwMnTmUYlwA7K0XIeH/ZuDSt6TBuAPb0KEB6iycnM5sK40ob5GRyXmwijHl2Gin1LMsdyJM1C5G9fgBm5wpjdgc/P5T7VwIs9O6kEK/mCuRu704KsT1XIM95d1KQuTkCed+7i4IsyBGILo/kc2uOM6x/MxbU755ODeQE7w4K81ZqIAu8OyjMttRArnZu4FLgc8rxT5xDSgnkDs/qw94aZtjs44+Uof5cCbDKs/Iwfmr48QIu/1+WEsgznpWH3jWdZIsUuuq6lEDWeVYe9l9bHF++oHvuSQkkLsVxEw5c30zg9h7LgdrsiZRA4jomN2Hide4bX+JZTNu9nhLIN56Vh8nXe4YtR2qzD1MCiSv/3IT6dS+2lYpttCUlkDj16CYkqIwvu2iXoZSmfu5qIPsAh7dsfNkd6gKGPSsPGQFnAe/RDnPqNhFX4BURyJjx5TvPvoCjQx3eC+NCs4vEPceX0+oWXnogw06tnV63cP3LasZxdQMpaVA/u0WD+pF1m9BpbzMO6eSKk1DmB8OR2veN6NJJI4ZTjrItOAplXlzcmRLIx56Vh4nXObdll0f2ZzAlkPWelYeJjxO/0R3rUwKJt/u6CQeewv2S7lnT2TunQu+aTu74IodHUgJ5wLPyMH6ceKqAZUArUgK5xbPyMHqh3E+UYWnqpWpPi4CvKcu5KYGc6V19gerfRWXLaySfXbXDqITye8aC+t2mHIEMendRkHU5Alnj3UVBHs4RyArvLgpyc45ALvfuoiALcwQSPyFrW6Z08T08IjkQC+WjDAX1u41ZwrBAlnp3U4BrcwYy3bZ6lXoGs2/1Bxzbh9vA5hAnz07NGsaYa1uutyh0TLzV7sJGwqiEcgzwrnenHbAx7n7daBiVUKYB19i+7DLaV8D1wEFTEkaPcM6zmcUB2/S+nz6zjFjPA/YenN/45smTBcyy9VHxyQcrgRes4M0dPSkYstoHrJeV1lvscVboOrsVYD5wAbAk7mwALAfus608VtsTFeISpA12a/bWymMndox5JEV1jn3PmK/t6PG4ig32s9fa71plv3u51bLEapuftFGMiIiIiIiIiIiIiIiIiEio4z+YVM1nFEiF0QAAAABJRU5ErkJggg==',
                    colour: '#ea0c00'
                },
                {
                    url: 'kinopoisk.ru',
                    img: 'data:image/svg+xml,%3Csvg width=\'164\' height=\'36\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath fill-rule=\'evenodd\' clip-rule=\'evenodd\' d=\'M58.859 18c0-5.889 2.954-10.6 8.281-10.6 5.328 0 8.281 4.711 8.281 10.6 0 5.89-2.954 10.6-8.28 10.6-5.328 0-8.282-4.71-8.282-10.6Zm8.281 7.66c2.072 0 2.954-3.534 2.954-7.652 0-4.12-.889-7.652-2.954-7.652-2.065 0-2.954 3.533-2.954 7.652-.007 4.118.882 7.652 2.954 7.652ZM3.843 7.7v5.596h.294L7.98 7.7h5.32l-7.098 6.474.294.293L19.51 7.693v4.711L7.973 16.523v.292l11.537-1.028v4.419L7.973 19.178v.293l11.537 4.118v4.712L6.496 21.526l-.294.293 7.098 6.474H7.98l-3.843-5.596h-.294v5.596H0V7.686h3.843V7.7Zm19.23 0H28.1l-.294 12.363h.294L34.015 7.7h4.438v20.608h-5.026l.294-12.364h-.294L27.51 28.309h-4.438V7.7Zm23.955 0h-5.026v20.608h5.026v-9.13h4.137v9.13h5.026V7.7h-5.026v7.952h-4.137V7.7Zm45.25 0h-14.19v20.608h5.027V11.233h4.137v17.075h5.026V7.7Zm2.66 10.3c0-5.889 2.954-10.6 8.282-10.6 5.32 0 8.281 4.711 8.281 10.6 0 5.89-2.954 10.6-8.281 10.6-5.32 0-8.282-4.71-8.282-10.6Zm8.282 7.66c2.072 0 2.954-3.534 2.954-7.652 0-4.12-.889-7.652-2.954-7.652-2.072 0-2.954 3.533-2.954 7.652 0 4.118.882 7.652 2.954 7.652ZM119.187 7.7h-5.026v20.608h4.438l5.916-12.364h.294l-.294 12.364h5.026V7.7h-4.438l-5.916 12.363h-.294l.294-12.363Zm23.669 13.541 4.732.585c-.889 4.12-2.954 6.774-7.364 6.774-5.32 0-8.016-4.71-8.016-10.6 0-5.889 2.689-10.6 8.016-10.6 4.317 0 6.475 2.649 7.364 6.475l-4.732 1.177c-.294-2.063-1.155-4.71-2.632-4.71-1.771 0-2.689 3.533-2.689 7.651 0 4.09.918 7.652 2.689 7.652 1.449.015 2.33-2.341 2.632-4.404Zm11.83-13.54h-4.732v20.607h4.732v-9.13h.294l3.549 9.13H164l-5.177-10.6L163.849 7.7h-5.026l-3.843 9.13h-.294V7.7Z\' fill=\'%23fff\'/%3E%3C/svg%3E',
                    colour: '#000000',
                    width: '120px'
                }
            ],
            tablo: ['ya.ru', 'vk.com', 'youtube.com', 'kinopoisk.ru', 'stusy.jetbrains.space', 'photos.google.com', 'openedu.ru', 'calendar.google.com'],
            search_line: ''
        }
    },
    methods: {
        getImage(type, site) {
            let search = searchFor(this.knows_sites, site)
            if (!search[0]) {
                return
            } else search = search[0]
            return search[type]
        },
        search() {
            let url = 'https://yandex.ru/search/?text=' + this.search_line
            window.open(url, '_blank').focus();
            this.search_line = ''
        }
    },
    mounted() {
        // console.log(searchFor(this.knows_sites, 'ya.ru'))
        let city = "moscow";
        fetch(`https://wttr.in/${city}?format=j1`).then((response) => {
            return response.json();
        }).then((data) => {
            console.log(data.current_condition[0])
            this.weather = data.current_condition[0].temp_C
            this.weather_img = this.weatherSymbols[this.weatherCodes[data.current_condition[0].weatherCode]]
        }).catch((err) => {
            console.error("Невозможно отправить запрос", err);
        });
    }
}

Vue.createApp(app).mount('#app')