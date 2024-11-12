import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

interface KaryawanData {
    id: number,
    nik: number,
    name: string,
    gender: string,
    nik_real: string,
    ktp: string | null,
    email: string | null,
    password: string,
    profile: string | null,
    address: string | null,
    phone: string | null,
    birth_date: Date,
    birth_place: string,
    blood: string | null,
    position: number | null,
    roleId: number,
    comp_kd: string,
    divisi_kd: string,
    subdivisi_kd: string,
    dept_kd: string,
    device_id: string | null,
    active: boolean,
    accessToken: string | null,
}

const AccessToken = (data:any): string => {
    const token = jwt.sign(data, process.env.JWT_SECRET_KEY as string, { expiresIn: "30m"});
    return token;
}

const RefreshToken = (data:any): string => {
    const token = jwt.sign(data, process.env.JWT_REFRESH_KEY as string, { expiresIn: "1d"});
    return token;
}

const ExtractToken = (token: string): KaryawanData | null => {
    const secretKey: string = process.env.JWT_SECRET_KEY as string
    let resData: any;

    jwt.verify(token, secretKey, (error, decoded) => {
        if(error){
            resData = null
        } else {
            resData = decoded
        }
    })

    if(resData){
        const result: KaryawanData = <KaryawanData>(resData);
        return result;
    }

    return null;
}

const ExtractRefreshToken = (token: string): KaryawanData | null => {
    const secretKey: string = process.env.JWT_REFRESH_KEY as string
    let resData: any;

    jwt.verify(token, secretKey, (error, decoded) => {
        if(error){
            resData = null
        } else {
            resData = decoded
        }
    })

    if(resData){
        const result: KaryawanData = <KaryawanData>(resData);
        return result;
    }

    return null;
}

export default { AccessToken, RefreshToken, ExtractToken, ExtractRefreshToken }