import React, { useEffect, useRef, useState } from 'react';

/* global naver */

const NaverMap = ({ location }) => {
  const mapElement = useRef(null); // map이 표시될 div를 참조
  const [currentPosition, setCurrentPosition] = useState(null);
  const mapRef = useRef(null); // 지도 객체 저장을 위한 ref
  const myMarker = 'path/to/your/marker/icon.png'; // 마커 아이콘 경로
  const [isMapLoading, setIsMapLoading] = useState(true); // 로딩 상태

  useEffect(() => {
    const { naver } = window;

    // 브라우저에서 현재 위치를 가져옴
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting location", error);
          // 위치 정보에 실패했을 경우 기본 좌표 설정 (서울)
          setCurrentPosition({ lat: 37.5665, lng: 126.9780 });
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      setCurrentPosition({ lat: 37.5665, lng: 126.9780 }); // Geolocation 지원하지 않을 때 서울 좌표
    }
  }, []);

  useEffect(() => {
    const { naver } = window;

    if (!mapRef.current) {
      const initialPosition = currentPosition || { lat: 37.5665, lng: 126.9780 }; // 기본 좌표
      const mapOptions = {
        center: new naver.maps.LatLng(initialPosition.lat, initialPosition.lng),
        zoom: 15,
      };

      // mapElement.current에 지도를 렌더링
      mapRef.current = new naver.maps.Map(mapElement.current, mapOptions);
    }

    // 검색된 위치가 있는 경우
    if (location) {
      const searchLatLng = new naver.maps.LatLng(location.lat, location.lng);
      mapRef.current.setCenter(searchLatLng); // 지도 중앙을 검색된 위치로 이동

      // 검색된 위치 마커 생성
      new naver.maps.Marker({
        position: searchLatLng,
        map: mapRef.current,
        title: '검색된 위치',
        icon: {
          url: `${myMarker}`,
          size: new naver.maps.Size(43, 43),
          scaledSize: new naver.maps.Size(43, 43),
        },
        zIndex: 999,
      });
    } else if (currentPosition) {
      // 현재 위치가 있을 경우, 지도를 현재 위치로 설정
      const currentLatLng = new naver.maps.LatLng(currentPosition.lat, currentPosition.lng);
      mapRef.current.setCenter(currentLatLng);
      new naver.maps.Marker({
        position: currentLatLng,
        map: mapRef.current,
        title: '현재 위치',
        icon: {
          url: `${myMarker}`,
          size: new naver.maps.Size(43, 43),
          scaledSize: new naver.maps.Size(43, 43),
        },
        zIndex: 999,
      });
    }

    setIsMapLoading(false); // 지도가 로딩되었음을 표시
  }, [currentPosition, location, myMarker]);

  return (
    <div>
      <div
        ref={mapElement}
        style={{ width: '100%', height: '400px' }}
      />
      {isMapLoading && <p>지도를 불러오는 중입니다...</p>}
    </div>
  );
};

export default NaverMap;
