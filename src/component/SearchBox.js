import React, { useState } from 'react';
import axios from 'axios';
import NaverMap from './NaverMap'; // NaverMap 컴포넌트를 import 합니다.

const SearchBox = () => {
  const [location, setLocation] = useState('');
  const [results, setResults] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null); // 선택한 위치를 저장할 상태 추가

  const handleSearch = async () => {
    const clientId = 'azv4goe6bs'; // Naver API 클라이언트 아이디
    const clientSecret = 'EdqASddN1I4S8m6zOptNI5Cwo5gpGxeYDvgc0snO'; // Naver API 클라이언트 시크릿
    const apiUrl = `https://openapi.naver.com/v1/search/local.xml?query=${encodeURIComponent(location)}`;

    try {
      const response = await axios.get(apiUrl, {
        headers: {
          'X-Naver-Client-Id': clientId,
          'X-Naver-Client-Secret': clientSecret,
        },
      });
      
      // XML 형식을 JSON으로 변환하기 위해 DOMParser 사용
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(response.data, 'text/xml');
      const items = xmlDoc.getElementsByTagName('item');
      const resultsArray = Array.from(items).map(item => ({
        title: item.getElementsByTagName('title')[0].textContent,
        address: item.getElementsByTagName('address')[0].textContent,
        lat: parseFloat(item.getElementsByTagName('mapy')[0].textContent), // 위도
        lng: parseFloat(item.getElementsByTagName('mapx')[0].textContent), // 경도
      }));

      setResults(resultsArray);
    } catch (error) {
      console.error('Error fetching data from Naver API:', error);
    }
  };

  const handleSelectLocation = (lat, lng) => {
    setSelectedLocation({ lat, lng }); // 선택한 위치를 상태로 저장
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder="위치를 입력하세요" 
        value={location} 
        onChange={(e) => setLocation(e.target.value)} 
      />
      <button onClick={handleSearch}>검색</button>

      <div>
        {results.map((result, index) => (
          <div key={index} onClick={() => handleSelectLocation(result.lat, result.lng)} style={{ cursor: 'pointer' }}>
            <h4>{result.title}</h4>
            <p>{result.address}</p>
          </div>
        ))}
      </div>

      {/* 선택된 위치에 따라 NaverMap을 표시 */}
      <NaverMap location={selectedLocation} />
    </div>
  );
};

export default SearchBox;
