import React from 'react';
import './tabs.css'
const Tab = ({active, tab, onClick, index}) => {
    let style= '';
    if(active === tab.tag) {style =  "tab active-tab"}
    else  {style = 'tab'};
    return(
        <div className={style} onClick={(i) => {
            i.preventDefault();
            onClick(tab.tag)}}>
            {tab.tag}
        </div>
    )
}
export default Tab;