import {className} from "postcss-selector-parser";
import React, {useEffect} from 'react';
import Checkbox, {CheckBoxHandlerProps} from "./checkbox.tsx";


// 체크박스 그룹 옵션
export interface GroupCheckBoxOption{
    label:string | number;
    value: number;
    // checked:boolean;
}

interface GroupCheckBoxProps {
    direction?:"row"|"col"; // 방향
    options:GroupCheckBoxOption[]; // 체크박스 그룹 옵션
    onChange:(value:number[])=>void;// 체크박스 그룹 변경 핸들러
    label?:string; //  라벨
    className?:string;
    isMultiSelect?:boolean; // 다중 선택 가능 여부,
    initCheckedList?:number[]; // 초기 체크된 리스트

}


// 체크박스 그룹 컴포넌트
function GroupCheckBox({
                           direction="col",
                            options,
                            onChange,
                            label,
                           isMultiSelect=true, // 기본 다중 선택 가능,
                            initCheckedList=[],

                       }:GroupCheckBoxProps) {



    // 체크박스 그룹 상태
    const [checkedList,setCheckedList] = React.useState<number[]>([])

    // 체크박스 그룹 핸들러
    function groupCheckHandler(value:CheckBoxHandlerProps){


        // 다중 선택이 아닌 경우, 체크된 항목이 하나만 선택되도록
        if(!isMultiSelect){
            setCheckedList([value.value])
            onChange([value.value])
            return
        }

        // 다중 선택인 경우
        if(value.checked) {

            const newValue = Array.from(new Set([...checkedList,value.value]))

            setCheckedList(newValue)
            onChange(newValue)
            // setCheckedList(prev => Array.from(new Set([...prev, value.value])))
        }
        else{
            const newValue = checkedList.filter(v=>v!==value.value)
            onChange(newValue)
            setCheckedList(newValue)
        }
    }


    // console.log("initCheckedList :",initCheckedList)

    useEffect(() => {

        if(initCheckedList.length>0){
            setCheckedList(initCheckedList)
        }
    }, [initCheckedList]);
    //
    // useEffect(() => {
    //     onChange(checkedList)
    // }, [checkedList]);

    return (
        <div
            className={`flex ${direction==="col"?"flex-col":"flex-row"}
            w-full
            ${className}
            `}>
            {label&&<span className={"text-title3Normal"}>{label}</span>}
            {
                options.map((v,i)=>
                    <Checkbox
                        key={i}
                        checked={checkedList.includes(v.value)}
                        label={v.label}
                        value={v.value}
                        onChange={groupCheckHandler}
                    />
                )
            }
        </div>
    );
}

export default GroupCheckBox;
