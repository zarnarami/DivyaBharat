// src/data/stateImages.js — Authentic State & UT Image and Icon Mapping for DivyaBharat
// All 28 States + 8 Union Territories

// 28 Indian States
import andhraPradesh from '../assets/states/andhra-pradesh.jpg';
import arunachalPradesh from '../assets/states/arunachal-pradesh.jpg';
import assam from '../assets/states/assam.jpg';
import bihar from '../assets/states/bihar.jpg';
import chhattisgarh from '../assets/states/chhattisgarh.jpg';
import goa from '../assets/states/goa.jpg';
import gujarat from '../assets/states/gujarat.jpg';
import haryana from '../assets/states/haryana.jpg';
import himachalPradesh from '../assets/states/himachal-pradesh.jpg';
import jharkhand from '../assets/states/jharkhand.jpg';
import karnataka from '../assets/states/karnataka.jpg';
import kerala from '../assets/states/kerala.jpg';
import madhyaPradesh from '../assets/states/madhya-pradesh.jpg';
import maharashtra from '../assets/states/maharashtra.jpg';
import manipur from '../assets/states/manipur.jpg';
import meghalaya from '../assets/states/meghalaya.jpg';
import mizoram from '../assets/states/mizoram.jpg';
import nagaland from '../assets/states/nagaland.jpg';
import odisha from '../assets/states/odisha.jpg';
import punjab from '../assets/states/punjab.jpg';
import rajasthan from '../assets/states/rajasthan.jpg';
import sikkim from '../assets/states/sikkim.jpg';
import tamilNadu from '../assets/states/tamil-nadu.jpg';
import telangana from '../assets/states/telangana.jpg';
import tripura from '../assets/states/tripura.jpg';
import uttarPradesh from '../assets/states/uttar-pradesh.jpg';
import uttarakhand from '../assets/states/uttarakhand.jpg';
import westBengal from '../assets/states/west-bengal.jpg';

// 8 Union Territories
import andamanAndNicobar from '../assets/states/andaman-and-nicobar.jpg';
import chandigarh from '../assets/states/chandigarh.jpg';
import dadraAndNagarHaveli from '../assets/states/dadra-and-nagar-haveli.jpg';
import delhi from '../assets/states/delhi.jpg';
import jammuAndKashmir from '../assets/jammu1_katra.png';
import ladakh from '../assets/states/ladakh.jpg';
import lakshadweep from '../assets/states/lakshadweep.jpg';
import puducherry from '../assets/states/puducherry.jpg';

// Complete Mapping: State Name -> Authentic Visual Asset
export const STATE_IMAGES = {
  // 28 States
  'Andhra Pradesh': andhraPradesh,
  'Arunachal Pradesh': arunachalPradesh,
  'Assam': assam,
  'Bihar': bihar,
  'Chhattisgarh': chhattisgarh,
  'Goa': goa,
  'Gujarat': gujarat,
  'Haryana': haryana,
  'Himachal Pradesh': himachalPradesh,
  'Jharkhand': jharkhand,
  'Karnataka': karnataka,
  'Kerala': kerala,
  'Madhya Pradesh': madhyaPradesh,
  'Maharashtra': maharashtra,
  'Manipur': manipur,
  'Meghalaya': meghalaya,
  'Mizoram': mizoram,
  'Nagaland': nagaland,
  'Odisha': odisha,
  'Punjab': punjab,
  'Rajasthan': rajasthan,
  'Sikkim': sikkim,
  'Tamil Nadu': tamilNadu,
  'Telangana': telangana,
  'Tripura': tripura,
  'Uttar Pradesh': uttarPradesh,
  'Uttarakhand': uttarakhand,
  'West Bengal': westBengal,

  // 8 Union Territories
  'Andaman and Nicobar Islands': andamanAndNicobar,
  'Chandigarh': chandigarh,
  'Dadra and Nagar Haveli and Daman and Diu': dadraAndNagarHaveli,
  'Delhi': delhi,
  'Jammu and Kashmir': jammuAndKashmir,
  'Ladakh': ladakh,
  'Lakshadweep': lakshadweep,
  'Puducherry': puducherry,
};

// Unique cultural & architectural icon per State / Union Territory
export const STATE_ICONS = {
  // 28 States
  'Andhra Pradesh': '🏛️',
  'Arunachal Pradesh': '🏔️',
  'Assam': '🦏',
  'Bihar': '🪷',
  'Chhattisgarh': '🏺',
  'Goa': '⛪',
  'Gujarat': '🦁',
  'Haryana': '🏹',
  'Himachal Pradesh': '🏔️',
  'Jharkhand': '🌲',
  'Karnataka': '👑',
  'Kerala': '🌴',
  'Madhya Pradesh': '🛕',
  'Maharashtra': '🏰',
  'Manipur': '🛶',
  'Meghalaya': '🌧️',
  'Mizoram': '🎋',
  'Nagaland': '🦅',
  'Odisha': '☸️',
  'Punjab': '🌾',
  'Rajasthan': '🐪',
  'Sikkim': '🌸',
  'Tamil Nadu': '🛕',
  'Telangana': '💎',
  'Tripura': '🪶',
  'Uttar Pradesh': '🕉️',
  'Uttarakhand': '⛰️',
  'West Bengal': '🐅',

  // 8 Union Territories
  'Andaman and Nicobar Islands': '🏝️',
  'Chandigarh': '🌹',
  'Dadra and Nagar Haveli and Daman and Diu': '🌊',
  'Delhi': '🏛️',
  'Jammu and Kashmir': '❄️',
  'Ladakh': '🏔️',
  'Lakshadweep': '🐚',
  'Puducherry': '🧘',
};

export const getStateImage = (stateName) => STATE_IMAGES[stateName] || null;
export const getStateIcon = (stateName) => STATE_ICONS[stateName] || '🛕';
