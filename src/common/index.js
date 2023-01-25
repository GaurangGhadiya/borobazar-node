
 const apiResponse = async (status, message, data, error) => {
    return {
        status,
        message,
        data: await (data),
        error: Object.keys(error)?.length == 0 ? {} : await (error)
    }
}

 const userStatus = {
    user: "user",
    admin: "admin",
    upload: "upload"
}

const getArea = (current, RadiusInKm) => {
    const differenceForLat = RadiusInKm / 111.12
    const curve = Math.abs(Math.cos((2 * Math.PI * parseFloat(current.lat)) / 360.0))
    const differenceForLong = RadiusInKm / (curve * 111.12)
    const minLat = parseFloat(current.lat) - differenceForLat
    const maxLat = parseFloat(current.lat) + differenceForLat
    const minlon = parseFloat(current.long) - differenceForLong
    const maxlon = parseFloat(current.long) + differenceForLong;
    return {
        min: {
            lat: minLat,
            long: minlon,
        },
        max: {
            lat: maxLat,
            long: maxlon,
        },
    };
}

module.exports = { apiResponse,userStatus,getArea }
