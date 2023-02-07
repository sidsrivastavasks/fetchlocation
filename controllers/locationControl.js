const haversine = require("haversine-distance");
const request = require("request");

exports.getLocationInfo = async (req, res) => {
    //fetching the array
    const { user, cities } = req.body;

    var arr = [];

    var citiesLatLon = [];

    for (var i = 0; i < cities.length; i++) {
        var x = getLatLon(cities[0], async function (err, data) {
            if (err) {
                console.log("error", err);
            } else {
                var ans = await data;
                return ans;
            }
        });

        citiesLatLon.push(x);
    }

    var mnDistance = 9999,
        mxDistance = 0;

    var distDict = {};

    latLonList.forEach((ele, index) => {
        //using index as key to store the distance between the user location and shop location
        distDict[index] = haversine(userLatLon, ele);

        //maintaining two variables for min and max distance
        mnDistance = Math.min(distDict[index], mnDistance);
        mxDistance = Math.max(distDict[index], mxDistance);
    });

    // declaration of varible for storing the lat and long of closest and farthest shop from user
    var closest, farthest;

    // traversing the dictionary and checking which index value match with min Distance and max Distance
    for (var key in distDict) {
        if (distDict[key] == mnDistance) {
            closest = latLonList[key];
        }
        if (distDict[key] == mxDistance) {
            farthest = latLonList[key];
        }
    }

    // final json containing the answers
    let ans = {
        minDist: mnDistance,
        maxDist: mxDistance,
        closeLatLon: closest,
        farLatLon: farthest,
    };

    res.send(ans);
};

async function getLatLon(cityName, callback) {
    API_KEY = "ksndbvhjbkxaieu9uoe87926";

    request.get(
        {
            url: "https://api.api-ninjas.com/v1/geocoding?city=" + cityName,
            headers: {
                "X-Api-Key": API_KEY,
            },
        },
        async function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var ans = await body;
                result = JSON.stringify(JSON.parse(body));

                callback(null, result);
            } else {
                callback(error, null);
            }
        }
    );
}
