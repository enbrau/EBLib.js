/**
 * Convert geo loation from wgs84(GPS) to gcj02(AMap)
 * @param {object} geo location { lng: , lat:  }
 * @returns gcj02 location
 * @since 0.0.1
 */
export function wgs84ToGcj02({ lng, lat }) {
  if (lng < 72.004 || lng > 137.8347 || lat < 0.8293 || lat > 55.8271) {
    return {
      lng: lng,
      lat: lat,
    }
  } else {
    const PI = 3.14159265358979324
    const a  = 6378245.0
    const ee = 0.00669342162296594323

    let lat_offset = ((x, y) => {
      let num = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
      num += (20.0 * Math.sin(6.0 * x * PI) + 20.0 * Math.sin(2.0 * x * PI)) * 2.0 / 3.0;
      num += (20.0 * Math.sin(y * PI) + 40.0 * Math.sin(y / 3.0 * PI)) * 2.0 / 3.0;
      num += (160.0 * Math.sin(y / 12.0 * PI) + 320 * Math.sin(y * PI / 30.0)) * 2.0 / 3.0;
      return num;
    }) (lng - 105.0, lat - 35.0)
    
    let lng_offset = ((x, y) => {
      let num = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
      num += (20.0 * Math.sin(6.0 * x * PI) + 20.0 * Math.sin(2.0 * x * PI)) * 2.0 / 3.0;
      num += (20.0 * Math.sin(x * PI) + 40.0 * Math.sin(x / 3.0 * PI)) * 2.0 / 3.0;
      num += (150.0 * Math.sin(x / 12.0 * PI) + 300.0 * Math.sin(x / 30.0 * PI)) * 2.0 / 3.0;
      return num;
    }) (lng - 105.0, lat - 35.0)
    
    const radLat = lat / 180.0 * PI
    let magic = Math.sin(radLat)
    magic = 1 - ee * magic * magic
    const sqrtMagic = Math.sqrt(magic)
    lat_offset = (lat_offset * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * PI);
    lng_offset = (lng_offset * 180.0) / (a / sqrtMagic * Math.cos(radLat) * PI);
    
    return {
      lng: lng + lng_offset,
      lat: lat + lat_offset,
    }
  }
}

/**
 * Convert geo loation from wgs84(GPS) to bd09ll(BMap)
 * @param {object} geo location { lng: , lat:  }
 * @returns bd09ll location
 * @since 0.0.1
 */
export function wgs84ToBd09ll({ lng, lat }) {
  const xPI = 3.14159265358979324 * 3000.0 / 180.0
  const PI = 3.1415926535897932384626
  const a = 6378245.0
  const ee = 0.00669342162296594323

  let dlat = transformlat(lng - 105.0, lat - 35.0)
  let dlng = transformlng(lng - 105.0, lat - 35.0)
  let radlat = lat / 180.0 * PI
  let magic = Math.sin(radlat)
  magic = 1 - ee * magic * magic
  let sqrtmagic = Math.sqrt(magic)
  dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI)
  dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI)
  let mglat = lat + dlat
  let mglng = lng + dlng

  let z = Math.sqrt(mglng * mglng + mglat * mglat) + 0.00002 * Math.sin(mglat * xPI)
  let theta = Math.atan2(mglat, mglng) + 0.000003 * Math.cos(mglng * xPI)
  let bdlng = z * Math.cos(theta) + 0.0065
  let bdlat = z * Math.sin(theta) + 0.006
  return {
    lng: bdlng,
    lat: bdlat
  }
}
