import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import SearchBox from './SearchBox';
import LocationItem from './LocationItem';

const SearchList = () => {
    const { searchList, keyword } = useSelector((state) => state); // 상태에서 searchList와 keyword 가져옴
    const [filteredList, setFilteredList] = useState([]);

    useEffect(() => {
        if (Array.isArray(searchList)) { // searchList가 배열인지 확인
            if (keyword !== "") {
                const list = searchList.filter((item) => item.name.includes(keyword)); // searchList로 필터링
                setFilteredList(list);
            } else {
                setFilteredList(searchList); // 키워드가 없으면 전체 리스트 사용
            }
        }
    }, [keyword, searchList]); // keyword와 searchList가 변경될 때마다 실행

    return (
        <div>
            

        </div>
    );
};

export default SearchList;
