import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import testImage from '../assets/image/test.jpg';
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

    const StyledDiv = styled.div`
        background-color:#D9D9D9;
        width:250px; height:400px;
        border-radius:10px;
        margin-top:30px;
        padding:15px;
        text-align:center;
    `
    const InfoBox = styled.div`
        padding-top:20px;
    `
    const FlexBox = styled.div`
        display:flex; justify-content:space-between;
        margin-bottom:20px;
    `
    const StyledP = styled.p`
        font-size:${props => props.fontSize || '11px'};
        color:${props => props.color};
        display:inline-block;
    `
    return (
        <StyledDiv>
            <img style={{width:'220px'}} src={testImage}></img>
            <InfoBox>
                <FlexBox>
                    <StyledP fontSize='18px'>주차장 이름</StyledP>
                    <StyledP>운영시간</StyledP>
                </FlexBox>
                <StyledP color='blue'>현재 이용 가능 대수</StyledP><StyledP>/전체 이용 가능 대수</StyledP>
                <StyledP>주차요금정보</StyledP>
            </InfoBox>
        </StyledDiv>
    );
};

export default SearchList;
