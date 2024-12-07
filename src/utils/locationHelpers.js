import administrativeTree from '../data/administrative/name_only_tree.json';

export const getLocationInfo = (provinceName, districtName, wardName) => {
  try {
    const province = administrativeTree[provinceName];
    if (!province) return null;

    const district = province.districts[districtName];
    if (!district) return null;

    const ward = district.wards[wardName];
    if (!ward) return null;

    return {
      province: { name: province.name },
      district: { name: district.name },
      ward: { name: ward.name }
    };
  } catch (error) {
    console.error('Error getting location info:', error);
    return null;
  }
};

export const validateLocation = (provinceName, districtName, wardName) => {
  try {
    if (!provinceName) return false;
    
    const province = administrativeTree[provinceName];
    if (!province) return false;

    if (districtName) {
      const district = province.districts[districtName];
      if (!district) return false;

      if (wardName) {
        const ward = district.wards[wardName];
        if (!ward) return false;
      }
    }

    return true;
  } catch (error) {
    console.error('Error validating location:', error);
    return false;
  }
};

export const getProvinceList = () => {
  return Object.keys(administrativeTree);
};

export const getDistrictList = (provinceName) => {
  const province = administrativeTree[provinceName];
  if (!province) return [];
  return Object.keys(province.districts);
};

export const getWardList = (provinceName, districtName) => {
  const province = administrativeTree[provinceName];
  if (!province) return [];
  
  const district = province.districts[districtName];
  if (!district) return [];
  
  return Object.keys(district.wards);
}; 