import PakistanFlagImage from '../assets/Pakistan.png';
import IndianFlagImage from '../assets/India.png'
import OmanFlagImage from '../assets/Oman.png'
import UaeFlagImage from '../assets/UAE.png'

export const Languages = ["en", 'ru', 'fr']

// I have made Countries enum and images list separately because enum is getting used at multiple places, don't want to take images in every import
export enum Countries {
    UAE = "UAE",
    India = "India",
    Pakistan = "Pakistan",
    Oman = "Oman"
}

export enum APIStatus {
    Error = "error",
    Success = "success",
}

export const CountryImages: any = {
    India: IndianFlagImage,
    Pakistan: PakistanFlagImage,
    Oman: OmanFlagImage,
    UAE: UaeFlagImage
}